// ===== Teoria App — Il Prof Bazzani =====
// Versione di app.js adattata per le lezioni di teoria

const TeoriaApp = (() => {
    let currentTopic = 0, currentStep = 0;
    let topics = [];
    let canvas, ctx, animationId = null, animStartTime = 0;
    const ANIM_DURATION = 800;

    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);
    const isMobile = () => window.innerWidth <= 600;

    function init() {
        canvas = $('#animation-canvas');
        ctx = canvas.getContext('2d');
        topics = [Tema5, Tema6, Tema8, Tema1, Tema7, Tema2, Tema3, Tema4];

        $$('.tab').forEach(tab => {
            tab.addEventListener('click', () => switchTopic(parseInt(tab.dataset.problem)));
        });

        // Mobile dropdown
        const sel = $('#tab-select');
        if (sel) sel.addEventListener('change', () => switchTopic(parseInt(sel.value)));

        $('#btn-prev').addEventListener('click', () => goStep(currentStep - 1));
        $('#btn-next').addEventListener('click', () => goStep(currentStep + 1));

        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); goStep(currentStep + 1); }
            if (e.key === 'ArrowLeft') { e.preventDefault(); goStep(currentStep - 1); }
        });

        // Swipe
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

        handleResize();
        window.addEventListener('resize', handleResize);

        // Leggi ?t= dalla URL
        const urlParams = new URLSearchParams(window.location.search);
        const startTopic = parseInt(urlParams.get('t')) || 0;
        switchTopic(Math.min(startTopic, topics.length - 1));
    }

    function handleResize() {
        const container = $('.canvas-container');
        const pad = isMobile() ? 12 : 24;
        const w = container.clientWidth - pad;
        const ratio = isMobile() ? 0.72 : 0.65;
        const maxH = isMobile() ? 280 : 380;
        const h = Math.min(maxH, w * ratio);
        const dpr = window.devicePixelRatio || 1;
        canvas.width = w * dpr; canvas.height = h * dpr;
        canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        renderCurrentStep(1);
    }

    function switchTopic(idx) {
        currentTopic = idx; currentStep = 0;
        $$('.tab').forEach((tab, i) => tab.classList.toggle('active', i === idx));
        const sel = $('#tab-select');
        if (sel) sel.value = idx;

        const topic = topics[idx];
        const dotsContainer = $('#step-dots');
        dotsContainer.innerHTML = '';
        topic.steps.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'step-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', `Passaggio ${i + 1}`);
            dot.addEventListener('click', () => goStep(i));
            dotsContainer.appendChild(dot);
        });

        $('#step-total').textContent = topic.steps.length;
        handleResize();
        goStep(0);
    }

    function goStep(idx) {
        const topic = topics[currentTopic];
        if (idx < 0 || idx >= topic.steps.length) return;
        currentStep = idx;
        const step = topic.steps[idx];

        if (typeof Glossario !== 'undefined') Glossario.closeCallout();

        $('#step-number').textContent = idx + 1;
        const titleEl = $('#step-title'), textEl = $('#step-text'), formulaEl = $('#step-formula');

        [titleEl, textEl, formulaEl].forEach(el => { el.style.transition = 'opacity 0.15s'; el.style.opacity = 0; });

        setTimeout(() => {
            titleEl.textContent = step.title;
            textEl.innerHTML = step.text;

            // Glossary term handlers
            textEl.querySelectorAll('.term').forEach(el => {
                el.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (typeof Glossario !== 'undefined') Glossario.showCallout(el.dataset.term);
                });
            });

            if (step.formula) {
                formulaEl.style.display = 'block'; formulaEl.innerHTML = '';
                try {
                    if (typeof katex !== 'undefined') katex.render(step.formula, formulaEl, { displayMode: true, throwOnError: false });
                    else formulaEl.textContent = step.formula;
                } catch(e) { formulaEl.textContent = step.formula; }
            } else { formulaEl.style.display = 'none'; formulaEl.innerHTML = ''; }

            [titleEl, textEl, formulaEl].forEach(el => { el.style.transition = 'opacity 0.25s'; el.style.opacity = 1; });
        }, 150);

        $$('.step-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === idx);
            dot.classList.toggle('completed', i < idx);
        });

        $('#btn-prev').disabled = idx === 0;
        $('#btn-next').disabled = idx === topic.steps.length - 1;

        if (isMobile()) $('.canvas-container').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        startAnimation();
    }

    function startAnimation() {
        if (animationId) cancelAnimationFrame(animationId);
        animStartTime = performance.now();
        animate();
    }

    function animate() {
        const elapsed = performance.now() - animStartTime;
        const topic = topics[currentTopic];
        const step = topic.steps[currentStep];
        const duration = (step && step.duration) || ANIM_DURATION;
        const raw = Math.min(1, elapsed / duration);
        const eased = 1 - Math.pow(1 - raw, 3);
        renderCurrentStep(eased);
        if (raw < 1) animationId = requestAnimationFrame(animate);
        else animationId = null;
    }

    function renderCurrentStep(progress) {
        const topic = topics[currentTopic];
        const dpr = window.devicePixelRatio || 1;
        const w = canvas.width / dpr, h = canvas.height / dpr;

        ctx.clearRect(0, 0, w, h);
        ctx.save();

        const currentStepObj = topic.steps[currentStep];
        const clean = currentStepObj && currentStepObj.cleanDraw;

        for (let i = 0; i < currentStep; i++) {
            if (clean) break;
            if (topic.steps[i].draw) { ctx.globalAlpha = 1; topic.steps[i].draw(ctx, w, h, 1); }
        }

        if (currentStepObj && currentStepObj.draw) {
            ctx.globalAlpha = progress;
            currentStepObj.draw(ctx, w, h, progress);
        }

        ctx.restore();
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();

    return { switchTopic, goStep };
})();
