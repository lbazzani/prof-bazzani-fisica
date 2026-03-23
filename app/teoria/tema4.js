// ===== Tema 4: Impulso e quantita di moto =====

const Tema4 = (() => {
    const steps = [
        // ---- Step 1: La quantita di moto ----
        {
            title: 'La quantita di moto',
            text: 'Un camion che viaggia piano e un proiettile velocissimo possono avere lo stesso effetto in un urto. Come e possibile?<br><br>' +
                'La risposta e la <span class="term" data-term="quantita-di-moto">quantita di moto</span>: una grandezza che combina <span class="term" data-term="massa">massa</span> e <span class="term" data-term="velocita">velocita</span>. Un oggetto molto pesante ma lento puo avere la stessa quantita di moto di uno leggero ma velocissimo.<br><br>' +
                'La formula e: <span class="highlight">p = m &times; v</span>. Si misura in <b>kg&middot;m/s</b>. E un <b>vettore</b>: ha direzione e verso!',
            formula: '\\vec{p} = m \\cdot \\vec{v} \\quad [\\text{kg} \\cdot \\text{m/s}]',
            cleanDraw: true,
            duration: 1200,
            draw(ctx, w, h, p) {
                const s = Draw.S(w, h);
                ctx.fillStyle = '#faf8f5';
                ctx.fillRect(0, 0, w, h);

                const topY = h * 0.3;
                const botY = h * 0.68;

                // --- Truck (big, slow) ---
                if (p > 0.05) {
                    const fp = Math.min(1, (p - 0.05) / 0.4);
                    const truckX = 70 * s;
                    const truckY = topY;
                    const truckW = 110 * s;
                    const truckH = 55 * s;

                    ctx.globalAlpha = fp;
                    // Truck body
                    Draw.roundRect(ctx, truckX, truckY - truckH / 2, truckW, truckH, 5 * s, '#5a8fa8');
                    // Cabin
                    Draw.roundRect(ctx, truckX + truckW - 5 * s, truckY - truckH / 2 + 8 * s, 32 * s, truckH - 8 * s, 4 * s, '#4a7d94');
                    // Window
                    Draw.roundRect(ctx, truckX + truckW + 2 * s, truckY - truckH / 2 + 12 * s, 22 * s, 18 * s, 3 * s, '#9cc5d8');
                    // Wheels
                    Draw.circle(ctx, truckX + 22 * s, truckY + truckH / 2, 9 * s, '#555', '#444', 1.5 * s);
                    Draw.circle(ctx, truckX + truckW - 10 * s, truckY + truckH / 2, 9 * s, '#555', '#444', 1.5 * s);

                    Draw.label(ctx, 'm = 2000 kg', truckX + truckW / 2, truckY - 2 * s, '#fff', 10 * s);

                    // Slow velocity arrow (short)
                    Draw.animatedArrow(ctx, truckX + truckW + 35 * s, truckY, truckX + truckW + 75 * s, truckY, '#c46b60', fp, 2.5 * s, 9 * s);
                    if (fp > 0.5) Draw.label(ctx, 'v = 1 m/s', truckX + truckW + 90 * s, truckY - 12 * s, '#c46b60', 10 * s, false);

                    ctx.globalAlpha = 1;
                }

                // --- Bullet (tiny, fast) ---
                if (p > 0.3) {
                    const fp = Math.min(1, (p - 0.3) / 0.35);
                    const bulletX = 100 * s;
                    const bulletY = botY;

                    ctx.globalAlpha = fp;
                    // Bullet body (small elongated shape)
                    Draw.roundRect(ctx, bulletX - 10 * s, bulletY - 5 * s, 24 * s, 10 * s, 4 * s, '#d4956a');
                    // Bullet tip
                    ctx.fillStyle = '#c0844a';
                    ctx.beginPath();
                    ctx.moveTo(bulletX + 14 * s, bulletY - 5 * s);
                    ctx.lineTo(bulletX + 24 * s, bulletY);
                    ctx.lineTo(bulletX + 14 * s, bulletY + 5 * s);
                    ctx.closePath();
                    ctx.fill();

                    Draw.label(ctx, 'm = 0.01 kg', bulletX + 5 * s, bulletY - 18 * s, '#d4956a', 10 * s, false);

                    // Fast velocity arrow (very long)
                    Draw.animatedArrow(ctx, bulletX + 28 * s, bulletY, bulletX + 200 * s, bulletY, '#c46b60', fp, 2.5 * s, 9 * s);
                    if (fp > 0.5) Draw.label(ctx, 'v = 200000 m/s', bulletX + 160 * s, bulletY - 12 * s, '#c46b60', 10 * s, false);

                    ctx.globalAlpha = 1;
                }

                // Same momentum box
                if (p > 0.65) {
                    const ep = (p - 0.65) / 0.35;
                    ctx.globalAlpha = ep;

                    const bx = w * 0.72;
                    const by = h * 0.48;
                    Draw.roundRect(ctx, bx - 80 * s, by - 28 * s, 160 * s, 56 * s, 6 * s, '#e4f2e7');
                    ctx.strokeStyle = '#81c784';
                    ctx.lineWidth = 1.5 * s;
                    ctx.strokeRect(bx - 80 * s, by - 28 * s, 160 * s, 56 * s);
                    Draw.label(ctx, 'p = 2000 kg\u00b7m/s', bx, by - 10 * s, '#3d8b44', 11 * s);
                    Draw.label(ctx, 'p = 2000 kg\u00b7m/s', bx, by + 10 * s, '#3d8b44', 11 * s);
                    Draw.label(ctx, 'Stessa p!', bx, by + 28 * s, '#5a9a6a', 10 * s, false);

                    // Equal sign connecting them
                    Draw.label(ctx, '=', bx - 90 * s, by, '#5a9a6a', 22 * s);

                    ctx.globalAlpha = 1;
                }
            }
        },

        // ---- Step 2: L'impulso ----
        {
            title: 'L\'impulso',
            text: 'Per cambiare la <span class="term" data-term="quantita-di-moto">quantita di moto</span> di un oggetto devi applicare una <span class="term" data-term="forza">forza</span> per un certo tempo. Questo prodotto si chiama <span class="term" data-term="impulso">impulso</span>.<br><br>' +
                'Un calcio breve e potente da lo stesso impulso di una spinta dolce e prolungata: conta il prodotto <span class="highlight">I = F &times; &Delta;t</span>.<br><br>' +
                'L\'unita di misura e <b>N&middot;s</b> (newton per <span class="term" data-term="secondo">secondo</span>), equivalente a kg&middot;m/s.',
            formula: 'I = F \\times \\Delta t \\quad [\\text{N} \\cdot \\text{s}]',
            cleanDraw: true,
            duration: 1200,
            draw(ctx, w, h, p) {
                const s = Draw.S(w, h);
                ctx.fillStyle = '#faf8f5';
                ctx.fillRect(0, 0, w, h);

                const groundY = h * 0.72;

                // Ground
                ctx.strokeStyle = '#d0c8bb';
                ctx.lineWidth = 1.5 * s;
                ctx.beginPath();
                ctx.moveTo(20 * s, groundY);
                ctx.lineTo(w - 20 * s, groundY);
                ctx.stroke();

                // Ball
                const ballX = w * 0.38;
                const ballY = groundY - 18 * s;
                Draw.circle(ctx, ballX, ballY, 18 * s, '#d4956a', '#c0844a', 2 * s);
                // Ball pattern
                Draw.arc(ctx, ballX, ballY, 12 * s, 0.3, 2.8, '#c0844a', 1 * s);

                // Foot/shoe kicking (left side)
                if (p > 0.05) {
                    const fp = Math.min(1, (p - 0.05) / 0.35);
                    const footX = ballX - 30 * s - (1 - fp) * 30 * s;
                    const footY = ballY + 2 * s;

                    ctx.globalAlpha = fp;
                    // Shoe
                    Draw.roundRect(ctx, footX - 30 * s, footY - 10 * s, 35 * s, 20 * s, 4 * s, '#5a8fa8');
                    // Leg hint
                    ctx.strokeStyle = '#4a7d94';
                    ctx.lineWidth = 8 * s;
                    ctx.lineCap = 'round';
                    ctx.beginPath();
                    ctx.moveTo(footX - 30 * s, footY);
                    ctx.lineTo(footX - 55 * s, footY - 50 * s);
                    ctx.stroke();

                    // Force arrow
                    Draw.animatedArrow(ctx, footX + 4 * s, footY, ballX - 20 * s, footY, '#c46b60', fp, 3 * s, 10 * s);
                    if (fp > 0.6) Draw.label(ctx, 'F', (footX + ballX) / 2 - 10 * s, footY - 16 * s, '#c46b60', 14 * s);

                    ctx.globalAlpha = 1;
                }

                // Ball flying after kick
                if (p > 0.4) {
                    const fp = Math.min(1, (p - 0.4) / 0.3);
                    const flyX = ballX + fp * 120 * s;
                    ctx.globalAlpha = fp * 0.5;
                    Draw.circle(ctx, flyX, ballY - fp * 25 * s, 18 * s, null, '#d4956a', 1.5 * s);
                    Draw.animatedArrow(ctx, flyX + 20 * s, ballY - fp * 25 * s, flyX + 60 * s, ballY - fp * 25 * s - 10 * s, '#5a9a6a', fp, 2 * s, 8 * s);
                    ctx.globalAlpha = 1;
                }

                // Comparison: short strong vs long gentle
                if (p > 0.5) {
                    const cp = Math.min(1, (p - 0.5) / 0.35);
                    ctx.globalAlpha = cp;

                    const boxX = w * 0.14;
                    const boxY = h * 0.18;

                    // Short strong kick
                    Draw.roundRect(ctx, boxX - 5 * s, boxY - 10 * s, 130 * s, 28 * s, 5 * s, 'rgba(196,107,96,0.12)');
                    Draw.arrow(ctx, boxX, boxY + 4 * s, boxX + 40 * s, boxY + 4 * s, '#c46b60', 3.5 * s, 10 * s);
                    Draw.label(ctx, 'F grande, \u0394t piccolo', boxX + 90 * s, boxY + 4 * s, '#c46b60', 9 * s, false);

                    // Long gentle push
                    const boxY2 = boxY + 36 * s;
                    Draw.roundRect(ctx, boxX - 5 * s, boxY2 - 10 * s, 130 * s, 28 * s, 5 * s, 'rgba(90,159,104,0.12)');
                    Draw.arrow(ctx, boxX, boxY2 + 4 * s, boxX + 22 * s, boxY2 + 4 * s, '#5a9a6a', 2 * s, 7 * s);
                    Draw.label(ctx, 'F piccola, \u0394t grande', boxX + 90 * s, boxY2 + 4 * s, '#5a9a6a', 9 * s, false);

                    // Same result
                    if (p > 0.75) {
                        const sp = (p - 0.75) / 0.25;
                        ctx.globalAlpha = sp;
                        Draw.label(ctx, 'Stesso impulso!', boxX + 60 * s, boxY2 + 30 * s, '#2e2e2e', 11 * s);
                    }

                    ctx.globalAlpha = 1;
                }
            }
        },

        // ---- Step 3: Impulso = variazione di qdm ----
        {
            title: 'Impulso = variazione di qdm',
            text: 'Ecco il collegamento fondamentale: l\'<span class="term" data-term="impulso">impulso</span> che dai a un oggetto e <b>uguale</b> alla variazione della sua <span class="term" data-term="quantita-di-moto">quantita di moto</span>.<br><br>' +
                'Se una palla ferma riceve un calcio e parte a velocita v, l\'impulso e esattamente <span class="highlight">I = &Delta;p = p<sub>f</sub> &minus; p<sub>i</sub></span>.<br><br>' +
                'Questo e il <b>teorema dell\'impulso</b>: lega la causa (forza nel tempo) all\'effetto (cambio di moto).',
            formula: 'I = \\Delta p = p_f - p_i = m v_f - m v_i',
            cleanDraw: true,
            duration: 1200,
            draw(ctx, w, h, p) {
                const s = Draw.S(w, h);
                ctx.fillStyle = '#faf8f5';
                ctx.fillRect(0, 0, w, h);

                const cy = h * 0.5;
                const phaseW = w * 0.38;

                // --- BEFORE: ball at rest ---
                const beforeX = w * 0.18;
                if (p > 0.05) {
                    const fp = Math.min(1, (p - 0.05) / 0.25);
                    ctx.globalAlpha = fp;

                    Draw.circle(ctx, beforeX, cy, 22 * s, '#5a8fa8', '#3a6f88', 2 * s);
                    Draw.label(ctx, 'v = 0', beforeX, cy + 36 * s, '#888', 11 * s);
                    Draw.label(ctx, 'PRIMA', beforeX, cy - 38 * s, '#2e2e2e', 12 * s);

                    // p_i = 0
                    Draw.label(ctx, 'p\u1d62 = 0', beforeX, cy + 54 * s, '#5a8fa8', 11 * s);

                    ctx.globalAlpha = 1;
                }

                // --- Arrow showing impulse (middle) ---
                const midX = w * 0.42;
                if (p > 0.25) {
                    const fp = Math.min(1, (p - 0.25) / 0.3);
                    ctx.globalAlpha = fp;

                    // Big impulse arrow
                    Draw.animatedArrow(ctx, midX - 30 * s, cy, midX + 30 * s, cy, '#d4956a', fp, 4 * s, 12 * s);

                    // Impulse label
                    Draw.roundRect(ctx, midX - 40 * s, cy - 38 * s, 80 * s, 26 * s, 5 * s, '#fef3ee');
                    ctx.strokeStyle = '#d4956a';
                    ctx.lineWidth = 1.2 * s;
                    ctx.strokeRect(midX - 40 * s, cy - 38 * s, 80 * s, 26 * s);
                    Draw.label(ctx, 'Impulso I', midX, cy - 25 * s, '#d4956a', 12 * s);

                    ctx.globalAlpha = 1;
                }

                // --- AFTER: ball moving fast ---
                const afterX = w * 0.72;
                if (p > 0.45) {
                    const fp = Math.min(1, (p - 0.45) / 0.3);
                    ctx.globalAlpha = fp;

                    Draw.circle(ctx, afterX, cy, 22 * s, '#5a8fa8', '#3a6f88', 2 * s);
                    Draw.label(ctx, 'DOPO', afterX, cy - 38 * s, '#2e2e2e', 12 * s);

                    // Velocity arrow (fast)
                    Draw.animatedArrow(ctx, afterX + 26 * s, cy, afterX + 90 * s, cy, '#c46b60', fp, 3 * s, 10 * s);
                    Draw.label(ctx, 'v', afterX + 70 * s, cy - 14 * s, '#c46b60', 14 * s);

                    // p_f = mv
                    Draw.label(ctx, 'p\u1da0 = mv', afterX, cy + 54 * s, '#5a8fa8', 11 * s);

                    ctx.globalAlpha = 1;
                }

                // Result: I = delta p
                if (p > 0.7) {
                    const rp = (p - 0.7) / 0.3;
                    ctx.globalAlpha = rp;

                    const bx = w * 0.5;
                    const by = h * 0.88;
                    Draw.roundRect(ctx, bx - 110 * s, by - 14 * s, 220 * s, 30 * s, 6 * s, '#e4f2e7');
                    ctx.strokeStyle = '#81c784';
                    ctx.lineWidth = 1.5 * s;
                    ctx.strokeRect(bx - 110 * s, by - 14 * s, 220 * s, 30 * s);
                    Draw.label(ctx, 'I = \u0394p = mv \u2212 0 = mv', bx, by + 2 * s, '#3d8b44', 12 * s);

                    ctx.globalAlpha = 1;
                }
            }
        },

        // ---- Step 4: La conservazione ----
        {
            title: 'La conservazione',
            text: 'Ecco una legge potentissima: se due oggetti interagiscono <b>senza forze esterne</b>, la <span class="term" data-term="conservazione-qdm">quantita di moto totale si conserva</span>.<br><br>' +
                'Due pattinatori fermi si spingono l\'un l\'altro: uno va a sinistra, l\'altro a destra. La quantita di moto totale era <span class="highlight">zero prima</span> e resta <span class="highlight">zero dopo</span>!<br><br>' +
                'Le due quantita di moto sono <b>uguali e opposte</b>: si annullano a vicenda.',
            formula: 'p_{\\text{tot,prima}} = p_{\\text{tot,dopo}} = 0',
            cleanDraw: true,
            duration: 1400,
            draw(ctx, w, h, p) {
                const s = Draw.S(w, h);
                ctx.fillStyle = '#faf8f5';
                ctx.fillRect(0, 0, w, h);

                const iceY = h * 0.72;

                // Ice surface
                ctx.fillStyle = '#e8f0f4';
                ctx.fillRect(20 * s, iceY, w - 40 * s, h - iceY - 10 * s);
                ctx.strokeStyle = '#b0ccd8';
                ctx.lineWidth = 1.5 * s;
                ctx.beginPath();
                ctx.moveTo(20 * s, iceY);
                ctx.lineTo(w - 20 * s, iceY);
                ctx.stroke();

                const centerX = w * 0.5;
                const skaterY = iceY - 5 * s;

                // Phase 1: both still in center
                // Phase 2: push apart
                const pushPhase = Math.max(0, Math.min(1, (p - 0.35) / 0.45));

                // Skater A (left, bigger)
                const aX = centerX - 25 * s - pushPhase * 120 * s;
                const aBodyH = 60 * s;
                ctx.globalAlpha = Math.min(1, p / 0.2);
                // Body
                Draw.roundRect(ctx, aX - 16 * s, skaterY - aBodyH, 32 * s, aBodyH, 5 * s, '#c46b60');
                // Head
                Draw.circle(ctx, aX, skaterY - aBodyH - 12 * s, 12 * s, '#c46b60', null);
                // Skate
                ctx.strokeStyle = '#888';
                ctx.lineWidth = 2 * s;
                ctx.beginPath();
                ctx.moveTo(aX - 14 * s, skaterY);
                ctx.lineTo(aX + 14 * s, skaterY);
                ctx.stroke();
                Draw.label(ctx, 'm\u2081', aX, skaterY - aBodyH / 2, '#fff', 10 * s);
                ctx.globalAlpha = 1;

                // Skater B (right, smaller)
                const bX = centerX + 25 * s + pushPhase * 120 * s;
                const bBodyH = 45 * s;
                ctx.globalAlpha = Math.min(1, p / 0.2);
                Draw.roundRect(ctx, bX - 12 * s, skaterY - bBodyH, 24 * s, bBodyH, 4 * s, '#5a8fa8');
                Draw.circle(ctx, bX, skaterY - bBodyH - 10 * s, 10 * s, '#5a8fa8', null);
                ctx.strokeStyle = '#888';
                ctx.lineWidth = 2 * s;
                ctx.beginPath();
                ctx.moveTo(bX - 12 * s, skaterY);
                ctx.lineTo(bX + 12 * s, skaterY);
                ctx.stroke();
                Draw.label(ctx, 'm\u2082', bX, skaterY - bBodyH / 2, '#fff', 10 * s);
                ctx.globalAlpha = 1;

                // Hands pushing (before separation)
                if (pushPhase < 0.3 && p > 0.15) {
                    ctx.globalAlpha = Math.min(1, p / 0.3) * (1 - pushPhase / 0.3);
                    // Hands meeting in center
                    ctx.strokeStyle = '#888';
                    ctx.lineWidth = 3 * s;
                    ctx.beginPath();
                    ctx.moveTo(aX + 16 * s, skaterY - aBodyH * 0.6);
                    ctx.lineTo(centerX, skaterY - aBodyH * 0.55);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(bX - 12 * s, skaterY - bBodyH * 0.6);
                    ctx.lineTo(centerX, skaterY - aBodyH * 0.55);
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }

                // Velocity arrows after push
                if (pushPhase > 0.3) {
                    const vp = Math.min(1, (pushPhase - 0.3) / 0.5);
                    ctx.globalAlpha = vp;

                    // A goes left
                    Draw.animatedArrow(ctx, aX - 20 * s, skaterY - aBodyH / 2, aX - 70 * s, skaterY - aBodyH / 2, '#c46b60', vp, 2.5 * s, 9 * s);
                    if (vp > 0.5) Draw.label(ctx, 'v\u2081', aX - 55 * s, skaterY - aBodyH / 2 - 14 * s, '#c46b60', 11 * s);

                    // B goes right
                    Draw.animatedArrow(ctx, bX + 16 * s, skaterY - bBodyH / 2, bX + 66 * s, skaterY - bBodyH / 2, '#5a8fa8', vp, 2.5 * s, 9 * s);
                    if (vp > 0.5) Draw.label(ctx, 'v\u2082', bX + 50 * s, skaterY - bBodyH / 2 - 14 * s, '#5a8fa8', 11 * s);

                    ctx.globalAlpha = 1;
                }

                // Labels: PRIMA / DOPO
                if (p > 0.08) {
                    ctx.globalAlpha = Math.min(1, p / 0.15) * (pushPhase < 0.1 ? 1 : Math.max(0, 1 - pushPhase));
                    Draw.label(ctx, 'PRIMA: p\u209c\u2092\u209c = 0', centerX, 25 * s, '#2e2e2e', 13 * s);
                    ctx.globalAlpha = 1;
                }

                if (pushPhase > 0.5) {
                    const lp = Math.min(1, (pushPhase - 0.5) / 0.4);
                    ctx.globalAlpha = lp;
                    Draw.roundRect(ctx, centerX - 105 * s, 12 * s, 210 * s, 32 * s, 6 * s, '#e4f2e7');
                    ctx.strokeStyle = '#81c784';
                    ctx.lineWidth = 1.5 * s;
                    ctx.strokeRect(centerX - 105 * s, 12 * s, 210 * s, 32 * s);
                    Draw.label(ctx, 'DOPO: p\u209c\u2092\u209c = 0 ancora!', centerX, 28 * s, '#3d8b44', 12 * s);
                    ctx.globalAlpha = 1;
                }
            }
        },

        // ---- Step 5: Componenti x e y ----
        {
            title: 'Componenti x e y',
            text: 'La quantita di moto e un <b>vettore</b>, quindi si conserva <span class="term" data-term="componente">componente</span> per componente: sia lungo x che lungo y, separatamente.<br><br>' +
                'In un urto 2D, puoi scrivere <b>due equazioni</b> indipendenti: <span class="highlight">p<sub>x,prima</sub> = p<sub>x,dopo</sub></span> e <span class="highlight">p<sub>y,prima</sub> = p<sub>y,dopo</sub></span>.<br><br>' +
                'Questo e utilissimo: scomponi i vettori velocita in x e y, e risolvi separatamente!',
            formula: '\\begin{cases} p_{x,\\text{prima}} = p_{x,\\text{dopo}} \\\\ p_{y,\\text{prima}} = p_{y,\\text{dopo}} \\end{cases}',
            cleanDraw: true,
            duration: 1400,
            draw(ctx, w, h, p) {
                const s = Draw.S(w, h);
                ctx.fillStyle = '#faf8f5';
                ctx.fillRect(0, 0, w, h);

                const cx = w * 0.45;
                const cy = h * 0.5;

                // Axes
                ctx.globalAlpha = Math.min(1, p / 0.15);
                Draw.arrow(ctx, cx - 160 * s, cy, cx + 160 * s, cy, '#888', 1.5 * s, 8 * s);
                Draw.arrow(ctx, cx, cy + 120 * s, cx, cy - 130 * s, '#888', 1.5 * s, 8 * s);
                Draw.label(ctx, 'x', cx + 168 * s, cy - 10 * s, '#888', 13 * s);
                Draw.label(ctx, 'y', cx + 12 * s, cy - 136 * s, '#888', 13 * s);
                ctx.globalAlpha = 1;

                // Ball A incoming (from upper left)
                const aAngle = -0.4; // slight downward angle
                if (p > 0.1) {
                    const fp = Math.min(1, (p - 0.1) / 0.3);
                    const aStartX = cx - 130 * s;
                    const aStartY = cy - 50 * s;

                    ctx.globalAlpha = fp;
                    Draw.circle(ctx, aStartX, aStartY, 14 * s, '#c46b60', '#a04a40', 2 * s);
                    Draw.label(ctx, 'A', aStartX, aStartY, '#fff', 10 * s);

                    // Velocity vector
                    const vaLen = 80 * s;
                    Draw.animatedArrow(ctx, aStartX + 16 * s, aStartY, aStartX + 16 * s + vaLen * Math.cos(aAngle), aStartY + vaLen * Math.sin(aAngle), '#c46b60', fp, 2.5 * s, 9 * s);
                    if (fp > 0.5) Draw.label(ctx, 'p\u2090', aStartX + 16 * s + vaLen * Math.cos(aAngle) + 10 * s, aStartY + vaLen * Math.sin(aAngle) - 10 * s, '#c46b60', 11 * s);

                    ctx.globalAlpha = 1;
                }

                // Decompose ball A momentum into x,y
                if (p > 0.35) {
                    const dp = Math.min(1, (p - 0.35) / 0.3);
                    const aStartX = cx - 130 * s;
                    const aStartY = cy - 50 * s;
                    const vaLen = 80 * s;
                    const tipX = aStartX + 16 * s + vaLen * Math.cos(aAngle);
                    const tipY = aStartY + vaLen * Math.sin(aAngle);

                    ctx.globalAlpha = dp * 0.7;
                    // x component (horizontal)
                    Draw.dashedLine(ctx, tipX, tipY, tipX, aStartY, '#5a8fa8', 1.2 * s);
                    Draw.dashedLine(ctx, aStartX + 16 * s, aStartY, tipX, aStartY, '#5a8fa8', 1.2 * s);
                    ctx.globalAlpha = dp;
                    Draw.animatedArrow(ctx, aStartX + 16 * s, aStartY, tipX, aStartY, '#5a8fa8', dp, 2 * s, 7 * s);
                    Draw.label(ctx, 'p\u2090\u2093', (aStartX + 16 * s + tipX) / 2, aStartY - 12 * s, '#5a8fa8', 10 * s);

                    // y component (vertical)
                    Draw.animatedArrow(ctx, tipX, aStartY, tipX, tipY, '#5a9a6a', dp, 2 * s, 7 * s);
                    Draw.label(ctx, 'p\u2090\u1d67', tipX + 14 * s, (aStartY + tipY) / 2, '#5a9a6a', 10 * s);
                    ctx.globalAlpha = 1;
                }

                // Ball B (stationary, at center) — gets hit
                if (p > 0.15) {
                    const fp = Math.min(1, (p - 0.15) / 0.2);
                    ctx.globalAlpha = fp;
                    Draw.circle(ctx, cx, cy, 14 * s, '#5a8fa8', '#3a6f88', 2 * s);
                    Draw.label(ctx, 'B', cx, cy, '#fff', 10 * s);
                    ctx.globalAlpha = 1;
                }

                // After collision: both balls go in different directions
                if (p > 0.6) {
                    const ap = Math.min(1, (p - 0.6) / 0.3);

                    // Ball A deflected (upper right)
                    const a2Angle = -0.7;
                    const a2X = cx + 60 * s;
                    const a2Y = cy - 55 * s;
                    ctx.globalAlpha = ap;
                    Draw.circle(ctx, a2X, a2Y, 12 * s, 'rgba(196,107,96,0.5)', null);
                    Draw.animatedArrow(ctx, a2X + 14 * s, a2Y, a2X + 14 * s + 55 * s * Math.cos(a2Angle), a2Y + 55 * s * Math.sin(a2Angle), '#c46b60', ap, 2 * s, 8 * s);

                    // Ball B moves (lower right)
                    const b2Angle = 0.5;
                    const b2X = cx + 50 * s;
                    const b2Y = cy + 45 * s;
                    Draw.circle(ctx, b2X, b2Y, 12 * s, 'rgba(90,143,168,0.5)', null);
                    Draw.animatedArrow(ctx, b2X + 14 * s, b2Y, b2X + 14 * s + 55 * s * Math.cos(b2Angle), b2Y + 55 * s * Math.sin(b2Angle), '#5a8fa8', ap, 2 * s, 8 * s);

                    // Labels
                    if (ap > 0.5) {
                        Draw.label(ctx, 'p\'A', a2X + 14 * s + 55 * s * Math.cos(a2Angle) + 12 * s, a2Y + 55 * s * Math.sin(a2Angle), '#c46b60', 10 * s);
                        Draw.label(ctx, 'p\'B', b2X + 14 * s + 55 * s * Math.cos(b2Angle) + 12 * s, b2Y + 55 * s * Math.sin(b2Angle), '#5a8fa8', 10 * s);
                    }
                    ctx.globalAlpha = 1;
                }

                // Conservation box
                if (p > 0.8) {
                    const rp = (p - 0.8) / 0.2;
                    ctx.globalAlpha = rp;

                    const bx = w * 0.82;
                    const by = h * 0.2;
                    Draw.roundRect(ctx, bx - 65 * s, by - 28 * s, 130 * s, 60 * s, 6 * s, '#e4f2e7');
                    ctx.strokeStyle = '#81c784';
                    ctx.lineWidth = 1.5 * s;
                    ctx.strokeRect(bx - 65 * s, by - 28 * s, 130 * s, 60 * s);
                    Draw.label(ctx, '\u03A3p\u2093 = cost.', bx, by - 10 * s, '#3d8b44', 11 * s);
                    Draw.label(ctx, '\u03A3p\u1d67 = cost.', bx, by + 10 * s, '#3d8b44', 11 * s);

                    ctx.globalAlpha = 1;
                }
            }
        }
    ];

    return { steps };
})();
