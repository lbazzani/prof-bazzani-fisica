// ===== Il Prof Bazzani — App principale =====

const App = (() => {
    let currentProblem = 0;
    let currentStep = 0;
    let problems = [];
    let canvas, ctx;
    let animationId = null;
    let animStartTime = 0;
    const ANIM_DURATION = 800;

    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);
    const isMobile = () => window.innerWidth <= 600;

    function init() {
        canvas = $('#animation-canvas');
        ctx = canvas.getContext('2d');
        problems = [Problema1, Problema2, Problema3];

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
        const pad = isMobile() ? 12 : 24;
        const w = container.clientWidth - pad;
        const ratio = isMobile() ? 0.72 : 0.65;
        const maxH = isMobile() ? 280 : 380;
        const h = Math.min(maxH, w * ratio);
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

        $$('.tab').forEach((tab, i) => tab.classList.toggle('active', i === idx));
        const sel = $('#tab-select');
        if (sel) sel.value = idx;

        // Enunciato
        const problem = problems[idx];
        $('#statement-text').innerHTML = problem.statement || '';

        // Enunciato: aperto al primo step, chiuso negli altri
        // (gestito in goStep)

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

    function goStep(idx) {
        const problem = problems[currentProblem];
        if (idx < 0 || idx >= problem.steps.length) return;
        currentStep = idx;
        const step = problem.steps[idx];

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

        // Se lo step corrente ha cleanDraw, non disegnare i precedenti
        const currentStepObj = problem.steps[currentStep];
        const clean = currentStepObj && currentStepObj.cleanDraw;

        // Passaggi precedenti (opacità piena) — solo se non cleanDraw
        for (let i = 0; i < currentStep; i++) {
            if (clean) break;
            if (problem.steps[i].draw) {
                ctx.globalAlpha = 1;
                problem.steps[i].draw(ctx, w, h, 1);
            }
        }

        // Passaggio corrente (animato)
        if (problem.steps[currentStep] && problem.steps[currentStep].draw) {
            ctx.globalAlpha = progress;
            problem.steps[currentStep].draw(ctx, w, h, progress);
        }

        ctx.restore();
    }

    // Draw utilities caricate da draw.js (window.Draw)

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();

    return { switchProblem, goStep };
})();
