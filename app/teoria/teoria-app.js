// ===== Teoria App — Il Prof Bazzani =====
// Versione di app.js adattata per le lezioni di teoria

const TeoriaApp = (() => {
    let currentTopic = 0, currentStep = 0;
    let topics = [];
    let canvas, ctx, animationId = null, animStartTime = 0;
    let controlValues = {};
    let quizActive = false, quizAnswered = 0, quizCorrect = 0;
    const ANIM_DURATION = 800;

    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);
    const isMobile = () => window.innerWidth <= 600;
    const track = (event, params) => { if (typeof gtag === 'function') gtag('event', event, params); };

    function buildTabs() {
        topics = TopicRegistry.getAll();

        // Desktop tabs
        const tabsNav = $('#topic-tabs');
        if (tabsNav) {
            tabsNav.innerHTML = '';
            topics.forEach((t, i) => {
                const btn = document.createElement('button');
                btn.className = 'tab' + (i === 0 ? ' active' : '');
                btn.dataset.problem = i;
                btn.innerHTML = '<span class="tab-icon">' + t.icon + '</span><span class="tab-label">' + t.title + '</span>';
                btn.addEventListener('click', () => switchTopic(i));
                tabsNav.appendChild(btn);
            });
        }

        // Mobile dropdown
        const sel = $('#tab-select');
        if (sel) {
            sel.innerHTML = '';
            topics.forEach((t, i) => {
                const opt = document.createElement('option');
                opt.value = i;
                opt.textContent = t.icon + '  ' + t.title;
                sel.appendChild(opt);
            });
            sel.addEventListener('change', () => switchTopic(parseInt(sel.value)));
        }
    }

    function init() {
        canvas = $('#animation-canvas');
        ctx = canvas.getContext('2d');
        buildTabs();

        $('#btn-prev').addEventListener('click', () => goStep(currentStep - 1));
        $('#btn-next').addEventListener('click', () => {
            const topic = topics[currentTopic];
            const isLast = currentStep === topic.steps.length - 1;
            const hasQuiz = topic.quiz && topic.quiz.length > 0;
            if (isLast && hasQuiz) {
                showQuiz();
            } else {
                goStep(currentStep + 1);
            }
        });

        const quizBackBtn = $('#quiz-back');
        if (quizBackBtn) quizBackBtn.addEventListener('click', hideQuiz);

        document.addEventListener('keydown', (e) => {
            if (quizActive) return;
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
        const pad = isMobile() ? 4 : 24;
        const w = Math.max(1, container.clientWidth - pad);
        const ratio = isMobile() ? 0.78 : 0.65;
        const maxH = isMobile() ? 300 : 380;
        const h = Math.max(1, Math.min(maxH, w * ratio));
        const dpr = window.devicePixelRatio || 1;
        canvas.width = w * dpr; canvas.height = h * dpr;
        canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        renderCurrentStep(1);
    }

    function switchTopic(idx) {
        currentTopic = idx; currentStep = 0;
        hideQuiz();
        $$('.tab').forEach((tab, i) => tab.classList.toggle('active', i === idx));
        const sel = $('#tab-select');
        if (sel) sel.value = idx;

        const topic = topics[idx];
        track('select_content', { content_type: 'teoria', item_id: `tema_${idx}`, content_id: topic?.title || `Tema ${idx}` });
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
        const topic = topics[currentTopic];
        if (idx < 0 || idx >= topic.steps.length) return;
        currentStep = idx;
        const step = topic.steps[idx];

        // Track progress
        if (typeof Progress !== 'undefined' && topic.id) {
            Progress.markTheoryStep(topic.id, idx, topic.steps.length);
        }
        // GA event
        track('lesson_step', { step: idx + 1, total_steps: topic.steps.length, topic: topic.title || `Tema ${currentTopic}` });
        if (idx === topic.steps.length - 1) {
            track('lesson_complete', { topic: topic.title || `Tema ${currentTopic}` });
        }

        if (typeof Glossario !== 'undefined') Glossario.closeCallout();

        // Setup or teardown interactive controls
        setupInteractiveControls(step);

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

        const isLast = idx === topic.steps.length - 1;
        const hasQuiz = topic.quiz && topic.quiz.length > 0;
        const nextBtn = $('#btn-next');

        if (isLast && hasQuiz) {
            nextBtn.disabled = false;
            nextBtn.innerHTML = '🎯 Quiz <span class="nav-arrow">→</span>';
        } else {
            nextBtn.disabled = isLast;
            nextBtn.innerHTML = 'Avanti <span class="nav-arrow">→</span>';
        }

        if (isMobile()) $('.canvas-container').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        startAnimation();
    }

    // ===== Quiz Functions =====

    function showQuiz() {
        const topic = topics[currentTopic];
        if (!topic.quiz || !topic.quiz.length) return;

        quizActive = true;
        quizAnswered = 0;
        quizCorrect = 0;

        const quizPanel = $('#quiz-panel');
        const contentGrid = $('.content-grid');
        const stepNav = $('.step-navigation');

        contentGrid.style.display = 'none';
        stepNav.style.display = 'none';
        quizPanel.style.display = 'block';

        const questionsContainer = $('#quiz-questions');
        const resultContainer = $('#quiz-result');
        questionsContainer.innerHTML = '';
        resultContainer.innerHTML = '';
        resultContainer.className = 'quiz-result';

        const markers = ['A', 'B', 'C', 'D'];

        topic.quiz.forEach((q, qi) => {
            const qDiv = document.createElement('div');
            qDiv.className = 'quiz-question';
            qDiv.dataset.index = qi;

            const qText = document.createElement('div');
            qText.className = 'quiz-question-text';
            qText.innerHTML = '<span class="quiz-question-number">' + (qi + 1) + '</span>' + q.question;
            qDiv.appendChild(qText);

            const optionsDiv = document.createElement('div');
            optionsDiv.className = 'quiz-options';

            q.options.forEach((opt, oi) => {
                const btn = document.createElement('button');
                btn.className = 'quiz-option';
                btn.innerHTML = '<span class="quiz-option-marker">' + markers[oi] + '</span><span>' + opt + '</span>';
                btn.addEventListener('click', () => handleQuizAnswer(qi, oi, qDiv, optionsDiv));
                optionsDiv.appendChild(btn);
            });

            qDiv.appendChild(optionsDiv);
            questionsContainer.appendChild(qDiv);
        });

        if (isMobile()) quizPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function handleQuizAnswer(questionIdx, optionIdx, qDiv, optionsDiv) {
        if (qDiv.classList.contains('answered')) return;

        const topic = topics[currentTopic];
        const q = topic.quiz[questionIdx];
        const isCorrect = optionIdx === q.correct;

        qDiv.classList.add('answered');
        quizAnswered++;
        if (isCorrect) quizCorrect++;

        // Mark all options as disabled, highlight correct/wrong
        const buttons = optionsDiv.querySelectorAll('.quiz-option');
        buttons.forEach((btn, bi) => {
            btn.classList.add('disabled');
            if (bi === q.correct) {
                btn.classList.add('correct');
            }
            if (bi === optionIdx && !isCorrect) {
                btn.classList.add('wrong');
            }
        });

        // Show explanation
        const explDiv = document.createElement('div');
        explDiv.className = 'quiz-explanation';
        explDiv.textContent = (isCorrect ? 'Esatto! ' : 'Non proprio... ') + q.explanation;
        qDiv.appendChild(explDiv);

        // Check if all questions answered
        if (quizAnswered === topic.quiz.length) {
            setTimeout(() => showQuizResult(topic.quiz.length), 400);
        }
    }

    function showQuizResult(total) {
        const resultContainer = $('#quiz-result');
        const msgs = [
            'Ripassa un po\' la lezione e riprova!',
            'Buon inizio, puoi fare ancora meglio!',
            'Bravo, quasi perfetto!',
            'Perfetto, hai capito tutto!'
        ];

        let msgIdx;
        const ratio = quizCorrect / total;
        if (ratio <= 0.33) msgIdx = 0;
        else if (ratio <= 0.66) msgIdx = 1;
        else if (ratio < 1) msgIdx = 2;
        else msgIdx = 3;

        resultContainer.innerHTML =
            '<div class="quiz-result-score">' + quizCorrect + '/' + total + ' corrette!</div>' +
            '<div class="quiz-result-msg">' + msgs[msgIdx] + '</div>';
        resultContainer.className = 'quiz-result visible';

        if (isMobile()) resultContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function hideQuiz() {
        quizActive = false;
        const quizPanel = $('#quiz-panel');
        const contentGrid = $('.content-grid');
        const stepNav = $('.step-navigation');

        if (quizPanel) quizPanel.style.display = 'none';
        if (contentGrid) contentGrid.style.display = '';
        if (stepNav) stepNav.style.display = '';
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

        let startFrom = 0;
        if (!clean) {
            for (let i = currentStep - 1; i >= 0; i--) {
                if (topic.steps[i].cleanDraw) { startFrom = i + 1; break; }
            }
        }

        for (let i = startFrom; i < currentStep; i++) {
            if (clean) break;
            if (topic.steps[i].draw) { ctx.globalAlpha = 1; topic.steps[i].draw(ctx, w, h, 1, controlValues); }
        }

        if (currentStepObj && currentStepObj.draw) {
            ctx.globalAlpha = progress;
            currentStepObj.draw(ctx, w, h, progress, controlValues);
        }

        ctx.restore();
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();

    return { switchTopic, goStep };
})();
