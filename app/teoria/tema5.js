// ===== Tema 5: La notazione scientifica =====

const Tema5 = (() => {
    const steps = [
        // ---- Step 1: Numeri enormi e minuscoli ----
        {
            title: 'Numeri enormi e minuscoli',
            text: 'In fisica abbiamo a che fare con numeri <b>enormi</b> (massa della Terra, distanza dal Sole) e numeri <b>minuscoli</b> (massa di un elettrone, tempo di contatto in un urto tra palle da biliardo).<br><br>' +
                'Scrivere tutti quegli zeri è <b>scomodo</b> e si rischia di sbagliare: basta dimenticarne uno per ottenere un risultato sbagliato!<br><br>' +
                'Per questo si usa la <span class="term" data-term="notazione-scientifica">notazione scientifica</span>: un modo <span class="highlight">compatto e preciso</span> per scrivere qualsiasi numero, grande o piccolo che sia.',
            formula: null,
            cleanDraw: true,
            duration: 1200,
            draw(ctx, w, h, p) {
                const s = Draw.S(w, h);
                ctx.fillStyle = '#faf8f5';
                ctx.fillRect(0, 0, w, h);

                const topY = h * 0.3;
                const botY = h * 0.68;

                // --- Big number ---
                if (p > 0.05) {
                    const fp = Math.min(1, (p - 0.05) / 0.3);
                    ctx.globalAlpha = fp;

                    Draw.label(ctx, 'Massa della Terra:', w * 0.14, topY - 20 * s, '#2e2e2e', 11 * s, false);

                    // Long number with many zeros
                    const numStr = '5 972 000 000 000 000 000 000 000 kg';
                    Draw.label(ctx, numStr, w * 0.5, topY + 10 * s, '#c46b60', 11 * s);

                    // Cross out with wavy line to show it's tedious
                    if (fp > 0.7) {
                        ctx.strokeStyle = 'rgba(196,107,96,0.4)';
                        ctx.lineWidth = 2 * s;
                        ctx.beginPath();
                        ctx.moveTo(w * 0.15, topY + 10 * s);
                        for (let i = 0; i < 20; i++) {
                            ctx.lineTo(w * 0.15 + (i + 1) * (w * 0.55 / 20), topY + 10 * s + Math.sin(i * 1.5) * 3 * s);
                        }
                        ctx.stroke();
                    }

                    ctx.globalAlpha = 1;
                }

                // --- Small number ---
                if (p > 0.3) {
                    const fp = Math.min(1, (p - 0.3) / 0.3);
                    ctx.globalAlpha = fp;

                    Draw.label(ctx, 'Tempo di contatto biliardo:', w * 0.2, botY - 20 * s, '#2e2e2e', 11 * s, false);

                    const numStr2 = '0,00085 s';
                    Draw.label(ctx, numStr2, w * 0.5, botY + 10 * s, '#5a8fa8', 13 * s);

                    // Highlight the zeros
                    if (fp > 0.7) {
                        ctx.strokeStyle = 'rgba(90,143,168,0.4)';
                        ctx.lineWidth = 2 * s;
                        ctx.beginPath();
                        ctx.moveTo(w * 0.35, botY + 10 * s);
                        for (let i = 0; i < 12; i++) {
                            ctx.lineTo(w * 0.35 + (i + 1) * (w * 0.2 / 12), botY + 10 * s + Math.sin(i * 1.5) * 3 * s);
                        }
                        ctx.stroke();
                    }

                    ctx.globalAlpha = 1;
                }

                // Confusion / question mark
                if (p > 0.65) {
                    const ep = Math.min(1, (p - 0.65) / 0.25);
                    ctx.globalAlpha = ep;

                    Draw.label(ctx, 'Quanti zeri?!', w * 0.8, h * 0.5, '#d4956a', 14 * s);
                    Draw.label(ctx, '?', w * 0.92, h * 0.42, '#d4956a', 20 * s);

                    ctx.globalAlpha = 1;
                }
            }
        },

        // ---- Step 2: Come funziona: a x 10^n ----
        {
            title: 'Come funziona: a \u00d7 10\u207f',
            text: 'Un numero in <span class="term" data-term="notazione-scientifica">notazione scientifica</span> ha due parti:<br><br>' +
                '<b>1)</b> Un <span class="highlight">coefficiente a</span>, cioè un numero compreso tra 1 e 10.<br>' +
                '<b>2)</b> Una <span class="highlight">potenza di 10</span>, che dice quante posizioni spostare la virgola.<br><br>' +
                'Esponente <b>positivo</b> = numero grande. Esponente <b>negativo</b> = numero piccolo.<br><br>' +
                'Esempi: <span class="highlight">3,5 &times; 10&sup2; = 350</span> e <span class="highlight">7,2 &times; 10&minus;&sup3; = 0,0072</span>.',
            formula: 'a \\times 10^n \\quad \\text{con } 1 \\leq a < 10',
            cleanDraw: true,
            duration: 1400,
            draw(ctx, w, h, p) {
                const s = Draw.S(w, h);
                ctx.fillStyle = '#faf8f5';
                ctx.fillRect(0, 0, w, h);

                const cx = w / 2;
                const topY = h * 0.22;

                // Structure: a × 10^n
                if (p > 0.05) {
                    const fp = Math.min(1, (p - 0.05) / 0.3);
                    ctx.globalAlpha = fp;

                    // Box for 'a'
                    const aBoxX = cx - 100 * s;
                    const aBoxY = topY;
                    Draw.roundRect(ctx, aBoxX - 35 * s, aBoxY - 22 * s, 70 * s, 44 * s, 6 * s, 'rgba(196,107,96,0.15)');
                    ctx.strokeStyle = '#c46b60';
                    ctx.lineWidth = 2 * s;
                    ctx.strokeRect(aBoxX - 35 * s, aBoxY - 22 * s, 70 * s, 44 * s);
                    Draw.label(ctx, 'a', aBoxX, aBoxY, '#c46b60', 18 * s);
                    Draw.label(ctx, '(tra 1 e 10)', aBoxX, aBoxY + 34 * s, '#c46b60', 9 * s, false);

                    // Multiplication sign
                    Draw.label(ctx, '\u00d7', cx - 20 * s, aBoxY, '#2e2e2e', 16 * s);

                    // Box for 10^n
                    const expBoxX = cx + 60 * s;
                    Draw.roundRect(ctx, expBoxX - 40 * s, aBoxY - 22 * s, 80 * s, 44 * s, 6 * s, 'rgba(90,143,168,0.15)');
                    ctx.strokeStyle = '#5a8fa8';
                    ctx.lineWidth = 2 * s;
                    ctx.strokeRect(expBoxX - 40 * s, aBoxY - 22 * s, 80 * s, 44 * s);
                    Draw.label(ctx, '10', expBoxX - 8 * s, aBoxY + 2 * s, '#5a8fa8', 18 * s);
                    Draw.label(ctx, 'n', expBoxX + 20 * s, aBoxY - 10 * s, '#5a8fa8', 13 * s);
                    Draw.label(ctx, '(esponente)', expBoxX, aBoxY + 34 * s, '#5a8fa8', 9 * s, false);

                    ctx.globalAlpha = 1;
                }

                // Example 1: positive exponent
                if (p > 0.35) {
                    const fp = Math.min(1, (p - 0.35) / 0.25);
                    ctx.globalAlpha = fp;

                    const exY = h * 0.52;
                    Draw.roundRect(ctx, w * 0.08, exY - 16 * s, w * 0.38, 36 * s, 5 * s, 'rgba(90,154,106,0.1)');
                    Draw.label(ctx, '3,5 \u00d7 10\u00b2 = 350', w * 0.27, exY, '#5a9a6a', 13 * s);
                    Draw.label(ctx, 'n = 2 \u2192 numero grande', w * 0.27, exY + 22 * s, '#5a9a6a', 9 * s, false);

                    ctx.globalAlpha = 1;
                }

                // Example 2: negative exponent
                if (p > 0.55) {
                    const fp = Math.min(1, (p - 0.55) / 0.25);
                    ctx.globalAlpha = fp;

                    const exY2 = h * 0.75;
                    Draw.roundRect(ctx, w * 0.08, exY2 - 16 * s, w * 0.38, 36 * s, 5 * s, 'rgba(155,111,181,0.1)');
                    Draw.label(ctx, '7,2 \u00d7 10\u207b\u00b3 = 0,0072', w * 0.27, exY2, '#9b6fb5', 13 * s);
                    Draw.label(ctx, 'n = -3 \u2192 numero piccolo', w * 0.27, exY2 + 22 * s, '#9b6fb5', 9 * s, false);

                    ctx.globalAlpha = 1;
                }

                // Arrow connecting positive = big
                if (p > 0.7) {
                    const ap = Math.min(1, (p - 0.7) / 0.2);
                    ctx.globalAlpha = ap;

                    Draw.animatedArrow(ctx, w * 0.56, h * 0.35, w * 0.75, h * 0.35, '#5a9a6a', ap, 2.5 * s, 9 * s);
                    Draw.label(ctx, 'n > 0', w * 0.82, h * 0.33, '#5a9a6a', 12 * s);
                    Draw.label(ctx, 'GRANDE', w * 0.82, h * 0.39, '#5a9a6a', 10 * s, false);

                    Draw.animatedArrow(ctx, w * 0.56, h * 0.55, w * 0.75, h * 0.55, '#9b6fb5', ap, 2.5 * s, 9 * s);
                    Draw.label(ctx, 'n < 0', w * 0.82, h * 0.53, '#9b6fb5', 12 * s);
                    Draw.label(ctx, 'PICCOLO', w * 0.82, h * 0.59, '#9b6fb5', 10 * s, false);

                    ctx.globalAlpha = 1;
                }
            }
        },

        // ---- Step 3: Trasformare un numero ----
        {
            title: 'Trasformare un numero',
            text: 'Per convertire un numero in <span class="term" data-term="notazione-scientifica">notazione scientifica</span>:<br><br>' +
                '<b>1)</b> Sposta la virgola finché non ottieni un numero tra 1 e 10.<br>' +
                '<b>2)</b> Conta di quante posizioni l\'hai spostata.<br>' +
                '<b>3)</b> Spostamento a <b>sinistra</b> = esponente positivo. A <b>destra</b> = esponente negativo.<br><br>' +
                'Esempio: <span class="highlight">20 580 &rarr; 2,058 &times; 10&sup4;</span> (virgola spostata 4 posti a sinistra).',
            formula: '20\\,580 = 2{,}058 \\times 10^4',
            cleanDraw: true,
            duration: 1800,
            draw(ctx, w, h, p) {
                const s = Draw.S(w, h);
                ctx.fillStyle = '#faf8f5';
                ctx.fillRect(0, 0, w, h);

                const cx = w / 2;

                // Original number
                if (p > 0.03) {
                    const fp = Math.min(1, (p - 0.03) / 0.2);
                    ctx.globalAlpha = fp;

                    Draw.label(ctx, 'Numero originale:', cx, h * 0.12, '#2e2e2e', 11 * s, false);

                    // Draw each digit in a box
                    const digits = ['2', '0', '5', '8', '0'];
                    const digitW = 30 * s;
                    const startX = cx - (digits.length * digitW) / 2;
                    const digitY = h * 0.25;

                    for (let i = 0; i < digits.length; i++) {
                        const dx = startX + i * digitW;
                        Draw.roundRect(ctx, dx, digitY - 18 * s, digitW - 4 * s, 36 * s, 4 * s, '#e8e0d4');
                        ctx.strokeStyle = '#b0a594';
                        ctx.lineWidth = 1.5 * s;
                        ctx.strokeRect(dx, digitY - 18 * s, digitW - 4 * s, 36 * s);
                        Draw.label(ctx, digits[i], dx + (digitW - 4 * s) / 2, digitY, '#2e2e2e', 16 * s);
                    }

                    // Implicit decimal point at the end
                    Draw.label(ctx, ',', startX + digits.length * digitW + 2 * s, digitY + 8 * s, '#c46b60', 18 * s);

                    ctx.globalAlpha = 1;
                }

                // Moving decimal point animation
                if (p > 0.25) {
                    const fp = Math.min(1, (p - 0.25) / 0.4);
                    const digits = ['2', '0', '5', '8', '0'];
                    const digitW = 30 * s;
                    const startX = cx - (digits.length * digitW) / 2;
                    const digitY = h * 0.25;

                    ctx.globalAlpha = fp;

                    // Decimal point moves from end to after first digit
                    const endPos = startX + digits.length * digitW + 2 * s;
                    const targetPos = startX + digitW - 2 * s;
                    const currentPos = endPos - fp * (endPos - targetPos);
                    const arcY = digitY + 28 * s;

                    // Draw curved arrows showing each hop
                    const hops = 4;
                    const hopsDone = Math.floor(fp * hops);
                    for (let i = 0; i < Math.min(hopsDone + 1, hops); i++) {
                        const hopFp = i < hopsDone ? 1 : Math.min(1, (fp * hops - i));
                        const hopStart = endPos - i * digitW;
                        const hopEnd = endPos - (i + 1) * digitW;
                        const hopMid = (hopStart + hopEnd) / 2;

                        ctx.strokeStyle = '#c46b60';
                        ctx.lineWidth = 1.5 * s;
                        ctx.beginPath();
                        ctx.moveTo(hopStart, arcY);
                        ctx.quadraticCurveTo(hopMid, arcY + 18 * s * hopFp, hopEnd, arcY);
                        ctx.stroke();

                        // Small arrowhead
                        if (hopFp > 0.5) {
                            ctx.fillStyle = '#c46b60';
                            ctx.beginPath();
                            ctx.moveTo(hopEnd, arcY);
                            ctx.lineTo(hopEnd + 5 * s, arcY + 5 * s);
                            ctx.lineTo(hopEnd + 5 * s, arcY - 5 * s);
                            ctx.closePath();
                            ctx.fill();
                        }
                    }

                    // Count label
                    if (fp > 0.5) {
                        Draw.label(ctx, '4 posti a sinistra', cx, arcY + 30 * s, '#c46b60', 11 * s, false);
                    }

                    // Moving decimal point
                    Draw.label(ctx, ',', currentPos, digitY + 8 * s, '#c46b60', 18 * s);

                    ctx.globalAlpha = 1;
                }

                // Result
                if (p > 0.7) {
                    const rp = Math.min(1, (p - 0.7) / 0.25);
                    ctx.globalAlpha = rp;

                    const ry = h * 0.72;
                    Draw.roundRect(ctx, cx - 110 * s, ry - 24 * s, 220 * s, 50 * s, 6 * s, '#e4f2e7');
                    ctx.strokeStyle = '#81c784';
                    ctx.lineWidth = 1.5 * s;
                    ctx.strokeRect(cx - 110 * s, ry - 24 * s, 220 * s, 50 * s);

                    Draw.label(ctx, '20 580 = 2,058 \u00d7 10\u2074', cx, ry, '#3d8b44', 14 * s);

                    ctx.globalAlpha = 1;
                }
            }
        },

        // ---- Step 4: Moltiplicare e dividere ----
        {
            title: 'Moltiplicare e dividere',
            text: '<b>Moltiplicazione:</b> moltiplichi i coefficienti e <span class="highlight">sommi gli esponenti</span>.<br>' +
                '<b>Divisione:</b> dividi i coefficienti e <span class="highlight">sottrai gli esponenti</span>.<br><br>' +
                'Esempio dai nostri problemi: <span class="highlight">m &times; g = 2,1 &times; 10&sup3; &times; 9,8 = 20 580 N = 2,058 &times; 10&sup4; N</span>.<br><br>' +
                'Con la <span class="term" data-term="notazione-scientifica">notazione scientifica</span> i conti diventano più semplici, soprattutto quando i numeri hanno tante cifre!',
            formula: '(a \\times 10^m) \\times (b \\times 10^n) = (a \\times b) \\times 10^{m+n}',
            cleanDraw: true,
            duration: 2200,
            draw(ctx, w, h, p) {
                const s = Draw.S(w, h);
                ctx.fillStyle = '#faf8f5';
                ctx.fillRect(0, 0, w, h);

                const cx = w / 2;
                const ease = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

                // Phase 1 (p 0.00-0.22): Two number boxes slide in from sides and collide
                const p1 = Math.min(1, p / 0.22);
                const ep1 = ease(p1);
                const y1 = h * 0.15;

                const leftRest = cx - 80 * s;
                const rightRest = cx + 80 * s;
                const leftX = leftRest - (1 - ep1) * w * 0.35;
                const rightX = rightRest + (1 - ep1) * w * 0.35;

                ctx.globalAlpha = Math.min(1, p1 * 3);
                Draw.roundRect(ctx, leftX - 60 * s, y1 - 18 * s, 120 * s, 36 * s, 5 * s, 'rgba(196,107,96,0.15)');
                ctx.strokeStyle = '#c46b60'; ctx.lineWidth = 1.5 * s;
                ctx.strokeRect(leftX - 60 * s, y1 - 18 * s, 120 * s, 36 * s);
                Draw.label(ctx, '2,1 \u00d7 10\u00b3', leftX, y1, '#c46b60', 13 * s);

                ctx.globalAlpha = Math.min(1, p1 * 3) * Math.min(1, ep1 * 2);
                Draw.label(ctx, '\u00d7', cx, y1, '#2e2e2e', 16 * s);

                ctx.globalAlpha = Math.min(1, p1 * 3);
                Draw.roundRect(ctx, rightX - 40 * s, y1 - 18 * s, 80 * s, 36 * s, 5 * s, 'rgba(90,143,168,0.15)');
                ctx.strokeStyle = '#5a8fa8'; ctx.lineWidth = 1.5 * s;
                ctx.strokeRect(rightX - 40 * s, y1 - 18 * s, 80 * s, 36 * s);
                Draw.label(ctx, '9,8', rightX, y1, '#5a8fa8', 13 * s);

                if (p1 > 0.85 && p1 < 1) {
                    const flash = 1 - (p1 - 0.85) / 0.15;
                    ctx.globalAlpha = flash * 0.5;
                    Draw.circle(ctx, cx, y1, 20 * s * flash, null, '#d4956a', 2 * s);
                }
                ctx.globalAlpha = 1;

                // Phase 2 (p 0.20-0.48): Coefficients fly together, exponents stack and add
                if (p > 0.20) {
                    const p2 = Math.min(1, (p - 0.20) / 0.28);
                    const ep2 = ease(p2);
                    const procY = h * 0.36;

                    ctx.globalAlpha = Math.min(1, p2 * 2.5);
                    Draw.label(ctx, 'Coefficienti:', w * 0.12, procY, '#2e2e2e', 10 * s, false);

                    const coefCx = w * 0.52;
                    if (p2 < 0.6) {
                        const mt = ease(p2 / 0.6);
                        const lc = coefCx - 55 * s * (1 - mt) - 22 * s;
                        const rc = coefCx + 55 * s * (1 - mt) + 22 * s;
                        Draw.label(ctx, '2,1', lc, procY, '#c46b60', 12 * s);
                        Draw.label(ctx, '\u00d7', coefCx, procY, '#2e2e2e', 11 * s);
                        Draw.label(ctx, '9,8', rc, procY, '#5a8fa8', 12 * s);
                    } else {
                        const pop = p2 < 0.7 ? 1 + 0.2 * (1 - (p2 - 0.6) / 0.1) : 1;
                        Draw.pill(ctx, coefCx - 55 * s, procY - 14 * s, 110 * s, 28 * s, 'rgba(196,107,96,0.1)', '#c46b60', 1.5 * s);
                        Draw.label(ctx, '2,1 \u00d7 9,8 = 20,58', coefCx, procY, '#c46b60', 12 * s * pop);
                    }

                    const expY = procY + 36 * s;
                    const expDelay = 0.25;
                    if (p2 > expDelay) {
                        const ep2b = Math.min(1, (p2 - expDelay) / (1 - expDelay));
                        ctx.globalAlpha = Math.min(1, ep2b * 2.5);
                        Draw.label(ctx, 'Esponenti:', w * 0.12, expY, '#2e2e2e', 10 * s, false);

                        const stackCx = w * 0.48;
                        if (ep2b < 0.5) {
                            const st = ease(ep2b / 0.5);
                            const gap = 50 * s * (1 - st);
                            Draw.roundRect(ctx, stackCx - 18 * s - gap, expY - 13 * s, 36 * s, 26 * s, 4 * s, 'rgba(90,143,168,0.15)');
                            ctx.strokeStyle = '#5a8fa8'; ctx.lineWidth = 1 * s;
                            ctx.strokeRect(stackCx - 18 * s - gap, expY - 13 * s, 36 * s, 26 * s);
                            Draw.label(ctx, '3', stackCx - gap, expY, '#5a8fa8', 13 * s);

                            Draw.label(ctx, '+', stackCx + 26 * s, expY, '#2e2e2e', 11 * s);

                            Draw.roundRect(ctx, stackCx + 38 * s + gap, expY - 13 * s, 36 * s, 26 * s, 4 * s, 'rgba(90,143,168,0.15)');
                            ctx.strokeStyle = '#5a8fa8'; ctx.lineWidth = 1 * s;
                            ctx.strokeRect(stackCx + 38 * s + gap, expY - 13 * s, 36 * s, 26 * s);
                            Draw.label(ctx, '0', stackCx + 56 * s + gap, expY, '#5a8fa8', 13 * s);
                        } else {
                            const pop = ep2b < 0.6 ? 1 + 0.15 * (1 - (ep2b - 0.5) / 0.1) : 1;
                            Draw.pill(ctx, stackCx - 45 * s, expY - 14 * s, 130 * s, 28 * s, 'rgba(90,143,168,0.1)', '#5a8fa8', 1.5 * s);
                            Draw.label(ctx, '3 + 0 = 3', stackCx + 20 * s, expY, '#5a8fa8', 12 * s * pop);
                        }
                    }
                    ctx.globalAlpha = 1;
                }

                // Phase 3 (p 0.46-0.65): Arrow down + intermediate result with warning
                if (p > 0.46) {
                    const p3 = Math.min(1, (p - 0.46) / 0.19);
                    const ep3 = ease(p3);

                    const arrowStartY = h * 0.36 + 50 * s;
                    const arrowEndY = arrowStartY + 25 * s;
                    Draw.animatedArrow(ctx, cx, arrowStartY, cx, arrowEndY, '#d4956a', ep3, 2 * s, 8 * s);

                    const midY = arrowEndY + 18 * s;
                    ctx.globalAlpha = ep3;
                    const slideOffset = (1 - ep3) * 15 * s;
                    Draw.label(ctx, '= 20,58 \u00d7 10\u00b3 N', cx, midY + slideOffset, '#d4956a', 13 * s);

                    if (p3 > 0.5) {
                        const wp = (p3 - 0.5) / 0.5;
                        ctx.globalAlpha = wp;
                        const shake = wp < 0.5 ? Math.sin(wp * 20) * 3 * s : 0;
                        Draw.label(ctx, '\u26a0 Ma 20,58 > 10! Aggiustiamo...', cx + shake, midY + 22 * s + slideOffset, '#d4956a', 10 * s, false);
                    }
                    ctx.globalAlpha = 1;
                }

                // Phase 4 (p 0.65-0.85): Decimal point slides left, exponent increments
                if (p > 0.65) {
                    const p4 = Math.min(1, (p - 0.65) / 0.20);
                    const ep4 = ease(p4);
                    const corrY = h * 0.74;

                    ctx.globalAlpha = 1;
                    Draw.roundRect(ctx, cx - 130 * s, corrY - 20 * s, 260 * s, 40 * s, 5 * s, 'rgba(212,149,106,0.08)');

                    // Digits of 20,58 with animated comma sliding left
                    const digitSpacing = 16 * s;
                    const digitsStartX = cx - 60 * s;

                    // Draw digits: 2, 0, 5, 8 (comma drawn separately)
                    const digitChars = ['2', '0', '5', '8'];
                    for (let i = 0; i < digitChars.length; i++) {
                        let dx = digitsStartX + i * digitSpacing;
                        // After position 1, shift right to leave room for the stationary comma gap
                        if (i >= 2) dx += digitSpacing;
                        // As comma moves, close the old gap and open a new one
                        if (i >= 2) dx -= ep4 * digitSpacing * 0.3;
                        Draw.label(ctx, digitChars[i], dx, corrY, '#d4956a', 14 * s);
                    }

                    // Comma slides from after '0' to after '2'
                    const commaFrom = digitsStartX + 2 * digitSpacing;
                    const commaTo = digitsStartX + 1 * digitSpacing;
                    const commaX = commaFrom - ep4 * (commaFrom - commaTo);
                    const commaTrailY = corrY + 6 * s;

                    if (ep4 > 0 && ep4 < 1) {
                        ctx.strokeStyle = 'rgba(196,107,96,0.3)';
                        ctx.lineWidth = 2 * s;
                        ctx.setLineDash([3, 3]);
                        ctx.beginPath();
                        ctx.moveTo(commaFrom, commaTrailY);
                        ctx.lineTo(commaX, commaTrailY);
                        ctx.stroke();
                        ctx.setLineDash([]);
                    }
                    Draw.label(ctx, ',', commaX, corrY, '#c46b60', 16 * s);

                    // Exponent: 10^3 -> 10^4
                    const expX = cx + 40 * s;
                    Draw.label(ctx, '\u00d7 10', expX, corrY, '#5a8fa8', 14 * s);
                    const expNumX = expX + 24 * s;
                    const expNumY = corrY - 8 * s;

                    if (ep4 < 0.5) {
                        ctx.globalAlpha = 1 - ep4 * 2;
                        Draw.label(ctx, '\u00b3', expNumX, expNumY, '#5a8fa8', 11 * s);
                        ctx.globalAlpha = 1;
                    } else {
                        ctx.globalAlpha = (ep4 - 0.5) * 2;
                        const pop = ep4 < 0.65 ? 1.3 : 1;
                        Draw.label(ctx, '\u2074', expNumX, expNumY, '#3d8b44', 11 * s * pop);
                        ctx.globalAlpha = 1;
                    }

                    // Floating +1 indicator
                    if (ep4 > 0.3 && ep4 < 0.9) {
                        const floatP = (ep4 - 0.3) / 0.6;
                        ctx.globalAlpha = floatP < 0.5 ? floatP * 2 : 2 * (1 - floatP);
                        Draw.label(ctx, '+1', expNumX + 14 * s, expNumY - floatP * 18 * s, '#3d8b44', 9 * s, false);
                        ctx.globalAlpha = 1;
                    }
                }

                // Phase 5 (p 0.85-1.0): Final result pops in with scale bounce
                if (p > 0.85) {
                    const p5 = Math.min(1, (p - 0.85) / 0.15);
                    const ep5 = ease(p5);
                    const ry = h * 0.9;
                    const scale = ep5 < 0.5 ? 0.8 + 0.3 * ease(ep5 / 0.5) : 1.0 + 0.05 * (1 - ease((ep5 - 0.5) / 0.5));

                    ctx.globalAlpha = ep5;
                    ctx.save();
                    ctx.translate(cx, ry);
                    ctx.scale(scale, scale);

                    Draw.roundRect(ctx, -110 * s, -22 * s, 220 * s, 44 * s, 6 * s, '#e4f2e7');
                    ctx.strokeStyle = '#81c784'; ctx.lineWidth = 1.5 * s;
                    ctx.strokeRect(-110 * s, -22 * s, 220 * s, 44 * s);
                    Draw.label(ctx, '= 2,058 \u00d7 10\u2074 N', 0, 0, '#3d8b44', 14 * s);

                    ctx.restore();
                    ctx.globalAlpha = 1;
                }
            }
        },

        // ---- Step 5: Nei nostri problemi ----
        {
            title: 'Nei nostri problemi',
            text: 'Nel primo problema abbiamo un\'auto da <span class="highlight">2100 kg = 2,1 &times; 10&sup3; kg</span>.<br><br>' +
                'Il peso è: <span class="highlight">P = mg = 2,1 &times; 10&sup3; &times; 9,8 = 2,058 &times; 10&sup4; N</span>.<br>' +
                'La tensione della fune è: <span class="highlight">T = 1,029 &times; 10&sup4; N</span>.<br><br>' +
                'Nota: l\'esponente ti dice subito l\'<b>ordine di grandezza</b>! Sia P che T sono dell\'ordine di 10&sup4;, cioè decine di migliaia di newton. Questo controllo è utilissimo per capire se il risultato ha senso.',
            formula: 'P = 2{,}058 \\times 10^4 \\text{ N} \\qquad T = 1{,}029 \\times 10^4 \\text{ N}',
            cleanDraw: true,
            duration: 1800,
            draw(ctx, w, h, p) {
                const s = Draw.S(w, h);
                ctx.fillStyle = '#faf8f5';
                ctx.fillRect(0, 0, w, h);

                const cx = w / 2;
                const ease = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

                const values = [
                    { label: 'Massa:', original: '2 100 kg', scientific: '2,1 \u00d7 10\u00b3 kg', color: '#c46b60', exp: 3 },
                    { label: 'Peso:', original: '20 580 N', scientific: '2,058 \u00d7 10\u2074 N', color: '#5a8fa8', exp: 4 },
                    { label: 'Tensione:', original: '10 290 N', scientific: '1,029 \u00d7 10\u2074 N', color: '#5a9a6a', exp: 4 }
                ];

                const startY = h * 0.13;
                const rowH = h * 0.17;

                for (let i = 0; i < values.length; i++) {
                    const delay = 0.02 + i * 0.18;
                    if (p <= delay) continue;

                    const rowP = Math.min(1, (p - delay) / 0.22);
                    const v = values[i];
                    const y = startY + i * rowH;

                    // Sub-phases within each row
                    const fadeIn = Math.min(1, rowP * 4);       // 0-0.25: label + original appear
                    const morphP = Math.max(0, Math.min(1, (rowP - 0.25) / 0.45)); // 0.25-0.70: morph
                    const settleP = Math.max(0, Math.min(1, (rowP - 0.70) / 0.30)); // 0.70-1.0: settle

                    ctx.globalAlpha = fadeIn;

                    // Label always visible once faded in
                    Draw.label(ctx, v.label, w * 0.10, y, '#2e2e2e', 11 * s, false);

                    if (morphP <= 0) {
                        // Just show original number, sliding in from left
                        const slideX = w * 0.35 - (1 - fadeIn) * 30 * s;
                        Draw.label(ctx, v.original, slideX, y, v.color, 12 * s);
                    } else if (morphP < 1) {
                        // Morphing: original fades out while sliding right, scientific fades in
                        const em = ease(morphP);

                        // Original slides right and fades
                        ctx.globalAlpha = fadeIn * (1 - em);
                        const origX = w * 0.35 + em * 60 * s;
                        Draw.label(ctx, v.original, origX, y, v.color, 12 * s);

                        // Animated arrow grows
                        ctx.globalAlpha = fadeIn * em;
                        Draw.animatedArrow(ctx, w * 0.48, y, w * 0.56, y, '#d4956a', em, 2 * s, 7 * s);

                        // Scientific notation slides in from right
                        const sciX = w * 0.78 + (1 - em) * 40 * s;
                        Draw.roundRect(ctx, sciX - w * 0.17, y - 15 * s, w * 0.34, 30 * s, 5 * s, `rgba(228,242,231,${0.5 * em})`);
                        Draw.label(ctx, v.scientific, sciX, y, v.color, 12 * s);
                    } else {
                        // Settled: show arrow + scientific with subtle pop
                        ctx.globalAlpha = fadeIn;
                        Draw.animatedArrow(ctx, w * 0.48, y, w * 0.56, y, '#d4956a', 1, 2 * s, 7 * s);

                        const pop = settleP < 0.3 ? 1 + 0.12 * (1 - settleP / 0.3) : 1;
                        Draw.roundRect(ctx, w * 0.61, y - 15 * s, w * 0.34, 30 * s, 5 * s, 'rgba(228,242,231,0.5)');
                        Draw.label(ctx, v.scientific, w * 0.78, y, v.color, 12 * s * pop);

                        // Keep original visible but faint
                        ctx.globalAlpha = fadeIn * 0.35;
                        Draw.label(ctx, v.original, w * 0.30, y, v.color, 10 * s, false);
                    }
                    ctx.globalAlpha = 1;
                }

                // Order of magnitude ruler (p 0.58-1.0)
                if (p > 0.58) {
                    const rp = Math.min(1, (p - 0.58) / 0.30);
                    const erp = ease(rp);
                    ctx.globalAlpha = erp;

                    const rulerY = h * 0.72;
                    const rulerLeft = w * 0.08;
                    const rulerRight = w * 0.92;
                    const rulerW = rulerRight - rulerLeft;

                    // Title
                    Draw.label(ctx, 'Ordine di grandezza', cx, rulerY - 18 * s, '#3d8b44', 10 * s, false);

                    // Horizontal ruler line, draws left to right
                    const lineEndX = rulerLeft + rulerW * erp;
                    Draw.line(ctx, rulerLeft, rulerY, lineEndX, rulerY, '#b0a594', 2 * s);

                    // Tick marks and labels for 10^0 through 10^5
                    const exponents = [0, 1, 2, 3, 4, 5];
                    for (let j = 0; j < exponents.length; j++) {
                        const ex = exponents[j];
                        const tickX = rulerLeft + (j / (exponents.length - 1)) * rulerW;
                        if (tickX > lineEndX) continue;

                        const tickDelay = j / (exponents.length - 1);
                        const tickAlpha = Math.min(1, (erp - tickDelay) * 3);
                        if (tickAlpha <= 0) continue;

                        ctx.globalAlpha = erp * tickAlpha;

                        // Tick
                        Draw.line(ctx, tickX, rulerY - 5 * s, tickX, rulerY + 5 * s, '#b0a594', 1.5 * s);

                        // Label
                        const expLabel = '10' + ['\u2070', '\u00b9', '\u00b2', '\u00b3', '\u2074', '\u2075'][ex];
                        Draw.label(ctx, expLabel, tickX, rulerY + 16 * s, '#7a7060', 9 * s, false);
                    }

                    // Markers for P and T on the ruler at 10^4 position
                    if (erp > 0.6) {
                        const markerP = Math.min(1, (erp - 0.6) / 0.3);
                        const emP = ease(markerP);
                        const exp4X = rulerLeft + (4 / 5) * rulerW;

                        // Marker for P (Peso) - slightly left of 10^4
                        const pX = exp4X - 8 * s;
                        ctx.globalAlpha = emP;

                        // Drop-in from above
                        const dropOffset = (1 - emP) * 20 * s;
                        Draw.circle(ctx, pX, rulerY - 14 * s - dropOffset, 8 * s, 'rgba(90,143,168,0.2)', '#5a8fa8', 1.5 * s);
                        Draw.label(ctx, 'P', pX, rulerY - 14 * s - dropOffset, '#5a8fa8', 9 * s);

                        // Marker for T (Tensione) - slightly right of 10^4
                        const tX = exp4X + 8 * s;
                        const tDelay = markerP > 0.3 ? Math.min(1, (markerP - 0.3) / 0.7) : 0;
                        const emT = ease(tDelay);
                        ctx.globalAlpha = emT;

                        const dropT = (1 - emT) * 20 * s;
                        Draw.circle(ctx, tX, rulerY - 14 * s - dropT, 8 * s, 'rgba(90,154,106,0.2)', '#5a9a6a', 1.5 * s);
                        Draw.label(ctx, 'T', tX, rulerY - 14 * s - dropT, '#5a9a6a', 9 * s);

                        // Brace under both markers linking to 10^4
                        if (emT > 0.5) {
                            const braceAlpha = (emT - 0.5) * 2;
                            ctx.globalAlpha = braceAlpha;
                            Draw.brace(ctx, pX - 10 * s, rulerY + 26 * s, tX + 10 * s, rulerY + 26 * s, '#3d8b44', 1.2 * s, 'entrambi ~ 10\u2074 N', '#3d8b44', 9 * s);
                        }
                    }

                    ctx.globalAlpha = 1;
                }
            }
        }
    ];

    return { id: 'notazione-scientifica', title: 'La notazione scientifica', icon: '\u{1F52C}', category: 'Strumenti', order: 1, steps };
})();
if (typeof TopicRegistry !== 'undefined') TopicRegistry.register(Tema5);
