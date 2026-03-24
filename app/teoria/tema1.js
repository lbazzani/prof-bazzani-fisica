// ===== Tema 1: Le forze e l'equilibrio =====

const Tema1 = (() => {
    const steps = [
        {
            title: "Cos'è una forza?",
            text: 'Una <span class="term" data-term="forza">forza</span> è una grandezza che può <b>cambiare il movimento</b> di un oggetto oppure <b>deformarlo</b>. ' +
                'Pensa a quando spingi un carrello al supermercato: lo fai accelerare, frenare o curvare. Ogni volta stai applicando una forza!<br><br>' +
                'La forza è un <span class="term" data-term="vettore">vettore</span>: non basta dire "quanto è forte", bisogna dire anche <b>in che direzione</b> e <b>in che verso</b> agisce. ' +
                'Per questo la disegniamo come una <b>freccia</b>: più lunga = più intensa.',
            formula: '\\vec{F} \\quad \\longrightarrow \\quad \\text{intensità, direzione, verso}',
            cleanDraw: true,
            duration: 1200,
            draw(ctx, w, h, p) {
                const s = Draw.S(w, h);
                const cx = w / 2, cy = h / 2;
                const boxW = 60 * s, boxH = 50 * s;

                // Draw the box
                ctx.globalAlpha = Math.min(1, p * 3);
                Draw.roundRect(ctx, cx - boxW / 2, cy - boxH / 2, boxW, boxH, 6 * s, '#e8e0d4');
                ctx.strokeStyle = '#b0a594';
                ctx.lineWidth = 2 * s;
                ctx.strokeRect(cx - boxW / 2, cy - boxH / 2, boxW, boxH);

                // Arrow from the left (push right)
                if (p > 0.15) {
                    const ap = Math.min(1, (p - 0.15) / 0.3);
                    Draw.animatedArrow(ctx, cx - boxW / 2 - 80 * s, cy, cx - boxW / 2 - 8 * s, cy, '#c46b60', ap, 3 * s, 11 * s);
                    if (ap > 0.6) Draw.label(ctx, 'F\u2081', cx - boxW / 2 - 45 * s, cy - 16 * s, '#c46b60', 14 * s);
                }

                // Arrow from the right (push left)
                if (p > 0.35) {
                    const ap = Math.min(1, (p - 0.35) / 0.3);
                    Draw.animatedArrow(ctx, cx + boxW / 2 + 80 * s, cy, cx + boxW / 2 + 8 * s, cy, '#5a8fa8', ap, 3 * s, 11 * s);
                    if (ap > 0.6) Draw.label(ctx, 'F\u2082', cx + boxW / 2 + 45 * s, cy - 16 * s, '#5a8fa8', 14 * s);
                }

                // Arrow from the top (push down)
                if (p > 0.55) {
                    const ap = Math.min(1, (p - 0.55) / 0.3);
                    Draw.animatedArrow(ctx, cx, cy - boxH / 2 - 70 * s, cx, cy - boxH / 2 - 8 * s, '#5a9a6a', ap, 3 * s, 11 * s);
                    if (ap > 0.6) Draw.label(ctx, 'F\u2083', cx + 18 * s, cy - boxH / 2 - 45 * s, '#5a9a6a', 14 * s);
                }

                // Arrow from the bottom (push up)
                if (p > 0.7) {
                    const ap = Math.min(1, (p - 0.7) / 0.3);
                    Draw.animatedArrow(ctx, cx, cy + boxH / 2 + 70 * s, cx, cy + boxH / 2 + 8 * s, '#d4956a', ap, 3 * s, 11 * s);
                    if (ap > 0.6) Draw.label(ctx, 'F\u2084', cx + 18 * s, cy + boxH / 2 + 45 * s, '#d4956a', 14 * s);
                }
            }
        },
        {
            title: 'Sommare le forze (stessa direzione)',
            text: 'Se più <span class="term" data-term="forza">forze</span> agiscono sullo stesso oggetto, dobbiamo <b>sommarle</b> per trovare l\'effetto totale. Ma attenzione: le forze sono <span class="term" data-term="vettore">vettori</span>, quindi conta la direzione!<br><br>' +
                '<b>Caso semplice:</b> forze nella stessa direzione si sommano. Forze opposte si sottraggono.<br><br>' +
                'Esempio: se spingi una scatola con <span class="highlight">5 N</span> a destra e un amico aggiunge <span class="highlight">3 N</span> a destra, il totale è <span class="highlight">8 N</span> a destra. Se invece il tuo amico spinge a sinistra, il totale è solo 2 N a destra.',
            formula: '\\text{Stessa direzione: } 5 + 3 = 8 \\text{ N} \\qquad \\text{Opposte: } 5 - 3 = 2 \\text{ N}',
            cleanDraw: true,
            duration: 1800,
            draw(ctx, w, h, p) {
                const s = Draw.S(w, h);
                ctx.fillStyle = '#faf8f5'; ctx.fillRect(0, 0, w, h);

                // === CASO 1 (top): stessa direzione → si sommano ===
                const y1 = h * 0.28;
                ctx.globalAlpha = p;
                Draw.label(ctx, 'Stessa direzione:', w*0.14, y1 - 25*s, '#2e2e2e', 11*s);

                // Scatola
                const bw = 40*s, bh = 30*s, bx = w*0.42;
                Draw.roundRect(ctx, bx, y1 - bh/2, bw, bh, 4*s, '#e8e0d4');
                ctx.strokeStyle = '#b0a594'; ctx.lineWidth = 1.5*s;
                ctx.strokeRect(bx, y1 - bh/2, bw, bh);

                // F1 = 5N a destra
                if (p > 0.1) {
                    const fp = Math.min(1, (p-0.1)/0.25);
                    Draw.animatedArrow(ctx, bx - 65*s, y1, bx - 5*s, y1, '#c46b60', fp, 3*s, 9*s);
                    if (fp > 0.5) Draw.label(ctx, '5 N \u2192', bx - 40*s, y1 - 14*s, '#c46b60', 10*s);
                }
                // F2 = 3N a destra
                if (p > 0.25) {
                    const fp = Math.min(1, (p-0.25)/0.25);
                    Draw.animatedArrow(ctx, bx - 65*s, y1 + 18*s, bx - 5*s - 18*s, y1 + 18*s, '#5a8fa8', fp, 3*s, 9*s);
                    if (fp > 0.5) Draw.label(ctx, '3 N \u2192', bx - 40*s, y1 + 32*s, '#5a8fa8', 10*s);
                }
                // Risultante = 8N
                if (p > 0.45) {
                    const fp = Math.min(1, (p-0.45)/0.2);
                    ctx.globalAlpha = fp;
                    Draw.animatedArrow(ctx, bx + bw + 8*s, y1, bx + bw + 95*s, y1, '#5a9a6a', fp, 3.5*s, 11*s);
                    Draw.label(ctx, '= 8 N \u2192', bx + bw + 55*s, y1 - 14*s, '#5a9a6a', 11*s);
                }

                // === CASO 2 (bottom): opposte → si sottraggono ===
                const y2 = h * 0.72;
                ctx.globalAlpha = Math.min(1, Math.max(0, (p-0.35)*3));
                Draw.label(ctx, 'Direzioni opposte:', w*0.14, y2 - 25*s, '#2e2e2e', 11*s);

                // Scatola
                Draw.roundRect(ctx, bx, y2 - bh/2, bw, bh, 4*s, '#e8e0d4');
                ctx.strokeStyle = '#b0a594'; ctx.lineWidth = 1.5*s;
                ctx.strokeRect(bx, y2 - bh/2, bw, bh);

                // F1 = 5N a destra
                if (p > 0.5) {
                    const fp = Math.min(1, (p-0.5)/0.2);
                    Draw.animatedArrow(ctx, bx - 65*s, y2, bx - 5*s, y2, '#c46b60', fp, 3*s, 9*s);
                    if (fp > 0.5) Draw.label(ctx, '5 N \u2192', bx - 40*s, y2 - 14*s, '#c46b60', 10*s);
                }
                // F2 = 3N a SINISTRA
                if (p > 0.6) {
                    const fp = Math.min(1, (p-0.6)/0.2);
                    Draw.animatedArrow(ctx, bx + bw + 60*s, y2, bx + bw + 5*s, y2, '#5a8fa8', fp, 3*s, 9*s);
                    if (fp > 0.5) Draw.label(ctx, '\u2190 3 N', bx + bw + 35*s, y2 - 14*s, '#5a8fa8', 10*s);
                }
                // Risultante = 2N a destra
                if (p > 0.8) {
                    const fp = (p-0.8)/0.2;
                    ctx.globalAlpha = fp;
                    Draw.animatedArrow(ctx, bx + bw + 8*s, y2 + 22*s, bx + bw + 35*s, y2 + 22*s, '#5a9a6a', fp, 3.5*s, 11*s);
                    Draw.label(ctx, '= 2 N \u2192', bx + bw + 55*s, y2 + 22*s, '#5a9a6a', 11*s);
                }
            }
        },
        {
            title: 'Sommare forze perpendicolari',
            text: 'E se le forze non sono sulla stessa linea? Serve la regola <b>punta-coda</b>: metti la coda della seconda freccia sulla punta della prima. La <b>risultante</b> va dall\'inizio della prima alla fine della seconda.<br><br>' +
                'Se le due forze sono perpendicolari (90°), la risultante si calcola con <span class="term" data-term="pitagora">Pitagora</span>!<br><br>' +
                '<b>Esempio:</b> 3 N orizzontale + 4 N verticale = &radic;(9+16) = <span class="highlight">5 N</span> in diagonale.',
            formula: 'F_R = \\sqrt{F_1^2 + F_2^2} = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5 \\text{ N}',
            cleanDraw: true,
            duration: 2000,
            draw(ctx, w, h, p) {
                const s = Draw.S(w, h);
                ctx.fillStyle = '#faf8f5'; ctx.fillRect(0, 0, w, h);

                const ox = w * 0.25, oy = h * 0.6;
                const f1Len = 90*s, f2Len = 120*s; // proporzionali a 3 e 4

                ctx.globalAlpha = p;

                // F1 orizzontale (3 N)
                if (p > 0.05) {
                    const fp = Math.min(1, (p-0.05)/0.25);
                    Draw.animatedArrow(ctx, ox, oy, ox + f1Len, oy, '#c46b60', fp, 3*s, 10*s);
                    if (fp > 0.5) Draw.label(ctx, 'F\u2081 = 3 N', ox + f1Len/2, oy + 18*s, '#c46b60', 11*s);
                }

                // F2 verticale (4 N) — punta-coda: parte dalla punta di F1
                if (p > 0.3) {
                    const fp = Math.min(1, (p-0.3)/0.25);
                    Draw.animatedArrow(ctx, ox + f1Len, oy, ox + f1Len, oy - f2Len, '#5a8fa8', fp, 3*s, 10*s);
                    if (fp > 0.5) Draw.label(ctx, 'F\u2082 = 4 N', ox + f1Len + 20*s, oy - f2Len/2, '#5a8fa8', 11*s);
                }

                // Angolo retto
                if (p > 0.45) {
                    ctx.globalAlpha = (p-0.45)/0.2;
                    const sq = 12*s;
                    ctx.strokeStyle = '#888'; ctx.lineWidth = 1.5*s;
                    ctx.beginPath();
                    ctx.moveTo(ox + f1Len - sq, oy);
                    ctx.lineTo(ox + f1Len - sq, oy - sq);
                    ctx.lineTo(ox + f1Len, oy - sq);
                    ctx.stroke();
                }

                // Risultante diagonale (dall'origine alla punta di F2)
                if (p > 0.55) {
                    const fp = Math.min(1, (p-0.55)/0.25);
                    ctx.globalAlpha = fp;
                    Draw.animatedArrow(ctx, ox, oy, ox + f1Len, oy - f2Len, '#5a9a6a', fp, 4*s, 12*s);
                    if (fp > 0.5) {
                        Draw.label(ctx, 'Risultante', ox + f1Len/2 - 20*s, oy - f2Len/2 - 14*s, '#5a9a6a', 12*s);
                        Draw.label(ctx, '= 5 N', ox + f1Len/2 - 20*s, oy - f2Len/2 + 4*s, '#5a9a6a', 12*s);
                    }
                }

                // Tratteggiata: parallelogramma di chiusura
                if (p > 0.55) {
                    ctx.globalAlpha = (p-0.55)/0.45 * 0.3;
                    Draw.dashedLine(ctx, ox, oy, ox, oy - f2Len, '#888', 1*s);
                    Draw.dashedLine(ctx, ox, oy - f2Len, ox + f1Len, oy - f2Len, '#888', 1*s);
                }

                // Box Pitagora
                if (p > 0.8) {
                    ctx.globalAlpha = (p-0.8)/0.2;
                    const bx = w*0.58, by = h*0.55;
                    Draw.roundRect(ctx, bx, by, 155*s, 55*s, 6*s, 'rgba(255,255,255,0.92)');
                    ctx.strokeStyle = '#5a9a6a'; ctx.lineWidth = 1.5*s;
                    ctx.strokeRect(bx, by, 155*s, 55*s);
                    Draw.label(ctx, 'Pitagora!', bx + 77*s, by + 14*s, '#5a9a6a', 11*s);
                    Draw.label(ctx, '\u221A(3\u00B2 + 4\u00B2) = \u221A25 = 5', bx + 77*s, by + 36*s, '#2e2e2e', 10*s, false);
                }
            }
        },
        {
            title: 'La forza peso',
            text: 'Ogni oggetto con <span class="term" data-term="massa">massa</span> è attirato dalla Terra verso il basso: questa attrazione si chiama <span class="term" data-term="peso">forza peso</span>.<br><br>' +
                'Il peso dipende dalla massa dell\'oggetto e dall\'accelerazione di <span class="term" data-term="gravita">gravità</span> <b>g = 9,8 m/s\u00B2</b>. ' +
                'Si misura in <span class="term" data-term="newton">Newton</span> (N).<br><br>' +
                '<b>Esempio:</b> una mela di 0,1 kg pesa circa 1 N. Sentirla in mano ti d\u00E0 un\'idea di quanto vale 1 Newton!',
            formula: '\\vec{P} = m \\cdot \\vec{g} \\qquad [\\text{N}] = [\\text{kg}] \\cdot [\\text{m/s}^2]',
            cleanDraw: true,
            duration: 1400,
            draw(ctx, w, h, p) {
                const s = Draw.S(w, h);
                const cx = w * 0.45, startY = h * 0.15;

                // Apple (circle) falling down with trail
                const fallDist = 100 * s;
                const appleY = startY + fallDist * Math.min(1, p * 1.2);
                const appleR = 14 * s;

                // Trail (fading circles behind the apple)
                if (p > 0.1) {
                    const trailSteps = 6;
                    for (let i = 0; i < trailSteps; i++) {
                        const tp = i / trailSteps;
                        const ty = startY + (appleY - startY) * tp;
                        ctx.globalAlpha = (1 - tp) * 0.15 * Math.min(1, p * 2);
                        Draw.circle(ctx, cx, ty, appleR * (0.5 + tp * 0.3), '#c46b60', null);
                    }
                }

                // Apple
                ctx.globalAlpha = Math.min(1, p * 2);
                Draw.circle(ctx, cx, appleY, appleR, '#c46b60', '#a85548', 2 * s);
                // Stem
                ctx.strokeStyle = '#5a9a6a';
                ctx.lineWidth = 2 * s;
                ctx.beginPath();
                ctx.moveTo(cx, appleY - appleR);
                ctx.lineTo(cx + 3 * s, appleY - appleR - 8 * s);
                ctx.stroke();

                // Weight arrow from apple
                if (p > 0.3) {
                    const ap = Math.min(1, (p - 0.3) / 0.4);
                    Draw.animatedArrow(ctx, cx, appleY + appleR + 4 * s, cx, appleY + appleR + 60 * s, '#c46b60', ap, 3 * s, 11 * s);
                    if (ap > 0.5) Draw.label(ctx, 'P = mg', cx, appleY + appleR + 75 * s, '#c46b60', 13 * s);
                }

                // Earth at the bottom pulling
                if (p > 0.5) {
                    const ep = Math.min(1, (p - 0.5) / 0.4);
                    ctx.globalAlpha = ep;
                    // Ground arc
                    Draw.arc(ctx, cx, h + 80 * s, 120 * s, -Math.PI, 0, '#5a8fa8', 3 * s);
                    Draw.label(ctx, 'Terra', cx, h - 18 * s, '#5a8fa8', 13 * s);

                    // Dashed line showing attraction
                    Draw.dashedLine(ctx, cx, h - 30 * s, cx, appleY + appleR + 60 * s, '#5a8fa8', 1.5 * s);
                }

                // "g = 9,8 m/s\u00B2" label
                if (p > 0.7) {
                    ctx.globalAlpha = (p - 0.7) / 0.3;
                    Draw.roundRect(ctx, w * 0.65, h * 0.35, 110 * s, 30 * s, 5 * s, '#fef3ee');
                    ctx.strokeStyle = '#d4956a';
                    ctx.lineWidth = 1.2 * s;
                    ctx.strokeRect(w * 0.65, h * 0.35, 110 * s, 30 * s);
                    Draw.label(ctx, 'g = 9,8 m/s\u00B2', w * 0.65 + 55 * s, h * 0.35 + 15 * s, '#c46b60', 12 * s);
                }
            }
        },
        {
            title: 'La reazione normale',
            text: 'Appoggia un libro su un tavolo: il libro non cade, giusto? Eppure la Terra lo tira gi\u00F9 con il suo <span class="term" data-term="peso">peso</span>. ' +
                'Significa che il tavolo risponde con una forza uguale e contraria, diretta <b>verso l\'alto</b>.<br><br>' +
                'Questa forza si chiama <span class="term" data-term="reazione-normale">reazione normale</span> (N) ed \u00E8 sempre <b>perpendicolare</b> alla superficie di appoggio. ' +
                'Se il libro \u00E8 fermo, la reazione normale \u00E8 <b>uguale al peso</b>: le due forze si annullano.',
            formula: 'N = P = m \\cdot g \\quad \\text{(se l\'oggetto è fermo su superficie orizzontale)}',
            cleanDraw: true,
            duration: 1200,
            draw(ctx, w, h, p) {
                const s = Draw.S(w, h);
                const cx = w / 2;
                const tableY = h * 0.6;
                const bookW = 70 * s, bookH = 20 * s;
                const bookX = cx - bookW / 2;
                const bookY = tableY - bookH;

                // Table surface
                ctx.globalAlpha = Math.min(1, p * 3);
                ctx.fillStyle = '#c8b99a';
                ctx.fillRect(cx - 120 * s, tableY, 240 * s, 8 * s);
                // Table legs
                ctx.fillRect(cx - 110 * s, tableY, 8 * s, 60 * s);
                ctx.fillRect(cx + 102 * s, tableY, 8 * s, 60 * s);

                // Book
                Draw.roundRect(ctx, bookX, bookY, bookW, bookH, 3 * s, '#5a8fa8');
                ctx.strokeStyle = '#4a7d94';
                ctx.lineWidth = 1.5 * s;
                ctx.strokeRect(bookX, bookY, bookW, bookH);
                Draw.label(ctx, 'Libro', cx, bookY + bookH / 2, '#fff', 11 * s);

                // Weight arrow (down)
                if (p > 0.2) {
                    const ap = Math.min(1, (p - 0.2) / 0.3);
                    const arrowStart = tableY + 12 * s;
                    Draw.animatedArrow(ctx, cx, arrowStart, cx, arrowStart + 65 * s, '#c46b60', ap, 3 * s, 11 * s);
                    if (ap > 0.6) Draw.label(ctx, 'P', cx + 18 * s, arrowStart + 35 * s, '#c46b60', 15 * s);
                }

                // Normal reaction arrow (up)
                if (p > 0.5) {
                    const ap = Math.min(1, (p - 0.5) / 0.35);
                    const arrowStart = bookY - 5 * s;
                    Draw.animatedArrow(ctx, cx, arrowStart, cx, arrowStart - 65 * s, '#5a8fa8', ap, 3 * s, 11 * s);
                    if (ap > 0.6) Draw.label(ctx, 'N', cx + 18 * s, arrowStart - 35 * s, '#5a8fa8', 15 * s);
                }

                // Equal sign between arrows
                if (p > 0.8) {
                    ctx.globalAlpha = (p - 0.8) / 0.2;
                    Draw.roundRect(ctx, cx + 40 * s, bookY - 10 * s, 70 * s, 24 * s, 5 * s, '#e4f2e7');
                    ctx.strokeStyle = '#81c784';
                    ctx.lineWidth = 1.2 * s;
                    ctx.strokeRect(cx + 40 * s, bookY - 10 * s, 70 * s, 24 * s);
                    Draw.label(ctx, 'N = P', cx + 75 * s, bookY + 2 * s, '#3d8b44', 12 * s);
                }
            }
        },
        {
            title: "L'attrito",
            text: 'Prova a spingere una scatola pesante sul pavimento: senti una <b>resistenza</b> che si oppone al movimento. ' +
                'Questa forza si chiama <span class="term" data-term="attrito">attrito</span>.<br><br>' +
                'L\'attrito agisce <b>sempre nella direzione opposta</b> al movimento (o al tentativo di movimento). ' +
                '\u00C8 una forza utilissima: senza attrito non potresti camminare, le ruote delle auto slitterebbero e non riusciresti a tenere in mano una penna!',
            formula: 'f \\;\\text{ opposta al moto} \\qquad f \\leq \\mu \\cdot N',
            cleanDraw: true,
            duration: 1200,
            draw(ctx, w, h, p) {
                const s = Draw.S(w, h);
                const cx = w / 2;
                const floorY = h * 0.62;
                const boxW = 55 * s, boxH = 45 * s;
                const boxX = cx - boxW / 2;
                const boxY = floorY - boxH;

                // Floor
                ctx.globalAlpha = Math.min(1, p * 3);
                ctx.fillStyle = '#d5ccba';
                ctx.fillRect(30 * s, floorY, w - 60 * s, 5 * s);
                // Hatching under floor
                ctx.strokeStyle = '#c0b5a5';
                ctx.lineWidth = 1 * s;
                for (let x = 30 * s; x < w - 60 * s + 30 * s; x += 12 * s) {
                    ctx.beginPath();
                    ctx.moveTo(x, floorY + 5 * s);
                    ctx.lineTo(x - 8 * s, floorY + 15 * s);
                    ctx.stroke();
                }

                // Box
                Draw.roundRect(ctx, boxX, boxY, boxW, boxH, 5 * s, '#e8e0d4');
                ctx.strokeStyle = '#b0a594';
                ctx.lineWidth = 2 * s;
                ctx.strokeRect(boxX, boxY, boxW, boxH);

                // Push arrow (from left, trying to move box right)
                if (p > 0.15) {
                    const ap = Math.min(1, (p - 0.15) / 0.3);
                    const arrowY = boxY + boxH / 2;
                    Draw.animatedArrow(ctx, boxX - 90 * s, arrowY, boxX - 8 * s, arrowY, '#5a9a6a', ap, 3 * s, 11 * s);
                    if (ap > 0.6) Draw.label(ctx, 'F (spinta)', boxX - 55 * s, arrowY - 16 * s, '#5a9a6a', 12 * s);
                }

                // Friction arrow: opposes the push F → friction points LEFT (←)
                if (p > 0.45) {
                    const ap = Math.min(1, (p - 0.45) / 0.35);
                    const arrowY = boxY + boxH + 8 * s;
                    ctx.globalAlpha = ap;
                    Draw.animatedArrow(ctx, boxX + boxW * 0.6, arrowY, boxX + boxW * 0.6 + 70 * s, arrowY, '#d4956a', ap, 3 * s, 11 * s);
                    if (ap > 0.6) Draw.label(ctx, '\u2190 f (attrito)', boxX + boxW * 0.6 + 40 * s, arrowY + 16 * s, '#d4956a', 12 * s);
                }

                // Small friction marks under the box
                if (p > 0.6) {
                    ctx.globalAlpha = (p - 0.6) / 0.4;
                    const zigN = 5;
                    ctx.strokeStyle = '#d4956a';
                    ctx.lineWidth = 1.5 * s;
                    ctx.beginPath();
                    for (let i = 0; i < zigN; i++) {
                        const zx = boxX + 8 * s + i * (boxW - 16 * s) / zigN;
                        ctx.moveTo(zx, floorY);
                        ctx.lineTo(zx + 4 * s, floorY - 6 * s);
                        ctx.lineTo(zx + 8 * s, floorY);
                    }
                    ctx.stroke();
                }

                // Direction label
                if (p > 0.75) {
                    ctx.globalAlpha = (p - 0.75) / 0.25;
                    Draw.label(ctx, '\u2190 verso opposto al moto \u2192', cx, floorY + 30 * s, '#888', 11 * s, false);
                }
            }
        },
        {
            title: "L'equilibrio",
            text: 'Un oggetto \u00E8 in <span class="term" data-term="equilibrio">equilibrio</span> quando la <b>somma di tutte le forze</b> che agiscono su di esso \u00E8 <b>zero</b>. ' +
                'In pratica, ogni forza viene "annullata" da un\'altra di uguale intensit\u00E0 ma verso opposto.<br><br>' +
                'Immagina un tiro alla fune: se le due squadre tirano con la stessa forza, la corda non si muove. ' +
                'Quel momento \u00E8 <b>equilibrio</b>!<br><br>' +
                '<b>Attenzione:</b> equilibrio non significa "non ci sono forze", ma che le forze si <b>bilanciano</b> perfettamente.',
            formula: '\\sum \\vec{F} = \\vec{0} \\quad \\Longleftrightarrow \\quad \\text{equilibrio}',
            cleanDraw: true,
            duration: 1400,
            draw(ctx, w, h, p) {
                const s = Draw.S(w, h);
                const cx = w / 2, cy = h / 2;
                const boxW = 50 * s, boxH = 40 * s;

                // Central box
                ctx.globalAlpha = Math.min(1, p * 3);
                Draw.roundRect(ctx, cx - boxW / 2, cy - boxH / 2, boxW, boxH, 5 * s, '#e8e0d4');
                ctx.strokeStyle = '#b0a594';
                ctx.lineWidth = 2 * s;
                ctx.strokeRect(cx - boxW / 2, cy - boxH / 2, boxW, boxH);

                const arrowLen = 70 * s;

                // Left arrow (pull left)
                if (p > 0.1) {
                    const ap = Math.min(1, (p - 0.1) / 0.25);
                    Draw.animatedArrow(ctx, cx - boxW / 2 - 5 * s, cy, cx - boxW / 2 - arrowLen, cy, '#c46b60', ap, 3 * s, 11 * s);
                    if (ap > 0.7) Draw.label(ctx, 'F\u2081', cx - boxW / 2 - arrowLen / 2, cy - 16 * s, '#c46b60', 14 * s);
                }

                // Right arrow (pull right, same length)
                if (p > 0.25) {
                    const ap = Math.min(1, (p - 0.25) / 0.25);
                    Draw.animatedArrow(ctx, cx + boxW / 2 + 5 * s, cy, cx + boxW / 2 + arrowLen, cy, '#5a8fa8', ap, 3 * s, 11 * s);
                    if (ap > 0.7) Draw.label(ctx, 'F\u2082', cx + boxW / 2 + arrowLen / 2, cy - 16 * s, '#5a8fa8', 14 * s);
                }

                // Up arrow
                if (p > 0.4) {
                    const ap = Math.min(1, (p - 0.4) / 0.2);
                    Draw.animatedArrow(ctx, cx, cy - boxH / 2 - 5 * s, cx, cy - boxH / 2 - arrowLen, '#5a9a6a', ap, 3 * s, 11 * s);
                    if (ap > 0.7) Draw.label(ctx, 'N', cx + 16 * s, cy - boxH / 2 - arrowLen / 2, '#5a9a6a', 14 * s);
                }

                // Down arrow
                if (p > 0.5) {
                    const ap = Math.min(1, (p - 0.5) / 0.2);
                    Draw.animatedArrow(ctx, cx, cy + boxH / 2 + 5 * s, cx, cy + boxH / 2 + arrowLen, '#c46b60', ap, 3 * s, 11 * s);
                    if (ap > 0.7) Draw.label(ctx, 'P', cx + 16 * s, cy + boxH / 2 + arrowLen / 2, '#c46b60', 14 * s);
                }

                // Equilibrium banner
                if (p > 0.75) {
                    ctx.globalAlpha = (p - 0.75) / 0.25;
                    Draw.roundRect(ctx, cx - 70 * s, h * 0.08, 140 * s, 28 * s, 6 * s, '#e4f2e7');
                    ctx.strokeStyle = '#81c784';
                    ctx.lineWidth = 1.5 * s;
                    ctx.strokeRect(cx - 70 * s, h * 0.08, 140 * s, 28 * s);
                    Draw.label(ctx, '\u2211F = 0 \u2192 Equilibrio!', cx, h * 0.08 + 14 * s, '#3d8b44', 12 * s);
                }
            }
        },
        {
            title: 'Il diagramma di corpo libero',
            text: 'Il <span class="term" data-term="diagramma-corpo-libero">diagramma di corpo libero</span> \u00E8 lo strumento pi\u00F9 importante per risolvere problemi di fisica. ' +
                'Si fa cos\u00EC:<br><br>' +
                '1. <b>Isola</b> l\'oggetto: disegnalo da solo, senza tavoli, pavimenti o altri oggetti.<br>' +
                '2. <b>Disegna tutte le forze</b> come frecce che partono dal centro dell\'oggetto.<br>' +
                '3. <b>Etichetta</b> ogni forza con il suo nome.<br><br>' +
                'Questo schema semplifica il problema e ti permette di applicare la condizione di equilibrio \u2211F = 0.',
            formula: '\\text{DCL: isola} \\to \\text{disegna le forze} \\to \\text{risolvi}',
            cleanDraw: true,
            duration: 1600,
            draw(ctx, w, h, p) {
                const s = Draw.S(w, h);

                // Left side: box on table (the "real" scene)
                const lx = w * 0.22, ly = h * 0.5;
                const tableW = 100 * s, tableH = 6 * s;
                const boxW = 44 * s, boxH = 36 * s;

                ctx.globalAlpha = Math.min(1, p * 4);

                // Table
                ctx.fillStyle = '#c8b99a';
                ctx.fillRect(lx - tableW / 2, ly, tableW, tableH);
                ctx.fillRect(lx - tableW / 2 + 8 * s, ly + tableH, 6 * s, 40 * s);
                ctx.fillRect(lx + tableW / 2 - 14 * s, ly + tableH, 6 * s, 40 * s);

                // Box on table
                Draw.roundRect(ctx, lx - boxW / 2, ly - boxH, boxW, boxH, 4 * s, '#e8e0d4');
                ctx.strokeStyle = '#b0a594';
                ctx.lineWidth = 1.5 * s;
                ctx.strokeRect(lx - boxW / 2, ly - boxH, boxW, boxH);
                Draw.label(ctx, 'Scena', lx, ly + tableH + 55 * s, '#888', 11 * s, false);

                // Arrow from scene to DCL
                if (p > 0.2) {
                    const ap = Math.min(1, (p - 0.2) / 0.2);
                    ctx.globalAlpha = ap;
                    Draw.animatedArrow(ctx, w * 0.38, h * 0.42, w * 0.50, h * 0.42, '#888', ap, 2 * s, 8 * s);
                    Draw.label(ctx, 'isola', w * 0.44, h * 0.42 - 14 * s, '#888', 10 * s, false);
                }

                // Right side: isolated box (DCL)
                const rx = w * 0.68, ry = h * 0.48;
                if (p > 0.3) {
                    const bp = Math.min(1, (p - 0.3) / 0.2);
                    ctx.globalAlpha = bp;

                    // Isolated box (dashed border to show it's "free")
                    Draw.roundRect(ctx, rx - boxW / 2, ry - boxH / 2, boxW, boxH, 4 * s, '#e8e0d4');
                    ctx.strokeStyle = '#999';
                    ctx.lineWidth = 1.5 * s;
                    ctx.setLineDash([4 * s, 3 * s]);
                    ctx.strokeRect(rx - boxW / 2, ry - boxH / 2, boxW, boxH);
                    ctx.setLineDash([]);

                    // Dot at center
                    Draw.circle(ctx, rx, ry, 3 * s, '#666', null);
                }

                // DCL forces
                const fLen = 60 * s;

                // Weight (down)
                if (p > 0.45) {
                    const ap = Math.min(1, (p - 0.45) / 0.15);
                    ctx.globalAlpha = ap;
                    Draw.animatedArrow(ctx, rx, ry, rx, ry + fLen, '#c46b60', ap, 2.5 * s, 10 * s);
                    if (ap > 0.5) Draw.label(ctx, 'P', rx + 14 * s, ry + fLen - 8 * s, '#c46b60', 14 * s);
                }

                // Normal (up)
                if (p > 0.58) {
                    const ap = Math.min(1, (p - 0.58) / 0.15);
                    ctx.globalAlpha = ap;
                    Draw.animatedArrow(ctx, rx, ry, rx, ry - fLen, '#5a8fa8', ap, 2.5 * s, 10 * s);
                    if (ap > 0.5) Draw.label(ctx, 'N', rx + 14 * s, ry - fLen + 8 * s, '#5a8fa8', 14 * s);
                }

                // Push force (from left)
                if (p > 0.7) {
                    const ap = Math.min(1, (p - 0.7) / 0.12);
                    ctx.globalAlpha = ap;
                    Draw.animatedArrow(ctx, rx, ry, rx + fLen * 0.8, ry, '#5a9a6a', ap, 2.5 * s, 10 * s);
                    if (ap > 0.5) Draw.label(ctx, 'F', rx + fLen * 0.8 + 2 * s, ry - 14 * s, '#5a9a6a', 14 * s);
                }

                // Friction (opposing push)
                if (p > 0.8) {
                    const ap = Math.min(1, (p - 0.8) / 0.12);
                    ctx.globalAlpha = ap;
                    Draw.animatedArrow(ctx, rx, ry, rx - fLen * 0.8, ry, '#d4956a', ap, 2.5 * s, 10 * s);
                    if (ap > 0.5) Draw.label(ctx, 'f', rx - fLen * 0.8 - 2 * s, ry - 14 * s, '#d4956a', 14 * s);
                }

                // DCL label
                if (p > 0.7) {
                    ctx.globalAlpha = (p - 0.7) / 0.3;
                    Draw.label(ctx, 'Diagramma di corpo libero', rx, ry + fLen + 28 * s, '#555', 11 * s, false);
                }
            }
        }
    ];

    return { id: 'forze-equilibrio', title: 'Le forze e l\'equilibrio', icon: '\u{1F4AA}', category: 'Meccanica', order: 4, steps };
})();
if (typeof TopicRegistry !== 'undefined') TopicRegistry.register(Tema1);
