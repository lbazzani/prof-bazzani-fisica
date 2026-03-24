// ===== Il Prof Bazzani — App principale =====

const App = (() => {
    let currentProblem = 0;
    let currentStep = 0;
    let problems = [];
    let canvas, ctx;
    let conceptCanvas, conceptCtx;
    let animationId = null;
    let conceptAnimId = null;
    let animStartTime = 0;
    let controlValues = {};
    const ANIM_DURATION = 800;

    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);
    const isMobile = () => window.innerWidth <= 600;
    const track = (event, params) => { if (typeof gtag === 'function') gtag('event', event, params); };

    function init() {
        canvas = $('#animation-canvas');
        ctx = canvas.getContext('2d');
        conceptCanvas = $('#concept-canvas');
        conceptCtx = conceptCanvas ? conceptCanvas.getContext('2d') : null;
        problems = [Problema1, Problema2, Problema3];

        // Concept overlay skip button
        const skipBtn = $('#concept-skip');
        if (skipBtn) skipBtn.addEventListener('click', hideConcept);

        // Tab click
        $$('.tab').forEach(tab => {
            tab.addEventListener('click', () => switchProblem(parseInt(tab.dataset.problem)));
        });

        // Mobile dropdown
        const sel = $('#tab-select');
        if (sel) sel.addEventListener('change', () => switchProblem(parseInt(sel.value)));

        // Navigation buttons
        $('#btn-prev').addEventListener('click', () => goStep(currentStep - 1));
        $('#btn-next').addEventListener('click', () => goStep(currentStep + 1));

        // Toggle enunciato
        $('#toggle-statement').addEventListener('click', () => {
            $('#statement-body').classList.toggle('collapsed');
            $('#toggle-icon').classList.toggle('collapsed');
        });

        // Keyboard
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); goStep(currentStep + 1); }
            if (e.key === 'ArrowLeft') { e.preventDefault(); goStep(currentStep - 1); }
        });

        // Swipe (su tutta la pagina, non solo canvas)
        let touchStartX = 0, touchStartY = 0;
        const swipeTarget = $('.main-content');
        swipeTarget.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });
        swipeTarget.addEventListener('touchend', (e) => {
            const dx = e.changedTouches[0].screenX - touchStartX;
            const dy = e.changedTouches[0].screenY - touchStartY;
            if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 2) {
                if (dx < 0) goStep(currentStep + 1);
                else goStep(currentStep - 1);
            }
        }, { passive: true });

        // Resize
        handleResize();
        window.addEventListener('resize', handleResize);

        // Avvia — leggi ?p= dalla URL
        const urlParams = new URLSearchParams(window.location.search);
        const startProblem = parseInt(urlParams.get('p')) || 0;
        switchProblem(Math.min(startProblem, problems.length - 1));
    }

    function handleResize() {
        const container = $('.canvas-container');
        const pad = isMobile() ? 4 : 24;
        const w = Math.max(1, container.clientWidth - pad);
        const ratio = isMobile() ? 0.78 : 0.65;
        const maxH = isMobile() ? 300 : 380;
        const h = Math.max(1, Math.min(maxH, w * ratio));
        const dpr = window.devicePixelRatio || 1;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        renderCurrentStep(1);
    }

    function switchProblem(idx) {
        currentProblem = idx;
        currentStep = 0;
        const names = ['Carro attrezzi', 'Scala a pioli', 'Biliardo'];
        track('select_content', { content_type: 'esercizio', item_id: `problema_${idx + 1}`, content_id: names[idx] || `Problema ${idx + 1}` });

        $$('.tab').forEach((tab, i) => tab.classList.toggle('active', i === idx));
        const sel = $('#tab-select');
        if (sel) sel.value = idx;

        const problem = problems[idx];

        // Mostra concept overlay se presente
        showConcept(problem);

        // Enunciato
        $('#statement-text').innerHTML = problem.statement || '';

        // Dots
        const dotsContainer = $('#step-dots');
        dotsContainer.innerHTML = '';
        problem.steps.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'step-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', `Passaggio ${i + 1}`);
            dot.addEventListener('click', () => goStep(i));
            dotsContainer.appendChild(dot);
        });

        $('#step-total').textContent = problem.steps.length;
        handleResize();
        goStep(0);
    }

    function setupInteractiveControls(step) {
        const container = $('#interactive-controls');
        if (!container) return;

        // Clear previous controls
        container.innerHTML = '';
        container.classList.remove('active');
        controlValues = {};

        if (!step || !step.interactive) return;

        const interactive = step.interactive;

        // Build sliders
        if (interactive.sliders && interactive.sliders.length) {
            interactive.sliders.forEach(slider => {
                controlValues[slider.id] = slider.default !== undefined ? slider.default : slider.min;

                const wrapper = document.createElement('div');
                wrapper.className = 'interactive-slider';

                const label = document.createElement('label');
                const valueSpan = document.createElement('span');
                valueSpan.className = 'slider-value';
                valueSpan.textContent = controlValues[slider.id] + (slider.unit || '');
                label.textContent = slider.label + ': ';
                label.appendChild(valueSpan);

                const input = document.createElement('input');
                input.type = 'range';
                input.min = slider.min;
                input.max = slider.max;
                input.step = slider.step || 1;
                input.value = controlValues[slider.id];

                input.addEventListener('input', () => {
                    const val = parseFloat(input.value);
                    controlValues[slider.id] = val;
                    valueSpan.textContent = val + (slider.unit || '');
                    // Re-render canvas with current animation progress (fully drawn)
                    renderCurrentStep(1);
                });

                wrapper.appendChild(label);
                wrapper.appendChild(input);
                container.appendChild(wrapper);
            });

            container.classList.add('active');
        }
    }

    function teardownInteractiveControls() {
        const container = $('#interactive-controls');
        if (!container) return;
        container.innerHTML = '';
        container.classList.remove('active');
        controlValues = {};
    }

    function goStep(idx) {
        const problem = problems[currentProblem];
        if (idx < 0 || idx >= problem.steps.length) return;
        currentStep = idx;
        const step = problem.steps[idx];

        // Track progress
        if (typeof Progress !== 'undefined') {
            Progress.markExerciseStep(currentProblem, idx, problem.steps.length);
        }
        // GA event
        track('tutorial_step', { step: idx + 1, total_steps: problem.steps.length, exercise: currentProblem + 1 });
        if (idx === problem.steps.length - 1) {
            track('tutorial_complete', { exercise: currentProblem + 1 });
        }

        // Setup or teardown interactive controls
        setupInteractiveControls(step);

        // Chiudi callout glossario se aperto
        if (typeof Glossario !== 'undefined') Glossario.closeCallout();

        // Enunciato: espanso al primo step, collassato negli altri
        if (idx === 0) {
            $('#statement-body').classList.remove('collapsed');
            $('#toggle-icon').classList.remove('collapsed');
        } else {
            $('#statement-body').classList.add('collapsed');
            $('#toggle-icon').classList.add('collapsed');
        }

        // Aggiorna badge
        $('#step-number').textContent = idx + 1;

        const titleEl = $('#step-title');
        const textEl = $('#step-text');
        const formulaEl = $('#step-formula');

        // Fade
        const els = [titleEl, textEl, formulaEl];
        els.forEach(el => el.style.transition = 'opacity 0.15s');
        els.forEach(el => el.style.opacity = 0);

        setTimeout(() => {
            titleEl.textContent = step.title;
            textEl.innerHTML = step.text;

            // Attiva click handler sui termini del glossario
            textEl.querySelectorAll('.term').forEach(el => {
                el.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (typeof Glossario !== 'undefined') Glossario.showCallout(el.dataset.term);
                });
            });

            if (step.formula) {
                formulaEl.style.display = 'block';
                formulaEl.innerHTML = '';
                try {
                    if (typeof katex !== 'undefined') {
                        katex.render(step.formula, formulaEl, { displayMode: true, throwOnError: false });
                    } else {
                        formulaEl.textContent = step.formula;
                    }
                } catch (e) {
                    formulaEl.textContent = step.formula;
                }
            } else {
                formulaEl.style.display = 'none';
                formulaEl.innerHTML = '';
            }

            els.forEach(el => { el.style.transition = 'opacity 0.25s'; el.style.opacity = 1; });
        }, 150);

        // Dots
        $$('.step-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === idx);
            dot.classList.toggle('completed', i < idx);
        });

        // Bottoni
        $('#btn-prev').disabled = idx === 0;
        $('#btn-next').disabled = idx === problem.steps.length - 1;

        // Su mobile scrolla in cima al canvas quando si cambia step
        if (isMobile()) {
            $('.canvas-container').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        startAnimation();
    }

    function startAnimation() {
        if (animationId) cancelAnimationFrame(animationId);
        animStartTime = performance.now();
        animate();
    }

    function animate() {
        const elapsed = performance.now() - animStartTime;
        // Durata personalizzabile per step (step.duration in ms)
        const problem = problems[currentProblem];
        const step = problem.steps[currentStep];
        const duration = (step && step.duration) || ANIM_DURATION;
        const raw = Math.min(1, elapsed / duration);
        const eased = 1 - Math.pow(1 - raw, 3);
        renderCurrentStep(eased);
        if (raw < 1) animationId = requestAnimationFrame(animate);
        else animationId = null;
    }

    function renderCurrentStep(progress) {
        const problem = problems[currentProblem];
        const dpr = window.devicePixelRatio || 1;
        const w = canvas.width / dpr;
        const h = canvas.height / dpr;

        ctx.clearRect(0, 0, w, h);
        ctx.save();

        // Trova da quale step partire: se lo step corrente ha cleanDraw,
        // disegna solo quello. Altrimenti, risali fino all'ultimo cleanDraw
        // e disegna da lì in poi (così gli step cleanDraw non "sporcano" i successivi).
        const currentStepObj = problem.steps[currentStep];
        const clean = currentStepObj && currentStepObj.cleanDraw;

        let startFrom = 0;
        if (!clean) {
            // Trova l'ultimo step con cleanDraw prima di questo
            for (let i = currentStep - 1; i >= 0; i--) {
                if (problem.steps[i].cleanDraw) {
                    startFrom = i + 1; // parti dallo step DOPO l'ultimo cleanDraw
                    break;
                }
            }
        }

        // Passaggi precedenti (opacità piena) — solo se non cleanDraw
        for (let i = startFrom; i < currentStep; i++) {
            if (clean) break;
            if (problem.steps[i].draw) {
                ctx.globalAlpha = 1;
                problem.steps[i].draw(ctx, w, h, 1, controlValues);
            }
        }

        // Passaggio corrente (animato)
        if (problem.steps[currentStep] && problem.steps[currentStep].draw) {
            ctx.globalAlpha = progress;
            problem.steps[currentStep].draw(ctx, w, h, progress, controlValues);
        }

        ctx.restore();
    }

    // ===== Concept overlay =====
    function showConcept(problem) {
        const concept = problem.concept;
        if (!concept) return false;

        const overlay = $('#concept-overlay');
        if (!overlay) return false;

        // Popola titolo
        $('#concept-title').textContent = concept.title || '';

        // Popola testo — items come card separate
        const textEl = $('#concept-text');
        if (concept.items && concept.items.length) {
            textEl.innerHTML = concept.items.map(item =>
                `<div class="concept-item"><b>${item.name}</b><p>${item.desc}</p></div>`
            ).join('');
        } else {
            textEl.innerHTML = concept.text || '';
        }

        // Attiva click handler sui termini del glossario nel concept
        textEl.querySelectorAll('.term').forEach(el => {
            el.addEventListener('click', (e) => {
                e.stopPropagation();
                if (typeof Glossario !== 'undefined') Glossario.showCallout(el.dataset.term);
            });
        });

        // Formula
        const formulaEl = $('#concept-formula');
        if (concept.formula && typeof katex !== 'undefined') {
            formulaEl.style.display = 'block';
            formulaEl.innerHTML = '';
            try { katex.render(concept.formula, formulaEl, { displayMode: true, throwOnError: false }); }
            catch (e) { formulaEl.textContent = concept.formula; }
        } else {
            formulaEl.style.display = 'none';
        }

        // Show overlay BEFORE measuring canvas width (otherwise clientWidth is 0)
        overlay.classList.add('active');

        // Canvas concept — setup e animazione
        if (concept.draw && conceptCanvas && conceptCtx) {
            const wrap = conceptCanvas.parentElement;
            const w = Math.max(1, wrap.clientWidth);
            const h = Math.max(1, Math.min(220, w * 0.55));
            const dpr = window.devicePixelRatio || 1;
            conceptCanvas.width = w * dpr;
            conceptCanvas.height = h * dpr;
            conceptCanvas.style.width = w + 'px';
            conceptCanvas.style.height = h + 'px';
            conceptCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
            conceptCanvas.style.display = 'block';

            // Anima
            if (conceptAnimId) cancelAnimationFrame(conceptAnimId);
            const startT = performance.now();
            const dur = concept.duration || 1200;
            function animConcept() {
                const elapsed = performance.now() - startT;
                const raw = Math.min(1, elapsed / dur);
                const eased = 1 - Math.pow(1 - raw, 3);
                conceptCtx.clearRect(0, 0, w, h);
                conceptCtx.save();
                concept.draw(conceptCtx, w, h, eased);
                conceptCtx.restore();
                if (raw < 1) conceptAnimId = requestAnimationFrame(animConcept);
                else conceptAnimId = null;
            }
            animConcept();
        } else if (conceptCanvas) {
            conceptCanvas.style.display = 'none';
        }
        return true;
    }

    function hideConcept() {
        const overlay = $('#concept-overlay');
        if (overlay) overlay.classList.remove('active');
        if (conceptAnimId) { cancelAnimationFrame(conceptAnimId); conceptAnimId = null; }
    }

    // Draw utilities caricate da draw.js (window.Draw)

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();

    return { switchProblem, goStep };
})();
