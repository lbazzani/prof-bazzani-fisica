// ===== Tema 6: I vettori: le basi =====

const Tema6 = (() => {
    const steps = [
        // ---- Step 1: Scalari e vettori ----
        {
            title: 'Scalari e vettori',
            text: 'Alcune grandezze in fisica sono solo numeri: temperatura (20 °C), massa (5 kg), tempo (3 s). Queste si chiamano <b>grandezze scalari</b>.<br><br>' +
                'Altre grandezze hanno bisogno anche di una <b>direzione</b>: <span class="term" data-term="forza">forza</span>, <span class="term" data-term="velocita">velocità</span>, spostamento. Queste sono <b>grandezze vettoriali</b> (<span class="term" data-term="vettore">vettori</span>).<br><br>' +
                'Un vettore è come dare indicazioni stradali: non basta dire <span class="highlight">"cammina 100 metri"</span>, devi dire <span class="highlight">"cammina 100 metri verso NORD"</span>!',
            formula: null,
            cleanDraw: true,
            duration: 1200,
            draw(ctx, w, h, p) {
                const s = Draw.S(w, h);
                ctx.fillStyle = '#faf8f5';
                ctx.fillRect(0, 0, w, h);

                // === LEFT SIDE: Scalar (thermometer + number) ===
                const leftX = w * 0.22;
                const cy = h * 0.5;

                if (p > 0.05) {
                    const fp = Math.min(1, (p - 0.05) / 0.3);
                    ctx.globalAlpha = fp;

                    // Label "SCALARE"
                    Draw.label(ctx, 'SCALARE', leftX, cy - 70 * s, '#c46b60', 13 * s);

                    // Thermometer body
                    const thX = leftX;
                    const thTop = cy - 45 * s;
                    const thBot = cy + 40 * s;
                    const thW = 10 * s;

                    // Tube
                    Draw.roundRect(ctx, thX - thW / 2, thTop, thW, thBot - thTop, 5 * s, '#fff');
                    ctx.strokeStyle = '#c46b60';
                    ctx.lineWidth = 1.5 * s;
                    ctx.beginPath();
                    ctx.arc(thX, thTop, thW / 2, Math.PI, 2 * Math.PI);
                    ctx.lineTo(thX + thW / 2, thBot);
                    ctx.arc(thX, thBot, thW / 2, 0, Math.PI);
                    ctx.closePath();
                    ctx.stroke();

                    // Mercury level (animated)
                    const mercH = (thBot - thTop) * 0.6 * fp;
                    ctx.fillStyle = '#c46b60';
                    ctx.beginPath();
                    ctx.arc(thX, thBot, thW / 2 - 1 * s, 0, Math.PI);
                    ctx.lineTo(thX - thW / 2 + 1 * s, thBot - mercH);
                    ctx.lineTo(thX + thW / 2 - 1 * s, thBot - mercH);
                    ctx.closePath();
                    ctx.fill();

                    // Bulb at bottom
                    Draw.circle(ctx, thX, thBot + 8 * s, 10 * s, '#c46b60', '#a04a40', 1.5 * s);

                    // Temperature label
                    if (fp > 0.5) Draw.label(ctx, '20 °C', leftX + 25 * s, cy, '#c46b60', 12 * s);

                    // "Solo un numero!" caption
                    if (fp > 0.7) Draw.label(ctx, 'Solo un numero!', leftX, cy + 65 * s, '#888', 9 * s, false);

                    ctx.globalAlpha = 1;
                }

                // === RIGHT SIDE: Vector (arrow with magnitude + direction) ===
                const rightX = w * 0.68;

                if (p > 0.35) {
                    const fp = Math.min(1, (p - 0.35) / 0.35);
                    ctx.globalAlpha = fp;

                    // Label "VETTORE"
                    Draw.label(ctx, 'VETTORE', rightX, cy - 70 * s, '#5a8fa8', 13 * s);

                    // Big vector arrow (diagonal, pointing upper-right)
                    const arrStartX = rightX - 50 * s;
                    const arrStartY = cy + 30 * s;
                    const arrEndX = rightX + 60 * s;
                    const arrEndY = cy - 35 * s;

                    Draw.animatedArrow(ctx, arrStartX, arrStartY, arrEndX, arrEndY, '#5a8fa8', fp, 4 * s, 13 * s);

                    // Magnitude label (along the arrow)
                    if (fp > 0.5) {
                        Draw.label(ctx, '100 m', rightX - 15 * s, cy - 10 * s, '#5a8fa8', 11 * s);
                    }

                    // Direction indicator (small "N" with arrow)
                    if (fp > 0.7) {
                        // Compass hint
                        Draw.label(ctx, 'N \u2191', rightX + 65 * s, cy - 45 * s, '#5a9a6a', 11 * s);
                        Draw.label(ctx, 'Numero + direzione!', rightX + 5 * s, cy + 65 * s, '#888', 9 * s, false);
                    }

                    ctx.globalAlpha = 1;
                }

                // Divider line
                if (p > 0.2) {
                    ctx.globalAlpha = Math.min(1, (p - 0.2) / 0.2) * 0.3;
                    Draw.dashedLine(ctx, w * 0.45, h * 0.15, w * 0.45, h * 0.85, '#888', 1 * s);
                    ctx.globalAlpha = 1;
                }
            }
        },

        // ---- Step 2: Rappresentare un vettore ----
        {
            title: 'Rappresentare un vettore',
            text: 'Un <span class="term" data-term="vettore">vettore</span> si disegna come una <b>freccia</b>. Ha tre proprietà:<br><br>' +
                '1. <b>Modulo</b> (intensità): la lunghezza della freccia<br>' +
                '2. <b>Direzione</b>: la retta su cui giace la freccia<br>' +
                '3. <b>Verso</b>: da che parte punta la freccia<br><br>' +
                'Per indicare che una grandezza è un vettore, scriviamo una freccetta sopra il simbolo: <span class="highlight">F\u20D7</span>',
            formula: '\\vec{F} \\quad \\longrightarrow \\quad |\\vec{F}| = \\text{modulo (intensità)}',
            cleanDraw: true,
            duration: 1400,
            draw(ctx, w, h, p) {
                const s = Draw.S(w, h);
                ctx.fillStyle = '#faf8f5';
                ctx.fillRect(0, 0, w, h);

                const cx = w * 0.4;
                const cy = h * 0.5;

                // Big arrow in center
                const arrStartX = cx - 100 * s;
                const arrStartY = cy + 40 * s;
                const arrEndX = cx + 100 * s;
                const arrEndY = cy - 40 * s;

                ctx.globalAlpha = Math.min(1, p * 3);
                Draw.animatedArrow(ctx, arrStartX, arrStartY, arrEndX, arrEndY, '#5a8fa8', Math.min(1, p * 2.5), 5 * s, 15 * s);

                // The dashed line extending the direction
                if (p > 0.1) {
                    const lp = Math.min(1, (p - 0.1) / 0.2);
                    ctx.globalAlpha = lp * 0.3;
                    // Extend line in both directions
                    const dx = arrEndX - arrStartX;
                    const dy = arrEndY - arrStartY;
                    const len = Math.sqrt(dx * dx + dy * dy);
                    const ux = dx / len;
                    const uy = dy / len;
                    Draw.dashedLine(ctx, arrStartX - ux * 40 * s, arrStartY - uy * 40 * s, arrEndX + ux * 40 * s, arrEndY + uy * 40 * s, '#5a8fa8', 1.2 * s);
                    ctx.globalAlpha = 1;
                }

                // Label 1: MODULO (length) — appears first
                if (p > 0.2) {
                    const fp = Math.min(1, (p - 0.2) / 0.25);
                    ctx.globalAlpha = fp;

                    // Bracket-like marks along the arrow to show length
                    const midArrX = (arrStartX + arrEndX) / 2;
                    const midArrY = (arrStartY + arrEndY) / 2;

                    // Info box for modulo
                    const bx = w * 0.72;
                    const by = h * 0.18;
                    Draw.roundRect(ctx, bx - 55 * s, by - 14 * s, 110 * s, 28 * s, 5 * s, '#fef3ee');
                    ctx.strokeStyle = '#d4956a';
                    ctx.lineWidth = 1.2 * s;
                    ctx.strokeRect(bx - 55 * s, by - 14 * s, 110 * s, 28 * s);
                    Draw.label(ctx, '1. MODULO', bx, by, '#d4956a', 11 * s);

                    // Line pointing to arrow middle
                    ctx.strokeStyle = '#d4956a';
                    ctx.lineWidth = 1 * s;
                    ctx.setLineDash([4 * s, 3 * s]);
                    ctx.beginPath();
                    ctx.moveTo(bx - 55 * s, by);
                    ctx.lineTo(midArrX + 10 * s, midArrY - 15 * s);
                    ctx.stroke();
                    ctx.setLineDash([]);

                    // Small label on arrow
                    Draw.label(ctx, '(lunghezza)', midArrX + 10 * s, midArrY - 25 * s, '#d4956a', 9 * s, false);

                    ctx.globalAlpha = 1;
                }

                // Label 2: DIREZIONE (the line) — appears second
                if (p > 0.45) {
                    const fp = Math.min(1, (p - 0.45) / 0.25);
                    ctx.globalAlpha = fp;

                    const bx = w * 0.75;
                    const by = h * 0.5;
                    Draw.roundRect(ctx, bx - 60 * s, by - 14 * s, 120 * s, 28 * s, 5 * s, '#fef3ee');
                    ctx.strokeStyle = '#d4956a';
                    ctx.lineWidth = 1.2 * s;
                    ctx.strokeRect(bx - 60 * s, by - 14 * s, 120 * s, 28 * s);
                    Draw.label(ctx, '2. DIREZIONE', bx, by, '#5a9a6a', 11 * s);

                    // Line pointing to the arrow body
                    ctx.strokeStyle = '#5a9a6a';
                    ctx.lineWidth = 1 * s;
                    ctx.setLineDash([4 * s, 3 * s]);
                    ctx.beginPath();
                    ctx.moveTo(bx - 60 * s, by);
                    ctx.lineTo(cx - 30 * s, cy + 10 * s);
                    ctx.stroke();
                    ctx.setLineDash([]);

                    Draw.label(ctx, '(la retta)', cx - 30 * s, cy + 22 * s, '#5a9a6a', 9 * s, false);

                    ctx.globalAlpha = 1;
                }

                // Label 3: VERSO (arrowhead) — appears third
                if (p > 0.65) {
                    const fp = Math.min(1, (p - 0.65) / 0.25);
                    ctx.globalAlpha = fp;

                    const bx = w * 0.78;
                    const by = h * 0.8;
                    Draw.roundRect(ctx, bx - 45 * s, by - 14 * s, 90 * s, 28 * s, 5 * s, '#fef3ee');
                    ctx.strokeStyle = '#d4956a';
                    ctx.lineWidth = 1.2 * s;
                    ctx.strokeRect(bx - 45 * s, by - 14 * s, 90 * s, 28 * s);
                    Draw.label(ctx, '3. VERSO', bx, by, '#9b6fb5', 11 * s);

                    // Line pointing to arrowhead
                    ctx.strokeStyle = '#9b6fb5';
                    ctx.lineWidth = 1 * s;
                    ctx.setLineDash([4 * s, 3 * s]);
                    ctx.beginPath();
                    ctx.moveTo(bx - 45 * s, by);
                    ctx.lineTo(arrEndX - 5 * s, arrEndY + 10 * s);
                    ctx.stroke();
                    ctx.setLineDash([]);

                    Draw.label(ctx, '(la punta)', arrEndX + 15 * s, arrEndY + 5 * s, '#9b6fb5', 9 * s, false);

                    ctx.globalAlpha = 1;
                }
            }
        },

        // ---- Step 3: Le componenti ----
        {
            title: 'Le componenti',
            text: 'Qualsiasi <span class="term" data-term="vettore">vettore</span> può essere scomposto in due parti perpendicolari chiamate <span class="term" data-term="componente">componenti</span>.<br><br>' +
                'È come dire: invece di camminare in diagonale, prima vado in orizzontale e poi in verticale. Il risultato è lo stesso!<br><br>' +
                'Se conosci l\'angolo <b>\u03B1</b>, trovi le componenti con <span class="highlight">seno e coseno</span>: la componente orizzontale usa il coseno, quella verticale usa il seno.',
            formula: 'F_x = F \\cos\\alpha \\qquad F_y = F \\sin\\alpha',
            cleanDraw: true,
            duration: 1600,
            draw(ctx, w, h, p) {
                const s = Draw.S(w, h);
                ctx.fillStyle = '#faf8f5';
                ctx.fillRect(0, 0, w, h);

                const ox = w * 0.25;
                const oy = h * 0.7;
                const fLen = 150 * s;
                const angle = Math.PI / 6; // 30 degrees
                const endX = ox + fLen * Math.cos(angle);
                const endY = oy - fLen * Math.sin(angle);

                // Axes hint
                ctx.globalAlpha = Math.min(1, p / 0.15) * 0.3;
                Draw.dashedLine(ctx, ox - 20 * s, oy, ox + fLen + 40 * s, oy, '#888', 1 * s);
                Draw.dashedLine(ctx, ox, oy + 20 * s, ox, oy - fLen - 20 * s, '#888', 1 * s);
                ctx.globalAlpha = 1;

                // Main diagonal vector F
                if (p > 0.05) {
                    const fp = Math.min(1, (p - 0.05) / 0.25);
                    ctx.globalAlpha = fp;
                    Draw.animatedArrow(ctx, ox, oy, endX, endY, '#5a8fa8', fp, 4 * s, 13 * s);
                    if (fp > 0.6) Draw.label(ctx, 'F', (ox + endX) / 2 - 15 * s, (oy + endY) / 2 - 12 * s, '#5a8fa8', 15 * s);
                    ctx.globalAlpha = 1;
                }

                // X-component (horizontal)
                if (p > 0.3) {
                    const fp = Math.min(1, (p - 0.3) / 0.25);
                    ctx.globalAlpha = fp;
                    Draw.animatedArrow(ctx, ox, oy, endX, oy, '#c46b60', fp, 3 * s, 10 * s);
                    if (fp > 0.5) Draw.label(ctx, 'Fx = F\u00b7cos\u03B1', (ox + endX) / 2, oy + 20 * s, '#c46b60', 10 * s);
                    ctx.globalAlpha = 1;
                }

                // Y-component (vertical)
                if (p > 0.45) {
                    const fp = Math.min(1, (p - 0.45) / 0.25);
                    ctx.globalAlpha = fp;
                    Draw.animatedArrow(ctx, endX, oy, endX, endY, '#5a9a6a', fp, 3 * s, 10 * s);
                    if (fp > 0.5) Draw.label(ctx, 'Fy = F\u00b7sin\u03B1', endX + 20 * s, (oy + endY) / 2, '#5a9a6a', 10 * s);
                    ctx.globalAlpha = 1;
                }

                // Right angle marker
                if (p > 0.55) {
                    const rap = Math.min(1, (p - 0.55) / 0.15);
                    ctx.globalAlpha = rap;
                    const sq = 12 * s;
                    ctx.strokeStyle = '#888';
                    ctx.lineWidth = 1.5 * s;
                    ctx.beginPath();
                    ctx.moveTo(endX - sq, oy);
                    ctx.lineTo(endX - sq, oy - sq);
                    ctx.lineTo(endX, oy - sq);
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }

                // Angle alpha arc
                if (p > 0.6) {
                    const ap = Math.min(1, (p - 0.6) / 0.2);
                    ctx.globalAlpha = ap;
                    Draw.arc(ctx, ox, oy, 30 * s, -angle, 0, '#d4956a', 2 * s);
                    Draw.label(ctx, '\u03B1', ox + 38 * s, oy - 10 * s, '#d4956a', 13 * s);
                    ctx.globalAlpha = 1;
                }

                // Dashed projection lines
                if (p > 0.5) {
                    ctx.globalAlpha = Math.min(1, (p - 0.5) / 0.2) * 0.4;
                    Draw.dashedLine(ctx, endX, endY, endX, oy, '#888', 1 * s);
                    ctx.globalAlpha = 1;
                }

                // Result box
                if (p > 0.8) {
                    const rp = (p - 0.8) / 0.2;
                    ctx.globalAlpha = rp;

                    const bx = w * 0.68;
                    const by = h * 0.35;
                    Draw.roundRect(ctx, bx - 75 * s, by - 30 * s, 150 * s, 60 * s, 6 * s, '#e4f2e7');
                    ctx.strokeStyle = '#81c784';
                    ctx.lineWidth = 1.5 * s;
                    ctx.strokeRect(bx - 75 * s, by - 30 * s, 150 * s, 60 * s);
                    Draw.label(ctx, 'Fx = F\u00b7cos\u03B1', bx, by - 12 * s, '#3d8b44', 11 * s);
                    Draw.label(ctx, 'Fy = F\u00b7sin\u03B1', bx, by + 12 * s, '#3d8b44', 11 * s);

                    ctx.globalAlpha = 1;
                }
            }
        },

        // ---- Step 4: Somma di vettori ----
        {
            title: 'Somma di vettori',
            text: 'Per sommare i <span class="term" data-term="vettore">vettori</span> graficamente, usa il metodo <b>punta-coda</b>: metti la coda del secondo vettore sulla punta del primo. La <b>risultante</b> va dall\'inizio del primo alla fine del secondo.<br><br>' +
                'Con le <span class="term" data-term="componente">componenti</span> è ancora più facile: sommi le componenti x tra loro e le componenti y tra loro!<br><br>' +
                '<span class="highlight">R<sub>x</sub> = A<sub>x</sub> + B<sub>x</sub></span> e <span class="highlight">R<sub>y</sub> = A<sub>y</sub> + B<sub>y</sub></span>',
            formula: '\\vec{R} = \\vec{A} + \\vec{B} \\qquad R_x = A_x + B_x, \\quad R_y = A_y + B_y',
            cleanDraw: true,
            duration: 1800,
            draw(ctx, w, h, p) {
                const s = Draw.S(w, h);
                ctx.fillStyle = '#faf8f5';
                ctx.fillRect(0, 0, w, h);

                // Tip-to-tail method
                const ox = w * 0.12;
                const oy = h * 0.65;

                // Vector A (horizontal-ish, slight upward)
                const axEnd = ox + 110 * s;
                const ayEnd = oy - 20 * s;

                // Vector B (placed at tip of A, steeper upward)
                const bxEnd = axEnd + 60 * s;
                const byEnd = ayEnd - 80 * s;

                // Draw vector A
                if (p > 0.05) {
                    const fp = Math.min(1, (p - 0.05) / 0.2);
                    ctx.globalAlpha = fp;
                    Draw.animatedArrow(ctx, ox, oy, axEnd, ayEnd, '#c46b60', fp, 3.5 * s, 11 * s);
                    if (fp > 0.5) Draw.label(ctx, 'A', (ox + axEnd) / 2, (oy + ayEnd) / 2 + 18 * s, '#c46b60', 14 * s);
                    ctx.globalAlpha = 1;
                }

                // Draw vector B (tip-to-tail: starts at tip of A)
                if (p > 0.25) {
                    const fp = Math.min(1, (p - 0.25) / 0.2);
                    ctx.globalAlpha = fp;
                    Draw.animatedArrow(ctx, axEnd, ayEnd, bxEnd, byEnd, '#5a8fa8', fp, 3.5 * s, 11 * s);
                    if (fp > 0.5) Draw.label(ctx, 'B', (axEnd + bxEnd) / 2 + 14 * s, (ayEnd + byEnd) / 2, '#5a8fa8', 14 * s);

                    // Label "punta-coda"
                    if (fp > 0.7) {
                        Draw.circle(ctx, axEnd, ayEnd, 5 * s, null, '#d4956a', 2 * s);
                        Draw.label(ctx, 'punta-coda', axEnd + 8 * s, ayEnd + 16 * s, '#d4956a', 9 * s, false);
                    }
                    ctx.globalAlpha = 1;
                }

                // Draw resultant R (from tail of A to tip of B)
                if (p > 0.45) {
                    const fp = Math.min(1, (p - 0.45) / 0.25);
                    ctx.globalAlpha = fp;
                    Draw.animatedArrow(ctx, ox, oy, bxEnd, byEnd, '#5a9a6a', fp, 4 * s, 13 * s);
                    if (fp > 0.6) {
                        Draw.label(ctx, 'R = A + B', (ox + bxEnd) / 2 - 20 * s, (oy + byEnd) / 2 - 14 * s, '#5a9a6a', 13 * s);
                    }
                    ctx.globalAlpha = 1;
                }

                // Component addition box (right side)
                if (p > 0.7) {
                    const cp = Math.min(1, (p - 0.7) / 0.25);
                    ctx.globalAlpha = cp;

                    const bx = w * 0.72;
                    const by = h * 0.35;
                    Draw.roundRect(ctx, bx - 80 * s, by - 40 * s, 160 * s, 80 * s, 6 * s, '#e4f2e7');
                    ctx.strokeStyle = '#81c784';
                    ctx.lineWidth = 1.5 * s;
                    ctx.strokeRect(bx - 80 * s, by - 40 * s, 160 * s, 80 * s);

                    Draw.label(ctx, 'Con le componenti:', bx, by - 22 * s, '#3d8b44', 10 * s, false);
                    Draw.label(ctx, 'Rx = Ax + Bx', bx, by + 0 * s, '#3d8b44', 11 * s);
                    Draw.label(ctx, 'Ry = Ay + By', bx, by + 20 * s, '#3d8b44', 11 * s);

                    ctx.globalAlpha = 1;
                }

                // Dashed parallelogram lines (faint)
                if (p > 0.55) {
                    ctx.globalAlpha = Math.min(1, (p - 0.55) / 0.3) * 0.25;
                    Draw.dashedLine(ctx, ox, oy, ox + (bxEnd - axEnd), oy + (byEnd - ayEnd), '#888', 1 * s);
                    Draw.dashedLine(ctx, ox + (bxEnd - axEnd), oy + (byEnd - ayEnd), bxEnd, byEnd, '#888', 1 * s);
                    ctx.globalAlpha = 1;
                }
            }
        },

        // ---- Step 5: Perche i vettori servono? ----
        {
            title: 'Perché i vettori servono?',
            text: 'In <b>tutti</b> i nostri problemi usiamo i <span class="term" data-term="vettore">vettori</span>!<br><br>' +
                'Il <b>peso</b> sul piano inclinato va scomposto in <span class="term" data-term="componente">componenti</span>. Le <span class="term" data-term="forza">forze</span> sulla scala hanno componenti x e y. Le <span class="term" data-term="velocita">velocità</span> delle palle da biliardo dopo l\'urto hanno componenti x e y.<br><br>' +
                '<span class="highlight">Padroneggiare i vettori = padroneggiare la fisica!</span>',
            formula: null,
            cleanDraw: true,
            duration: 1400,
            draw(ctx, w, h, p) {
                const s = Draw.S(w, h);
                ctx.fillStyle = '#faf8f5';
                ctx.fillRect(0, 0, w, h);

                // === Vignette 1: Inclined plane (left) ===
                if (p > 0.05) {
                    const fp = Math.min(1, (p - 0.05) / 0.3);
                    ctx.globalAlpha = fp;

                    const vx = w * 0.17;
                    const vy = h * 0.55;
                    const planeW = 100 * s;
                    const planeH = 60 * s;

                    // Inclined plane triangle
                    ctx.fillStyle = '#e8e0d4';
                    ctx.beginPath();
                    ctx.moveTo(vx - planeW / 2, vy + planeH / 2);
                    ctx.lineTo(vx + planeW / 2, vy + planeH / 2);
                    ctx.lineTo(vx - planeW / 2, vy - planeH / 2);
                    ctx.closePath();
                    ctx.fill();
                    ctx.strokeStyle = '#b0a594';
                    ctx.lineWidth = 1.5 * s;
                    ctx.stroke();

                    // Small box on the plane
                    const boxX = vx - 10 * s;
                    const boxY = vy - 5 * s;
                    Draw.roundRect(ctx, boxX - 8 * s, boxY - 8 * s, 16 * s, 16 * s, 2 * s, '#5a8fa8');

                    // Weight arrow (down)
                    Draw.arrow(ctx, boxX, boxY, boxX, boxY + 35 * s, '#c46b60', 2 * s, 7 * s);
                    Draw.label(ctx, 'P', boxX + 10 * s, boxY + 25 * s, '#c46b60', 9 * s);

                    // Component along plane
                    if (fp > 0.6) {
                        Draw.arrow(ctx, boxX, boxY, boxX + 22 * s, boxY + 14 * s, '#5a9a6a', 1.5 * s, 6 * s);
                        Draw.arrow(ctx, boxX, boxY, boxX - 8 * s, boxY + 18 * s, '#d4956a', 1.5 * s, 6 * s);
                    }

                    Draw.label(ctx, 'Piano inclinato', vx, vy + planeH / 2 + 18 * s, '#2e2e2e', 9 * s, false);

                    ctx.globalAlpha = 1;
                }

                // === Vignette 2: Ladder (center) ===
                if (p > 0.3) {
                    const fp = Math.min(1, (p - 0.3) / 0.3);
                    ctx.globalAlpha = fp;

                    const vx = w * 0.5;
                    const vy = h * 0.55;
                    const ladderH = 80 * s;

                    // Wall (vertical line)
                    ctx.strokeStyle = '#b0a594';
                    ctx.lineWidth = 3 * s;
                    ctx.beginPath();
                    ctx.moveTo(vx - 30 * s, vy - ladderH / 2 - 10 * s);
                    ctx.lineTo(vx - 30 * s, vy + ladderH / 2 + 10 * s);
                    ctx.stroke();

                    // Floor (horizontal line)
                    ctx.beginPath();
                    ctx.moveTo(vx - 35 * s, vy + ladderH / 2 + 10 * s);
                    ctx.lineTo(vx + 50 * s, vy + ladderH / 2 + 10 * s);
                    ctx.stroke();

                    // Ladder (diagonal line)
                    ctx.strokeStyle = '#d4956a';
                    ctx.lineWidth = 3 * s;
                    ctx.beginPath();
                    ctx.moveTo(vx + 30 * s, vy + ladderH / 2 + 10 * s);
                    ctx.lineTo(vx - 28 * s, vy - ladderH / 2);
                    ctx.stroke();

                    // Rungs
                    for (let i = 1; i <= 3; i++) {
                        const t = i / 4;
                        const rx = vx + 30 * s + t * (-58 * s);
                        const ry = vy + ladderH / 2 + 10 * s + t * (-ladderH - 10 * s);
                        ctx.strokeStyle = '#d4956a';
                        ctx.lineWidth = 1.5 * s;
                        ctx.beginPath();
                        ctx.moveTo(rx - 6 * s, ry - 4 * s);
                        ctx.lineTo(rx + 6 * s, ry + 4 * s);
                        ctx.stroke();
                    }

                    // Force arrows
                    if (fp > 0.6) {
                        // Horizontal force at top (wall reaction)
                        Draw.arrow(ctx, vx - 28 * s, vy - ladderH / 2, vx - 28 * s + 25 * s, vy - ladderH / 2, '#5a8fa8', 1.5 * s, 6 * s);
                        // Vertical force at bottom (normal)
                        Draw.arrow(ctx, vx + 30 * s, vy + ladderH / 2 + 10 * s, vx + 30 * s, vy + ladderH / 2 + 10 * s - 25 * s, '#c46b60', 1.5 * s, 6 * s);
                        // Horizontal force at bottom (friction)
                        Draw.arrow(ctx, vx + 30 * s, vy + ladderH / 2 + 10 * s, vx + 30 * s - 20 * s, vy + ladderH / 2 + 10 * s, '#5a9a6a', 1.5 * s, 6 * s);
                    }

                    Draw.label(ctx, 'Scala a pioli', vx, vy + ladderH / 2 + 28 * s, '#2e2e2e', 9 * s, false);

                    ctx.globalAlpha = 1;
                }

                // === Vignette 3: Billiard balls (right) ===
                if (p > 0.55) {
                    const fp = Math.min(1, (p - 0.55) / 0.3);
                    ctx.globalAlpha = fp;

                    const vx = w * 0.82;
                    const vy = h * 0.5;

                    // Ball 1
                    Draw.circle(ctx, vx - 20 * s, vy, 12 * s, '#c46b60', '#a04a40', 1.5 * s);

                    // Ball 2
                    Draw.circle(ctx, vx + 20 * s, vy + 5 * s, 12 * s, '#5a8fa8', '#3a6f88', 1.5 * s);

                    // Velocity vectors after collision (at angles)
                    if (fp > 0.5) {
                        const vp = Math.min(1, (fp - 0.5) / 0.5);
                        ctx.globalAlpha = vp;

                        // Ball 1 goes upper-right
                        Draw.animatedArrow(ctx, vx - 8 * s, vy - 12 * s, vx + 15 * s, vy - 40 * s, '#c46b60', vp, 2 * s, 7 * s);
                        Draw.label(ctx, 'v\u2081', vx + 18 * s, vy - 42 * s, '#c46b60', 9 * s);

                        // Ball 2 goes lower-right
                        Draw.animatedArrow(ctx, vx + 32 * s, vy + 15 * s, vx + 55 * s, vy + 38 * s, '#5a8fa8', vp, 2 * s, 7 * s);
                        Draw.label(ctx, 'v\u2082', vx + 58 * s, vy + 40 * s, '#5a8fa8', 9 * s);

                        ctx.globalAlpha = 1;
                    }

                    ctx.globalAlpha = fp;
                    Draw.label(ctx, 'Urto biliardo', vx, vy + 50 * s, '#2e2e2e', 9 * s, false);

                    ctx.globalAlpha = 1;
                }

                // Title banner at top
                if (p > 0.1) {
                    const tp = Math.min(1, (p - 0.1) / 0.3);
                    ctx.globalAlpha = tp;

                    const bx = w * 0.5;
                    const by = h * 0.1;
                    Draw.roundRect(ctx, bx - 110 * s, by - 18 * s, 220 * s, 36 * s, 6 * s, '#e4f2e7');
                    ctx.strokeStyle = '#81c784';
                    ctx.lineWidth = 1.5 * s;
                    ctx.strokeRect(bx - 110 * s, by - 18 * s, 220 * s, 36 * s);
                    Draw.label(ctx, 'I vettori sono ovunque!', bx, by, '#3d8b44', 12 * s);

                    ctx.globalAlpha = 1;
                }
            }
        }
    ];

    return { id: 'vettori', title: 'I vettori: le basi', icon: '\u{27A1}\u{FE0F}', category: 'Strumenti', order: 2, steps };
})();
if (typeof TopicRegistry !== 'undefined') TopicRegistry.register(Tema6);
