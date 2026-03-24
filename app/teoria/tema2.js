// ===== Tema 2: Il piano inclinato =====

const Tema2 = (() => {
    const steps = [

        // ---- STEP 1: Perché scomporre le forze? ----
        {
            title: 'Perché scomporre le forze?',
            text: 'Quando una <span class="term" data-term="forza">forza</span> agisce in diagonale, è difficile capire cosa succede. ' +
                'Il trucco è <b>scomporla</b> in due <span class="term" data-term="componente">componenti</span>: una orizzontale e una verticale.<br><br>' +
                'Così possiamo studiare separatamente ciò che succede in ogni direzione. ' +
                'È come dire: invece di correre in diagonale, faccio prima un pezzo dritto e poi uno in su!',
            formula: null,
            cleanDraw: true,
            draw(ctx, w, h, p) {
                ctx.fillStyle = '#faf8f5';
                ctx.fillRect(0, 0, w, h);
                const s = Draw.S(w, h);

                // Left side: diagonal arrow (confusing)
                const lx = w * 0.22, ly = h * 0.65;
                const dx = 90 * s, dy = -70 * s;

                Draw.label(ctx, 'Forza diagonale...', lx, ly - 90 * s, '#888', 11 * s, false);

                // Draw the diagonal arrow
                Draw.animatedArrow(ctx, lx, ly, lx + dx, ly + dy, '#c46b60', Math.min(1, p * 2.5), 3 * s, 10 * s);
                if (p > 0.3) {
                    Draw.label(ctx, 'F', lx + dx + 12 * s, ly + dy - 8 * s, '#c46b60', 13 * s);
                    Draw.label(ctx, '???', lx + dx * 0.5 - 18 * s, ly + dy * 0.5, '#888', 12 * s, false);
                }

                // Separator
                if (p > 0.35) {
                    ctx.globalAlpha = Math.min(1, (p - 0.35) * 4);
                    Draw.dashedLine(ctx, w * 0.47, h * 0.15, w * 0.47, h * 0.85, '#ccc', 1.5 * s);
                    Draw.label(ctx, '→', w * 0.50, h * 0.50, '#5a9a6a', 22 * s);
                    ctx.globalAlpha = 1;
                }

                // Right side: decomposed
                if (p > 0.4) {
                    const rp = Math.min(1, (p - 0.4) * 2.5);
                    const rx = w * 0.68, ry = h * 0.65;

                    Draw.label(ctx, '...scomposta!', rx + 10 * s, ry - 90 * s, '#5a9a6a', 11 * s, false);

                    // Horizontal component (Fx)
                    Draw.animatedArrow(ctx, rx, ry, rx + dx, ry, '#5a8fa8', rp, 3 * s, 10 * s);
                    if (rp > 0.5) {
                        Draw.label(ctx, 'Fx', rx + dx + 12 * s, ry + 2 * s, '#5a8fa8', 13 * s);
                    }

                    // Vertical component (Fy)
                    Draw.animatedArrow(ctx, rx, ry, rx, ry + dy, '#9b6fb5', rp, 3 * s, 10 * s);
                    if (rp > 0.5) {
                        Draw.label(ctx, 'Fy', rx - 16 * s, ry + dy - 6 * s, '#9b6fb5', 13 * s);
                    }

                    // Dashed lines showing the rectangle
                    if (rp > 0.7) {
                        ctx.globalAlpha = (rp - 0.7) / 0.3;
                        Draw.dashedLine(ctx, rx + dx, ry, rx + dx, ry + dy, '#bbb', 1 * s);
                        Draw.dashedLine(ctx, rx, ry + dy, rx + dx, ry + dy, '#bbb', 1 * s);
                        // Original diagonal (ghost)
                        Draw.dashedLine(ctx, rx, ry, rx + dx, ry + dy, '#c46b60', 1 * s);
                        ctx.globalAlpha = 1;
                    }
                }
            }
        },

        // ---- STEP 2: Seno e coseno: cosa sono? ----
        {
            title: 'Seno e coseno: cosa sono?',
            text: 'In un <span class="term" data-term="triangolo-rettangolo">triangolo rettangolo</span>, il <span class="term" data-term="seno-coseno">seno e il coseno</span> di un angolo ci dicono ' +
                'il rapporto tra i lati:<br><br>' +
                '&bull; <b>sin α</b> = cateto opposto / ipotenusa<br>' +
                '&bull; <b>cos α</b> = cateto adiacente / ipotenusa<br><br>' +
                'Sono i nostri strumenti per calcolare le componenti di qualsiasi forza!',
            formula: '\\sin \\alpha = \\frac{\\text{opposto}}{\\text{ipotenusa}} \\qquad \\cos \\alpha = \\frac{\\text{adiacente}}{\\text{ipotenusa}}',
            cleanDraw: true,
            draw(ctx, w, h, p) {
                ctx.fillStyle = '#faf8f5';
                ctx.fillRect(0, 0, w, h);
                const s = Draw.S(w, h);

                const cx = w * 0.45, cy = h * 0.55;
                const hyp = 160 * s * p;
                const angle = Math.PI / 5; // ~36 degrees
                const adjLen = hyp * Math.cos(angle);
                const oppLen = hyp * Math.sin(angle);

                // Triangle vertices
                const ax = cx, ay = cy;                     // angle vertex (bottom-left)
                const bx = cx + adjLen, by = cy;            // bottom-right
                const bxTop = cx + adjLen, byTop = cy - oppLen; // top-right

                if (p > 0.05) {
                    // Draw triangle
                    ctx.strokeStyle = '#2e2e2e';
                    ctx.lineWidth = 2.5 * s;
                    ctx.lineCap = 'round';
                    ctx.beginPath();
                    ctx.moveTo(ax, ay);
                    ctx.lineTo(bx, by);
                    ctx.lineTo(bxTop, byTop);
                    ctx.closePath();
                    ctx.stroke();

                    // Fill triangle lightly
                    ctx.fillStyle = 'rgba(90,143,168,0.06)';
                    ctx.fill();

                    // Right angle mark at bottom-right
                    const sqS = 10 * s;
                    ctx.strokeStyle = '#888';
                    ctx.lineWidth = 1.5 * s;
                    ctx.beginPath();
                    ctx.moveTo(bx - sqS, by);
                    ctx.lineTo(bx - sqS, by - sqS);
                    ctx.lineTo(bx, by - sqS);
                    ctx.stroke();
                }

                // Angle arc at vertex
                if (p > 0.3) {
                    const arcP = Math.min(1, (p - 0.3) * 3);
                    Draw.arc(ctx, ax, ay, 25 * s, -angle * arcP, 0, '#d4956a', 2 * s);
                    if (arcP > 0.5) {
                        Draw.label(ctx, 'α', ax + 32 * s, ay - 12 * s, '#d4956a', 14 * s);
                    }
                }

                // Labels
                if (p > 0.4) {
                    const lp = Math.min(1, (p - 0.4) * 3);
                    ctx.globalAlpha = lp;

                    // Hypotenuse label
                    const hMx = (ax + bxTop) / 2 - 20 * s;
                    const hMy = (ay + byTop) / 2 - 8 * s;
                    Draw.label(ctx, 'ipotenusa', hMx, hMy, '#c46b60', 11 * s);

                    // Adjacent (bottom)
                    Draw.label(ctx, 'adiacente', (ax + bx) / 2, ay + 20 * s, '#5a8fa8', 11 * s);

                    // Opposite (right side)
                    Draw.label(ctx, 'opposto', bx + 30 * s, (by + byTop) / 2, '#9b6fb5', 11 * s);

                    ctx.globalAlpha = 1;
                }

                // Color the sides
                if (p > 0.5) {
                    const cp = Math.min(1, (p - 0.5) * 3);
                    ctx.globalAlpha = cp;
                    ctx.lineWidth = 3 * s;
                    ctx.lineCap = 'round';

                    // Hypotenuse
                    ctx.strokeStyle = '#c46b60';
                    ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bxTop, byTop); ctx.stroke();

                    // Adjacent
                    ctx.strokeStyle = '#5a8fa8';
                    ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke();

                    // Opposite
                    ctx.strokeStyle = '#9b6fb5';
                    ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bxTop, byTop); ctx.stroke();

                    ctx.globalAlpha = 1;
                }
            }
        },

        // ---- STEP 3: Le forze sul piano inclinato ----
        {
            title: 'Le forze sul piano inclinato',
            text: 'Su un piano inclinato, il <span class="term" data-term="peso">peso</span> P punta dritto verso il basso. ' +
                'Ma la superficie è inclinata, quindi lo scomponiamo in due <span class="term" data-term="componente">componenti</span>:<br><br>' +
                '&bull; <b style="color:#9b6fb5">P<sub>x</sub></b> = P sin α — parallela al piano, fa scivolare il blocco<br>' +
                '&bull; <b style="color:#5a8fa8">P<sub>y</sub></b> = P cos α — perpendicolare al piano, preme sulla superficie<br><br>' +
                'Più l\'angolo è grande, più P<sub>x</sub> cresce e il blocco scivola!',
            formula: 'P_x = P \\sin \\alpha \\qquad P_y = P \\cos \\alpha',
            cleanDraw: true,
            draw(ctx, w, h, p) {
                ctx.fillStyle = '#faf8f5';
                ctx.fillRect(0, 0, w, h);
                const s = Draw.S(w, h);

                const angle = Math.PI / 6; // 30 degrees
                const planeLen = 280 * s;
                const baseX = w * 0.15, baseY = h * 0.82;
                const topX = baseX + planeLen * Math.cos(angle);
                const topY = baseY - planeLen * Math.sin(angle);

                // Draw inclined plane (triangle)
                ctx.fillStyle = '#e8e3db';
                ctx.strokeStyle = '#b0a898';
                ctx.lineWidth = 2 * s;
                ctx.beginPath();
                ctx.moveTo(baseX, baseY);
                ctx.lineTo(baseX + planeLen * Math.cos(angle), baseY);
                ctx.lineTo(topX, topY);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                // Floor
                ctx.strokeStyle = '#c0b5a5';
                ctx.lineWidth = 2 * s;
                ctx.beginPath();
                ctx.moveTo(0, baseY);
                ctx.lineTo(w, baseY);
                ctx.stroke();

                // Angle arc
                Draw.arc(ctx, baseX + planeLen * Math.cos(angle), baseY, 30 * s, Math.PI, Math.PI + angle, '#d4956a', 2 * s);
                Draw.label(ctx, 'α', baseX + planeLen * Math.cos(angle) - 40 * s, baseY - 12 * s, '#d4956a', 12 * s);

                // Box on incline
                const boxT = 0.45; // position along incline
                const boxCx = baseX + planeLen * boxT * Math.cos(angle) + (topX - baseX - planeLen * Math.cos(angle)) * boxT;
                const bxMid = baseX + (topX - baseX) * boxT;
                const byMid = baseY + (topY - baseY) * boxT;
                const boxSize = 32 * s;

                ctx.save();
                ctx.translate(bxMid, byMid);
                ctx.rotate(-angle);
                Draw.roundRect(ctx, -boxSize / 2, -boxSize, boxSize, boxSize, 4 * s, '#d4956a');
                ctx.strokeStyle = '#b07848';
                ctx.lineWidth = 1.5 * s;
                ctx.strokeRect(-boxSize / 2, -boxSize, boxSize, boxSize);
                ctx.restore();

                // Weight vector P (pointing down)
                if (p > 0.1) {
                    const wp = Math.min(1, (p - 0.1) * 3);
                    const pLen = 80 * s;
                    Draw.animatedArrow(ctx, bxMid, byMid, bxMid, byMid + pLen, '#c46b60', wp, 3 * s, 10 * s);
                    if (wp > 0.5) {
                        Draw.label(ctx, 'P', bxMid + 14 * s, byMid + pLen * 0.6, '#c46b60', 14 * s);
                    }
                }

                // Decomposition (Px downhill, Py into surface)
                if (p > 0.4) {
                    // Clear and redraw the decomposed forces correctly
                    const dp = Math.min(1, (p - 0.4) * 2.5);
                    const pLen = 80 * s;

                    // Downhill direction along slope (from box towards base)
                    const dhx = -Math.cos(angle), dhy = Math.sin(angle);
                    // Perpendicular into the surface (pointing into the plane)
                    const pnx = Math.sin(angle), pny = Math.cos(angle);

                    // Px along slope (downhill)
                    const pxMag = pLen * Math.sin(angle);
                    Draw.animatedArrow(ctx, bxMid, byMid,
                        bxMid + dhx * pxMag, byMid + dhy * pxMag,
                        '#9b6fb5', dp, 2.5 * s, 9 * s);
                    if (dp > 0.5) {
                        Draw.label(ctx, 'Px', bxMid + dhx * pxMag - 14 * s, byMid + dhy * pxMag + 10 * s, '#9b6fb5', 13 * s);
                    }

                    // Py perpendicular to slope (into surface)
                    const pyMag = pLen * Math.cos(angle);
                    Draw.animatedArrow(ctx, bxMid, byMid,
                        bxMid + pnx * pyMag, byMid + pny * pyMag,
                        '#5a8fa8', dp, 2.5 * s, 9 * s);
                    if (dp > 0.5) {
                        Draw.label(ctx, 'Py', bxMid + pnx * pyMag + 14 * s, byMid + pny * pyMag + 6 * s, '#5a8fa8', 13 * s);
                    }

                    // Dashed lines completing the parallelogram
                    if (dp > 0.7) {
                        ctx.globalAlpha = (dp - 0.7) / 0.3;
                        const endPx_x = bxMid + dhx * pxMag;
                        const endPx_y = byMid + dhy * pxMag;
                        const endPy_x = bxMid + pnx * pyMag;
                        const endPy_y = byMid + pny * pyMag;
                        const endP_x = bxMid;
                        const endP_y = byMid + pLen;
                        Draw.dashedLine(ctx, endPx_x, endPx_y, endP_x, endP_y, '#bbb', 1 * s);
                        Draw.dashedLine(ctx, endPy_x, endPy_y, endP_x, endP_y, '#bbb', 1 * s);
                        ctx.globalAlpha = 1;
                    }
                }
            }
        },

        // ---- STEP 4: Tutte le forze insieme ----
        {
            title: 'Tutte le forze insieme',
            text: 'Quando il blocco è in <span class="term" data-term="equilibrio">equilibrio</span> sul piano inclinato, le forze si bilanciano:<br><br>' +
                '&bull; <b style="color:#c46b60">P</b> — il peso, verso il basso<br>' +
                '&bull; <b style="color:#9b6fb5">P<sub>x</sub></b> — componente lungo il piano (fa scivolare)<br>' +
                '&bull; <b style="color:#5a8fa8">P<sub>y</sub></b> — componente perpendicolare al piano<br>' +
                '&bull; <b style="color:#5a9a6a">N</b> — la <span class="term" data-term="reazione-normale">reazione normale</span> (bilancia P<sub>y</sub>)<br>' +
                '&bull; <b style="color:#d4956a">F<sub>a</sub></b> — l\'attrito (bilancia P<sub>x</sub>)',
            formula: 'N = P \\cos \\alpha \\qquad F_a = P \\sin \\alpha',
            cleanDraw: true,
            draw(ctx, w, h, p) {
                ctx.fillStyle = '#faf8f5';
                ctx.fillRect(0, 0, w, h);
                const s = Draw.S(w, h);

                const angle = Math.PI / 6;
                const planeLen = 280 * s;
                const baseX = w * 0.15, baseY = h * 0.82;
                const topX = baseX + planeLen * Math.cos(angle);
                const topY = baseY - planeLen * Math.sin(angle);

                // Draw inclined plane
                ctx.fillStyle = '#e8e3db';
                ctx.strokeStyle = '#b0a898';
                ctx.lineWidth = 2 * s;
                ctx.beginPath();
                ctx.moveTo(baseX, baseY);
                ctx.lineTo(baseX + planeLen * Math.cos(angle), baseY);
                ctx.lineTo(topX, topY);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                // Floor
                ctx.strokeStyle = '#c0b5a5';
                ctx.lineWidth = 2 * s;
                ctx.beginPath(); ctx.moveTo(0, baseY); ctx.lineTo(w, baseY); ctx.stroke();

                // Angle arc
                Draw.arc(ctx, baseX + planeLen * Math.cos(angle), baseY, 30 * s, Math.PI, Math.PI + angle, '#d4956a', 2 * s);
                Draw.label(ctx, 'α', baseX + planeLen * Math.cos(angle) - 40 * s, baseY - 12 * s, '#d4956a', 12 * s);

                // Box on incline
                const boxT = 0.45;
                const bxMid = baseX + (topX - baseX) * boxT;
                const byMid = baseY + (topY - baseY) * boxT;
                const boxSize = 32 * s;

                ctx.save();
                ctx.translate(bxMid, byMid);
                ctx.rotate(-angle);
                Draw.roundRect(ctx, -boxSize / 2, -boxSize, boxSize, boxSize, 4 * s, '#d4956a');
                ctx.strokeStyle = '#b07848';
                ctx.lineWidth = 1.5 * s;
                ctx.strokeRect(-boxSize / 2, -boxSize, boxSize, boxSize);
                ctx.restore();

                const pLen = 75 * s;
                const dhx = -Math.cos(angle), dhy = Math.sin(angle);
                const pnx = Math.sin(angle), pny = Math.cos(angle);
                const nOutX = -Math.sin(angle), nOutY = -Math.cos(angle);
                const uhx = Math.cos(angle), uhy = -Math.sin(angle);

                // P (weight, down)
                if (p > 0.05) {
                    const wp = Math.min(1, p * 3);
                    Draw.animatedArrow(ctx, bxMid, byMid, bxMid, byMid + pLen, '#c46b60', wp, 3 * s, 10 * s);
                    if (wp > 0.5) Draw.label(ctx, 'P', bxMid + 14 * s, byMid + pLen * 0.7, '#c46b60', 13 * s);
                }

                // Px along slope (downhill)
                if (p > 0.2) {
                    const dp = Math.min(1, (p - 0.2) * 4);
                    const pxMag = pLen * Math.sin(angle);
                    Draw.animatedArrow(ctx, bxMid, byMid,
                        bxMid + dhx * pxMag, byMid + dhy * pxMag,
                        '#9b6fb5', dp, 2.5 * s, 9 * s);
                    if (dp > 0.5) Draw.label(ctx, 'Px', bxMid + dhx * pxMag - 16 * s, byMid + dhy * pxMag + 10 * s, '#9b6fb5', 12 * s);
                }

                // Py perpendicular to slope (into surface)
                if (p > 0.3) {
                    const dp = Math.min(1, (p - 0.3) * 4);
                    const pyMag = pLen * Math.cos(angle);
                    Draw.animatedArrow(ctx, bxMid, byMid,
                        bxMid + pnx * pyMag, byMid + pny * pyMag,
                        '#5a8fa8', dp, 2.5 * s, 9 * s);
                    if (dp > 0.5) Draw.label(ctx, 'Py', bxMid + pnx * pyMag + 14 * s, byMid + pny * pyMag + 6 * s, '#5a8fa8', 12 * s);
                }

                // N (normal reaction, opposite to Py — away from surface)
                if (p > 0.5) {
                    const dp = Math.min(1, (p - 0.5) * 4);
                    const nMag = pLen * Math.cos(angle);
                    Draw.animatedArrow(ctx, bxMid, byMid,
                        bxMid + nOutX * nMag, byMid + nOutY * nMag,
                        '#5a9a6a', dp, 2.5 * s, 9 * s);
                    if (dp > 0.5) Draw.label(ctx, 'N', bxMid + nOutX * nMag - 14 * s, byMid + nOutY * nMag - 6 * s, '#5a9a6a', 13 * s);
                }

                // Fa (friction, uphill along slope, opposite to Px)
                if (p > 0.7) {
                    const dp = Math.min(1, (p - 0.7) * 4);
                    const faMag = pLen * Math.sin(angle);
                    Draw.animatedArrow(ctx, bxMid, byMid,
                        bxMid + uhx * faMag, byMid + uhy * faMag,
                        '#d4956a', dp, 2.5 * s, 9 * s);
                    if (dp > 0.5) Draw.label(ctx, 'Fa', bxMid + uhx * faMag + 14 * s, byMid + uhy * faMag - 6 * s, '#d4956a', 12 * s);
                }
            }
        },

        // ---- STEP 5: L'angolo cambia tutto (interattivo) ----
        {
            title: "L'angolo cambia tutto",
            text: 'Trascina il cursore per cambiare l\'angolo del piano e osserva come cambiano le componenti del peso:<br><br>' +
                '&bull; <b style="color:#9b6fb5">P<sub>x</sub></b> (fa scivolare) <b>cresce</b> con l\'angolo<br>' +
                '&bull; <b style="color:#5a8fa8">P<sub>y</sub></b> (preme sulla superficie) <b>diminuisce</b> con l\'angolo<br><br>' +
                'A 45° le due componenti sono uguali. Ecco perché è più facile salire una rampa dolce che una ripida!',
            formula: null,
            cleanDraw: true,
            interactive: {
                sliders: [
                    { id: 'angle', label: 'Angolo α', min: 5, max: 85, step: 1, default: 30, unit: '°' }
                ]
            },
            draw(ctx, w, h, p, controls) {
                ctx.fillStyle = '#faf8f5';
                ctx.fillRect(0, 0, w, h);
                const s = Draw.S(w, h);

                const angleDeg = (controls && controls.angle) || 30;
                const angle = angleDeg * Math.PI / 180;

                // --- Inclined plane geometry ---
                const planeLen = 250 * s;
                const baseX = w * 0.08, baseY = h * 0.88;
                const topX = baseX + planeLen * Math.cos(angle);
                const topY = baseY - planeLen * Math.sin(angle);
                const rightX = baseX + planeLen * Math.cos(angle);

                // Fade-in factor for initial animation
                const fade = Math.min(1, p * 2);
                ctx.globalAlpha = fade;

                // Draw plane triangle
                ctx.fillStyle = '#e8e3db';
                ctx.strokeStyle = '#b0a898';
                ctx.lineWidth = 2 * s;
                ctx.beginPath();
                ctx.moveTo(baseX, baseY);
                ctx.lineTo(rightX, baseY);
                ctx.lineTo(topX, topY);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                // Floor line
                ctx.strokeStyle = '#c0b5a5';
                ctx.lineWidth = 2 * s;
                ctx.beginPath();
                ctx.moveTo(0, baseY);
                ctx.lineTo(w * 0.65, baseY);
                ctx.stroke();

                // Angle arc at bottom-right corner
                const arcR = 28 * s;
                Draw.arc(ctx, rightX, baseY, arcR, Math.PI, Math.PI + angle, '#d4956a', 2 * s);
                // Angle label
                const arcLabelR = arcR + 14 * s;
                const arcLabelAngle = Math.PI + angle * 0.5;
                Draw.label(ctx, angleDeg + '°', rightX + arcLabelR * Math.cos(arcLabelAngle), baseY + arcLabelR * Math.sin(arcLabelAngle), '#d4956a', 11 * s);

                // --- Box on incline ---
                const boxT = 0.45;
                const bxMid = baseX + (topX - baseX) * boxT;
                const byMid = baseY + (topY - baseY) * boxT;
                const boxSize = 30 * s;

                ctx.save();
                ctx.translate(bxMid, byMid);
                ctx.rotate(-angle);
                Draw.roundRect(ctx, -boxSize / 2, -boxSize, boxSize, boxSize, 4 * s, '#d4956a');
                ctx.strokeStyle = '#b07848';
                ctx.lineWidth = 1.5 * s;
                ctx.strokeRect(-boxSize / 2, -boxSize, boxSize, boxSize);
                ctx.restore();

                // --- Force arrows (appear after initial fade) ---
                const forceP = Math.min(1, Math.max(0, (p - 0.2) * 2.5));
                if (forceP > 0) {
                    ctx.globalAlpha = forceP;
                    const pLen = 90 * s;

                    // P (weight, straight down)
                    Draw.animatedArrow(ctx, bxMid, byMid, bxMid, byMid + pLen, '#c46b60', forceP, 3 * s, 10 * s);
                    if (forceP > 0.4) {
                        Draw.label(ctx, 'P', bxMid + 14 * s, byMid + pLen * 0.65, '#c46b60', 13 * s);
                    }

                    // Component directions
                    // Downhill along slope
                    const dhx = -Math.cos(angle), dhy = Math.sin(angle);
                    // Into surface (perpendicular)
                    const pnx = Math.sin(angle), pny = Math.cos(angle);

                    // Px along slope (proportional to sin)
                    const pxMag = pLen * Math.sin(angle);
                    Draw.animatedArrow(ctx, bxMid, byMid,
                        bxMid + dhx * pxMag, byMid + dhy * pxMag,
                        '#9b6fb5', forceP, 2.5 * s, 9 * s);
                    if (forceP > 0.5 && pxMag > 6 * s) {
                        Draw.label(ctx, 'Px', bxMid + dhx * pxMag - 14 * s, byMid + dhy * pxMag + 12 * s, '#9b6fb5', 12 * s);
                    }

                    // Py perpendicular to slope (proportional to cos)
                    const pyMag = pLen * Math.cos(angle);
                    Draw.animatedArrow(ctx, bxMid, byMid,
                        bxMid + pnx * pyMag, byMid + pny * pyMag,
                        '#5a8fa8', forceP, 2.5 * s, 9 * s);
                    if (forceP > 0.5 && pyMag > 6 * s) {
                        Draw.label(ctx, 'Py', bxMid + pnx * pyMag + 14 * s, byMid + pny * pyMag + 6 * s, '#5a8fa8', 12 * s);
                    }

                    // Dashed parallelogram lines
                    if (forceP > 0.7) {
                        ctx.globalAlpha = (forceP - 0.7) / 0.3;
                        const endPx_x = bxMid + dhx * pxMag;
                        const endPx_y = byMid + dhy * pxMag;
                        const endPy_x = bxMid + pnx * pyMag;
                        const endPy_y = byMid + pny * pyMag;
                        const endP_x = bxMid;
                        const endP_y = byMid + pLen;
                        Draw.dashedLine(ctx, endPx_x, endPx_y, endP_x, endP_y, '#bbb', 1 * s);
                        Draw.dashedLine(ctx, endPy_x, endPy_y, endP_x, endP_y, '#bbb', 1 * s);
                    }
                }

                // --- Bar chart on the right side ---
                const barP = Math.min(1, Math.max(0, (p - 0.5) * 2.5));
                if (barP > 0) {
                    ctx.globalAlpha = barP;

                    const barAreaX = w * 0.62;
                    const barAreaY = h * 0.12;
                    const maxBarW = w * 0.30;
                    const barH = 22 * s;
                    const barGap = 16 * s;

                    const sinVal = Math.sin(angle);
                    const cosVal = Math.cos(angle);

                    // Title
                    Draw.label(ctx, 'Componenti', barAreaX + maxBarW * 0.5, barAreaY, '#555', 11 * s, false);

                    // Px bar
                    const pxBarY = barAreaY + 22 * s;
                    const pxBarW = maxBarW * sinVal * barP;
                    Draw.roundRect(ctx, barAreaX, pxBarY, pxBarW, barH, 4 * s, '#9b6fb5');
                    // Px label
                    Draw.label(ctx, 'Px = P × ' + sinVal.toFixed(2), barAreaX + maxBarW * 0.5, pxBarY + barH + 14 * s, '#9b6fb5', 10 * s, false);

                    // Py bar
                    const pyBarY = pxBarY + barH + barGap + 18 * s;
                    const pyBarW = maxBarW * cosVal * barP;
                    Draw.roundRect(ctx, barAreaX, pyBarY, pyBarW, barH, 4 * s, '#5a8fa8');
                    // Py label
                    Draw.label(ctx, 'Py = P × ' + cosVal.toFixed(2), barAreaX + maxBarW * 0.5, pyBarY + barH + 14 * s, '#5a8fa8', 10 * s, false);

                    // Px = Py highlight at 45 degrees
                    if (angleDeg === 45) {
                        const eqY = pyBarY + barH + 38 * s;
                        // Pulsing glow effect
                        const pulse = 0.7 + 0.3 * Math.sin(Date.now() * 0.004);
                        ctx.globalAlpha = barP * pulse;

                        // Background pill
                        const pillW = 120 * s;
                        const pillH = 24 * s;
                        const pillX = barAreaX + maxBarW * 0.5 - pillW / 2;
                        Draw.roundRect(ctx, pillX, eqY - pillH / 2, pillW, pillH, pillH / 2, 'rgba(90,154,106,0.15)');
                        Draw.label(ctx, 'Px = Py !', barAreaX + maxBarW * 0.5, eqY, '#5a9a6a', 13 * s);

                        ctx.globalAlpha = barP;
                    }
                }

                ctx.globalAlpha = 1;
            }
        }
    ];

    const quiz = [
        {
            question: 'Se l\'angolo del piano inclinato aumenta, cosa succede alla componente Px?',
            options: ['Diminuisce', 'Aumenta', 'Resta uguale', 'Si annulla'],
            correct: 1,
            explanation: 'Px = P sin \u03b1. Quando l\'angolo \u03b1 aumenta, sin \u03b1 cresce, quindi Px aumenta: il blocco tende a scivolare di pi\u00f9!'
        },
        {
            question: 'A quale angolo le componenti Px e Py sono uguali?',
            options: ['30\u00b0', '60\u00b0', '45\u00b0', '90\u00b0'],
            correct: 2,
            explanation: 'A 45\u00b0, sin 45\u00b0 = cos 45\u00b0, quindi Px = P sin 45\u00b0 = P cos 45\u00b0 = Py. Le due componenti sono uguali!'
        }
    ];

    return { id: 'piano-inclinato', title: 'Il piano inclinato', icon: '\u{1F4D0}', category: 'Meccanica', order: 6, steps, quiz };
})();
if (typeof TopicRegistry !== 'undefined') TopicRegistry.register(Tema2);
