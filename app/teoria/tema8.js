// ===== Tema 8: Le tre leggi di Newton =====

const Tema8 = (() => {
    const steps = [
        // ---- Step 1: Prima legge: l'inerzia ----
        {
            title: 'Prima legge: l\'inerzia',
            text: 'La prima legge di Newton dice: un oggetto fermo <b>resta fermo</b>, e uno in moto <b>continua a muoversi</b> a velocità costante, A MENO CHE una <span class="term" data-term="forza">forza</span> agisca su di lui.<br><br>' +
                'Questa proprietà si chiama <span class="highlight">inerzia</span>. Pensa a quando un autobus frena di colpo: tu continui ad andare avanti per inerzia!<br><br>' +
                'Questa legge spiega anche l\'<span class="term" data-term="equilibrio">equilibrio</span>: se la somma delle forze è zero, l\'oggetto non cambia il suo moto.',
            formula: '\\sum \\vec{F} = 0 \\quad \\Longrightarrow \\quad \\vec{v} = \\text{costante}',
            cleanDraw: true,
            duration: 1400,
            draw(ctx, w, h, p) {
                const s = Draw.S(w, h);
                ctx.fillStyle = '#faf8f5';
                ctx.fillRect(0, 0, w, h);

                const groundY = h * 0.75;

                // Ground line
                ctx.strokeStyle = '#d0c8bb';
                ctx.lineWidth = 1.5 * s;
                ctx.beginPath();
                ctx.moveTo(20 * s, groundY);
                ctx.lineTo(w - 20 * s, groundY);
                ctx.stroke();

                // --- Scene 1: Ball at rest (top area) ---
                const topY = h * 0.28;
                if (p > 0.03) {
                    const fp = Math.min(1, (p - 0.03) / 0.2);
                    ctx.globalAlpha = fp;

                    // Still ball
                    const ballX = w * 0.18;
                    Draw.circle(ctx, ballX, topY, 18 * s, '#5a8fa8', '#3a6f88', 2 * s);

                    // "No forces" label
                    Draw.label(ctx, 'Nessuna forza', ballX, topY - 28 * s, '#888', 9 * s, false);
                    Draw.label(ctx, 'Fermo!', ballX, topY + 30 * s, '#5a8fa8', 10 * s);

                    ctx.globalAlpha = 1;
                }

                // --- Scene 2: Ball moving at constant velocity (no friction) ---
                if (p > 0.2) {
                    const fp = Math.min(1, (p - 0.2) / 0.25);
                    ctx.globalAlpha = fp;

                    // Smooth surface label
                    Draw.label(ctx, 'Superficie liscia (no attrito)', w * 0.55, groundY + 16 * s, '#888', 8 * s, false);

                    // Moving ball
                    const ballStartX = w * 0.35;
                    const ballMoveX = ballStartX + fp * 80 * s;
                    const ballY = groundY - 18 * s;
                    Draw.circle(ctx, ballMoveX, ballY, 18 * s, '#5a8fa8', '#3a6f88', 2 * s);

                    // Constant velocity arrow
                    Draw.animatedArrow(ctx, ballMoveX + 22 * s, ballY, ballMoveX + 70 * s, ballY, '#5a9a6a', fp, 2.5 * s, 9 * s);
                    if (fp > 0.4) Draw.label(ctx, 'v = costante', ballMoveX + 80 * s, ballY - 10 * s, '#5a9a6a', 10 * s, false);

                    // Inerzia label (green)
                    if (fp > 0.7) {
                        const ip = (fp - 0.7) / 0.3;
                        ctx.globalAlpha = ip;
                        Draw.roundRect(ctx, ballMoveX - 40 * s, ballY - 50 * s, 80 * s, 24 * s, 5 * s, '#e4f2e7');
                        ctx.strokeStyle = '#81c784';
                        ctx.lineWidth = 1.2 * s;
                        ctx.strokeRect(ballMoveX - 40 * s, ballY - 50 * s, 80 * s, 24 * s);
                        Draw.label(ctx, 'Inerzia!', ballMoveX, ballY - 38 * s, '#3d8b44', 11 * s);
                    }

                    ctx.globalAlpha = 1;
                }

                // --- Scene 3: Ball with friction - slows down ---
                if (p > 0.5) {
                    const fp = Math.min(1, (p - 0.5) / 0.3);
                    ctx.globalAlpha = fp;

                    const fricBallX = w * 0.18;
                    const fricBallY = groundY - 18 * s;

                    // Friction surface marks
                    for (let i = 0; i < 8; i++) {
                        const hx = (w * 0.1 + i * 28 * s);
                        ctx.strokeStyle = '#c0b8a8';
                        ctx.lineWidth = 1 * s;
                        ctx.beginPath();
                        ctx.moveTo(hx, groundY + 2 * s);
                        ctx.lineTo(hx - 5 * s, groundY + 8 * s);
                        ctx.stroke();
                    }

                    // Ball slowing
                    const slowX = fricBallX + fp * 50 * s;
                    Draw.circle(ctx, slowX, fricBallY, 18 * s, '#d4956a', '#c0844a', 2 * s);

                    // Shrinking velocity arrow
                    const vLen = Math.max(10, 50 * (1 - fp * 0.7)) * s;
                    Draw.animatedArrow(ctx, slowX + 22 * s, fricBallY, slowX + 22 * s + vLen, fricBallY, '#c46b60', fp, 2 * s, 8 * s);

                    // Friction arrow (backwards)
                    Draw.animatedArrow(ctx, slowX - 22 * s, fricBallY, slowX - 60 * s, fricBallY, '#c46b60', fp, 2 * s, 8 * s);
                    if (fp > 0.3) Draw.label(ctx, 'Attrito', slowX - 55 * s, fricBallY - 14 * s, '#c46b60', 9 * s, false);

                    // "Rallenta!" label
                    if (fp > 0.6) {
                        ctx.globalAlpha = (fp - 0.6) / 0.4;
                        Draw.label(ctx, 'Rallenta!', slowX, fricBallY + 32 * s, '#c46b60', 10 * s);
                    }

                    ctx.globalAlpha = 1;
                }

                // Summary label
                if (p > 0.8) {
                    const sp = (p - 0.8) / 0.2;
                    ctx.globalAlpha = sp;
                    const bx = w * 0.5;
                    const by = topY - 2 * s;
                    Draw.roundRect(ctx, bx - 90 * s, by - 14 * s, 180 * s, 30 * s, 6 * s, '#e4f2e7');
                    ctx.strokeStyle = '#81c784';
                    ctx.lineWidth = 1.5 * s;
                    ctx.strokeRect(bx - 90 * s, by - 14 * s, 180 * s, 30 * s);
                    Draw.label(ctx, 'Se \u03a3F = 0 \u2192 moto costante', bx, by + 2 * s, '#3d8b44', 11 * s);
                    ctx.globalAlpha = 1;
                }
            }
        },

        // ---- Step 2: Seconda legge: F = ma ----
        {
            title: 'Seconda legge: F = ma',
            text: 'Questa è LA equazione della meccanica. La <span class="term" data-term="forza">forza</span> netta su un oggetto è uguale alla sua <span class="term" data-term="massa">massa</span> per l\'accelerazione.<br><br>' +
                'Più forza = più accelerazione. Più massa = meno accelerazione (più difficile da spingere). Ecco perché un camion carico accelera meno di un\'auto vuota con lo stesso motore!<br><br>' +
                'Nei nostri problemi, quando <span class="highlight">\u03a3F = 0</span>, l\'accelerazione è zero: quello è l\'<span class="term" data-term="equilibrio">equilibrio</span>!',
            formula: '\\vec{F} = m \\cdot \\vec{a}',
            cleanDraw: true,
            duration: 1400,
            draw(ctx, w, h, p) {
                const s = Draw.S(w, h);
                ctx.fillStyle = '#faf8f5';
                ctx.fillRect(0, 0, w, h);

                const topY = h * 0.3;
                const botY = h * 0.65;

                // --- Top: small mass, big acceleration ---
                if (p > 0.05) {
                    const fp = Math.min(1, (p - 0.05) / 0.35);
                    ctx.globalAlpha = fp;

                    const boxX = w * 0.18;
                    const boxW = 40 * s;
                    const boxH = 30 * s;

                    // Small box
                    Draw.roundRect(ctx, boxX - boxW / 2, topY - boxH / 2, boxW, boxH, 4 * s, '#5a8fa8');
                    Draw.label(ctx, 'm piccola', boxX, topY - boxH / 2 - 12 * s, '#5a8fa8', 9 * s, false);

                    // Ground under box
                    ctx.strokeStyle = '#d0c8bb';
                    ctx.lineWidth = 1 * s;
                    ctx.beginPath();
                    ctx.moveTo(boxX - 60 * s, topY + boxH / 2);
                    ctx.lineTo(boxX + 180 * s, topY + boxH / 2);
                    ctx.stroke();

                    // Force arrow (F)
                    Draw.animatedArrow(ctx, boxX - boxW / 2 - 60 * s, topY, boxX - boxW / 2 - 5 * s, topY, '#c46b60', fp, 3 * s, 10 * s);
                    if (fp > 0.4) Draw.label(ctx, 'F', boxX - boxW / 2 - 35 * s, topY - 16 * s, '#c46b60', 13 * s);

                    // Big acceleration arrow
                    if (fp > 0.5) {
                        const ap = Math.min(1, (fp - 0.5) / 0.5);
                        Draw.animatedArrow(ctx, boxX + boxW / 2 + 8 * s, topY, boxX + boxW / 2 + 130 * s, topY, '#5a9a6a', ap, 3 * s, 10 * s);
                        if (ap > 0.4) Draw.label(ctx, 'a GRANDE', boxX + boxW / 2 + 80 * s, topY - 16 * s, '#5a9a6a', 11 * s);
                    }

                    ctx.globalAlpha = 1;
                }

                // --- Bottom: big mass, small acceleration ---
                if (p > 0.3) {
                    const fp = Math.min(1, (p - 0.3) / 0.35);
                    ctx.globalAlpha = fp;

                    const boxX = w * 0.18;
                    const boxW = 75 * s;
                    const boxH = 50 * s;

                    // Big box
                    Draw.roundRect(ctx, boxX - boxW / 2, botY - boxH / 2, boxW, boxH, 5 * s, '#d4956a');
                    Draw.label(ctx, 'm GRANDE', boxX, botY - boxH / 2 - 12 * s, '#d4956a', 9 * s, false);

                    // Ground under box
                    ctx.strokeStyle = '#d0c8bb';
                    ctx.lineWidth = 1 * s;
                    ctx.beginPath();
                    ctx.moveTo(boxX - 60 * s, botY + boxH / 2);
                    ctx.lineTo(boxX + 180 * s, botY + boxH / 2);
                    ctx.stroke();

                    // Same force arrow (F)
                    Draw.animatedArrow(ctx, boxX - boxW / 2 - 60 * s, botY, boxX - boxW / 2 - 5 * s, botY, '#c46b60', fp, 3 * s, 10 * s);
                    if (fp > 0.4) Draw.label(ctx, 'F', boxX - boxW / 2 - 35 * s, botY - 16 * s, '#c46b60', 13 * s);

                    // Small acceleration arrow
                    if (fp > 0.5) {
                        const ap = Math.min(1, (fp - 0.5) / 0.5);
                        Draw.animatedArrow(ctx, boxX + boxW / 2 + 8 * s, botY, boxX + boxW / 2 + 50 * s, botY, '#5a9a6a', ap, 2.5 * s, 9 * s);
                        if (ap > 0.4) Draw.label(ctx, 'a piccola', boxX + boxW / 2 + 55 * s, botY - 16 * s, '#5a9a6a', 11 * s);
                    }

                    ctx.globalAlpha = 1;
                }

                // "Stessa F" bracket connecting the two
                if (p > 0.55) {
                    const bp = Math.min(1, (p - 0.55) / 0.2);
                    ctx.globalAlpha = bp;

                    const bx = w * 0.05;
                    ctx.strokeStyle = '#c46b60';
                    ctx.lineWidth = 1.5 * s;
                    ctx.beginPath();
                    ctx.moveTo(bx, topY);
                    ctx.lineTo(bx - 8 * s, topY);
                    ctx.lineTo(bx - 8 * s, botY);
                    ctx.lineTo(bx, botY);
                    ctx.stroke();
                    Draw.label(ctx, 'Stessa F', bx - 4 * s, (topY + botY) / 2, '#c46b60', 8 * s, false);

                    ctx.globalAlpha = 1;
                }

                // Result box: F = ma
                if (p > 0.7) {
                    const rp = (p - 0.7) / 0.3;
                    ctx.globalAlpha = rp;

                    const bx = w * 0.72;
                    const by = h * 0.5;
                    Draw.roundRect(ctx, bx - 65 * s, by - 20 * s, 130 * s, 40 * s, 6 * s, '#e4f2e7');
                    ctx.strokeStyle = '#81c784';
                    ctx.lineWidth = 1.5 * s;
                    ctx.strokeRect(bx - 65 * s, by - 20 * s, 130 * s, 40 * s);
                    Draw.label(ctx, 'F = m \u00d7 a', bx, by + 2 * s, '#3d8b44', 14 * s);

                    ctx.globalAlpha = 1;
                }
            }
        },

        // ---- Step 3: Terza legge: azione e reazione ----
        {
            title: 'Terza legge: azione e reazione',
            text: 'Per ogni <span class="term" data-term="forza">forza</span> (azione), c\'è una forza <b>uguale e opposta</b> (reazione). Se spingi un muro, il muro ti spinge indietro con la stessa forza.<br><br>' +
                '<span class="highlight">IMPORTANTE</span>: azione e reazione agiscono su oggetti DIVERSI! Il <span class="term" data-term="peso">peso</span> del libro tira la Terra verso il basso, ma non ce ne accorgiamo perché la Terra è troppo massiccia.<br><br>' +
                'Ecco perché il pavimento "spinge in su" con la <span class="term" data-term="reazione-normale">reazione normale</span> N = P.',
            formula: '\\vec{F}_{A \\to B} = -\\vec{F}_{B \\to A}',
            cleanDraw: true,
            duration: 1600,
            draw(ctx, w, h, p) {
                const s = Draw.S(w, h);
                ctx.fillStyle = '#faf8f5';
                ctx.fillRect(0, 0, w, h);

                // --- Scene 1: Hand pushing wall ---
                if (p > 0.05) {
                    const fp = Math.min(1, (p - 0.05) / 0.3);
                    ctx.globalAlpha = fp;

                    const wallX = w * 0.35;
                    const sceneY = h * 0.32;

                    // Wall
                    Draw.roundRect(ctx, wallX, sceneY - 50 * s, 18 * s, 100 * s, 2 * s, '#b0a898');
                    ctx.strokeStyle = '#9a8e80';
                    ctx.lineWidth = 1 * s;
                    // Brick lines
                    for (let i = 0; i < 5; i++) {
                        const ly = sceneY - 50 * s + i * 20 * s;
                        ctx.beginPath();
                        ctx.moveTo(wallX, ly);
                        ctx.lineTo(wallX + 18 * s, ly);
                        ctx.stroke();
                    }

                    // Hand (simplified)
                    const handX = wallX - 40 * s;
                    Draw.roundRect(ctx, handX - 20 * s, sceneY - 10 * s, 40 * s, 20 * s, 5 * s, '#e8c8a0');
                    // Arm
                    ctx.strokeStyle = '#d4b088';
                    ctx.lineWidth = 12 * s;
                    ctx.lineCap = 'round';
                    ctx.beginPath();
                    ctx.moveTo(handX - 20 * s, sceneY);
                    ctx.lineTo(handX - 65 * s, sceneY + 30 * s);
                    ctx.stroke();

                    // Object borders for clarity
                    // Hand -> Wall force (action, red)
                    if (fp > 0.4) {
                        const ap = Math.min(1, (fp - 0.4) / 0.4);
                        Draw.animatedArrow(ctx, handX + 20 * s, sceneY - 22 * s, wallX + 5 * s, sceneY - 22 * s, '#c46b60', ap, 2.5 * s, 9 * s);
                        if (ap > 0.5) Draw.label(ctx, 'F (mano\u2192muro)', wallX - 20 * s, sceneY - 38 * s, '#c46b60', 8 * s, false);
                    }

                    // Wall -> Hand force (reaction, blue)
                    if (fp > 0.6) {
                        const rp = Math.min(1, (fp - 0.6) / 0.4);
                        Draw.animatedArrow(ctx, wallX - 2 * s, sceneY + 22 * s, handX + 5 * s, sceneY + 22 * s, '#5a8fa8', rp, 2.5 * s, 9 * s);
                        if (rp > 0.5) Draw.label(ctx, 'F (muro\u2192mano)', wallX - 25 * s, sceneY + 38 * s, '#5a8fa8', 8 * s, false);
                    }

                    ctx.globalAlpha = 1;
                }

                // --- Scene 2: Book on table ---
                if (p > 0.35) {
                    const fp = Math.min(1, (p - 0.35) / 0.3);
                    ctx.globalAlpha = fp;

                    const tableX = w * 0.68;
                    const tableY = h * 0.62;
                    const tableW = 120 * s;

                    // Table
                    Draw.roundRect(ctx, tableX - tableW / 2, tableY, tableW, 10 * s, 2 * s, '#b0a898');
                    // Table legs
                    ctx.fillStyle = '#9a8e80';
                    ctx.fillRect(tableX - tableW / 2 + 8 * s, tableY + 10 * s, 6 * s, 30 * s);
                    ctx.fillRect(tableX + tableW / 2 - 14 * s, tableY + 10 * s, 6 * s, 30 * s);

                    // Book
                    const bookW = 50 * s;
                    const bookH = 14 * s;
                    Draw.roundRect(ctx, tableX - bookW / 2, tableY - bookH, bookW, bookH, 3 * s, '#5a8fa8');
                    Draw.label(ctx, 'Libro', tableX, tableY - bookH / 2, '#fff', 8 * s);

                    // Weight (P) arrow down from book
                    const pX = tableX - 15 * s;
                    if (fp > 0.4) {
                        const ap = Math.min(1, (fp - 0.4) / 0.4);
                        Draw.animatedArrow(ctx, pX, tableY, pX, tableY + 45 * s, '#c46b60', ap, 2.5 * s, 9 * s);
                        if (ap > 0.5) Draw.label(ctx, 'P', tableX - 28 * s, tableY + 28 * s, '#c46b60', 12 * s);
                    }

                    // Normal (N) arrow up from book
                    const nX = tableX + 15 * s;
                    const nStartY = tableY - bookH;
                    if (fp > 0.6) {
                        const np = Math.min(1, (fp - 0.6) / 0.4);
                        Draw.animatedArrow(ctx, nX, nStartY, nX, nStartY - 45 * s, '#5a8fa8', np, 2.5 * s, 9 * s);
                        if (np > 0.5) Draw.label(ctx, 'N', tableX + 28 * s, nStartY - 28 * s, '#5a8fa8', 12 * s);
                    }

                    ctx.globalAlpha = 1;
                }

                // "Su oggetti DIVERSI!" label
                if (p > 0.7) {
                    const lp = Math.min(1, (p - 0.7) / 0.2);
                    ctx.globalAlpha = lp;

                    const bx = w * 0.5;
                    const by = h * 0.9;
                    Draw.roundRect(ctx, bx - 95 * s, by - 14 * s, 190 * s, 30 * s, 6 * s, '#fef3ee');
                    ctx.strokeStyle = '#d4956a';
                    ctx.lineWidth = 1.5 * s;
                    ctx.strokeRect(bx - 95 * s, by - 14 * s, 190 * s, 30 * s);
                    Draw.label(ctx, 'Su oggetti DIVERSI!', bx, by + 2 * s, '#d4956a', 12 * s);

                    ctx.globalAlpha = 1;
                }
            }
        },

        // ---- Step 4: Le tre leggi insieme ----
        {
            title: 'Le tre leggi insieme',
            text: 'Le tre leggi lavorano insieme. Pensiamo all\'auto sul carro attrezzi:<br><br>' +
                'La <b>prima legge</b> ci dice che l\'auto è in <span class="term" data-term="equilibrio">equilibrio</span> (\u03a3F = 0, perché è ferma). La <b>seconda legge</b> conferma: a = 0, quindi la forza netta è zero. La <b>terza legge</b> spiega PERCHE esiste la <span class="term" data-term="reazione-normale">reazione normale</span>: l\'auto spinge il piano, il piano risponde.<br><br>' +
                'Ogni volta che risolvi un problema, stai usando tutte e tre le leggi!',
            formula: null,
            cleanDraw: true,
            duration: 1600,
            draw(ctx, w, h, p) {
                const s = Draw.S(w, h);
                ctx.fillStyle = '#faf8f5';
                ctx.fillRect(0, 0, w, h);

                const cx = w * 0.45;
                const cy = h * 0.48;

                // --- Inclined plane with car ---
                if (p > 0.03) {
                    const fp = Math.min(1, (p - 0.03) / 0.25);
                    ctx.globalAlpha = fp;

                    // Inclined plane
                    const rampLeft = cx - 100 * s;
                    const rampRight = cx + 60 * s;
                    const rampBottom = cy + 60 * s;
                    const rampTop = cy - 20 * s;
                    const angle = Math.atan2(rampBottom - rampTop, rampRight - rampLeft);

                    ctx.fillStyle = '#e0d8cc';
                    ctx.beginPath();
                    ctx.moveTo(rampLeft, rampBottom);
                    ctx.lineTo(rampRight, rampTop);
                    ctx.lineTo(rampRight, rampBottom);
                    ctx.closePath();
                    ctx.fill();
                    ctx.strokeStyle = '#b0a898';
                    ctx.lineWidth = 1.5 * s;
                    ctx.stroke();

                    // Car on the ramp (small box)
                    const carX = (rampLeft + rampRight) / 2 - 10 * s;
                    const carY = (rampBottom + rampTop) / 2 + 5 * s;

                    ctx.save();
                    ctx.translate(carX, carY);
                    ctx.rotate(-angle);
                    Draw.roundRect(ctx, -25 * s, -18 * s, 50 * s, 18 * s, 4 * s, '#5a8fa8');
                    // Roof
                    Draw.roundRect(ctx, -15 * s, -28 * s, 30 * s, 12 * s, 3 * s, '#4a7d94');
                    // Wheels
                    Draw.circle(ctx, -15 * s, 2 * s, 5 * s, '#555', '#444', 1 * s);
                    Draw.circle(ctx, 15 * s, 2 * s, 5 * s, '#555', '#444', 1 * s);
                    ctx.restore();

                    // Force arrows from car center
                    // Weight (P) straight down
                    Draw.animatedArrow(ctx, carX, carY, carX, carY + 55 * s, '#c46b60', fp, 2.5 * s, 9 * s);
                    Draw.label(ctx, 'P', carX + 12 * s, carY + 50 * s, '#c46b60', 11 * s);

                    // Normal (N) perpendicular to surface
                    const nx = carX + 45 * s * Math.sin(angle);
                    const ny = carY - 45 * s * Math.cos(angle);
                    Draw.animatedArrow(ctx, carX, carY, nx, ny, '#5a8fa8', fp, 2.5 * s, 9 * s);
                    Draw.label(ctx, 'N', nx + 10 * s, ny - 8 * s, '#5a8fa8', 11 * s);

                    // Tension (T) up the ramp
                    const tx = carX - 50 * s * Math.cos(angle);
                    const ty = carY + 50 * s * Math.sin(angle);
                    Draw.animatedArrow(ctx, carX, carY, tx, ty, '#5a9a6a', fp, 2.5 * s, 9 * s);
                    Draw.label(ctx, 'T', tx - 12 * s, ty - 8 * s, '#5a9a6a', 11 * s);

                    ctx.globalAlpha = 1;
                }

                // --- Badge 1: 1a legge ---
                if (p > 0.3) {
                    const bp = Math.min(1, (p - 0.3) / 0.2);
                    ctx.globalAlpha = bp;

                    const bx = w * 0.82;
                    const by = h * 0.18;
                    Draw.roundRect(ctx, bx - 80 * s, by - 14 * s, 160 * s, 30 * s, 6 * s, '#fef3ee');
                    ctx.strokeStyle = '#d4956a';
                    ctx.lineWidth = 1.2 * s;
                    ctx.strokeRect(bx - 80 * s, by - 14 * s, 160 * s, 30 * s);
                    Draw.label(ctx, '1\u00aa legge: fermo \u2192 \u03a3F=0', bx, by + 2 * s, '#d4956a', 10 * s);

                    // Connecting line
                    ctx.strokeStyle = '#d4956a';
                    ctx.lineWidth = 1 * s;
                    ctx.setLineDash([4 * s, 4 * s]);
                    ctx.beginPath();
                    ctx.moveTo(bx - 80 * s, by + 16 * s);
                    ctx.lineTo(cx + 20 * s, cy - 30 * s);
                    ctx.stroke();
                    ctx.setLineDash([]);

                    ctx.globalAlpha = 1;
                }

                // --- Badge 2: 2a legge ---
                if (p > 0.5) {
                    const bp = Math.min(1, (p - 0.5) / 0.2);
                    ctx.globalAlpha = bp;

                    const bx = w * 0.82;
                    const by = h * 0.48;
                    Draw.roundRect(ctx, bx - 80 * s, by - 14 * s, 160 * s, 30 * s, 6 * s, '#e4f2e7');
                    ctx.strokeStyle = '#81c784';
                    ctx.lineWidth = 1.2 * s;
                    ctx.strokeRect(bx - 80 * s, by - 14 * s, 160 * s, 30 * s);
                    Draw.label(ctx, '2\u00aa legge: a=0 \u2192 F=ma=0', bx, by + 2 * s, '#3d8b44', 10 * s);

                    // Connecting line
                    ctx.strokeStyle = '#81c784';
                    ctx.lineWidth = 1 * s;
                    ctx.setLineDash([4 * s, 4 * s]);
                    ctx.beginPath();
                    ctx.moveTo(bx - 80 * s, by);
                    ctx.lineTo(cx + 30 * s, cy);
                    ctx.stroke();
                    ctx.setLineDash([]);

                    ctx.globalAlpha = 1;
                }

                // --- Badge 3: 3a legge ---
                if (p > 0.7) {
                    const bp = Math.min(1, (p - 0.7) / 0.2);
                    ctx.globalAlpha = bp;

                    const bx = w * 0.82;
                    const by = h * 0.78;
                    Draw.roundRect(ctx, bx - 80 * s, by - 14 * s, 160 * s, 30 * s, 6 * s, 'rgba(90,143,168,0.15)');
                    ctx.strokeStyle = '#5a8fa8';
                    ctx.lineWidth = 1.2 * s;
                    ctx.strokeRect(bx - 80 * s, by - 14 * s, 160 * s, 30 * s);
                    Draw.label(ctx, '3\u00aa legge: auto\u2194piano, N', bx, by + 2 * s, '#5a8fa8', 10 * s);

                    // Connecting line
                    ctx.strokeStyle = '#5a8fa8';
                    ctx.lineWidth = 1 * s;
                    ctx.setLineDash([4 * s, 4 * s]);
                    ctx.beginPath();
                    ctx.moveTo(bx - 80 * s, by - 14 * s);
                    ctx.lineTo(cx + 40 * s, cy + 20 * s);
                    ctx.stroke();
                    ctx.setLineDash([]);

                    ctx.globalAlpha = 1;
                }
            }
        },

        // ---- Step 5: Perché servono? ----
        {
            title: 'Perché servono?',
            text: 'Ogni problema di questo corso usa le leggi di Newton! <b>Problema 1</b> (carro attrezzi): equilibrio significa \u03a3F = 0 (1\u00aa legge), e così troviamo la tensione.<br><br>' +
                '<b>Problema 2</b> (scala a pioli): equilibrio di forze E di momenti. <b>Problema 3</b> (biliardo): l\'<span class="term" data-term="impulso">impulso</span> cambia la <span class="term" data-term="quantita-di-moto">quantità di moto</span>, che è la 2\u00aa legge sotto mentite spoglie (F = \u0394p/\u0394t).<br><br>' +
                'Le leggi di Newton sono le <span class="highlight">fondamenta di TUTTA la meccanica</span>!',
            formula: 'F \\cdot \\Delta t = \\Delta p \\quad \\text{è la 2ª legge in forma di impulso!}',
            cleanDraw: true,
            duration: 1400,
            draw(ctx, w, h, p) {
                const s = Draw.S(w, h);
                ctx.fillStyle = '#faf8f5';
                ctx.fillRect(0, 0, w, h);

                const centerX = w * 0.5;
                const centerY = h * 0.5;

                // Central "Newton" label
                if (p > 0.03) {
                    const fp = Math.min(1, (p - 0.03) / 0.15);
                    ctx.globalAlpha = fp;

                    Draw.roundRect(ctx, centerX - 45 * s, centerY - 16 * s, 90 * s, 32 * s, 8 * s, '#9b6fb5');
                    Draw.label(ctx, 'Newton', centerX, centerY + 2 * s, '#fff', 13 * s);

                    ctx.globalAlpha = 1;
                }

                // --- Vignette 1: Car on ramp (top-left) ---
                if (p > 0.15) {
                    const fp = Math.min(1, (p - 0.15) / 0.25);
                    ctx.globalAlpha = fp;

                    const vx = w * 0.17;
                    const vy = h * 0.22;

                    // Mini ramp
                    ctx.fillStyle = '#e0d8cc';
                    ctx.beginPath();
                    ctx.moveTo(vx - 35 * s, vy + 20 * s);
                    ctx.lineTo(vx + 25 * s, vy - 10 * s);
                    ctx.lineTo(vx + 25 * s, vy + 20 * s);
                    ctx.closePath();
                    ctx.fill();

                    // Mini car
                    Draw.roundRect(ctx, vx - 12 * s, vy - 4 * s, 20 * s, 10 * s, 2 * s, '#5a8fa8');

                    // ΣF=0 label
                    Draw.label(ctx, '\u03a3F = 0', vx, vy + 34 * s, '#c46b60', 10 * s);

                    // Badge: 1a legge
                    Draw.roundRect(ctx, vx - 28 * s, vy - 30 * s, 56 * s, 18 * s, 4 * s, '#fef3ee');
                    ctx.strokeStyle = '#d4956a';
                    ctx.lineWidth = 1 * s;
                    ctx.strokeRect(vx - 28 * s, vy - 30 * s, 56 * s, 18 * s);
                    Draw.label(ctx, '1\u00aa legge', vx, vy - 20 * s, '#d4956a', 8 * s);

                    // Connecting line to center
                    ctx.strokeStyle = '#9b6fb5';
                    ctx.lineWidth = 1 * s;
                    ctx.setLineDash([3 * s, 3 * s]);
                    ctx.beginPath();
                    ctx.moveTo(vx + 30 * s, vy + 10 * s);
                    ctx.lineTo(centerX - 45 * s, centerY - 5 * s);
                    ctx.stroke();
                    ctx.setLineDash([]);

                    ctx.globalAlpha = 1;
                }

                // --- Vignette 2: Ladder (top-right) ---
                if (p > 0.35) {
                    const fp = Math.min(1, (p - 0.35) / 0.25);
                    ctx.globalAlpha = fp;

                    const vx = w * 0.83;
                    const vy = h * 0.22;

                    // Wall
                    ctx.fillStyle = '#b0a898';
                    ctx.fillRect(vx + 15 * s, vy - 30 * s, 8 * s, 60 * s);

                    // Floor
                    ctx.strokeStyle = '#b0a898';
                    ctx.lineWidth = 1.5 * s;
                    ctx.beginPath();
                    ctx.moveTo(vx - 30 * s, vy + 30 * s);
                    ctx.lineTo(vx + 23 * s, vy + 30 * s);
                    ctx.stroke();

                    // Ladder
                    ctx.strokeStyle = '#d4956a';
                    ctx.lineWidth = 2.5 * s;
                    ctx.beginPath();
                    ctx.moveTo(vx - 20 * s, vy + 28 * s);
                    ctx.lineTo(vx + 15 * s, vy - 25 * s);
                    ctx.stroke();
                    // Rungs
                    for (let i = 1; i < 4; i++) {
                        const t = i / 4;
                        const rx = vx - 20 * s + t * 35 * s;
                        const ry = vy + 28 * s - t * 53 * s;
                        ctx.strokeStyle = '#c0884a';
                        ctx.lineWidth = 1.5 * s;
                        ctx.beginPath();
                        ctx.moveTo(rx - 4 * s, ry - 3 * s);
                        ctx.lineTo(rx + 4 * s, ry + 3 * s);
                        ctx.stroke();
                    }

                    // Forces balanced label
                    Draw.label(ctx, 'Forze + momenti', vx - 5 * s, vy + 44 * s, '#5a9a6a', 8 * s, false);

                    // Badge: Equilibrio
                    Draw.roundRect(ctx, vx - 32 * s, vy - 45 * s, 64 * s, 18 * s, 4 * s, '#e4f2e7');
                    ctx.strokeStyle = '#81c784';
                    ctx.lineWidth = 1 * s;
                    ctx.strokeRect(vx - 32 * s, vy - 45 * s, 64 * s, 18 * s);
                    Draw.label(ctx, 'Equilibrio', vx, vy - 35 * s, '#3d8b44', 8 * s);

                    // Connecting line to center
                    ctx.strokeStyle = '#9b6fb5';
                    ctx.lineWidth = 1 * s;
                    ctx.setLineDash([3 * s, 3 * s]);
                    ctx.beginPath();
                    ctx.moveTo(vx - 30 * s, vy + 20 * s);
                    ctx.lineTo(centerX + 45 * s, centerY - 5 * s);
                    ctx.stroke();
                    ctx.setLineDash([]);

                    ctx.globalAlpha = 1;
                }

                // --- Vignette 3: Billiard collision (bottom) ---
                if (p > 0.55) {
                    const fp = Math.min(1, (p - 0.55) / 0.25);
                    ctx.globalAlpha = fp;

                    const vx = w * 0.5;
                    const vy = h * 0.82;

                    // Two billiard balls
                    Draw.circle(ctx, vx - 22 * s, vy, 12 * s, '#c46b60', '#a04a40', 1.5 * s);
                    Draw.circle(ctx, vx + 22 * s, vy, 12 * s, '#5a8fa8', '#3a6f88', 1.5 * s);

                    // Impact flash
                    Draw.label(ctx, '\u2217', vx, vy - 2 * s, '#d4956a', 16 * s);

                    // Impulse arrows
                    Draw.animatedArrow(ctx, vx - 36 * s, vy, vx - 60 * s, vy, '#c46b60', fp, 2 * s, 7 * s);
                    Draw.animatedArrow(ctx, vx + 36 * s, vy, vx + 60 * s, vy, '#5a8fa8', fp, 2 * s, 7 * s);

                    // F·Δt = Δp
                    Draw.label(ctx, 'F\u00b7\u0394t = \u0394p', vx, vy + 24 * s, '#9b6fb5', 10 * s);

                    // Badge: 2a legge
                    Draw.roundRect(ctx, vx - 28 * s, vy - 32 * s, 56 * s, 18 * s, 4 * s, 'rgba(155,111,181,0.15)');
                    ctx.strokeStyle = '#9b6fb5';
                    ctx.lineWidth = 1 * s;
                    ctx.strokeRect(vx - 28 * s, vy - 32 * s, 56 * s, 18 * s);
                    Draw.label(ctx, '2\u00aa legge', vx, vy - 22 * s, '#9b6fb5', 8 * s);

                    // Connecting line to center
                    ctx.strokeStyle = '#9b6fb5';
                    ctx.lineWidth = 1 * s;
                    ctx.setLineDash([3 * s, 3 * s]);
                    ctx.beginPath();
                    ctx.moveTo(vx, vy - 32 * s);
                    ctx.lineTo(centerX, centerY + 16 * s);
                    ctx.stroke();
                    ctx.setLineDash([]);

                    ctx.globalAlpha = 1;
                }

                // Final highlight around Newton label
                if (p > 0.85) {
                    const gp = (p - 0.85) / 0.15;
                    ctx.globalAlpha = gp;

                    ctx.strokeStyle = '#9b6fb5';
                    ctx.lineWidth = 2.5 * s;
                    ctx.setLineDash([]);
                    const pulse = 1 + 0.05 * Math.sin(p * 20);
                    const rw = 100 * s * pulse;
                    const rh = 38 * s * pulse;
                    ctx.strokeRect(centerX - rw / 2, centerY - rh / 2, rw, rh);

                    ctx.globalAlpha = 1;
                }
            }
        }
    ];

    const quiz = [
        {
            question: 'Un oggetto si muove a velocit\u00e0 costante in linea retta. La forza totale su di esso \u00e8...',
            options: ['Uguale alla velocit\u00e0', 'Zero', 'Uguale alla massa', 'Costante ma non zero'],
            correct: 1,
            explanation: 'Per la prima legge di Newton, se un oggetto si muove a velocit\u00e0 costante (o \u00e8 fermo), la somma delle forze \u00e8 zero!'
        },
        {
            question: 'Se raddoppi la forza applicata a un oggetto (stessa massa), l\'accelerazione...',
            options: ['Resta uguale', 'Si dimezza', 'Raddoppia', 'Quadruplica'],
            correct: 2,
            explanation: 'Dalla seconda legge, F = ma. Se F raddoppia e m resta uguale, anche a raddoppia. Forza e accelerazione sono direttamente proporzionali!'
        },
        {
            question: 'Spingi un muro con una forza di 50 N. Il muro ti spinge indietro con una forza...',
            options: ['Di 0 N', 'Di 25 N', 'Uguale e opposta (50 N)', 'Maggiore (100 N)'],
            correct: 2,
            explanation: 'Per la terza legge di Newton, ad ogni azione corrisponde una reazione uguale e contraria. Il muro ti spinge con 50 N nella direzione opposta!'
        }
    ];

    return { id: 'newton', title: 'Le tre leggi di Newton', icon: '\u{1F34E}', category: 'Meccanica', order: 3, steps, quiz };
})();
if (typeof TopicRegistry !== 'undefined') TopicRegistry.register(Tema8);
