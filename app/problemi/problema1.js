// ===== Problema 1: Piano inclinato — Carro attrezzi =====

const Problema1 = (() => {
    const m = 2100, g = 9.8, angleRad = Math.PI / 6;
    const P = m * g, Px = P * Math.sin(angleRad), Py = P * Math.cos(angleRad);

    const statement = `Un carro attrezzi solleva un'auto di massa <b>m = 2100 kg</b> sul pianale
        tramite una fune e un verricello. In un certo istante, l'auto è ferma
        e il pianale è inclinato di <b>30°</b> rispetto all'orizzontale (vedi figura).
        <ul class="statement-parts">
            <li data-num="i.">Disegna il diagramma di corpo libero per l'auto, completo di tutte le forze agenti.</li>
            <li data-num="ii.">Calcola le componenti della forza peso e il modulo della tensione T della fune.
                Verifica che le condizioni di equilibrio siano soddisfatte, esprimi tutti i risultati in notazione scientifica.</li>
        </ul>`;

    function geo(w, h) {
        const s = Draw.S(w, h);
        const m = 35 * s;
        const floorY = h - m;
        const rightX = w - m - 25 * s, rightY = floorY;
        const topX = rightX, topY = m + 35 * s;
        const leftX = m + 15 * s, leftY = floorY;
        const t = 0.42;
        const autoX = leftX + (topX - leftX) * t;
        const autoY = leftY + (topY - leftY) * t;
        const slope = Math.atan2(topY - leftY, topX - leftX);
        return { s, floorY, rightX, rightY, topX, topY, leftX, leftY, autoX, autoY, slope, m };
    }

    function drawScene(ctx, w, h) {
        const g = geo(w, h), s = g.s;
        ctx.strokeStyle = '#c0b5a5'; ctx.lineWidth = 2*s;
        ctx.beginPath(); ctx.moveTo(8, g.floorY); ctx.lineTo(w-8, g.floorY); ctx.stroke();
        for (let x = 12; x < w-8; x += 14*s) {
            ctx.strokeStyle = '#d0c8bb'; ctx.lineWidth = 1*s;
            ctx.beginPath(); ctx.moveTo(x, g.floorY); ctx.lineTo(x-7*s, g.floorY+9*s); ctx.stroke();
        }
        const tw = 100*s, tx = g.rightX - tw/2;
        Draw.circle(ctx, tx+18*s, g.floorY-2*s, 9*s, '#666', '#555', 2*s);
        Draw.circle(ctx, tx+tw-18*s, g.floorY-2*s, 9*s, '#666', '#555', 2*s);
        const cabX = tx+tw-42*s, cabY = g.floorY-48*s;
        Draw.roundRect(ctx, cabX, cabY-18*s, 50*s, 64*s, 4*s, '#6aaa7e');
        ctx.strokeStyle = '#4e8a62'; ctx.lineWidth = 1.5*s;
        ctx.strokeRect(cabX, cabY-18*s, 50*s, 64*s);
        Draw.roundRect(ctx, cabX+6*s, cabY-13*s, 22*s, 16*s, 3*s, '#b8dbc4');
        ctx.fillStyle = '#ddd5c8'; ctx.strokeStyle = '#a89b8a'; ctx.lineWidth = 2*s;
        ctx.beginPath();
        ctx.moveTo(g.leftX, g.leftY); ctx.lineTo(g.topX, g.topY); ctx.lineTo(g.rightX, g.rightY);
        ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.strokeStyle = '#8a7e70'; ctx.lineWidth = 3*s;
        ctx.beginPath(); ctx.moveTo(g.leftX, g.leftY); ctx.lineTo(g.topX, g.topY); ctx.stroke();
        const arcR = 30*s;
        ctx.strokeStyle = '#999'; ctx.lineWidth = 1.5*s;
        ctx.beginPath(); ctx.arc(g.leftX, g.leftY, arcR, -Math.PI, -Math.PI+Math.abs(g.slope), false); ctx.stroke();
        Draw.label(ctx, '30°', g.leftX+arcR+16*s, g.leftY-11*s, '#888', 12*s);
        const sq = 10*s;
        ctx.strokeStyle = '#999'; ctx.lineWidth = 1*s;
        ctx.beginPath(); ctx.moveTo(g.rightX-sq, g.rightY); ctx.lineTo(g.rightX-sq, g.rightY-sq); ctx.lineTo(g.rightX, g.rightY-sq); ctx.stroke();
        Draw.circle(ctx, g.topX-2*s, g.topY-2*s, 8*s, '#c0b5a5', '#999', 2*s);
    }

    function drawCar(ctx, w, h, a) {
        const g = geo(w, h), s = g.s;
        ctx.save(); ctx.globalAlpha = (ctx.globalAlpha||1)*a;
        ctx.translate(g.autoX, g.autoY); ctx.rotate(g.slope);
        const cw = 50*s, ch = 18*s;
        Draw.roundRect(ctx, -cw/2, -ch-3*s, cw, ch, 4*s, '#5a8fa8');
        Draw.roundRect(ctx, -cw/4, -ch-12*s, cw/2, 10*s, 3*s, '#4a7d94');
        Draw.roundRect(ctx, -cw/4+2*s, -ch-10*s, cw/2-4*s, 6*s, 2*s, '#9cc5d8');
        Draw.circle(ctx, -cw/3, -1*s, 5*s, '#555', '#444', 1.5*s);
        Draw.circle(ctx, cw/3, -1*s, 5*s, '#555', '#444', 1.5*s);
        ctx.restore();
    }

    function drawRope(ctx, w, h, a) {
        const g = geo(w, h), s = g.s;
        ctx.save(); ctx.globalAlpha = (ctx.globalAlpha||1)*a;
        const hx = g.autoX+25*s*Math.cos(g.slope), hy = g.autoY+25*s*Math.sin(g.slope);
        ctx.strokeStyle = '#999'; ctx.lineWidth = 1.5*s;
        ctx.setLineDash([4*s, 3*s]);
        ctx.beginPath(); ctx.moveTo(hx, hy); ctx.lineTo(g.topX-2*s, g.topY-2*s); ctx.stroke();
        ctx.setLineDash([]); ctx.restore();
    }

    // Direzioni componenti (riutilizzate in più step)
    function dirs(slope) {
        return {
            pxDx: -Math.cos(slope), pxDy: -Math.sin(slope), // parallela piano, verso basso
            pyDx: Math.sin(slope),  pyDy: -Math.cos(slope), // perpendicolare piano, verso esterno
            tDx: Math.cos(slope),   tDy: Math.sin(slope),   // tensione, su lungo piano
            nDx: -Math.sin(slope),  nDy: Math.cos(slope),   // normale, verso esterno (invertita)
        };
    }

    const steps = [
        {
            title: 'Ecco il nostro problema!',
            text: 'Un <span class="highlight">carro attrezzi</span> sta caricando un\'auto di <span class="highlight">2100 kg</span> sul pianale inclinato di 30°. L\'auto è completamente <b>ferma</b>, tenuta dalla fune agganciata al verricello.<br><br>Quando un oggetto è fermo diciamo che è in <span class="highlight">equilibrio statico</span>: tutte le <span class="term" data-term="forza">forze</span> che agiscono su di esso si bilanciano perfettamente. Il nostro obiettivo è scoprire quali sono queste forze e quanto valgono.',
            formula: null,
            draw(ctx, w, h, p) { drawScene(ctx, w, h); drawCar(ctx, w, h, p); drawRope(ctx, w, h, p); }
        },
        {
            title: 'Primo passo: i dati',
            text: '<b>Regola d\'oro:</b> in ogni problema di fisica, la prima cosa da fare è <span class="highlight">scrivere i dati</span> e capire cosa ci viene chiesto.<br><br>' +
                '&bull; <span class="highlight">m = 2100 kg</span> &rarr; la <span class="term" data-term="massa">massa</span> dell\'auto<br>' +
                '&bull; <span class="highlight">&alpha; = 30°</span> &rarr; l\'angolo del piano<br>' +
                '&bull; <span class="highlight">velocità = 0</span> &rarr; l\'auto è ferma (<span class="term" data-term="equilibrio">equilibrio</span>!)<br><br>' +
                'Ci chiedono: quali <span class="term" data-term="forza">forze</span> agiscono? Quanto valgono? Per rispondere, usiamo il <b>diagramma di corpo libero</b>: un disegno dove isoliamo l\'oggetto e disegniamo solo le forze.',
            formula: null,
            draw(ctx, w, h, p) {
                const s = Draw.S(w, h);
                ctx.globalAlpha = p;
                Draw.roundRect(ctx, 12*s, 12*s, 140*s, 78*s, 7*s, '#f5f0ea');
                ctx.strokeStyle = '#d4956a'; ctx.lineWidth = 1.5*s;
                ctx.strokeRect(12*s, 12*s, 140*s, 78*s);
                Draw.label(ctx, 'm = 2100 kg', 82*s, 30*s, '#2e2e2e', 12*s);
                Draw.label(ctx, '\u03B1 = 30°', 82*s, 50*s, '#2e2e2e', 12*s);
                Draw.label(ctx, 'v = 0 \u2192 equilibrio', 82*s, 70*s, '#d4956a', 11*s);
            }
        },
        {
            title: 'La forza peso P',
            text: 'La prima <span class="term" data-term="forza">forza</span> è il <span class="highlight">peso</span>: la Terra attira ogni oggetto con <span class="term" data-term="massa">massa</span> verso il suo centro.<br><br><b>Cosa ricordare:</b> il <span class="term" data-term="peso">peso</span> punta <b>sempre verticalmente verso il basso</b>, indipendentemente da come è inclinata la superficie. Anche se l\'auto è su un piano a 30°, il peso va dritto giù!<br><br><b>Attenzione:</b> peso e massa sono cose diverse! La massa (kg) non cambia mai; il peso (<span class="term" data-term="newton">Newton</span>) dipende dalla <span class="term" data-term="gravita">gravità</span> del pianeta.',
            formula: '\\vec{P} = m \\cdot \\vec{g} \\quad \\downarrow \\text{ sempre verticale}',
            draw(ctx, w, h, p) {
                const ge = geo(w, h), s = ge.s;
                // Puntino al centro di massa
                Draw.circle(ctx, ge.autoX, ge.autoY, 3*s, '#c46b60', null);
                // Freccia peso animata
                const len = 90*s*p;
                Draw.animatedArrow(ctx, ge.autoX, ge.autoY, ge.autoX, ge.autoY+len, '#c46b60', p, 3*s, 11*s);
                if (p > 0.4) Draw.label(ctx, 'P', ge.autoX-16*s, ge.autoY+len*0.55, '#c46b60', 17*s);
            }
        },
        {
            title: 'Scomponiamo il peso',
            text: 'Il <span class="term" data-term="peso">peso</span> punta in basso, ma a noi interessa cosa succede <b>lungo il piano</b> e <b>perpendicolarmente</b>. <span class="term" data-term="componente">Scomponiamo</span> il peso in due componenti.<br><br>' +
                '&bull; <b style="color:#9b6fb5">P<sub>x</sub></b> (parallela) &rarr; farebbe <b>scivolare</b> l\'auto giù<br>' +
                '&bull; <b style="color:#9b6fb5">P<sub>y</sub></b> (perpendicolare) &rarr; <b>schiaccia</b> l\'auto sul pianale<br><br>' +
                '<b>Mnemonico:</b> "<i>il <b>s</b>eno fa <b>s</b>civolare</i>" &rarr; P<sub>x</sub> = P sin&alpha;, P<sub>y</sub> = P cos&alpha;.',
            formula: 'P_x = P \\sin\\alpha \\qquad P_y = P \\cos\\alpha',
            draw(ctx, w, h, p) {
                const ge = geo(w, h), s = ge.s;
                const d = dirs(ge.slope);
                const pxL = 48*s, pyL = 72*s;
                const pLen = 90*s;
                const ax = ge.autoX, ay = ge.autoY;

                // Fase 1 (p 0-0.4): mostra il peso che si "apre"
                // Fase 2 (p 0.4-1): mostra il rettangolo di scomposizione

                // Peso (in grigio tenue, come riferimento)
                ctx.globalAlpha = 0.25;
                Draw.arrow(ctx, ax, ay, ax, ay+pLen, '#c46b60', 2*s, 8*s);
                ctx.globalAlpha = p;

                // Rettangolo di scomposizione (tratteggiato)
                if (p > 0.2) {
                    const rp = Math.min(1, (p-0.2)/0.5);
                    ctx.globalAlpha = rp * 0.4;
                    // Lato dal fondo di P a Px
                    const endPx = ax + d.pxDx*pxL, endPy = ay + d.pxDy*pxL;
                    const endPyX = ax + d.pyDx*pyL, endPyY = ay + d.pyDy*pyL;
                    // Dal fondo del peso all'end di Px
                    Draw.dashedLine(ctx, ax, ay+pLen, endPx*rp + ax*(1-rp), (ay+d.pxDy*pxL)*rp + (ay+pLen)*(1-rp), '#999', 1*s);
                    // Dal fondo del peso all'end di Py
                    Draw.dashedLine(ctx, ax, ay+pLen, endPyX*rp + ax*(1-rp), endPyY*rp + (ay+pLen)*(1-rp), '#999', 1*s);
                }

                ctx.globalAlpha = p;
                // Px (parallela al piano)
                Draw.animatedArrow(ctx, ax, ay, ax+d.pxDx*pxL, ay+d.pxDy*pxL, '#9b6fb5', p, 2.5*s, 9*s);
                if (p > 0.5) Draw.label(ctx, 'Px', ax+d.pxDx*pxL-14*s, ay+d.pxDy*pxL+16*s, '#9b6fb5', 14*s);

                // Py (perpendicolare al piano)
                Draw.animatedArrow(ctx, ax, ay, ax+d.pyDx*pyL, ay+d.pyDy*pyL, '#9b6fb5', p, 2.5*s, 9*s);
                if (p > 0.5) Draw.label(ctx, 'Py', ax+d.pyDx*pyL+18*s, ay+d.pyDy*pyL, '#9b6fb5', 14*s);

                // Angolo alfa al punto di applicazione
                if (p > 0.6) {
                    ctx.globalAlpha = (p-0.6)/0.4;
                    Draw.arc(ctx, ax, ay, 20*s, Math.PI/2, Math.PI/2 - angleRad, '#999', 1.2*s);
                    Draw.label(ctx, '\u03B1', ax+10*s, ay+28*s, '#999', 10*s);
                }
            }
        },
        {
            title: 'Calcoliamo il peso',
            text: '<b>Formula:</b> <span class="term" data-term="peso">Peso</span> = <span class="term" data-term="massa">massa</span> &times; <span class="term" data-term="gravita">accelerazione di gravità</span> (g = 9,8 m/s&sup2;).<br><br>Per avere un\'idea: 1 <span class="term" data-term="newton">Newton</span> è circa la <span class="term" data-term="forza">forza</span> per reggere una mela. L\'auto "pesa" oltre 20 000 N!<br><br>Il problema chiede la <b>notazione scientifica</b>: si scrive il numero come cifra &times; potenza di 10.',
            formula: '|\\vec{P}| = m \\cdot g = 2100 \\times 9{,}8 = 20\\,580 = \\boxed{2{,}058 \\times 10^4 \\text{ N}}',
            draw(ctx, w, h, p) {
                const ge = geo(w, h), s = ge.s;
                if (p > 0.3) {
                    ctx.globalAlpha = (p-0.3)/0.7;
                    Draw.roundRect(ctx, ge.autoX+12*s, ge.autoY+55*s, 150*s, 26*s, 5*s, '#fef3ee');
                    ctx.strokeStyle = '#d4956a'; ctx.lineWidth = 1.2*s;
                    ctx.strokeRect(ge.autoX+12*s, ge.autoY+55*s, 150*s, 26*s);
                    Draw.label(ctx, 'P = 20 580 N', ge.autoX+87*s, ge.autoY+68*s, '#c46b60', 13*s);
                }
            }
        },
        {
            title: 'Le due componenti',
            text: 'Ora calcoliamo i "due pezzi". Ricorda: sin 30° = 0,5 e cos 30° &asymp; 0,866.<br><br>' +
                '&bull; <b>P<sub>x</sub></b> = 20 580 &times; 0,5 = <span class="highlight">1,029 &times; 10<sup>4</sup> N</span><br>' +
                '&bull; <b>P<sub>y</sub></b> = 20 580 &times; 0,866 = <span class="highlight">1,782 &times; 10<sup>4</sup> N</span><br><br>' +
                '<b>Osserva:</b> P<sub>y</sub> &gt; P<sub>x</sub>. A 30° l\'auto preme sul pianale più di quanto tenda a scivolare. Se l\'angolo aumentasse, P<sub>x</sub> crescerebbe: a 90° tutto il <span class="term" data-term="peso">peso</span> sarebbe P<sub>x</sub>!',
            formula: 'P_x = \\boxed{1{,}029 \\times 10^4 \\text{ N}} \\qquad P_y = \\boxed{1{,}782 \\times 10^4 \\text{ N}}',
            draw(ctx, w, h, p) {
                // Mostra le frecce con etichette dei valori e barre proporzionali
                const ge = geo(w, h), s = ge.s;
                const d = dirs(ge.slope);
                const ax = ge.autoX, ay = ge.autoY;
                // Barre proporzionali in basso a destra
                const bx = w - 160*s, by = h - 90*s;
                ctx.globalAlpha = p;

                // Barra Px
                const pxBarW = 55*s * p, pyBarW = 95*s * p;
                Draw.roundRect(ctx, bx, by, pxBarW, 16*s, 3*s, 'rgba(155,111,181,0.25)');
                ctx.strokeStyle = '#9b6fb5'; ctx.lineWidth = 1.5*s;
                ctx.strokeRect(bx, by, pxBarW, 16*s);
                if (p > 0.5) Draw.label(ctx, 'Px', bx - 16*s, by+8*s, '#9b6fb5', 11*s);

                // Barra Py (più lunga!)
                Draw.roundRect(ctx, bx, by+26*s, pyBarW, 16*s, 3*s, 'rgba(155,111,181,0.15)');
                ctx.strokeStyle = '#9b6fb5'; ctx.lineWidth = 1.5*s;
                ctx.strokeRect(bx, by+26*s, pyBarW, 16*s);
                if (p > 0.5) Draw.label(ctx, 'Py', bx - 16*s, by+34*s, '#9b6fb5', 11*s);

                // Freccia "Py > Px"
                if (p > 0.7) {
                    ctx.globalAlpha = (p-0.7)/0.3;
                    Draw.label(ctx, 'Py > Px', bx + 50*s, by + 55*s, '#9b6fb5', 11*s);
                }
            }
        },
        {
            title: 'Tensione T e normale N',
            text: 'L\'auto è ferma: ogni <span class="term" data-term="componente">componente</span> del <span class="term" data-term="peso">peso</span> è bilanciata da un\'altra <span class="term" data-term="forza">forza</span>.<br><br>' +
                '&bull; <b style="color:#5a9a6a">T (<span class="term" data-term="tensione">tensione</span>)</b> bilancia P<sub>x</sub>: impedisce all\'auto di scivolare<br>' +
                '&bull; <b style="color:#5a8fa8">N (normale)</b> bilancia P<sub>y</sub>: impedisce all\'auto di sprofondare<br><br>' +
                '<b>Regola:</b> la <span class="term" data-term="reazione-normale">reazione normale</span> è sempre <b>perpendicolare alla superficie</b> di contatto.',
            formula: 'T = P_x = \\boxed{1{,}029 \\times 10^4 \\text{ N}} \\\\[6pt] N = P_y = \\boxed{1{,}782 \\times 10^4 \\text{ N}}',
            draw(ctx, w, h, p) {
                const ge = geo(w, h), s = ge.s;
                const d = dirs(ge.slope);
                const ax = ge.autoX, ay = ge.autoY;
                const tL = 48*s, nL = 72*s;

                // Tensione T (su lungo il piano) — stessa lunghezza di Px
                Draw.animatedArrow(ctx, ax, ay, ax+d.tDx*tL*p, ay+d.tDy*tL*p, '#5a9a6a', p, 3*s, 11*s);
                if (p > 0.4) Draw.label(ctx, 'T', ax+d.tDx*tL+12*s, ay+d.tDy*tL-12*s, '#5a9a6a', 17*s);

                // Normale N (perpendicolare, verso esterno) — stessa lunghezza di Py
                // Nota: nDx/nDy sono invertiti rispetto a pyDx/pyDy
                Draw.animatedArrow(ctx, ax, ay, ax-d.nDx*nL*p, ay-d.nDy*nL*p, '#5a8fa8', p, 3*s, 11*s);
                if (p > 0.4) Draw.label(ctx, 'N', ax-d.nDx*nL-14*s, ay-d.nDy*nL-8*s, '#5a8fa8', 17*s);

                // Simboli "=" per mostrare equilibrio
                if (p > 0.7) {
                    ctx.globalAlpha = (p-0.7)/0.3;
                    // T = Px
                    Draw.roundRect(ctx, 12*s, 12*s, 75*s, 44*s, 5*s, '#f5f0ea');
                    Draw.label(ctx, 'T = Px', 49*s, 24*s, '#5a9a6a', 11*s);
                    Draw.label(ctx, 'N = Py', 49*s, 42*s, '#5a8fa8', 11*s);
                }
            }
        },
        {
            title: 'Verifica e riepilogo',
            text: '<b>Verifica dell\'equilibrio:</b><br>' +
                '&bull; Lungo il piano: T &minus; P<sub>x</sub> = 0 &#10004;<br>' +
                '&bull; Perpendicolare: N &minus; P<sub>y</sub> = 0 &#10004;<br><br>' +
                '<b>Cosa abbiamo imparato:</b><br>' +
                '1. Un corpo fermo &rarr; somma <span class="term" data-term="forza">forze</span> = 0 (<span class="term" data-term="equilibrio">equilibrio</span>)<br>' +
                '2. Su un piano inclinato, il <span class="term" data-term="peso">peso</span> si scompone con <span class="term" data-term="seno-coseno">seno e coseno</span><br>' +
                '3. La <span class="term" data-term="tensione">tensione</span> e la <span class="term" data-term="reazione-normale">normale</span> bilanciano le <span class="term" data-term="componente">componenti</span> del peso<br>' +
                '4. Al crescere dell\'angolo, cresce la componente che fa scivolare',
            formula: '\\sum F_{\\parallel} = T - P\\sin\\alpha = 0 \\qquad \\sum F_{\\perp} = N - P\\cos\\alpha = 0',
            draw(ctx, w, h, p) {
                const ge = geo(w, h), s = ge.s;
                const d = dirs(ge.slope);
                const ax = ge.autoX, ay = ge.autoY;

                // Mostra TUTTE le forze insieme per il riepilogo
                if (p > 0.2) {
                    const fp = Math.min(1, (p-0.2)/0.4);
                    ctx.globalAlpha = fp * 0.6;
                    // Px e T (uguali e opposte) — lampeggio
                    const flash1 = 0.6 + 0.4 * Math.sin(p * Math.PI * 4);
                    ctx.globalAlpha = fp * flash1;
                    Draw.arrow(ctx, ax, ay, ax+d.pxDx*48*s, ay+d.pxDy*48*s, '#9b6fb5', 2*s, 8*s);
                    Draw.arrow(ctx, ax, ay, ax+d.tDx*48*s, ay+d.tDy*48*s, '#5a9a6a', 2*s, 8*s);
                }

                if (p > 0.5) {
                    const fp = Math.min(1, (p-0.5)/0.3);
                    const flash2 = 0.6 + 0.4 * Math.sin(p * Math.PI * 4 + 1);
                    ctx.globalAlpha = fp * flash2;
                    Draw.arrow(ctx, ax, ay, ax+d.pyDx*72*s, ay+d.pyDy*72*s, '#9b6fb5', 2*s, 8*s);
                    Draw.arrow(ctx, ax, ay, ax-d.nDx*72*s, ay-d.nDy*72*s, '#5a8fa8', 2*s, 8*s);
                }

                // Banner finale
                if (p > 0.6) {
                    const cx = w/2, cy = 22*s;
                    ctx.globalAlpha = (p-0.6)/0.4;
                    Draw.roundRect(ctx, cx-85*s, cy-12*s, 170*s, 30*s, 7*s, '#e4f2e7');
                    ctx.strokeStyle = '#81c784'; ctx.lineWidth = 1.5*s;
                    ctx.strokeRect(cx-85*s, cy-12*s, 170*s, 30*s);
                    Draw.label(ctx, 'Equilibrio verificato!', cx, cy+3*s, '#3d8b44', 14*s);
                }
            }
        }
    ];

    return { steps, statement };
})();
