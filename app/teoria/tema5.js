// ===== Tema 5: La notazione scientifica =====

const Tema5 = (() => {
    const steps = [
        // ---- Step 1: Numeri enormi e minuscoli ----
        {
            title: 'Numeri enormi e minuscoli',
            text: 'In fisica abbiamo a che fare con numeri <b>enormi</b> (massa della Terra, distanza dal Sole) e numeri <b>minuscoli</b> (massa di un elettrone, tempo di contatto in un urto tra palle da biliardo).<br><br>' +
                'Scrivere tutti quegli zeri e <b>scomodo</b> e si rischia di sbagliare: basta dimenticarne uno per ottenere un risultato sbagliato!<br><br>' +
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
                '<b>1)</b> Un <span class="highlight">coefficiente a</span>, cioe un numero compreso tra 1 e 10.<br>' +
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
                '<b>1)</b> Sposta la virgola finche non ottieni un numero tra 1 e 10.<br>' +
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
                'Con la <span class="term" data-term="notazione-scientifica">notazione scientifica</span> i conti diventano piu semplici, soprattutto quando i numeri hanno tante cifre!',
            formula: '(a \\times 10^m) \\times (b \\times 10^n) = (a \\times b) \\times 10^{m+n}',
            cleanDraw: true,
            duration: 1400,
            draw(ctx, w, h, p) {
                const s = Draw.S(w, h);
                ctx.fillStyle = '#faf8f5';
                ctx.fillRect(0, 0, w, h);

                const cx = w / 2;

                // Two numbers coming together
                if (p > 0.05) {
                    const fp = Math.min(1, (p - 0.05) / 0.3);
                    ctx.globalAlpha = fp;

                    const y1 = h * 0.2;
                    const leftX = cx - 70 * s - (1 - fp) * 40 * s;
                    const rightX = cx + 70 * s + (1 - fp) * 40 * s;

                    // First number box
                    Draw.roundRect(ctx, leftX - 55 * s, y1 - 18 * s, 110 * s, 36 * s, 5 * s, 'rgba(196,107,96,0.15)');
                    ctx.strokeStyle = '#c46b60';
                    ctx.lineWidth = 1.5 * s;
                    ctx.strokeRect(leftX - 55 * s, y1 - 18 * s, 110 * s, 36 * s);
                    Draw.label(ctx, '2,1 \u00d7 10\u00b3', leftX, y1, '#c46b60', 13 * s);

                    // Multiplication sign
                    Draw.label(ctx, '\u00d7', cx, y1, '#2e2e2e', 16 * s);

                    // Second number box
                    Draw.roundRect(ctx, rightX - 45 * s, y1 - 18 * s, 90 * s, 36 * s, 5 * s, 'rgba(90,143,168,0.15)');
                    ctx.strokeStyle = '#5a8fa8';
                    ctx.lineWidth = 1.5 * s;
                    ctx.strokeRect(rightX - 45 * s, y1 - 18 * s, 90 * s, 36 * s);
                    Draw.label(ctx, '9,8', rightX, y1, '#5a8fa8', 13 * s);

                    ctx.globalAlpha = 1;
                }

                // Show the process: coefficients multiply, exponents add
                if (p > 0.35) {
                    const fp = Math.min(1, (p - 0.35) / 0.3);
                    ctx.globalAlpha = fp;

                    const procY = h * 0.45;

                    // Coefficients
                    Draw.label(ctx, 'Coefficienti:', w * 0.15, procY - 14 * s, '#2e2e2e', 10 * s, false);
                    Draw.label(ctx, '2,1 \u00d7 9,8 = 20,58', w * 0.5, procY - 14 * s, '#c46b60', 12 * s);

                    // Exponents
                    Draw.label(ctx, 'Esponenti:', w * 0.15, procY + 14 * s, '#2e2e2e', 10 * s, false);
                    Draw.label(ctx, '3 + 0 = 3', w * 0.5, procY + 14 * s, '#5a8fa8', 12 * s);

                    // Arrow down
                    if (fp > 0.6) {
                        Draw.animatedArrow(ctx, cx, procY + 30 * s, cx, procY + 50 * s, '#5a9a6a', fp, 2 * s, 8 * s);
                    }

                    ctx.globalAlpha = 1;
                }

                // Intermediate result
                if (p > 0.55) {
                    const fp = Math.min(1, (p - 0.55) / 0.2);
                    ctx.globalAlpha = fp;

                    const midY = h * 0.63;
                    Draw.label(ctx, '= 20,58 \u00d7 10\u00b3 N', cx, midY, '#d4956a', 13 * s);

                    // Note: adjust to proper notation
                    if (fp > 0.5) {
                        Draw.label(ctx, 'Ma 20,58 > 10! Aggiustiamo...', cx, midY + 20 * s, '#d4956a', 9 * s, false);
                    }

                    ctx.globalAlpha = 1;
                }

                // Final result in green box
                if (p > 0.75) {
                    const rp = Math.min(1, (p - 0.75) / 0.2);
                    ctx.globalAlpha = rp;

                    const ry = h * 0.83;
                    Draw.roundRect(ctx, cx - 110 * s, ry - 22 * s, 220 * s, 44 * s, 6 * s, '#e4f2e7');
                    ctx.strokeStyle = '#81c784';
                    ctx.lineWidth = 1.5 * s;
                    ctx.strokeRect(cx - 110 * s, ry - 22 * s, 220 * s, 44 * s);

                    Draw.label(ctx, '= 2,058 \u00d7 10\u2074 N', cx, ry, '#3d8b44', 14 * s);

                    ctx.globalAlpha = 1;
                }
            }
        },

        // ---- Step 5: Nei nostri problemi ----
        {
            title: 'Nei nostri problemi',
            text: 'Nel primo problema abbiamo un\'auto da <span class="highlight">2100 kg = 2,1 &times; 10&sup3; kg</span>.<br><br>' +
                'Il peso e: <span class="highlight">P = mg = 2,1 &times; 10&sup3; &times; 9,8 = 2,058 &times; 10&sup4; N</span>.<br>' +
                'La tensione della fune e: <span class="highlight">T = 1,029 &times; 10&sup4; N</span>.<br><br>' +
                'Nota: l\'esponente ti dice subito l\'<b>ordine di grandezza</b>! Sia P che T sono dell\'ordine di 10&sup4;, cioe decine di migliaia di newton. Questo controllo e utilissimo per capire se il risultato ha senso.',
            formula: 'P = 2{,}058 \\times 10^4 \\text{ N} \\qquad T = 1{,}029 \\times 10^4 \\text{ N}',
            cleanDraw: true,
            duration: 1200,
            draw(ctx, w, h, p) {
                const s = Draw.S(w, h);
                ctx.fillStyle = '#faf8f5';
                ctx.fillRect(0, 0, w, h);

                const cx = w / 2;

                // Three values stacked vertically
                const values = [
                    { label: 'Massa:', original: '2 100 kg', scientific: '2,1 \u00d7 10\u00b3 kg', color: '#c46b60' },
                    { label: 'Peso:', original: '20 580 N', scientific: '2,058 \u00d7 10\u2074 N', color: '#5a8fa8' },
                    { label: 'Tensione:', original: '10 290 N', scientific: '1,029 \u00d7 10\u2074 N', color: '#5a9a6a' }
                ];

                const startY = h * 0.18;
                const rowH = h * 0.2;

                for (let i = 0; i < values.length; i++) {
                    const delay = 0.05 + i * 0.2;
                    if (p > delay) {
                        const fp = Math.min(1, (p - delay) / 0.25);
                        ctx.globalAlpha = fp;

                        const y = startY + i * rowH;
                        const v = values[i];

                        // Label
                        Draw.label(ctx, v.label, w * 0.12, y, '#2e2e2e', 11 * s, false);

                        // Original value
                        Draw.label(ctx, v.original, w * 0.35, y, v.color, 12 * s);

                        // Arrow
                        Draw.animatedArrow(ctx, w * 0.5, y, w * 0.58, y, '#d4956a', fp, 2 * s, 7 * s);

                        // Scientific notation value
                        Draw.roundRect(ctx, w * 0.6, y - 15 * s, w * 0.35, 30 * s, 5 * s, 'rgba(228,242,231,0.5)');
                        Draw.label(ctx, v.scientific, w * 0.78, y, v.color, 12 * s);

                        ctx.globalAlpha = 1;
                    }
                }

                // Order of magnitude box
                if (p > 0.7) {
                    const rp = Math.min(1, (p - 0.7) / 0.25);
                    ctx.globalAlpha = rp;

                    const boxY = h * 0.8;
                    Draw.roundRect(ctx, cx - 120 * s, boxY - 24 * s, 240 * s, 50 * s, 6 * s, '#e4f2e7');
                    ctx.strokeStyle = '#81c784';
                    ctx.lineWidth = 1.5 * s;
                    ctx.strokeRect(cx - 120 * s, boxY - 24 * s, 240 * s, 50 * s);

                    Draw.label(ctx, 'Ordine di grandezza: 10\u2074', cx, boxY - 5 * s, '#3d8b44', 13 * s);
                    Draw.label(ctx, 'Decine di migliaia di N', cx, boxY + 14 * s, '#3d8b44', 10 * s, false);

                    ctx.globalAlpha = 1;
                }
            }
        }
    ];

    return { steps };
})();
