// ===== Tema 9: Energia cinetica e potenziale =====

const Tema9 = (() => {
    const steps = [

        // ---- STEP 1: Cos'è l'energia? ----
        {
            title: "Cos'è l'energia?",
            text: 'L\'<b>energia</b> è la capacità di fare <span class="term" data-term="lavoro">lavoro</span>. Esistono molte forme di energia, ma le due più importanti in meccanica sono:<br><br>' +
                '&bull; <b style="color:#c46b60">Energia cinetica</b> — legata al <b>movimento</b><br>' +
                '&bull; <b style="color:#5a8fa8">Energia potenziale</b> — legata alla <b>posizione</b><br><br>' +
                'L\'unità di misura è il <span class="term" data-term="joule">Joule</span> (J).',
            formula: null,
            cleanDraw: true,
            draw(ctx, w, h, p) {
                ctx.fillStyle = '#faf8f5';
                ctx.fillRect(0, 0, w, h);
                const s = Draw.S(w, h);

                // --- Left side: kinetic energy (rolling ball) ---
                const lx = w * 0.25, ly = h * 0.55;

                // Title
                if (p > 0.05) {
                    ctx.globalAlpha = Math.min(1, (p - 0.05) * 4);
                    Draw.label(ctx, 'Energia cinetica', lx, h * 0.15, '#c46b60', 12 * s);
                    Draw.label(ctx, '(movimento)', lx, h * 0.23, '#c46b60', 10 * s, false);
                    ctx.globalAlpha = 1;
                }

                // Ground line
                const groundY = ly + 25 * s;
                Draw.line(ctx, lx - 80 * s, groundY, lx + 80 * s, groundY, '#c0b5a5', 2 * s);

                // Rolling ball — moves across
                if (p > 0.1) {
                    const bp = Math.min(1, (p - 0.1) * 1.5);
                    const ballR = 18 * s;
                    const startX = lx - 60 * s;
                    const endX = lx + 60 * s;
                    const bx = startX + (endX - startX) * bp;
                    const by = groundY - ballR;

                    Draw.circle(ctx, bx, by, ballR, '#c46b60', '#a04a40', 2 * s);

                    // Speed arrow
                    if (bp > 0.2) {
                        const arrowLen = 45 * s;
                        Draw.animatedArrow(ctx, bx + ballR + 4 * s, by, bx + ballR + 4 * s + arrowLen, by, '#c46b60', Math.min(1, (bp - 0.2) * 2), 2.5 * s, 9 * s);
                        if (bp > 0.5) {
                            Draw.label(ctx, 'v', bx + ballR + 4 * s + arrowLen + 12 * s, by, '#c46b60', 13 * s);
                        }
                    }

                    // Motion lines behind ball
                    if (bp > 0.3 && bp < 0.95) {
                        ctx.globalAlpha = 0.4;
                        for (let i = 0; i < 3; i++) {
                            const lnx = bx - ballR - 8 * s - i * 10 * s;
                            Draw.line(ctx, lnx, by - 6 * s + i * 6 * s, lnx - 12 * s, by - 6 * s + i * 6 * s, '#c46b60', 1.5 * s);
                        }
                        ctx.globalAlpha = 1;
                    }
                }

                // Label "Ec"
                if (p > 0.4) {
                    ctx.globalAlpha = Math.min(1, (p - 0.4) * 3);
                    Draw.label(ctx, 'Ec', lx, groundY + 25 * s, '#c46b60', 14 * s);
                    ctx.globalAlpha = 1;
                }

                // --- Separator ---
                if (p > 0.3) {
                    ctx.globalAlpha = Math.min(1, (p - 0.3) * 3);
                    Draw.dashedLine(ctx, w * 0.5, h * 0.1, w * 0.5, h * 0.9, '#ccc', 1.5 * s);
                    ctx.globalAlpha = 1;
                }

                // --- Right side: potential energy (ball held up high) ---
                const rx = w * 0.75, ry = h * 0.55;

                if (p > 0.4) {
                    ctx.globalAlpha = Math.min(1, (p - 0.4) * 3);
                    Draw.label(ctx, 'Energia potenziale', rx, h * 0.15, '#5a8fa8', 12 * s);
                    Draw.label(ctx, '(posizione)', rx, h * 0.23, '#5a8fa8', 10 * s, false);
                    ctx.globalAlpha = 1;
                }

                // Ground line right
                const groundYr = ry + 55 * s;
                if (p > 0.45) {
                    ctx.globalAlpha = Math.min(1, (p - 0.45) * 3);
                    Draw.line(ctx, rx - 60 * s, groundYr, rx + 60 * s, groundYr, '#c0b5a5', 2 * s);

                    // Ball up high
                    const ballR = 18 * s;
                    const ballY = ry - 30 * s;
                    Draw.circle(ctx, rx, ballY, ballR, '#5a8fa8', '#3a6f88', 2 * s);

                    // Dashed line from ball to ground (height h)
                    Draw.dashedLine(ctx, rx, ballY + ballR, rx, groundYr, '#5a8fa8', 1.5 * s);

                    // Height label
                    Draw.brace(ctx, rx + 16 * s, ballY + ballR, rx + 16 * s, groundYr, '#5a8fa8', 1.5 * s, 'h', '#5a8fa8', 13 * s);

                    // Down arrow (gravity)
                    Draw.animatedArrow(ctx, rx - 30 * s, ballY, rx - 30 * s, ballY + 35 * s, '#888', 1, 2 * s, 8 * s);
                    Draw.label(ctx, 'g', rx - 42 * s, ballY + 18 * s, '#888', 11 * s);

                    // Label "Ep"
                    Draw.label(ctx, 'Ep', rx, groundYr + 20 * s, '#5a8fa8', 14 * s);
                    ctx.globalAlpha = 1;
                }
            }
        },

        // ---- STEP 2: L'energia cinetica ----
        {
            title: "L'energia cinetica",
            text: 'Un oggetto in movimento ha <span class="term" data-term="energia-cinetica">energia cinetica</span>. Più è pesante o più è veloce, più energia ha.<br><br>' +
                '<span class="highlight">Attenzione:</span> la velocità conta il <b>DOPPIO</b> (è al quadrato!). Se raddoppi la velocità, l\'energia <b>quadruplica</b>.',
            formula: 'E_c = \\frac{1}{2} m v^2',
            cleanDraw: true,
            draw(ctx, w, h, p) {
                ctx.fillStyle = '#faf8f5';
                ctx.fillRect(0, 0, w, h);
                const s = Draw.S(w, h);

                const speeds = [
                    { label: 'v', arrowLen: 30, barH: 20, color: '#d4956a', ecLabel: 'Ec' },
                    { label: '2v', arrowLen: 60, barH: 80, color: '#c46b60', ecLabel: '4 Ec' },
                    { label: '3v', arrowLen: 90, barH: 180, color: '#9b6fb5', ecLabel: '9 Ec' }
                ];

                const colW = w / 3;
                const groundY = h * 0.55;
                const ballR = 14 * s;

                for (let i = 0; i < 3; i++) {
                    const sp = speeds[i];
                    const phase = Math.min(1, Math.max(0, (p - i * 0.2) * 2.5));
                    if (phase <= 0) continue;

                    const cx = colW * i + colW * 0.5;

                    ctx.globalAlpha = phase;

                    // Ground
                    Draw.line(ctx, cx - 55 * s, groundY, cx + 55 * s, groundY, '#c0b5a5', 1.5 * s);

                    // Ball
                    Draw.circle(ctx, cx, groundY - ballR, ballR, sp.color, null, 0);

                    // Speed arrow
                    const arrowLen = sp.arrowLen * s;
                    Draw.animatedArrow(ctx, cx + ballR + 4 * s, groundY - ballR,
                        cx + ballR + 4 * s + arrowLen, groundY - ballR,
                        sp.color, Math.min(1, phase * 2), 2.5 * s, 8 * s);

                    // Speed label
                    Draw.label(ctx, sp.label, cx + ballR + 4 * s + arrowLen / 2, groundY - ballR - 14 * s, sp.color, 11 * s);

                    // Energy bar below
                    if (phase > 0.4) {
                        const barP = Math.min(1, (phase - 0.4) * 2.5);
                        const barW = 30 * s;
                        const barMaxH = sp.barH * s * 0.6;
                        const barActualH = barMaxH * barP;
                        const barX = cx - barW / 2;
                        const barBaseY = h * 0.92;

                        Draw.roundRect(ctx, barX, barBaseY - barActualH, barW, barActualH, 3 * s, sp.color);

                        // Bar label
                        if (barP > 0.6) {
                            Draw.label(ctx, sp.ecLabel, cx, barBaseY + 12 * s, sp.color, 10 * s);
                        }
                    }

                    ctx.globalAlpha = 1;
                }

                // Header labels
                if (p > 0.1) {
                    ctx.globalAlpha = Math.min(1, (p - 0.1) * 3);
                    Draw.label(ctx, 'Velocità →', w * 0.5, h * 0.06, '#888', 11 * s, false);
                    Draw.label(ctx, 'Energia ↑', w * 0.08, h * 0.82, '#888', 10 * s, false);
                    ctx.globalAlpha = 1;
                }

                // v² effect highlight
                if (p > 0.8) {
                    ctx.globalAlpha = Math.min(1, (p - 0.8) * 5);
                    Draw.label(ctx, 'v² → l\'energia cresce molto più in fretta!', w * 0.5, h * 0.15, '#c46b60', 11 * s, false);
                    ctx.globalAlpha = 1;
                }
            }
        },

        // ---- STEP 3: L'energia potenziale gravitazionale ----
        {
            title: "L'energia potenziale gravitazionale",
            text: 'Un oggetto in alto ha <span class="term" data-term="energia-potenziale">energia potenziale</span>: è come avere energia "in deposito".<br><br>' +
                'Più è in alto e più è pesante, più energia ha. Quando cade, questa energia si trasforma in <span class="term" data-term="energia-cinetica">energia cinetica</span>.',
            formula: 'E_p = m g h',
            cleanDraw: true,
            draw(ctx, w, h, p) {
                ctx.fillStyle = '#faf8f5';
                ctx.fillRect(0, 0, w, h);
                const s = Draw.S(w, h);

                const heights = [
                    { label: 'h', hFrac: 0.15, barH: 30, epLabel: 'Ep' },
                    { label: '2h', hFrac: 0.35, barH: 60, epLabel: '2 Ep' },
                    { label: '3h', hFrac: 0.55, barH: 90, epLabel: '3 Ep' }
                ];

                const colW = w / 3;
                const groundY = h * 0.85;
                const ballR = 14 * s;

                for (let i = 0; i < 3; i++) {
                    const ht = heights[i];
                    const phase = Math.min(1, Math.max(0, (p - i * 0.2) * 2.5));
                    if (phase <= 0) continue;

                    const cx = colW * i + colW * 0.5;
                    const ballTopY = groundY - ht.hFrac * h * 1.1;

                    ctx.globalAlpha = phase;

                    // Ground
                    Draw.line(ctx, cx - 50 * s, groundY, cx + 50 * s, groundY, '#c0b5a5', 1.5 * s);

                    // Ball at height
                    Draw.circle(ctx, cx, ballTopY, ballR, '#5a8fa8', '#3a6f88', 2 * s);

                    // Dashed line to ground
                    Draw.dashedLine(ctx, cx, ballTopY + ballR, cx, groundY, '#5a8fa8', 1.5 * s);

                    // Height brace
                    Draw.brace(ctx, cx + 20 * s, ballTopY + ballR, cx + 20 * s, groundY, '#5a8fa8', 1.5 * s, ht.label, '#5a8fa8', 12 * s);

                    // Ep bar on the right side
                    if (phase > 0.4) {
                        const barP = Math.min(1, (phase - 0.4) * 2.5);
                        const barW = 24 * s;
                        const barMaxH = ht.barH * s * 0.65;
                        const barActualH = barMaxH * barP;
                        const barX = cx - 55 * s;
                        const barBaseY = groundY;

                        Draw.roundRect(ctx, barX, barBaseY - barActualH, barW, barActualH, 3 * s, '#5a8fa8');

                        if (barP > 0.6) {
                            Draw.label(ctx, ht.epLabel, barX + barW / 2, barBaseY + 14 * s, '#5a8fa8', 10 * s);
                        }
                    }

                    ctx.globalAlpha = 1;
                }

                // Header
                if (p > 0.1) {
                    ctx.globalAlpha = Math.min(1, (p - 0.1) * 3);
                    Draw.label(ctx, 'Più in alto = più energia potenziale', w * 0.5, h * 0.06, '#5a8fa8', 11 * s, false);
                    ctx.globalAlpha = 1;
                }
            }
        },

        // ---- STEP 4: La conservazione dell'energia ----
        {
            title: "La conservazione dell'energia",
            text: 'Ecco la legge più potente della fisica: l\'energia totale si <span class="term" data-term="conservazione-energia">conserva</span> (se non c\'è <span class="term" data-term="attrito">attrito</span>).<br><br>' +
                'Quando un oggetto cade, <b style="color:#5a8fa8">Ep</b> diminuisce e <b style="color:#c46b60">Ec</b> aumenta, ma la somma <b style="color:#5a9a6a">Ep + Ec</b> resta costante!',
            formula: 'E_p + E_c = \\text{costante} \\quad \\Rightarrow \\quad mgh_1 + \\frac{1}{2}mv_1^2 = mgh_2 + \\frac{1}{2}mv_2^2',
            cleanDraw: true,
            duration: 2000,
            draw(ctx, w, h, p) {
                ctx.fillStyle = '#faf8f5';
                ctx.fillRect(0, 0, w, h);
                const s = Draw.S(w, h);

                // Ramp
                const rampLeft = w * 0.1;
                const rampRight = w * 0.65;
                const rampTop = h * 0.2;
                const rampBottom = h * 0.7;

                // Draw ramp (triangle)
                ctx.fillStyle = '#e8e3db';
                ctx.strokeStyle = '#b0a898';
                ctx.lineWidth = 2 * s;
                ctx.beginPath();
                ctx.moveTo(rampLeft, rampTop);
                ctx.lineTo(rampLeft, rampBottom);
                ctx.lineTo(rampRight, rampBottom);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                // Ground extension
                Draw.line(ctx, rampLeft - 10 * s, rampBottom, w * 0.75, rampBottom, '#c0b5a5', 2 * s);

                // Ball rolling down — position along ramp
                const ballR = 14 * s;
                const rampLen = Math.sqrt((rampRight - rampLeft) ** 2 + (rampBottom - rampTop) ** 2);
                const rampAngle = Math.atan2(rampBottom - rampTop, rampRight - rampLeft);

                // Ball progress along ramp: 0 = top, 1 = bottom
                const ballT = Math.min(1, p * 1.3);
                const ballX = rampLeft + (rampRight - rampLeft) * ballT;
                const ballY = rampTop + (rampBottom - rampTop) * ballT - ballR - 2 * s;

                // Offset ball slightly above the ramp surface
                const normalX = -Math.sin(rampAngle) * (ballR + 2 * s);
                const normalY = Math.cos(rampAngle) * (ballR + 2 * s);
                const surfX = rampLeft + (rampRight - rampLeft) * ballT;
                const surfY = rampTop + (rampBottom - rampTop) * ballT;
                const bx = surfX + normalX;
                const by = surfY - normalY;

                Draw.circle(ctx, bx, by, ballR, '#d4956a', '#b07848', 2 * s);

                // --- Energy bars on the right ---
                const barBaseX = w * 0.75;
                const barW = 28 * s;
                const barMaxH = (rampBottom - rampTop) * 0.8;
                const barBaseY = rampBottom;
                const gap = 12 * s;

                // Ep fraction (decreases as ball goes down)
                const epFrac = 1 - ballT;
                // Ec fraction (increases as ball goes down)
                const ecFrac = ballT;

                // Ep bar (blue)
                const epH = barMaxH * epFrac;
                if (epH > 1) {
                    Draw.roundRect(ctx, barBaseX, barBaseY - epH, barW, epH, 3 * s, '#5a8fa8');
                }
                Draw.label(ctx, 'Ep', barBaseX + barW / 2, barBaseY + 14 * s, '#5a8fa8', 10 * s);

                // Ec bar (red/orange)
                const ecH = barMaxH * ecFrac;
                if (ecH > 1) {
                    Draw.roundRect(ctx, barBaseX + barW + gap, barBaseY - ecH, barW, ecH, 3 * s, '#c46b60');
                }
                Draw.label(ctx, 'Ec', barBaseX + barW + gap + barW / 2, barBaseY + 14 * s, '#c46b60', 10 * s);

                // Total bar (green) — always full
                const totalH = barMaxH;
                Draw.roundRect(ctx, barBaseX + 2 * (barW + gap), barBaseY - totalH, barW, totalH, 3 * s, '#5a9a6a');
                Draw.label(ctx, 'Tot', barBaseX + 2 * (barW + gap) + barW / 2, barBaseY + 14 * s, '#5a9a6a', 10 * s);

                // "costante!" label near total
                if (p > 0.5) {
                    ctx.globalAlpha = Math.min(1, (p - 0.5) * 3);
                    Draw.label(ctx, 'costante!', barBaseX + 2 * (barW + gap) + barW / 2, barBaseY - totalH - 14 * s, '#5a9a6a', 10 * s, false);
                    ctx.globalAlpha = 1;
                }

                // Position labels on ramp
                if (p < 0.15) {
                    Draw.label(ctx, 'PARTENZA', bx, by - ballR - 12 * s, '#888', 9 * s, false);
                    Draw.label(ctx, 'tutta Ep', bx, by - ballR - 24 * s, '#5a8fa8', 10 * s);
                }
                if (p > 0.85) {
                    Draw.label(ctx, 'ARRIVO', bx + 5 * s, by - ballR - 12 * s, '#888', 9 * s, false);
                    Draw.label(ctx, 'tutta Ec', bx + 5 * s, by - ballR - 24 * s, '#c46b60', 10 * s);
                }
                if (p > 0.4 && p < 0.65) {
                    Draw.label(ctx, 'metà e metà', bx + 20 * s, by - ballR - 12 * s, '#888', 9 * s, false);
                }
            }
        },

        // ---- STEP 5: A cosa serve? ----
        {
            title: 'A cosa serve?',
            text: 'La <span class="term" data-term="conservazione-energia">conservazione dell\'energia</span> è utilissima per calcolare velocità senza conoscere le forze!<br><br>' +
                '<span class="highlight">Esempio:</span> da quale altezza deve cadere un oggetto per raggiungere <b>10 m/s</b>?<br>' +
                '<i>mgh</i> = <i>½mv²</i> → <i>h</i> = <i>v²/(2g)</i> ≈ <b>5,1 m</b>. Nota: la <span class="term" data-term="massa">massa</span> si semplifica!',
            formula: 'h = \\frac{v^2}{2g} = \\frac{10^2}{2 \\times 9{,}8} \\approx 5{,}1 \\text{ m}',
            cleanDraw: true,
            draw(ctx, w, h, p) {
                ctx.fillStyle = '#faf8f5';
                ctx.fillRect(0, 0, w, h);
                const s = Draw.S(w, h);

                const cx = w * 0.35;
                const groundY = h * 0.82;
                const topY = h * 0.18;
                const ballR = 16 * s;

                // Ground
                Draw.line(ctx, cx - 80 * s, groundY, cx + 80 * s, groundY, '#c0b5a5', 2 * s);

                // Ball at the top (fades as it falls)
                if (p < 0.5) {
                    ctx.globalAlpha = Math.max(0.3, 1 - p * 2);
                    Draw.circle(ctx, cx, topY, ballR, '#5a8fa8', '#3a6f88', 2 * s);
                    ctx.globalAlpha = 1;
                }

                // Dashed line showing height
                Draw.dashedLine(ctx, cx + 30 * s, topY + ballR, cx + 30 * s, groundY, '#5a8fa8', 1.5 * s);

                // Height brace and label
                Draw.brace(ctx, cx + 45 * s, topY + ballR, cx + 45 * s, groundY, '#5a8fa8', 1.5 * s, 'h = 5,1 m', '#5a8fa8', 11 * s);

                // Ball falling — animate position
                const fallP = Math.min(1, p * 1.5);
                const currentY = topY + (groundY - topY - ballR) * fallP;
                Draw.circle(ctx, cx, currentY, ballR, '#d4956a', '#b07848', 2 * s);

                // At the bottom, show velocity arrow
                if (p > 0.6) {
                    const vp = Math.min(1, (p - 0.6) * 3);
                    const arrowLen = 70 * s;
                    Draw.animatedArrow(ctx, cx + ballR + 4 * s, groundY - ballR,
                        cx + ballR + 4 * s + arrowLen, groundY - ballR,
                        '#c46b60', vp, 3 * s, 10 * s);
                    if (vp > 0.4) {
                        Draw.label(ctx, 'v = 10 m/s', cx + ballR + 4 * s + arrowLen / 2, groundY - ballR - 16 * s, '#c46b60', 11 * s);
                    }
                }

                // Calculation steps appearing on the right
                const calcX = w * 0.72;
                const calcStartY = h * 0.2;
                const lineH = 28 * s;

                const calcSteps = [
                    { t: 0.2, text: 'mgh = ½mv²', color: '#888' },
                    { t: 0.35, text: 'gh = ½v²', color: '#5a8fa8' },
                    { t: 0.5, text: 'h = v² / (2g)', color: '#5a8fa8' },
                    { t: 0.65, text: 'h = 100 / 19,6', color: '#d4956a' },
                    { t: 0.8, text: 'h ≈ 5,1 m', color: '#5a9a6a' }
                ];

                for (let i = 0; i < calcSteps.length; i++) {
                    const cs = calcSteps[i];
                    if (p > cs.t) {
                        ctx.globalAlpha = Math.min(1, (p - cs.t) * 5);
                        const isBold = i === calcSteps.length - 1;
                        Draw.label(ctx, cs.text, calcX, calcStartY + i * lineH, cs.color, (isBold ? 13 : 11) * s, isBold);
                        ctx.globalAlpha = 1;
                    }
                }

                // Highlight "massa si semplifica"
                if (p > 0.4) {
                    ctx.globalAlpha = Math.min(1, (p - 0.4) * 3);
                    // Strikethrough on 'm' in step 1 → step 2
                    Draw.label(ctx, '← la massa si semplifica!', calcX + 50 * s, calcStartY + 0.5 * lineH, '#9b6fb5', 9 * s, false);
                    ctx.globalAlpha = 1;
                }
            }
        }
    ];

    const quiz = [
        {
            question: 'Se raddoppi la velocità di un oggetto, la sua energia cinetica...',
            options: ['Raddoppia', 'Quadruplica', 'Resta uguale', 'Si dimezza'],
            correct: 1,
            explanation: 'Ec = ½mv². Se la velocità raddoppia (2v), l\'energia diventa ½m(2v)² = ½m·4v² = 4 × ½mv². Quadruplica!'
        },
        {
            question: 'Una palla cade da 10 m senza attrito. A metà (5 m), quanta Ep ha perso?',
            options: ['Un quarto', 'La metà', 'Tre quarti', 'Tutta'],
            correct: 1,
            explanation: 'Ep = mgh. Se h si dimezza (da 10 m a 5 m), Ep si dimezza. Ha perso la metà della sua energia potenziale, che si è trasformata in energia cinetica.'
        }
    ];

    return { id: 'energia', title: 'Energia cinetica e potenziale', icon: '⚡', category: 'Energia', order: 9, steps, quiz };
})();
if (typeof TopicRegistry !== 'undefined') TopicRegistry.register(Tema9);
