// ===== Problema 2: Scala a pioli =====

const Problema2 = (() => {
    const m = 16.25, g = 9.8, L = 6.0, hh = 4.0;
    const base = Math.sqrt(L*L - hh*hh);
    const Fp = m * g;
    const N1val = Fp * base / (2 * hh);

    const statement = `Una scala a pioli di massa <b>m = 16,25 kg</b>, lunga <b>6,0 m</b>, è in equilibrio,
        appoggiata a un muro liscio (con attrito trascurabile), con il punto
        di contatto ad un'altezza di <b>h = 4,0 m</b> dal pavimento.
        <ul class="statement-parts">
            <li data-num="i.">Schematizza il problema e stabilisci un protocollo, indicando con F<sub>P</sub>, N<sub>1</sub>,
                N<sub>2</sub>, F<sub>a</sub> rispettivamente la forza peso, la reazione normale del muro, quella del pavimento
                e la forza di attrito sul pavimento. Identifica il punto di rotazione e il braccio delle due
                forze che generano un momento rispetto ad esso.</li>
            <li data-num="ii.">Calcola la forza normale N<sub>2</sub>.</li>
            <li data-num="iii.">Calcola le rimanenti forze N<sub>1</sub>, F<sub>a</sub>. Perché quest'ultima non compare nel bilancio dei momenti?</li>
        </ul>`;

    function geo(w, h) {
        const s = Draw.S(w, h);
        const mar = 45*s, floorY = h - mar, wallX = mar + 15*s;
        const sf = (h - 2*mar) / hh * 0.82;
        const topY = floorY - hh*sf, baseX = wallX + base*sf;
        const midX = (wallX + baseX) / 2, midY = (topY + floorY) / 2;
        return { s, floorY, wallX, topY, baseX, midX, midY };
    }

    function drawScene(ctx, w, h) {
        const g = geo(w, h), s = g.s;
        ctx.fillStyle = '#e8e3db'; ctx.fillRect(0, 0, g.wallX, h);
        ctx.strokeStyle = '#ccc4b8'; ctx.lineWidth = 2*s;
        ctx.beginPath(); ctx.moveTo(g.wallX, 0); ctx.lineTo(g.wallX, h); ctx.stroke();
        for (let y = 8; y < h; y += 16*s) {
            ctx.strokeStyle = '#d5cfc6'; ctx.lineWidth = 0.8*s;
            ctx.beginPath(); ctx.moveTo(g.wallX, y); ctx.lineTo(g.wallX-7*s, y+7*s); ctx.stroke();
        }
        ctx.strokeStyle = '#c0b5a5'; ctx.lineWidth = 2*s;
        ctx.beginPath(); ctx.moveTo(0, g.floorY); ctx.lineTo(w, g.floorY); ctx.stroke();
        for (let x = 8; x < w; x += 14*s) {
            ctx.strokeStyle = '#d0c8bb'; ctx.lineWidth = 0.8*s;
            ctx.beginPath(); ctx.moveTo(x, g.floorY); ctx.lineTo(x-7*s, g.floorY+9*s); ctx.stroke();
        }
        ctx.save(); ctx.translate(g.wallX-11*s, g.floorY/2); ctx.rotate(-Math.PI/2);
        Draw.label(ctx, 'liscio', 0, 0, '#c0b5a5', 10*s, false); ctx.restore();
    }

    function drawLadder(ctx, w, h, a) {
        const g = geo(w, h), s = g.s;
        ctx.save(); ctx.globalAlpha = (ctx.globalAlpha||1)*a;
        const d = 7*s;
        const dx = (g.floorY-g.topY)/L, dy = (g.baseX-g.wallX)/L;
        const nl = Math.sqrt(dx*dx+dy*dy), px = dx/nl*d, py = dy/nl*d;
        ctx.strokeStyle = '#8b6e4e'; ctx.lineWidth = 3*s; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(g.wallX-px, g.topY-py); ctx.lineTo(g.baseX-px, g.floorY-py); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(g.wallX+px, g.topY+py); ctx.lineTo(g.baseX+px, g.floorY+py); ctx.stroke();
        for (let i = 1; i < 8; i++) {
            const t = i/8, rx = g.wallX+(g.baseX-g.wallX)*t, ry = g.topY+(g.floorY-g.topY)*t;
            ctx.strokeStyle = '#a68b6b'; ctx.lineWidth = 2*s;
            ctx.beginPath(); ctx.moveTo(rx-px, ry-py); ctx.lineTo(rx+px, ry+py); ctx.stroke();
        }
        ctx.restore();
    }

    // Forze standard (riusabili)
    const AL = 55, SL = 45, FAL = 38;

    function drawAllForces(ctx, w, h, alpha) {
        const ge = geo(w, h), s = ge.s;
        ctx.save(); ctx.globalAlpha = (ctx.globalAlpha||1)*alpha;
        Draw.arrow(ctx, ge.midX, ge.midY, ge.midX, ge.midY+AL*s, '#c46b60', 2.5*s, 9*s);
        Draw.label(ctx, 'Fp', ge.midX+16*s, ge.midY+AL*s*0.6, '#c46b60', 12*s);
        Draw.arrow(ctx, ge.wallX, ge.topY, ge.wallX+SL*s, ge.topY, '#5a8fa8', 2.5*s, 9*s);
        Draw.label(ctx, 'N\u2081', ge.wallX+SL*s+10*s, ge.topY-11*s, '#5a8fa8', 12*s);
        Draw.arrow(ctx, ge.baseX, ge.floorY, ge.baseX, ge.floorY-AL*s, '#5a9a6a', 2.5*s, 9*s);
        Draw.label(ctx, 'N\u2082', ge.baseX+16*s, ge.floorY-AL*s*0.6, '#5a9a6a', 12*s);
        Draw.arrow(ctx, ge.baseX, ge.floorY, ge.baseX-FAL*s, ge.floorY, '#d4956a', 2.5*s, 9*s);
        Draw.label(ctx, 'Fa', ge.baseX-FAL*s-10*s, ge.floorY-11*s, '#d4956a', 12*s);
        ctx.restore();
    }

    // ===================================================================
    // STEP
    // ===================================================================
    const steps = [

        // ---- STEP 0: Introduzione ----
        {
            title: 'La scala appoggiata al muro',
            text: 'Una <span class="highlight">scala a pioli</span> è appoggiata a un muro. Ecco i dati:<br><br>' +
                '&bull; Massa: <span class="highlight">m = 16,25 kg</span><br>' +
                '&bull; Lunghezza: <span class="highlight">L = 6 m</span><br>' +
                '&bull; Altezza al muro: <span class="highlight">h = 4 m</span><br><br>' +
                'Dettaglio fondamentale: il muro è <b>liscio</b> (niente <span class="term" data-term="attrito">attrito</span>), ma il pavimento <b>ha attrito</b>. Senza l\'attrito del pavimento la scala scivolerebbe via!',
            formula: null,
            draw(ctx, w, h, p) { drawScene(ctx, w, h); drawLadder(ctx, w, h, p); }
        },

        // ---- STEP 1: Pitagora ----
        {
            title: 'Calcoliamo la base',
            text: 'Ci serve la distanza tra il piede della scala e il muro. Scala + muro + pavimento formano un <span class="term" data-term="triangolo-rettangolo">triangolo rettangolo</span>:<br><br>' +
                '&bull; Ipotenusa = scala = 6 m<br>' +
                '&bull; Cateto verticale = altezza = 4 m<br>' +
                '&bull; Cateto orizzontale = ? &rarr; usiamo <span class="term" data-term="pitagora">Pitagora</span>!<br><br>' +
                'Questa distanza ci servirà tra poco.',
            formula: 'b = \\sqrt{L^2 - h^2} = \\sqrt{36 - 16} = \\sqrt{20} \\approx \\boxed{4{,}47 \\text{ m}}',
            draw(ctx, w, h, p) {
                const ge = geo(w, h), s = ge.s;
                ctx.globalAlpha = p;
                ctx.strokeStyle = 'rgba(90,143,168,0.3)'; ctx.lineWidth = 2*s;
                ctx.fillStyle = 'rgba(90,143,168,0.05)';
                ctx.beginPath();
                ctx.moveTo(ge.wallX, ge.topY); ctx.lineTo(ge.wallX, ge.floorY); ctx.lineTo(ge.baseX, ge.floorY);
                ctx.closePath(); ctx.fill(); ctx.stroke();
                Draw.dashedLine(ctx, ge.wallX+14*s, ge.topY, ge.wallX+14*s, ge.floorY, '#5a8fa8', 1.5*s);
                Draw.label(ctx, 'h = 4 m', ge.wallX+42*s, (ge.topY+ge.floorY)/2, '#5a8fa8', 11*s);
                Draw.dashedLine(ctx, ge.wallX, ge.floorY+18*s, ge.baseX, ge.floorY+18*s, '#d4956a', 1.5*s);
                Draw.label(ctx, 'b \u2248 4,47 m', (ge.wallX+ge.baseX)/2, ge.floorY+32*s, '#d4956a', 11*s);
                Draw.label(ctx, 'L = 6 m', (ge.wallX+ge.baseX)/2+18*s, (ge.topY+ge.floorY)/2-14*s, '#8b6e4e', 11*s);
                if (p > 0.5) {
                    ctx.globalAlpha = (p-0.5)*2;
                    const sqS = 10*s;
                    ctx.strokeStyle = '#5a8fa8'; ctx.lineWidth = 1.5*s;
                    ctx.beginPath();
                    ctx.moveTo(ge.wallX+sqS, ge.floorY); ctx.lineTo(ge.wallX+sqS, ge.floorY-sqS);
                    ctx.lineTo(ge.wallX, ge.floorY-sqS); ctx.stroke();
                }
            }
        },

        // ---- STEP 2: Le 4 forze ----
        {
            title: 'Quali forze agiscono?',
            text: 'Disegniamo tutte le <span class="term" data-term="forza">forze</span> sulla scala:<br><br>' +
                '&bull; <b style="color:#c46b60">F<sub>P</sub></b> &mdash; il <span class="term" data-term="peso">peso</span>, applicato al centro (il <span class="term" data-term="baricentro">baricentro</span>)<br>' +
                '&bull; <b style="color:#5a8fa8">N<sub>1</sub></b> &mdash; la <span class="term" data-term="reazione-normale">reazione del muro</span>, orizzontale (muro liscio!)<br>' +
                '&bull; <b style="color:#5a9a6a">N<sub>2</sub></b> &mdash; la reazione del pavimento, verticale<br>' +
                '&bull; <b style="color:#d4956a">F<sub>a</sub></b> &mdash; l\'<span class="term" data-term="attrito">attrito</span> del pavimento, orizzontale verso il muro',
            formula: null,
            draw(ctx, w, h, p) {
                const ge = geo(w, h), s = ge.s;
                const al = AL*s, sl2 = SL*s, fal = FAL*s;
                const phases = [
                    { t: 0,    fn: () => { Draw.animatedArrow(ctx, ge.midX, ge.midY, ge.midX, ge.midY+al, '#c46b60', Math.min(1,p*4), 3*s, 10*s); Draw.circle(ctx, ge.midX, ge.midY, 4*s, '#c46b60', null); }},
                    { t: 0.25, fn: () => { Draw.animatedArrow(ctx, ge.wallX, ge.topY, ge.wallX+sl2, ge.topY, '#5a8fa8', Math.min(1,(p-0.25)*4), 3*s, 10*s); }},
                    { t: 0.5,  fn: () => { Draw.animatedArrow(ctx, ge.baseX, ge.floorY, ge.baseX, ge.floorY-al, '#5a9a6a', Math.min(1,(p-0.5)*4), 3*s, 10*s); }},
                    { t: 0.75, fn: () => { Draw.animatedArrow(ctx, ge.baseX, ge.floorY, ge.baseX-fal, ge.floorY, '#d4956a', Math.min(1,(p-0.75)*4), 3*s, 10*s); }},
                ];
                phases.forEach(ph => { if (p > ph.t) { ctx.globalAlpha = Math.min(1, (p-ph.t)*4); ph.fn(); } });
                if (p > 0.15) Draw.label(ctx, 'Fp', ge.midX+16*s, ge.midY+al*0.6, '#c46b60', 13*s);
                if (p > 0.4) Draw.label(ctx, 'N\u2081', ge.wallX+sl2+10*s, ge.topY-11*s, '#5a8fa8', 13*s);
                if (p > 0.65) Draw.label(ctx, 'N\u2082', ge.baseX+16*s, ge.floorY-al*0.6, '#5a9a6a', 13*s);
                if (p > 0.9) Draw.label(ctx, 'Fa', ge.baseX-fal-10*s, ge.floorY-11*s, '#d4956a', 13*s);
            }
        },

        // ---- STEP 3: Equilibrio verticale ----
        {
            title: 'Forze verticali: N\u2082 = peso',
            text: 'Partiamo dal caso più semplice. La scala è ferma, quindi in <span class="term" data-term="equilibrio">equilibrio</span>.<br><br>' +
                'Guardiamo solo le forze <b>verticali</b>:<br>' +
                '&bull; In basso: il peso F<sub>P</sub> tira giù<br>' +
                '&bull; In alto: N<sub>2</sub> spinge su<br><br>' +
                'Si bilanciano &rarr; <b>N<sub>2</sub> = F<sub>P</sub></b>. Facile!',
            formula: 'N_2 = F_P = m \\cdot g = 16{,}25 \\times 9{,}8 = \\boxed{159{,}25 \\text{ N}}',
            draw(ctx, w, h, p) {
                const ge = geo(w, h), s = ge.s;
                const al = AL*s;
                ctx.globalAlpha = p;
                Draw.roundRect(ctx, ge.midX-20*s, ge.midY-5*s, 40*s, al+12*s, 5*s, 'rgba(196,107,96,0.08)');
                Draw.roundRect(ctx, ge.baseX-20*s, ge.floorY-al-5*s, 40*s, al+12*s, 5*s, 'rgba(90,154,106,0.08)');
                Draw.arrow(ctx, ge.midX, ge.midY, ge.midX, ge.midY+al, '#c46b60', 3*s, 10*s);
                Draw.arrow(ctx, ge.baseX, ge.floorY, ge.baseX, ge.floorY-al, '#5a9a6a', 3*s, 10*s);
                if (p > 0.4) {
                    ctx.globalAlpha = (p-0.4)/0.6;
                    const eqX = (ge.midX+ge.baseX)/2, eqY = (ge.midY+ge.floorY)/2;
                    Draw.roundRect(ctx, eqX-15*s, eqY-12*s, 30*s, 24*s, 5*s, '#f5f0ea');
                    Draw.label(ctx, '=', eqX, eqY, '#2e2e2e', 24*s);
                }
                ctx.globalAlpha = p * 0.2;
                Draw.arrow(ctx, ge.wallX, ge.topY, ge.wallX+SL*s, ge.topY, '#999', 1.5*s, 7*s);
                Draw.arrow(ctx, ge.baseX, ge.floorY, ge.baseX-FAL*s, ge.floorY, '#999', 1.5*s, 7*s);
            }
        },

        // ---- STEP 4: Equilibrio orizzontale — il problema ----
        {
            title: 'Forze orizzontali: serve aiuto!',
            text: 'Guardiamo le forze <b>orizzontali</b>:<br>' +
                '&bull; N<sub>1</sub> spinge verso destra<br>' +
                '&bull; F<sub>a</sub> spinge verso sinistra<br><br>' +
                'Sappiamo che <b>N<sub>1</sub> = F<sub>a</sub></b>, ma quanto valgono? Le forze da sole non bastano per scoprirlo. Ci serve un nuovo strumento: il <span class="term" data-term="momento">momento di una forza</span>.',
            formula: 'N_1 = F_a \\quad \\text{ma quanto vale?}',
            draw(ctx, w, h, p) {
                const ge = geo(w, h), s = ge.s;
                ctx.globalAlpha = p;
                Draw.roundRect(ctx, ge.wallX-5*s, ge.topY-18*s, 58*s, 36*s, 5*s, 'rgba(90,143,168,0.08)');
                Draw.roundRect(ctx, ge.baseX-48*s, ge.floorY-18*s, 56*s, 36*s, 5*s, 'rgba(212,149,106,0.08)');
                Draw.arrow(ctx, ge.wallX, ge.topY, ge.wallX+SL*s, ge.topY, '#5a8fa8', 3*s, 10*s);
                Draw.arrow(ctx, ge.baseX, ge.floorY, ge.baseX-FAL*s, ge.floorY, '#d4956a', 3*s, 10*s);
                Draw.label(ctx, 'N\u2081', ge.wallX+SL*s+12*s, ge.topY, '#5a8fa8', 13*s);
                Draw.label(ctx, 'Fa', ge.baseX-FAL*s-14*s, ge.floorY, '#d4956a', 13*s);
                if (p > 0.5) {
                    const pulse = 0.7 + 0.3*Math.sin(p*Math.PI*6);
                    ctx.globalAlpha = (p-0.5)*2 * pulse;
                    Draw.label(ctx, '?', w*0.72, (ge.topY+ge.floorY)/2, '#d4956a', 32*s);
                }
            }
        },

        // ---- STEP 5: Cos'è il braccio (esempio porta) ----
        {
            title: 'Cos\'è il braccio di una forza?',
            text: 'Pensa a una <b>porta</b>. Se spingi lontano dai cardini (vicino alla maniglia), la porta si apre facilmente. Se spingi vicino ai cardini, fai molta fatica. Se spingi <b>proprio sui cardini</b>, la porta non si muove!<br><br>' +
                'La distanza tra dove spingi e i cardini si chiama <span class="term" data-term="braccio">braccio</span>. Il <span class="term" data-term="momento">momento</span> di una forza è: <b>Momento = Forza &times; braccio</b>.<br><br>' +
                'Se il braccio è zero (forza applicata sul perno), il momento è zero e <b>nessuna rotazione</b>!',
            formula: 'M = F \\times b \\qquad \\text{se } b = 0 \\Rightarrow M = 0',
            cleanDraw: true,
            duration: 1800,
            draw(ctx, w, h, p) {
                const s = Draw.S(w, h);
                ctx.fillStyle = '#faf8f5'; ctx.fillRect(0, 0, w, h);
                // Barra orizzontale centrata
                const barY = h * 0.42;
                const barL = w * 0.12, barR = w * 0.88;
                const pivX = barL;

                ctx.globalAlpha = p;
                // Barra
                ctx.strokeStyle = '#8b6e4e'; ctx.lineWidth = 6*s; ctx.lineCap = 'round';
                ctx.beginPath(); ctx.moveTo(barL, barY); ctx.lineTo(barR, barY); ctx.stroke();
                // Perno triangolo
                ctx.fillStyle = '#d4956a';
                ctx.beginPath();
                ctx.moveTo(pivX, barY+4*s); ctx.lineTo(pivX-10*s, barY+22*s); ctx.lineTo(pivX+10*s, barY+22*s);
                ctx.closePath(); ctx.fill();
                Draw.label(ctx, 'cardini / perno', pivX+2*s, barY+34*s, '#d4956a', 10*s);

                // 1. Forza lontana (braccio grande)
                if (p > 0.15) {
                    const fp = Math.min(1, (p-0.15)/0.25);
                    ctx.globalAlpha = fp;
                    const fX = barR - 20*s;
                    Draw.animatedArrow(ctx, fX, barY-2*s, fX, barY-45*s, '#5a9a6a', fp, 3*s, 10*s);
                    Draw.label(ctx, 'Spingi qui:', fX, barY-55*s, '#5a9a6a', 10*s, false);
                    Draw.label(ctx, 'FACILE!', fX, barY-68*s, '#5a9a6a', 11*s);
                    // Braccio
                    ctx.strokeStyle = '#5a9a6a'; ctx.lineWidth = 1.5*s;
                    ctx.setLineDash([4*s, 3*s]);
                    ctx.beginPath(); ctx.moveTo(pivX, barY+42*s); ctx.lineTo(fX, barY+42*s); ctx.stroke();
                    ctx.setLineDash([]);
                    Draw.label(ctx, 'braccio grande \u2192 momento grande', (pivX+fX)/2, barY+56*s, '#5a9a6a', 9*s, false);
                }

                // 2. Forza sul perno (braccio = 0)
                if (p > 0.55) {
                    const fp = Math.min(1, (p-0.55)/0.3);
                    ctx.globalAlpha = fp;
                    Draw.animatedArrow(ctx, pivX, barY-2*s, pivX, barY-45*s, '#c44', fp, 3*s, 10*s);
                    Draw.label(ctx, 'Spingi qui:', pivX+2*s, barY-55*s, '#c44', 10*s, false);
                    Draw.label(ctx, 'NON GIRA!', pivX+2*s, barY-68*s, '#c44', 11*s);
                    // Box braccio = 0
                    Draw.roundRect(ctx, pivX-45*s, barY+65*s, 90*s, 24*s, 5*s, '#fef3ee');
                    ctx.strokeStyle = '#c44'; ctx.lineWidth = 1.5*s;
                    ctx.strokeRect(pivX-45*s, barY+65*s, 90*s, 24*s);
                    Draw.label(ctx, 'braccio = 0 \u2192 M = 0', pivX, barY+77*s, '#c44', 9*s);
                }
            }
        },

        // ---- STEP 6: Applichiamo alla scala ----
        {
            title: 'Applichiamo alla scala',
            text: 'Scegliamo il <span class="term" data-term="perno">perno</span> nel <span class="highlight">piede della scala</span> (dove tocca il pavimento). Ora guardiamo ogni forza:<br><br>' +
                '&bull; <b style="color:#5a9a6a">N<sub>2</sub></b> parte dal piede &rarr; passa per il perno &rarr; <span class="highlight">braccio = 0</span><br>' +
                '&bull; <b style="color:#d4956a">F<sub>a</sub></b> parte dal piede &rarr; passa per il perno &rarr; <span class="highlight">braccio = 0</span><br>' +
                '&bull; <b style="color:#c46b60">F<sub>P</sub></b> è al centro &rarr; <b>lontana dal perno</b> &rarr; braccio = b/2<br>' +
                '&bull; <b style="color:#5a8fa8">N<sub>1</sub></b> è in cima &rarr; <b>lontana dal perno</b> &rarr; braccio = h<br><br>' +
                'Due forze spariscono dal bilancio. Ne restano due: possiamo risolvere!',
            formula: 'M_{N_2} = 0 \\quad M_{F_a} = 0 \\quad \\text{(passano per il perno!)}',
            cleanDraw: true,
            duration: 2000,
            draw(ctx, w, h, p) {
                drawScene(ctx, w, h);
                drawLadder(ctx, w, h, 1);
                const ge = geo(w, h), s = ge.s;

                // Perno
                ctx.globalAlpha = p;
                const pulse = 8 + 3*Math.sin(p*Math.PI*3);
                Draw.circle(ctx, ge.baseX, ge.floorY, pulse*s, 'rgba(212,149,106,0.15)', '#d4956a', 2.5*s);
                Draw.label(ctx, 'PERNO', ge.baseX+50*s, ge.floorY-24*s, '#d4956a', 12*s);

                // Fase 1: N2 (braccio = 0)
                if (p > 0.05) {
                    const fp = Math.min(1, (p-0.05)/0.2);
                    ctx.globalAlpha = fp * 0.4;
                    Draw.arrow(ctx, ge.baseX, ge.floorY, ge.baseX, ge.floorY-AL*s, '#999', 2*s, 8*s);
                    ctx.globalAlpha = fp;
                    Draw.label(ctx, 'N\u2082', ge.baseX-18*s, ge.floorY-35*s, '#999', 11*s);
                    if (fp > 0.5) {
                        ctx.globalAlpha = (fp-0.5)*2;
                        Draw.label(ctx, '\u2717 b=0', ge.baseX-18*s, ge.floorY-55*s, '#c44', 9*s);
                    }
                }

                // Fase 2: Fa (braccio = 0)
                if (p > 0.2) {
                    const fp = Math.min(1, (p-0.2)/0.2);
                    ctx.globalAlpha = fp * 0.4;
                    Draw.arrow(ctx, ge.baseX, ge.floorY, ge.baseX-FAL*s, ge.floorY, '#999', 2*s, 8*s);
                    ctx.globalAlpha = fp;
                    Draw.label(ctx, 'Fa', ge.baseX-FAL*s-10*s, ge.floorY+14*s, '#999', 11*s);
                    if (fp > 0.5) {
                        ctx.globalAlpha = (fp-0.5)*2;
                        Draw.label(ctx, '\u2717 b=0', ge.baseX-FAL*s-10*s, ge.floorY+28*s, '#c44', 9*s);
                    }
                }

                // Fase 3: Fp con braccio b/2
                if (p > 0.4) {
                    const fp = Math.min(1, (p-0.4)/0.25);
                    ctx.globalAlpha = fp;
                    Draw.arrow(ctx, ge.midX, ge.midY, ge.midX, ge.midY+AL*s, '#c46b60', 3*s, 10*s);
                    Draw.label(ctx, 'Fp', ge.midX+16*s, ge.midY+AL*s*0.5, '#c46b60', 12*s);
                    Draw.circle(ctx, ge.midX, ge.midY, 4*s, '#c46b60', null);
                    // Braccio b/2
                    Draw.dashedLine(ctx, ge.baseX, ge.floorY+22*s, ge.midX, ge.floorY+22*s, '#c46b60', 2*s);
                    Draw.dashedLine(ctx, ge.midX, ge.midY+AL*s, ge.midX, ge.floorY+22*s, 'rgba(196,107,96,0.25)', 1*s);
                    if (fp > 0.4) Draw.label(ctx, 'b/2', (ge.baseX+ge.midX)/2, ge.floorY+36*s, '#c46b60', 10*s);
                }

                // Fase 4: N1 con braccio h
                if (p > 0.65) {
                    const fp = Math.min(1, (p-0.65)/0.25);
                    ctx.globalAlpha = fp;
                    Draw.arrow(ctx, ge.wallX, ge.topY, ge.wallX+SL*s, ge.topY, '#5a8fa8', 3*s, 10*s);
                    Draw.label(ctx, 'N\u2081', ge.wallX+SL*s+10*s, ge.topY-11*s, '#5a8fa8', 12*s);
                    // Braccio h
                    Draw.dashedLine(ctx, ge.wallX-18*s, ge.floorY, ge.wallX-18*s, ge.topY, '#5a8fa8', 2*s);
                    Draw.dashedLine(ctx, ge.wallX, ge.topY, ge.wallX-18*s, ge.topY, 'rgba(90,143,168,0.25)', 1*s);
                    if (fp > 0.4) Draw.label(ctx, 'h', ge.wallX-32*s, (ge.topY+ge.floorY)/2, '#5a8fa8', 10*s);
                }
            }
        },

        // ---- STEP 7: Calcolo ----
        {
            title: 'I momenti si bilanciano',
            text: 'F<sub>P</sub> farebbe ruotare la scala in senso <b>orario</b> (cade verso destra). N<sub>1</sub> la farebbe ruotare in senso <b>antiorario</b> (la spinge verso sinistra).<br><br>' +
                'In equilibrio i due momenti sono uguali:<br><br>' +
                '<b>F<sub>P</sub> &times; b/2 = N<sub>1</sub> &times; h</b><br><br>' +
                'Risolviamo per N<sub>1</sub>:',
            formula: 'N_1 = \\frac{F_P \\cdot b}{2h} = \\frac{159{,}25 \\times 4{,}47}{2 \\times 4} = \\frac{711{,}8}{8} \\approx \\boxed{89{,}0 \\text{ N}}',
            cleanDraw: true,
            draw(ctx, w, h, p) {
                // Scena pulita con scala
                drawScene(ctx, w, h);
                drawLadder(ctx, w, h, 1);

                const ge = geo(w, h), s = ge.s;

                // Perno (piccolo, come riferimento)
                ctx.globalAlpha = 0.5;
                Draw.circle(ctx, ge.baseX, ge.floorY, 6*s, 'rgba(212,149,106,0.2)', '#d4956a', 1.5*s);

                // Fp con braccio
                ctx.globalAlpha = p;
                Draw.arrow(ctx, ge.midX, ge.midY, ge.midX, ge.midY+AL*s, '#c46b60', 2.5*s, 9*s);
                Draw.label(ctx, 'Fp', ge.midX+16*s, ge.midY+AL*s*0.5, '#c46b60', 12*s);
                Draw.dashedLine(ctx, ge.baseX, ge.floorY+22*s, ge.midX, ge.floorY+22*s, '#c46b60', 1.5*s);
                Draw.label(ctx, 'b/2', (ge.baseX+ge.midX)/2, ge.floorY+36*s, '#c46b60', 9*s);

                // N1 con braccio
                Draw.arrow(ctx, ge.wallX, ge.topY, ge.wallX+SL*s, ge.topY, '#5a8fa8', 2.5*s, 9*s);
                Draw.label(ctx, 'N\u2081', ge.wallX+SL*s+10*s, ge.topY-11*s, '#5a8fa8', 12*s);
                Draw.dashedLine(ctx, ge.wallX-16*s, ge.floorY, ge.wallX-16*s, ge.topY, '#5a8fa8', 1.5*s);
                Draw.label(ctx, 'h', ge.wallX-30*s, (ge.topY+ge.floorY)/2, '#5a8fa8', 9*s);

                // Arco orario su Fp
                if (p > 0.2) {
                    ctx.globalAlpha = Math.min(1, (p-0.2)/0.3);
                    Draw.arc(ctx, ge.midX, ge.midY+25*s, 18*s, -0.3, Math.PI+0.3, '#c46b60', 2*s);
                    Draw.label(ctx, '\u21BB', ge.midX+26*s, ge.midY+28*s, '#c46b60', 14*s);
                }
                // Arco antiorario su N1
                if (p > 0.5) {
                    ctx.globalAlpha = Math.min(1, (p-0.5)/0.3);
                    Draw.arc(ctx, ge.wallX+25*s, ge.topY, 16*s, -Math.PI/2-0.3, Math.PI/2+0.3, '#5a8fa8', 2*s);
                    Draw.label(ctx, '\u21BA', ge.wallX+48*s, ge.topY, '#5a8fa8', 14*s);
                }
                // Segno =
                if (p > 0.7) {
                    ctx.globalAlpha = (p-0.7)/0.3;
                    const eqX = (ge.midX+ge.wallX+25*s)/2;
                    const eqY = (ge.midY+25*s+ge.topY)/2;
                    Draw.label(ctx, '=', eqX, eqY, '#2e2e2e', 22*s);
                }
            }
        },

        // ---- STEP 8: Riepilogo ----
        {
            title: 'Riepilogo',
            text: '<b>I risultati:</b><br>' +
                '&bull; <b>N<sub>2</sub> = 159,25 N</b> (dal bilancio verticale)<br>' +
                '&bull; <b>N<sub>1</sub> = 89,0 N</b> (dal bilancio dei momenti)<br>' +
                '&bull; <b>F<sub>a</sub> = 89,0 N</b> (dal bilancio orizzontale: F<sub>a</sub> = N<sub>1</sub>)<br><br>' +
                '<b>Perché F<sub>a</sub> non compare nei <span class="term" data-term="momento">momenti</span>?</b><br>Parte dal <span class="term" data-term="perno">perno</span> &rarr; <span class="term" data-term="braccio">braccio</span> = 0 &rarr; momento = 0.<br><br>' +
                '<b>Cosa abbiamo imparato:</b><br>' +
                '1. Momento = forza &times; braccio<br>' +
                '2. Se il braccio è zero, il momento è zero<br>' +
                '3. Scegliere il perno giusto semplifica i calcoli',
            formula: 'N_2 = 159{,}25 \\text{ N} \\quad N_1 = F_a \\approx 89{,}0 \\text{ N}',
            cleanDraw: true,
            draw(ctx, w, h, p) {
                drawScene(ctx, w, h);
                drawLadder(ctx, w, h, 1);
                drawAllForces(ctx, w, h, p);
                const ge = geo(w, h), s = ge.s;
                if (p > 0.5) {
                    const cx = w/2, cy = 22*s;
                    ctx.globalAlpha = (p-0.5)*2;
                    Draw.roundRect(ctx, cx-80*s, cy-11*s, 160*s, 28*s, 6*s, '#e4f2e7');
                    ctx.strokeStyle = '#81c784'; ctx.lineWidth = 1.2*s;
                    ctx.strokeRect(cx-80*s, cy-11*s, 160*s, 28*s);
                    Draw.label(ctx, 'Equilibrio verificato!', cx, cy+3*s, '#3d8b44', 13*s);
                }
            }
        }
    ];

    return { steps, statement };
})();
