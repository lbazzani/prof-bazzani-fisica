// ===== Tema 3: I momenti delle forze =====

const Tema3 = (() => {
    const steps = [
        // ---- Step 1: Cos'e la rotazione? ----
        {
            title: "Cos'e la rotazione?",
            text: 'Prova a spingere una porta vicino ai <b>cardini</b>: fatichi tantissimo! Spingila dalla maniglia, lontano dai cardini, e si apre con facilita.<br><br>' +
                'Questo accade perche per far <b>ruotare</b> un oggetto non basta una <span class="term" data-term="forza">forza</span>: conta anche <b>dove</b> la applichi. La grandezza che misura l\'effetto rotatorio di una forza si chiama <span class="term" data-term="momento">momento</span> della forza.<br><br>' +
                '<b>Regola pratica:</b> piu sei lontano dal perno, meno forza ti serve per ottenere lo stesso effetto.',
            formula: null,
            cleanDraw: true,
            duration: 1200,
            draw(ctx, w, h, p) {
                const s = Draw.S(w, h);
                ctx.fillStyle = '#faf8f5';
                ctx.fillRect(0, 0, w, h);

                // Vista dall'alto: porta orizzontale, cardini a sinistra
                // La porta è una barra orizzontale. Spingi verso il basso = apri la porta.
                const hingeX = w * 0.15;
                const doorY = h * 0.38;
                const doorLen = w * 0.7;
                const doorThick = 12 * s;

                // Muro (verticale a sinistra dei cardini)
                ctx.fillStyle = '#d5ccba';
                ctx.fillRect(hingeX - 8*s, doorY - 60*s, 10*s, 120*s + doorThick);
                ctx.strokeStyle = '#b0a594'; ctx.lineWidth = 1.5*s;
                ctx.beginPath(); ctx.moveTo(hingeX + 2*s, doorY - 60*s); ctx.lineTo(hingeX + 2*s, doorY + 60*s + doorThick); ctx.stroke();

                // Porta (barra orizzontale)
                ctx.globalAlpha = Math.min(1, p * 3);
                Draw.roundRect(ctx, hingeX, doorY, doorLen, doorThick, 3*s, '#e8ddd0');
                ctx.strokeStyle = '#b5a898'; ctx.lineWidth = 2*s;
                ctx.strokeRect(hingeX, doorY, doorLen, doorThick);

                // Cardini (cerchietti sul muro)
                Draw.circle(ctx, hingeX + 2*s, doorY + 2*s, 5*s, '#888', '#666', 1.5*s);
                Draw.circle(ctx, hingeX + 2*s, doorY + doorThick - 2*s, 5*s, '#888', '#666', 1.5*s);
                Draw.label(ctx, 'cardini', hingeX - 6*s, doorY + doorThick + 20*s, '#888', 9*s, false);

                // Maniglia (pallino a destra)
                Draw.circle(ctx, hingeX + doorLen - 15*s, doorY + doorThick/2, 4*s, '#999', '#777', 1.5*s);

                // Label "vista dall'alto"
                Draw.label(ctx, 'vista dall\'alto', w/2, h*0.12, '#aaa', 10*s, false);

                // Forza VICINA ai cardini (rossa, grande, serve tanta forza → fatica)
                if (p > 0.15) {
                    const fp = Math.min(1, (p-0.15)/0.35);
                    const fxNear = hingeX + 40*s;
                    ctx.globalAlpha = fp;
                    // Freccia verso il basso (spingi la porta per aprirla)
                    Draw.animatedArrow(ctx, fxNear, doorY - 8*s, fxNear, doorY - 55*s, '#c46b60', fp, 3*s, 10*s);
                    if (fp > 0.5) {
                        Draw.label(ctx, 'F grande', fxNear + 40*s, doorY - 40*s, '#c46b60', 11*s);
                        Draw.label(ctx, '(tanta fatica!)', fxNear + 40*s, doorY - 25*s, '#c46b60', 9*s, false);
                    }
                    // Braccio piccolo
                    Draw.dashedLine(ctx, hingeX, doorY + doorThick + 35*s, fxNear, doorY + doorThick + 35*s, '#c46b60', 1.5*s);
                    if (fp > 0.5) Draw.label(ctx, 'braccio piccolo', (hingeX + fxNear)/2 + 10*s, doorY + doorThick + 48*s, '#c46b60', 8*s, false);
                }

                // Forza LONTANA dai cardini (verde, piccola, basta poco → facile)
                if (p > 0.55) {
                    const fp = Math.min(1, (p-0.55)/0.35);
                    const fxFar = hingeX + doorLen - 30*s;
                    ctx.globalAlpha = fp;
                    // Freccia verso il basso (più piccola, basta meno forza)
                    Draw.animatedArrow(ctx, fxFar, doorY - 8*s, fxFar, doorY - 35*s, '#5a9a6a', fp, 3*s, 10*s);
                    if (fp > 0.5) {
                        Draw.label(ctx, 'F piccola', fxFar - 5*s, doorY - 50*s, '#5a9a6a', 11*s);
                        Draw.label(ctx, '(facile!)', fxFar - 5*s, doorY - 65*s, '#5a9a6a', 9*s, false);
                    }
                    // Braccio grande
                    Draw.dashedLine(ctx, hingeX, doorY + doorThick + 55*s, fxFar, doorY + doorThick + 55*s, '#5a9a6a', 1.5*s);
                    if (fp > 0.5) Draw.label(ctx, 'braccio grande', (hingeX + fxFar)/2, doorY + doorThick + 68*s, '#5a9a6a', 8*s, false);
                }

                // Freccia curva di rotazione
                if (p > 0.8) {
                    ctx.globalAlpha = (p-0.8)/0.2;
                    Draw.arc(ctx, hingeX, doorY - 10*s, doorLen * 0.85, -0.15, -0.5, '#5a8fa8', 2*s);
                    Draw.label(ctx, 'rotazione', hingeX + doorLen * 0.5, doorY - 25*s - doorLen*0.12, '#5a8fa8', 10*s);
                }
            }
        },

        // ---- Step 2: Il momento di una forza ----
        {
            title: 'Il momento di una forza',
            text: 'Il <span class="term" data-term="momento">momento</span> di una forza misura quanto quella forza riesce a far ruotare un oggetto attorno a un punto fisso.<br><br>' +
                'Pensa a una <b>chiave inglese</b> su un bullone: piu la chiave e lunga, piu e facile svitare. La distanza tra il punto di applicazione della <span class="term" data-term="forza">forza</span> e il perno si chiama <span class="term" data-term="braccio">braccio</span>.<br><br>' +
                'La formula e semplice: <span class="highlight">M = F &times; b</span>. Il momento si misura in <b>N&middot;m</b> (newton per metro).',
            formula: 'M = F \\times b \\quad [\\text{N} \\cdot \\text{m}]',
            cleanDraw: true,
            duration: 1200,
            draw(ctx, w, h, p) {
                const s = Draw.S(w, h);
                ctx.fillStyle = '#faf8f5';
                ctx.fillRect(0, 0, w, h);

                const cx = w * 0.35;
                const cy = h * 0.55;

                // Bolt (circle)
                Draw.circle(ctx, cx, cy, 12 * s, '#888', '#666', 2 * s);
                // Cross on bolt
                ctx.strokeStyle = '#555';
                ctx.lineWidth = 2 * s;
                ctx.beginPath();
                ctx.moveTo(cx - 6 * s, cy - 6 * s);
                ctx.lineTo(cx + 6 * s, cy + 6 * s);
                ctx.moveTo(cx + 6 * s, cy - 6 * s);
                ctx.lineTo(cx - 6 * s, cy + 6 * s);
                ctx.stroke();

                // Wrench body (angled slightly upward to the right)
                const wrenchLen = 200 * s;
                const angle = -0.15;
                const endX = cx + wrenchLen * Math.cos(angle);
                const endY = cy + wrenchLen * Math.sin(angle);

                // Wrench shaft
                const shaftW = 14 * s;
                ctx.save();
                ctx.translate(cx, cy);
                ctx.rotate(angle);
                Draw.roundRect(ctx, 10 * s, -shaftW / 2, wrenchLen - 20 * s, shaftW, 3 * s, '#b0b0b0');
                ctx.strokeStyle = '#888';
                ctx.lineWidth = 1.5 * s;
                ctx.strokeRect(10 * s, -shaftW / 2, wrenchLen - 20 * s, shaftW);
                ctx.restore();

                // Label "perno" at bolt
                Draw.label(ctx, 'perno', cx, cy + 26 * s, '#888', 10 * s);

                // Brace for arm (braccio b)
                if (p > 0.15) {
                    const bp = Math.min(1, (p - 0.15) / 0.35);
                    const braceY = cy + 38 * s;
                    ctx.globalAlpha = bp;
                    Draw.dashedLine(ctx, cx, cy + 18 * s, cx, braceY + 8 * s, '#5a8fa8', 1 * s);
                    Draw.dashedLine(ctx, endX, endY + 18 * s, endX, braceY + 8 * s, '#5a8fa8', 1 * s);
                    Draw.arrow(ctx, cx + 8 * s, braceY + 4 * s, endX - 8 * s, braceY + 4 * s, '#5a8fa8', 1.5 * s, 7 * s);
                    Draw.arrow(ctx, endX - 8 * s, braceY + 4 * s, cx + 8 * s, braceY + 4 * s, '#5a8fa8', 1.5 * s, 7 * s);
                    Draw.label(ctx, 'b (braccio)', (cx + endX) / 2, braceY + 22 * s, '#5a8fa8', 12 * s);
                    ctx.globalAlpha = 1;
                }

                // Force arrow at end of wrench (downward)
                if (p > 0.4) {
                    const fp = Math.min(1, (p - 0.4) / 0.35);
                    Draw.animatedArrow(ctx, endX, endY, endX, endY + 70 * s, '#c46b60', fp, 3 * s, 11 * s);
                    if (fp > 0.5) {
                        Draw.label(ctx, 'F', endX + 18 * s, endY + 40 * s, '#c46b60', 16 * s);
                    }
                }

                // Animated formula box
                if (p > 0.7) {
                    const fp = (p - 0.7) / 0.3;
                    ctx.globalAlpha = fp;
                    const bx = w * 0.7;
                    const by = h * 0.18;
                    Draw.roundRect(ctx, bx - 55 * s, by - 16 * s, 110 * s, 36 * s, 6 * s, '#fef3ee');
                    ctx.strokeStyle = '#d4956a';
                    ctx.lineWidth = 1.5 * s;
                    ctx.strokeRect(bx - 55 * s, by - 16 * s, 110 * s, 36 * s);
                    Draw.label(ctx, 'M = F x b', bx, by + 2 * s, '#c46b60', 15 * s);
                    ctx.globalAlpha = 1;
                }
            }
        },

        // ---- Step 3: Il braccio: la distanza che conta ----
        {
            title: 'Il braccio: la distanza che conta',
            text: 'Attenzione: il <span class="term" data-term="braccio">braccio</span> <b>non</b> e la distanza dal <span class="term" data-term="perno">perno</span> al punto di applicazione della forza! E la distanza <b>perpendicolare</b> dal perno alla <b>retta d\'azione</b> della forza.<br><br>' +
                'Immagina di prolungare la freccia della forza all\'infinito: la retta che ottieni e la <i>retta d\'azione</i>. Il braccio e la distanza piu corta dal perno a questa retta.<br><br>' +
                'Se la forza passa proprio per il perno, il braccio e <span class="highlight">zero</span> e il momento e nullo: nessuna rotazione!',
            formula: 'b = d \\cdot \\sin\\theta \\quad \\text{(distanza perpendicolare)}',
            cleanDraw: true,
            duration: 1200,
            draw(ctx, w, h, p) {
                const s = Draw.S(w, h);
                ctx.fillStyle = '#faf8f5';
                ctx.fillRect(0, 0, w, h);

                // Lever / seesaw bar
                const pivotX = w * 0.38;
                const pivotY = h * 0.55;
                const barLen = 300 * s;
                const barAngle = -0.1;

                // Pivot triangle
                const triH = 28 * s;
                ctx.fillStyle = '#b5a898';
                ctx.beginPath();
                ctx.moveTo(pivotX, pivotY);
                ctx.lineTo(pivotX - 16 * s, pivotY + triH);
                ctx.lineTo(pivotX + 16 * s, pivotY + triH);
                ctx.closePath();
                ctx.fill();
                Draw.label(ctx, 'perno', pivotX, pivotY + triH + 14 * s, '#888', 10 * s);

                // Bar
                const leftX = pivotX - barLen * 0.4 * Math.cos(barAngle);
                const leftY = pivotY - barLen * 0.4 * Math.sin(barAngle);
                const rightX = pivotX + barLen * 0.6 * Math.cos(barAngle);
                const rightY = pivotY + barLen * 0.6 * Math.sin(barAngle);

                ctx.strokeStyle = '#8a7e70';
                ctx.lineWidth = 6 * s;
                ctx.lineCap = 'round';
                ctx.beginPath();
                ctx.moveTo(leftX, leftY);
                ctx.lineTo(rightX, rightY);
                ctx.stroke();

                // Point of force application
                const forceX = rightX - 20 * s;
                const forceY = rightY;

                // Force at an angle (not perpendicular to bar)
                const forceAngle = -Math.PI / 2 + 0.6;
                const forceLen = 80 * s;
                const fEndX = forceX + forceLen * Math.cos(forceAngle);
                const fEndY = forceY + forceLen * Math.sin(forceAngle);

                if (p > 0.1) {
                    const fp = Math.min(1, (p - 0.1) / 0.3);
                    Draw.animatedArrow(ctx, forceX, forceY, fEndX, fEndY, '#c46b60', fp, 3 * s, 10 * s);
                    if (fp > 0.6) Draw.label(ctx, 'F', fEndX + 14 * s, fEndY - 4 * s, '#c46b60', 15 * s);
                }

                // Line of action (extended dashed line)
                if (p > 0.3) {
                    const lp = Math.min(1, (p - 0.3) / 0.3);
                    ctx.globalAlpha = lp * 0.6;
                    const ext = 160 * s;
                    Draw.dashedLine(ctx,
                        forceX - ext * Math.cos(forceAngle), forceY - ext * Math.sin(forceAngle),
                        fEndX + ext * 0.3 * Math.cos(forceAngle), fEndY + ext * 0.3 * Math.sin(forceAngle),
                        '#c46b60', 1.2 * s
                    );
                    ctx.globalAlpha = lp;
                    Draw.label(ctx, 'retta d\'azione', forceX - ext * 0.5 * Math.cos(forceAngle) + 45 * s,
                        forceY - ext * 0.5 * Math.sin(forceAngle) - 8 * s, '#c46b60', 10 * s, false);
                    ctx.globalAlpha = 1;
                }

                // Perpendicular distance (braccio b)
                if (p > 0.5) {
                    const bp = Math.min(1, (p - 0.5) / 0.35);
                    // Perpendicular from pivot to line of action
                    // Direction of force line: (cos(forceAngle), sin(forceAngle))
                    const dx = Math.cos(forceAngle);
                    const dy = Math.sin(forceAngle);
                    // Vector from forceX,forceY to pivot
                    const vx = pivotX - forceX;
                    const vy = pivotY - forceY;
                    // Project onto force direction
                    const proj = vx * dx + vy * dy;
                    // Foot of perpendicular
                    const footX = forceX + proj * dx;
                    const footY = forceY + proj * dy;

                    ctx.globalAlpha = bp;
                    // Draw perpendicular line (the arm)
                    ctx.strokeStyle = '#5a8fa8';
                    ctx.lineWidth = 2.5 * s;
                    ctx.setLineDash([]);
                    ctx.beginPath();
                    ctx.moveTo(pivotX, pivotY);
                    ctx.lineTo(footX, footY);
                    ctx.stroke();

                    // Right angle marker
                    const sqSize = 8 * s;
                    const perpDx = (pivotX - footX);
                    const perpDy = (pivotY - footY);
                    const perpLen = Math.sqrt(perpDx * perpDx + perpDy * perpDy);
                    if (perpLen > 1) {
                        const ux = perpDx / perpLen * sqSize;
                        const uy = perpDy / perpLen * sqSize;
                        ctx.strokeStyle = '#5a8fa8';
                        ctx.lineWidth = 1.2 * s;
                        ctx.beginPath();
                        ctx.moveTo(footX + ux, footY + uy);
                        ctx.lineTo(footX + ux + dy * sqSize, footY + uy - dx * sqSize);
                        ctx.lineTo(footX + dy * sqSize, footY - dx * sqSize);
                        ctx.stroke();
                    }

                    Draw.label(ctx, 'b (braccio)', (pivotX + footX) / 2 - 20 * s, (pivotY + footY) / 2 - 14 * s, '#5a8fa8', 12 * s);

                    // Small circle at foot
                    Draw.circle(ctx, footX, footY, 3 * s, '#5a8fa8', null);
                    ctx.globalAlpha = 1;
                }

                // Pivot dot
                Draw.circle(ctx, pivotX, pivotY, 5 * s, '#d4956a', '#b5a898', 2 * s);
            }
        },

        // ---- Step 4: Equilibrio dei momenti ----
        {
            title: 'Equilibrio dei momenti',
            text: 'Un\'altalena e in <span class="term" data-term="equilibrio">equilibrio</span> quando i momenti delle forze da un lato e dall\'altro si bilanciano.<br><br>' +
                'Una persona <b>pesante</b> puo bilanciarsi con una <b>leggera</b> se si siede piu vicina al perno. Una persona leggera deve sedersi piu lontano.<br><br>' +
                'La condizione di equilibrio e: <span class="highlight">M<sub>1</sub> = M<sub>2</sub></span>, cioe <span class="highlight">F<sub>1</sub> &times; b<sub>1</sub> = F<sub>2</sub> &times; b<sub>2</sub></span>.',
            formula: 'F_1 \\times b_1 = F_2 \\times b_2',
            cleanDraw: true,
            duration: 1200,
            draw(ctx, w, h, p) {
                const s = Draw.S(w, h);
                ctx.fillStyle = '#faf8f5';
                ctx.fillRect(0, 0, w, h);

                const pivotX = w * 0.5;
                const pivotY = h * 0.6;
                const barHalf = 180 * s;

                // Ground line
                ctx.strokeStyle = '#d0c8bb';
                ctx.lineWidth = 1.5 * s;
                ctx.beginPath();
                ctx.moveTo(pivotX - barHalf - 30 * s, pivotY + 38 * s);
                ctx.lineTo(pivotX + barHalf + 30 * s, pivotY + 38 * s);
                ctx.stroke();

                // Pivot triangle
                const triH = 36 * s;
                ctx.fillStyle = '#b5a898';
                ctx.beginPath();
                ctx.moveTo(pivotX, pivotY);
                ctx.lineTo(pivotX - 18 * s, pivotY + triH);
                ctx.lineTo(pivotX + 18 * s, pivotY + triH);
                ctx.closePath();
                ctx.fill();

                // Balanced bar (horizontal)
                ctx.strokeStyle = '#8a7e70';
                ctx.lineWidth = 7 * s;
                ctx.lineCap = 'round';
                ctx.beginPath();
                ctx.moveTo(pivotX - barHalf, pivotY);
                ctx.lineTo(pivotX + barHalf, pivotY);
                ctx.stroke();

                // Heavy person (close to center, left side)
                const heavyX = pivotX - 55 * s;
                const lightX = pivotX + 130 * s;

                if (p > 0.15) {
                    const fp = Math.min(1, (p - 0.15) / 0.3);

                    // Heavy person: big rectangle
                    ctx.globalAlpha = fp;
                    Draw.roundRect(ctx, heavyX - 18 * s, pivotY - 55 * s, 36 * s, 55 * s, 5 * s, '#c46b60');
                    Draw.circle(ctx, heavyX, pivotY - 68 * s, 13 * s, '#c46b60', null);
                    Draw.label(ctx, '80 kg', heavyX, pivotY - 40 * s, '#fff', 9 * s);

                    // Weight arrow for heavy
                    Draw.animatedArrow(ctx, heavyX, pivotY + 6 * s, heavyX, pivotY + 30 * s, '#c46b60', fp, 2 * s, 8 * s);
                    ctx.globalAlpha = 1;
                }

                if (p > 0.35) {
                    const fp = Math.min(1, (p - 0.35) / 0.3);

                    // Light person: small rectangle (far from center, right side)
                    ctx.globalAlpha = fp;
                    Draw.roundRect(ctx, lightX - 12 * s, pivotY - 40 * s, 24 * s, 40 * s, 4 * s, '#5a8fa8');
                    Draw.circle(ctx, lightX, pivotY - 50 * s, 10 * s, '#5a8fa8', null);
                    Draw.label(ctx, '40 kg', lightX, pivotY - 28 * s, '#fff', 8 * s);

                    // Weight arrow for light
                    Draw.animatedArrow(ctx, lightX, pivotY + 6 * s, lightX, pivotY + 30 * s, '#5a8fa8', fp, 2 * s, 8 * s);
                    ctx.globalAlpha = 1;
                }

                // Arm labels
                if (p > 0.55) {
                    const ap = Math.min(1, (p - 0.55) / 0.25);
                    ctx.globalAlpha = ap;

                    // b1 (short arm, heavy side)
                    Draw.arrow(ctx, pivotX - 4 * s, pivotY + 18 * s, heavyX + 4 * s, pivotY + 18 * s, '#9b6fb5', 1.5 * s, 6 * s);
                    Draw.arrow(ctx, heavyX + 4 * s, pivotY + 18 * s, pivotX - 4 * s, pivotY + 18 * s, '#9b6fb5', 1.5 * s, 6 * s);
                    Draw.label(ctx, 'b\u2081', (pivotX + heavyX) / 2, pivotY + 30 * s, '#9b6fb5', 11 * s);

                    // b2 (long arm, light side)
                    Draw.arrow(ctx, pivotX + 4 * s, pivotY + 18 * s, lightX - 4 * s, pivotY + 18 * s, '#9b6fb5', 1.5 * s, 6 * s);
                    Draw.arrow(ctx, lightX - 4 * s, pivotY + 18 * s, pivotX + 4 * s, pivotY + 18 * s, '#9b6fb5', 1.5 * s, 6 * s);
                    Draw.label(ctx, 'b\u2082', (pivotX + lightX) / 2, pivotY + 30 * s, '#9b6fb5', 11 * s);
                    ctx.globalAlpha = 1;
                }

                // Equilibrium box
                if (p > 0.75) {
                    const ep = (p - 0.75) / 0.25;
                    ctx.globalAlpha = ep;
                    const bx = w * 0.5;
                    const by = 30 * s;
                    Draw.roundRect(ctx, bx - 100 * s, by - 14 * s, 200 * s, 32 * s, 6 * s, '#e4f2e7');
                    ctx.strokeStyle = '#81c784';
                    ctx.lineWidth = 1.5 * s;
                    ctx.strokeRect(bx - 100 * s, by - 14 * s, 200 * s, 32 * s);
                    Draw.label(ctx, 'M\u2081 = M\u2082  \u2192  equilibrio!', bx, by + 2 * s, '#3d8b44', 12 * s);
                    ctx.globalAlpha = 1;
                }

                // Pivot dot on top
                Draw.circle(ctx, pivotX, pivotY, 5 * s, '#d4956a', '#b5a898', 2 * s);
            }
        },

        // ---- Step 5: Il trucco del perno ----
        {
            title: 'Il trucco del perno',
            text: 'Nei problemi con molte forze, scegliere il <span class="term" data-term="perno">perno</span> nel punto giusto semplifica tutto. Il trucco: se metti il perno dove agisce una forza <b>sconosciuta</b>, quella forza ha braccio zero e il suo momento sparisce dall\'equazione!<br><br>' +
                '<b>Esempio:</b> hai una trave con una forza incognita al punto A. Se calcoli i momenti rispetto ad A, la forza in A non compare (braccio = 0). Rimangono solo le forze note!<br><br>' +
                'Questo e uno dei trucchi piu potenti della statica: scegli bene il perno e le equazioni si risolvono quasi da sole.',
            formula: 'M_A = F_{\\text{incognita}} \\times 0 = 0 \\quad \\text{(sparisce!)}',
            cleanDraw: true,
            duration: 1200,
            draw(ctx, w, h, p) {
                const s = Draw.S(w, h);
                ctx.fillStyle = '#faf8f5';
                ctx.fillRect(0, 0, w, h);

                const beamY = h * 0.5;
                const leftX = 60 * s;
                const rightX = w - 60 * s;
                const beamLen = rightX - leftX;
                const midX = (leftX + rightX) / 2;

                // Beam
                ctx.strokeStyle = '#8a7e70';
                ctx.lineWidth = 7 * s;
                ctx.lineCap = 'round';
                ctx.beginPath();
                ctx.moveTo(leftX, beamY);
                ctx.lineTo(rightX, beamY);
                ctx.stroke();

                // Point A (left) — unknown force
                Draw.circle(ctx, leftX, beamY, 6 * s, '#c46b60', '#a04a40', 2 * s);
                Draw.label(ctx, 'A', leftX, beamY + 20 * s, '#c46b60', 13 * s);

                // Unknown force at A (upward)
                if (p > 0.05) {
                    const fp = Math.min(1, p / 0.3);
                    Draw.animatedArrow(ctx, leftX, beamY - 8 * s, leftX, beamY - 65 * s, '#c46b60', fp, 2.5 * s, 9 * s);
                    if (fp > 0.5) Draw.label(ctx, 'R\u2090 = ?', leftX, beamY - 75 * s, '#c46b60', 12 * s);
                }

                // Known force at middle (downward)
                if (p > 0.15) {
                    const fp = Math.min(1, (p - 0.15) / 0.3);
                    Draw.animatedArrow(ctx, midX, beamY + 8 * s, midX, beamY + 65 * s, '#5a9a6a', fp, 2.5 * s, 9 * s);
                    if (fp > 0.5) Draw.label(ctx, 'F = nota', midX, beamY + 80 * s, '#5a9a6a', 11 * s);
                }

                // Point B (right) — another force
                Draw.circle(ctx, rightX, beamY, 6 * s, '#5a8fa8', '#3a6f88', 2 * s);
                Draw.label(ctx, 'B', rightX, beamY + 20 * s, '#5a8fa8', 13 * s);

                if (p > 0.15) {
                    const fp = Math.min(1, (p - 0.15) / 0.3);
                    Draw.animatedArrow(ctx, rightX, beamY - 8 * s, rightX, beamY - 55 * s, '#5a8fa8', fp, 2.5 * s, 9 * s);
                    if (fp > 0.5) Draw.label(ctx, 'R\u1d47', rightX, beamY - 65 * s, '#5a8fa8', 12 * s);
                }

                // Pivot choice at A — highlight
                if (p > 0.45) {
                    const tp = Math.min(1, (p - 0.45) / 0.3);
                    ctx.globalAlpha = tp;

                    // Pivot triangle at A
                    ctx.fillStyle = '#d4956a';
                    ctx.beginPath();
                    ctx.moveTo(leftX, beamY + 6 * s);
                    ctx.lineTo(leftX - 14 * s, beamY + 30 * s);
                    ctx.lineTo(leftX + 14 * s, beamY + 30 * s);
                    ctx.closePath();
                    ctx.fill();

                    Draw.label(ctx, 'perno qui!', leftX, beamY + 44 * s, '#d4956a', 10 * s);

                    // Cross out R_A (braccio = 0)
                    ctx.strokeStyle = '#c46b60';
                    ctx.lineWidth = 2 * s;
                    ctx.beginPath();
                    ctx.moveTo(leftX - 25 * s, beamY - 82 * s);
                    ctx.lineTo(leftX + 25 * s, beamY - 68 * s);
                    ctx.stroke();

                    ctx.globalAlpha = 1;
                }

                // Result box
                if (p > 0.7) {
                    const rp = (p - 0.7) / 0.3;
                    ctx.globalAlpha = rp;

                    // Arm labels
                    Draw.arrow(ctx, leftX + 6 * s, beamY - 18 * s, midX - 6 * s, beamY - 18 * s, '#9b6fb5', 1.5 * s, 6 * s);
                    Draw.label(ctx, 'b\u2081', (leftX + midX) / 2, beamY - 30 * s, '#9b6fb5', 11 * s);

                    Draw.arrow(ctx, leftX + 6 * s, beamY - 36 * s, rightX - 6 * s, beamY - 36 * s, '#9b6fb5', 1.5 * s, 6 * s);
                    Draw.label(ctx, 'b\u2082', (leftX + rightX) / 2, beamY - 48 * s, '#9b6fb5', 11 * s);

                    // Explanation box
                    const bx = w * 0.5;
                    const by = h * 0.12;
                    Draw.roundRect(ctx, bx - 120 * s, by - 14 * s, 240 * s, 32 * s, 6 * s, '#fef3ee');
                    ctx.strokeStyle = '#d4956a';
                    ctx.lineWidth = 1.5 * s;
                    ctx.strokeRect(bx - 120 * s, by - 14 * s, 240 * s, 32 * s);
                    Draw.label(ctx, 'R\u2090 ha braccio 0 \u2192 sparisce!', bx, by + 2 * s, '#d4956a', 12 * s);

                    ctx.globalAlpha = 1;
                }
            }
        }
    ];

    return { steps };
})();
