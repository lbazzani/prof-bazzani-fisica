// ===== Problema 3: Biliardo =====

const Problema3 = (() => {
    const dt = 0.85e-3, F = 750, v = 0.5;
    const thetaRad = Math.PI/4;
    const I = F*dt, vx = v*Math.cos(thetaRad), vy = v*Math.sin(thetaRad);
    const v0 = 2*vx, massa = I/v0;

    const statement = `Su un tavolo da biliardo, un giocatore colpisce la palla bianca per
        <b>&Delta;t = 0,85 ms</b> con una forza di <b>7,5 &times; 10<sup>2</sup> N</b>, che a sua volta
        colpisce una palla verde inizialmente ferma. Nell'istante successivo al tiro,
        l'angolo fra le due velocità è di <b>90°</b> e il modulo di entrambe
        è <b>|v<sub>1</sub>| = |v<sub>2</sub>| = 0,5 m/s</b>.
        <ul class="statement-parts">
            <li data-num="i.">Schematizza il problema graficamente e calcola le componenti delle velocità
                v<sub>1</sub>, v<sub>2</sub>, assumendo che esse siano simmetriche rispetto alla direzione
                della forza inizialmente applicata alla palla bianca.</li>
            <li data-num="ii.">Calcola la massa della palla bianca, assumendo che sia uguale a quella della palla verde.</li>
        </ul>`;

    function geo(w, h) {
        const s = Draw.S(w, h);
        const m = 25*s;
        const tx = m, ty = m+8*s, tw = w-2*m, th = h-2*m-8*s;
        const wx = tx+tw*0.3, wy = ty+th*0.5;
        const gx = tx+tw*0.55, gy = wy;
        const br = 13*s;
        return { s, tx, ty, tw, th, wx, wy, gx, gy, br };
    }

    function drawTable(ctx, w, h) {
        const g = geo(w, h), s = g.s;
        Draw.roundRect(ctx, g.tx-7*s, g.ty-7*s, g.tw+14*s, g.th+14*s, 8*s, '#5c3d1e');
        Draw.roundRect(ctx, g.tx, g.ty, g.tw, g.th, 5*s, '#2d7a4f');
        [[g.tx+3*s,g.ty+3*s],[g.tx+g.tw-3*s,g.ty+3*s],
         [g.tx+3*s,g.ty+g.th-3*s],[g.tx+g.tw-3*s,g.ty+g.th-3*s],
         [g.tx+g.tw/2,g.ty+3*s],[g.tx+g.tw/2,g.ty+g.th-3*s]
        ].forEach(([hx,hy]) => Draw.circle(ctx, hx, hy, 7*s, '#1a1a1a', null));
    }

    const steps = [
        {
            title: 'Il colpo di biliardo',
            text: 'Un giocatore colpisce la <span class="highlight">palla bianca</span> con la stecca. La bianca rotola e <span class="term" data-term="urto">urta</span> una <span class="highlight">palla verde</span> ferma.<br><br>In questo problema useremo due concetti fondamentali:<br>' +
                '&bull; L\'<b>impulso</b> (la "botta" della stecca)<br>' +
                '&bull; La <b>conservazione della quantità di moto</b> (prima dell\'urto = dopo)',
            formula: null,
            duration: 2800, // animazione più lunga per questo step
            draw(ctx, w, h, p) {
                drawTable(ctx, w, h);
                const g = geo(w, h), s = g.s;
                const sl = 110*s; // lunghezza stecca

                // Posizione finale della palla bianca (vicina alla verde, non sovrapposta)
                const bxFinal = g.gx - g.br*2.2;

                // === FASE 1 (0 → 0.25): Scena ferma, stecca lontana, tutto calmo ===
                if (p < 0.25) {
                    const sp = p / 0.25;
                    // Stecca lontana a sinistra, si avvicina piano
                    const steccaTip = g.wx - g.br - 50*s + 30*s * sp;
                    // Corpo stecca
                    ctx.strokeStyle = '#b8943f'; ctx.lineWidth = 5*s; ctx.lineCap = 'round';
                    ctx.beginPath(); ctx.moveTo(steccaTip - sl, g.wy - 1*s); ctx.lineTo(steccaTip, g.wy); ctx.stroke();
                    // Punta (ferrule)
                    ctx.strokeStyle = '#e8dcc0'; ctx.lineWidth = 4*s;
                    ctx.beginPath(); ctx.moveTo(steccaTip, g.wy); ctx.lineTo(steccaTip + 6*s, g.wy); ctx.stroke();
                    // Puntino punta
                    Draw.circle(ctx, steccaTip + 7*s, g.wy, 2.5*s, '#c8e0f0', null);
                    // Palle ferme
                    Draw.circle(ctx, g.wx, g.wy, g.br, '#f0ebe0', '#d8d0c0', 2*s);
                    Draw.circle(ctx, g.gx, g.gy, g.br, '#4caf50', '#388e3c', 2*s);
                }
                // === FASE 2 (0.25 → 0.4): Stecca accelera e colpisce! ===
                else if (p < 0.4) {
                    const sp = (p - 0.25) / 0.15; // 0→1 veloce
                    // Stecca accelera con easing quadratico
                    const ease = sp * sp; // accelerazione
                    const steccaTip = g.wx - g.br - 20*s + 22*s * ease;
                    ctx.strokeStyle = '#b8943f'; ctx.lineWidth = 5*s; ctx.lineCap = 'round';
                    ctx.beginPath(); ctx.moveTo(steccaTip - sl, g.wy - 1*s); ctx.lineTo(steccaTip, g.wy); ctx.stroke();
                    ctx.strokeStyle = '#e8dcc0'; ctx.lineWidth = 4*s;
                    ctx.beginPath(); ctx.moveTo(steccaTip, g.wy); ctx.lineTo(steccaTip + 6*s, g.wy); ctx.stroke();
                    Draw.circle(ctx, steccaTip + 7*s, g.wy, 2.5*s, '#c8e0f0', null);
                    // Palle ferme
                    Draw.circle(ctx, g.wx, g.wy, g.br, '#f0ebe0', '#d8d0c0', 2*s);
                    Draw.circle(ctx, g.gx, g.gy, g.br, '#4caf50', '#388e3c', 2*s);
                }
                // === FASE 3 (0.4 → 0.5): IMPATTO! Flash + stecca rimbalza indietro ===
                else if (p < 0.5) {
                    const ip = (p - 0.4) / 0.1;
                    // Flash di impatto (cerchi concentrici)
                    for (let r = 0; r < 3; r++) {
                        const delay = r * 0.15;
                        const rp = Math.max(0, Math.min(1, (ip - delay) / (1 - delay)));
                        if (rp > 0) {
                            ctx.globalAlpha = (1 - rp) * 0.35;
                            Draw.circle(ctx, g.wx, g.wy, (8 + rp * (20 + r*10))*s, null, 'rgba(255,200,100,0.6)', 2*s);
                        }
                    }
                    // Stellina di impatto
                    ctx.globalAlpha = (1 - ip) * 0.6;
                    const starR = (5 + ip * 12) * s;
                    ctx.fillStyle = 'rgba(255,230,150,0.5)';
                    ctx.beginPath();
                    for (let i = 0; i < 8; i++) {
                        const a = (i / 8) * Math.PI * 2 - Math.PI/2;
                        const r = i % 2 === 0 ? starR : starR * 0.4;
                        if (i === 0) ctx.moveTo(g.wx + r*Math.cos(a), g.wy + r*Math.sin(a));
                        else ctx.lineTo(g.wx + r*Math.cos(a), g.wy + r*Math.sin(a));
                    }
                    ctx.closePath(); ctx.fill();

                    // Stecca rimbalza indietro
                    ctx.globalAlpha = 1;
                    const steccaTip = g.wx - g.br + 2*s - ip * 40*s;
                    ctx.strokeStyle = '#b8943f'; ctx.lineWidth = 5*s; ctx.lineCap = 'round';
                    ctx.beginPath(); ctx.moveTo(steccaTip - sl, g.wy - 1*s); ctx.lineTo(steccaTip, g.wy); ctx.stroke();
                    ctx.strokeStyle = '#e8dcc0'; ctx.lineWidth = 4*s;
                    ctx.beginPath(); ctx.moveTo(steccaTip, g.wy); ctx.lineTo(steccaTip + 6*s, g.wy); ctx.stroke();

                    // Palla bianca inizia a muoversi un poco
                    const bx = g.wx + ip * 15*s;
                    Draw.circle(ctx, bx, g.wy, g.br, '#f0ebe0', '#d8d0c0', 2*s);
                    Draw.circle(ctx, g.gx, g.gy, g.br, '#4caf50', '#388e3c', 2*s);
                }
                // === FASE 4 (0.5 → 0.85): Palla bianca rotola verso la verde ===
                else if (p < 0.85) {
                    const rp = (p - 0.5) / 0.35;
                    // Easing ease-out per rallentamento naturale
                    const easeOut = 1 - Math.pow(1 - rp, 2);
                    const bx = g.wx + 15*s + (bxFinal - g.wx - 15*s) * easeOut;

                    // Scia della palla bianca (ghost balls)
                    const numGhosts = 5;
                    for (let i = 0; i < numGhosts; i++) {
                        const gt = i / numGhosts;
                        const gx = g.wx + 15*s + (bx - g.wx - 15*s) * gt;
                        ctx.globalAlpha = 0.06 * (1 - gt) * (1 - rp*0.5);
                        Draw.circle(ctx, gx, g.wy, g.br * (0.5 + gt*0.3), '#f0ebe0', null);
                    }

                    // Ombra sotto la palla in movimento
                    ctx.globalAlpha = 0.1;
                    ctx.fillStyle = '#000';
                    ctx.beginPath();
                    ctx.ellipse(bx, g.wy + g.br + 3*s, g.br*0.8, 3*s, 0, 0, Math.PI*2);
                    ctx.fill();

                    ctx.globalAlpha = 1;
                    Draw.circle(ctx, bx, g.wy, g.br, '#f0ebe0', '#d8d0c0', 2*s);
                    // Riflesso sulla palla
                    Draw.circle(ctx, bx - 3*s, g.wy - 4*s, 3*s, 'rgba(255,255,255,0.3)', null);

                    Draw.circle(ctx, g.gx, g.gy, g.br, '#4caf50', '#388e3c', 2*s);
                }
                // === FASE 5 (0.85 → 1): Palla ferma vicino alla verde, scena pronta ===
                else {
                    const fp = (p - 0.85) / 0.15;
                    ctx.globalAlpha = 1;
                    Draw.circle(ctx, bxFinal, g.wy, g.br, '#f0ebe0', '#d8d0c0', 2*s);
                    Draw.circle(ctx, g.gx, g.gy, g.br, '#4caf50', '#388e3c', 2*s);
                    // Freccia piccola che indica la direzione
                    if (fp > 0.3) {
                        ctx.globalAlpha = (fp - 0.3) / 0.7 * 0.5;
                        Draw.arrow(ctx, bxFinal + g.br + 5*s, g.wy, g.gx - g.br - 5*s, g.wy, 'rgba(255,255,255,0.4)', 1.5*s, 6*s);
                    }
                }
            }
        },
        {
            title: 'Organizziamo i dati',
            text: '<b>Regola d\'oro:</b> scrivi sempre i dati prima di calcolare!<br><br>' +
                '&bull; <span class="highlight">&Delta;t = 0,85 ms = 0,00085 s</span> (attenzione: ms = <span class="term" data-term="secondo">millisecondi</span>!)<br>' +
                '&bull; <span class="highlight">F = 750 N</span> &rarr; <span class="term" data-term="forza">forza</span> della stecca<br>' +
                '&bull; <span class="highlight">v<sub>1</sub> = v<sub>2</sub> = 0,5 m/s</span> &rarr; <span class="term" data-term="velocita">velocità</span> dopo l\'<span class="term" data-term="urto">urto</span><br>' +
                '&bull; <span class="highlight">Angolo = 90°</span> + simmetria (assunta dal testo) &rarr; ciascuna palla a 45°<br><br>' +
                '<b>Ci chiedono:</b> le <span class="term" data-term="componente">componenti</span> delle velocità e la massa delle palle.',
            formula: null,
            draw(ctx, w, h, p) {
                const g = geo(w, h), s = g.s;
                ctx.globalAlpha = p;
                const bw = 155*s, bh = 100*s, bx = w-bw-10*s, by = g.ty+12*s;
                Draw.roundRect(ctx, bx, by, bw, bh, 6*s, 'rgba(255,255,255,0.92)');
                ctx.strokeStyle = '#d4956a'; ctx.lineWidth = 1.2*s;
                ctx.strokeRect(bx, by, bw, bh);
                const cx = bx+bw/2;
                Draw.label(ctx, '\u0394t = 0,85 ms', cx, by+16*s, '#2e2e2e', 11*s);
                Draw.label(ctx, 'F = 750 N', cx, by+34*s, '#2e2e2e', 11*s);
                Draw.label(ctx, 'v\u2081 = v\u2082 = 0,5 m/s', cx, by+52*s, '#2e2e2e', 11*s);
                Draw.label(ctx, 'Angolo = 90°', cx, by+70*s, '#2e2e2e', 11*s);
                Draw.label(ctx, 'Stessa massa', cx, by+88*s, '#2e2e2e', 11*s);
            }
        },
        {
            title: 'L\'impulso della stecca',
            text: '<b>Cos\'è l\'impulso?</b> Quando una <span class="term" data-term="forza">forza</span> agisce per un certo tempo, trasferisce una "spinta" chiamata <span class="highlight">impulso</span>: I = F &times; &Delta;t.<br><br>La forza è enorme (750 <span class="term" data-term="newton">N</span>!) ma il contatto dura solo 0,85 <span class="term" data-term="secondo">ms</span>.<br><br><b>Perché ci interessa?</b> L\'impulso è uguale alla variazione della <span class="term" data-term="quantita-di-moto">quantità di moto</span>. La palla parte da ferma, quindi: <b>I = m &middot; v<sub>0</sub></b>. Ci servirà alla fine!',
            formula: 'I = F \\cdot \\Delta t = 750 \\times 0{,}00085 = \\boxed{0{,}6375 \\text{ N}\\!\\cdot\\!\\text{s}}',
            draw(ctx, w, h, p) {
                const g = geo(w, h), s = g.s;
                // Shockwave dall'impatto
                if (p > 0.1 && p < 0.7) {
                    const sp = (p-0.1)/0.6;
                    ctx.globalAlpha = (1-sp)*0.4;
                    Draw.circle(ctx, g.wx, g.wy, (10+sp*40)*s, null, 'rgba(212,149,106,0.5)', 2*s);
                    ctx.globalAlpha = (1-sp)*0.2;
                    Draw.circle(ctx, g.wx, g.wy, (5+sp*25)*s, 'rgba(255,220,180,0.2)', null);
                }
                ctx.globalAlpha = p;
                // Freccia impulso
                Draw.animatedArrow(ctx, g.wx-60*s, g.wy, g.wx-g.br-4*s, g.wy, '#d4956a', p, 3*s, 11*s);
                if (p > 0.4) Draw.label(ctx, 'I = F\u00B7\u0394t', g.wx-45*s, g.wy-20*s, '#d4956a', 12*s);
                // Valore
                if (p > 0.7) {
                    ctx.globalAlpha = (p-0.7)/0.3;
                    Draw.roundRect(ctx, g.wx-75*s, g.wy+20*s, 105*s, 22*s, 4*s, 'rgba(255,255,255,0.85)');
                    Draw.label(ctx, '= 0,6375 N\u00B7s', g.wx-22*s, g.wy+31*s, '#d4956a', 10*s);
                }
            }
        },
        {
            title: 'Le velocità dopo l\'urto',
            text: 'Il testo ci dice due cose fondamentali sull\'<span class="term" data-term="urto">urto</span>:<br><br>' +
                '&bull; L\'angolo tra le due <span class="term" data-term="velocita">velocità</span> è di <span class="highlight">90°</span><br>' +
                '&bull; Il problema ci dice di <b>assumere</b> che le velocità siano <b>simmetriche</b> rispetto alla direzione iniziale<br><br>' +
                'Con queste due informazioni possiamo dedurre che ciascuna palla fa <span class="highlight">45°</span> rispetto alla direzione della stecca (90° / 2 = 45°). Immagina una V aperta: la bianca va in alto-destra, la verde in basso-destra.',
            formula: '\\text{Angolo di ciascuna} = \\frac{90°}{2} = 45°',
            duration: 2000,
            draw(ctx, w, h, p) {
                const g = geo(w, h), s = g.s;
                const al = 70*s;

                // === FASE 1 (0 → 0.15): Le palle sono a contatto, flash d'impatto ===
                if (p < 0.15) {
                    const ip = p / 0.15;
                    // Flash concentrici
                    for (let r = 0; r < 3; r++) {
                        const delay = r * 0.2;
                        const rp = Math.max(0, Math.min(1, (ip - delay) / (1 - delay)));
                        if (rp > 0) {
                            ctx.globalAlpha = (1 - rp) * 0.3;
                            Draw.circle(ctx, g.gx, g.gy, (6 + rp * (15 + r*8))*s, null, 'rgba(255,230,150,0.5)', 1.5*s);
                        }
                    }
                    // Stellina
                    ctx.globalAlpha = (1-ip) * 0.5;
                    const starR = (4 + ip*10)*s;
                    ctx.fillStyle = 'rgba(255,240,180,0.4)';
                    ctx.beginPath();
                    for (let i = 0; i < 8; i++) {
                        const a = (i/8)*Math.PI*2;
                        const r = i%2===0 ? starR : starR*0.35;
                        if (i===0) ctx.moveTo(g.gx+r*Math.cos(a), g.gy+r*Math.sin(a));
                        else ctx.lineTo(g.gx+r*Math.cos(a), g.gy+r*Math.sin(a));
                    }
                    ctx.closePath(); ctx.fill();
                    // Palle sovrapposte
                    ctx.globalAlpha = 1;
                    Draw.circle(ctx, g.gx - 4*s, g.gy, g.br, '#f0ebe0', '#d8d0c0', 2*s);
                    Draw.circle(ctx, g.gx + 4*s, g.gy, g.br, '#4caf50', '#388e3c', 2*s);
                }
                // === FASE 2 (0.15 → 0.7): Palle si separano con easing ===
                else if (p < 0.7) {
                    const sp = (p - 0.15) / 0.55;
                    const easeOut = 1 - Math.pow(1 - sp, 2.5);
                    const x1 = g.gx + al*Math.cos(-thetaRad)*easeOut;
                    const y1 = g.gy + al*Math.sin(-thetaRad)*easeOut;
                    const x2 = g.gx + al*Math.cos(thetaRad)*easeOut;
                    const y2 = g.gy + al*Math.sin(thetaRad)*easeOut;

                    // Scia sfumata
                    const numGhosts = 5;
                    for (let i = 0; i < numGhosts; i++) {
                        const gt = i / numGhosts;
                        ctx.globalAlpha = 0.06 * (1 - easeOut*0.7) * (1 - gt);
                        Draw.circle(ctx, g.gx+(x1-g.gx)*gt, g.gy+(y1-g.gy)*gt, g.br*0.5, '#f0ebe0', null);
                        Draw.circle(ctx, g.gx+(x2-g.gx)*gt, g.gy+(y2-g.gy)*gt, g.br*0.5, '#4caf50', null);
                    }

                    ctx.globalAlpha = 1;
                    // Frecce velocità che crescono
                    if (easeOut > 0.1) {
                        Draw.arrow(ctx, g.gx, g.gy, x1, y1, '#c46b60', 2.5*s, 9*s);
                        Draw.arrow(ctx, g.gx, g.gy, x2, y2, '#388e3c', 2.5*s, 9*s);
                    }

                    // Palle
                    Draw.circle(ctx, x1, y1, g.br*0.8, '#f0ebe0', '#d8d0c0', 1.5*s);
                    Draw.circle(ctx, x2, y2, g.br*0.8, '#4caf50', '#388e3c', 1.5*s);
                    // Riflessi
                    Draw.circle(ctx, x1-2*s, y1-3*s, 2.5*s, 'rgba(255,255,255,0.25)', null);
                    Draw.circle(ctx, x2-2*s, y2-3*s, 2.5*s, 'rgba(255,255,255,0.15)', null);

                    if (easeOut > 0.4) {
                        ctx.globalAlpha = (easeOut-0.4)/0.6;
                        Draw.label(ctx, 'v\u2081', x1+14*s, y1-12*s, '#c46b60', 12*s);
                        Draw.label(ctx, 'v\u2082', x2+14*s, y2+12*s, '#388e3c', 12*s);
                    }
                }
                // === FASE 3 (0.7 → 1): Palle ferme, appaiono angoli e labels ===
                else {
                    const fp = (p - 0.7) / 0.3;
                    const x1 = g.gx + al*Math.cos(-thetaRad);
                    const y1 = g.gy + al*Math.sin(-thetaRad);
                    const x2 = g.gx + al*Math.cos(thetaRad);
                    const y2 = g.gy + al*Math.sin(thetaRad);

                    ctx.globalAlpha = 1;
                    Draw.arrow(ctx, g.gx, g.gy, x1, y1, '#c46b60', 2.5*s, 9*s);
                    Draw.arrow(ctx, g.gx, g.gy, x2, y2, '#388e3c', 2.5*s, 9*s);
                    Draw.circle(ctx, x1, y1, g.br*0.8, '#f0ebe0', '#d8d0c0', 1.5*s);
                    Draw.circle(ctx, x2, y2, g.br*0.8, '#4caf50', '#388e3c', 1.5*s);
                    Draw.label(ctx, 'v\u2081', x1+14*s, y1-12*s, '#c46b60', 12*s);
                    Draw.label(ctx, 'v\u2082', x2+14*s, y2+12*s, '#388e3c', 12*s);

                    // Arco 90° che si disegna
                    ctx.globalAlpha = fp;
                    const arcEnd = -thetaRad + 2*thetaRad*fp;
                    Draw.arc(ctx, g.gx, g.gy, 22*s, -thetaRad, arcEnd, 'rgba(255,255,255,0.7)', 1.5*s);
                    if (fp > 0.6) {
                        ctx.globalAlpha = (fp-0.6)/0.4;
                        Draw.label(ctx, '90°', g.gx+32*s, g.gy, 'rgba(255,255,255,0.85)', 10*s);
                    }

                    // Direzione iniziale tratteggiata
                    ctx.globalAlpha = 0.2;
                    Draw.dashedLine(ctx, g.wx, g.gy, g.gx+al+15*s, g.gy, 'rgba(255,255,255,0.5)', 1*s);
                    if (sp > 0.5) {
                        ctx.globalAlpha = 0.5;
                        Draw.label(ctx, '45°', g.gx+26*s, g.gy-16*s, 'rgba(255,255,255,0.6)', 9*s);
                        Draw.label(ctx, '45°', g.gx+26*s, g.gy+16*s, 'rgba(255,255,255,0.6)', 9*s);
                    }
                }
            }
        },
        {
            title: 'Scomponiamo le velocità',
            text: '<span class="term" data-term="componente">Scomponiamo</span> v<sub>1</sub> e v<sub>2</sub> in componenti x (avanti) e y (di lato).<br><br>' +
                '<b>Osservazione chiave:</b><br>' +
                '&bull; Le componenti <b>x sono uguali</b>: la spinta si spartisce<br>' +
                '&bull; Le componenti <b>y sono opposte</b> e si annullano!<br><br>' +
                '<b>Perché?</b> Prima dell\'<span class="term" data-term="urto">urto</span> non c\'era moto laterale (y = 0). La <span class="highlight">quantità di moto in y si conserva</span>, quindi resta zero anche dopo!',
            formula: 'v_x = 0{,}5 \\cos 45° \\approx 0{,}354 \\text{ m/s} \\\\[4pt] v_y = \\pm 0{,}5 \\sin 45° \\approx \\pm 0{,}354 \\text{ m/s}',
            draw(ctx, w, h, p) {
                const g = geo(w, h), s = g.s;
                const cl = 42*s;
                ctx.globalAlpha = p;

                // Palla 1: componenti con rettangolo di scomposizione
                const x1end = g.gx+cl, y1top = g.gy-25*s;
                Draw.animatedArrow(ctx, g.gx, y1top, x1end, y1top, '#d4956a', p, 2*s, 7*s);
                Draw.animatedArrow(ctx, x1end, y1top, x1end, y1top-cl, '#9b6fb5', p, 2*s, 7*s);
                // Rettangolo tratteggiato
                if (p > 0.3) {
                    ctx.globalAlpha = (p-0.3)/0.7 * 0.3;
                    Draw.dashedLine(ctx, g.gx, y1top, g.gx, y1top-cl, '#999', 1*s);
                    Draw.dashedLine(ctx, g.gx, y1top-cl, x1end, y1top-cl, '#999', 1*s);
                }
                ctx.globalAlpha = p;
                if (p > 0.4) {
                    Draw.label(ctx, 'vx', g.gx+cl/2, y1top+12*s, '#d4956a', 10*s);
                    Draw.label(ctx, 'vy', x1end+12*s, y1top-cl/2, '#9b6fb5', 10*s);
                }

                // Palla 2: componenti
                const y2bot = g.gy+25*s;
                Draw.animatedArrow(ctx, g.gx, y2bot, x1end, y2bot, '#d4956a', p, 2*s, 7*s);
                Draw.animatedArrow(ctx, x1end, y2bot, x1end, y2bot+cl, '#9b6fb5', p, 2*s, 7*s);
                if (p > 0.3) {
                    ctx.globalAlpha = (p-0.3)/0.7 * 0.3;
                    Draw.dashedLine(ctx, g.gx, y2bot, g.gx, y2bot+cl, '#999', 1*s);
                    Draw.dashedLine(ctx, g.gx, y2bot+cl, x1end, y2bot+cl, '#999', 1*s);
                }
                ctx.globalAlpha = p;
                if (p > 0.4) {
                    Draw.label(ctx, 'vx', g.gx+cl/2, y2bot-12*s, '#d4956a', 10*s);
                    Draw.label(ctx, '-vy', x1end+14*s, y2bot+cl/2, '#9b6fb5', 10*s);
                }

                // Indicatore "si annullano" per le componenti y
                if (p > 0.7) {
                    ctx.globalAlpha = (p-0.7)/0.3;
                    const mx = x1end + 30*s;
                    Draw.label(ctx, 'vy + (-vy) = 0', mx, g.gy, '#9b6fb5', 10*s, false);
                }
            }
        },
        {
            title: 'Conservazione della quantità di moto',
            text: '<b>Principio fondamentale:</b> la <span class="highlight">quantità di moto totale si conserva</span>!<br><br>' +
                '<b>Prima</b> (asse x): p<sub>i</sub> = m &middot; v<sub>0</sub><br>' +
                '<b>Dopo</b> (asse x): p<sub>f</sub> = m &middot; v<sub>x</sub> + m &middot; v<sub>x</sub> = 2m &middot; v<sub>x</sub><br><br>' +
                'Uguagliamo: m &middot; v<sub>0</sub> = 2m &middot; v<sub>x</sub>. La massa si semplifica! v<sub>0</sub> = 2 v<sub>x</sub>.',
            formula: 'v_0 = 2 v_x = 2 \\times 0{,}354 \\approx \\boxed{0{,}707 \\text{ m/s}}',
            draw(ctx, w, h, p) {
                const g = geo(w, h), s = g.s;

                // Diviso in due: PRIMA (sinistra) e DOPO (destra)
                const divX = (g.wx + g.gx) / 2;
                ctx.globalAlpha = p;

                // PRIMA: palla bianca con v0
                Draw.roundRect(ctx, g.wx-30*s, g.wy-48*s, 60*s, 20*s, 4*s, 'rgba(255,255,255,0.85)');
                Draw.label(ctx, 'PRIMA', g.wx, g.wy-38*s, '#888', 10*s);
                Draw.circle(ctx, g.wx, g.wy, g.br*0.8, '#f0ebe0', '#d8d0c0', 1.5*s);
                Draw.animatedArrow(ctx, g.wx+g.br+4*s, g.wy, divX-10*s, g.wy, '#c46b60', p, 3*s, 10*s);
                if (p > 0.3) Draw.label(ctx, 'v\u2080', (g.wx+divX)/2, g.wy-16*s, '#c46b60', 12*s);

                // Linea divisoria
                if (p > 0.4) {
                    ctx.globalAlpha = (p-0.4)/0.6 * 0.3;
                    Draw.dashedLine(ctx, divX, g.ty+15*s, divX, g.ty+g.th-15*s, '#fff', 1*s);
                }

                // DOPO: due palle con vx ciascuna
                if (p > 0.4) {
                    ctx.globalAlpha = (p-0.4)/0.6;
                    Draw.roundRect(ctx, g.gx-25*s, g.wy-48*s, 50*s, 20*s, 4*s, 'rgba(255,255,255,0.85)');
                    Draw.label(ctx, 'DOPO', g.gx, g.wy-38*s, '#888', 10*s);
                    // Due frecce vx parallele
                    const vxLen = 35*s;
                    Draw.arrow(ctx, g.gx-5*s, g.wy-15*s, g.gx-5*s+vxLen, g.wy-15*s, '#d4956a', 2*s, 7*s);
                    Draw.arrow(ctx, g.gx-5*s, g.wy+15*s, g.gx-5*s+vxLen, g.wy+15*s, '#d4956a', 2*s, 7*s);
                    Draw.circle(ctx, g.gx-12*s, g.wy-15*s, 6*s, '#f0ebe0', '#d8d0c0', 1*s);
                    Draw.circle(ctx, g.gx-12*s, g.wy+15*s, 6*s, '#4caf50', '#388e3c', 1*s);
                    Draw.label(ctx, 'vx', g.gx+vxLen/2, g.wy-28*s, '#d4956a', 9*s);
                    Draw.label(ctx, 'vx', g.gx+vxLen/2, g.wy+28*s, '#d4956a', 9*s);
                }

                // Segno = tra prima e dopo
                if (p > 0.6) {
                    ctx.globalAlpha = (p-0.6)/0.4;
                    Draw.label(ctx, '=', divX, g.wy, '#fff', 20*s);
                }
            }
        },
        {
            title: 'Troviamo la massa!',
            text: 'Ultimo pezzo! L\'<span class="term" data-term="impulso">impulso</span> della stecca ha dato alla palla bianca <span class="term" data-term="velocita">velocità</span> v<sub>0</sub>:<br><br><b>I = m &middot; v<sub>0</sub></b> &rarr; <b>m = I / v<sub>0</sub></b><br><br>' +
                'm = 0,6375 / 0,707 &asymp; <span class="highlight">0,90 kg</span>.<br><br>' +
                '<b>Cosa abbiamo imparato:</b><br>' +
                '1. Impulso = F &times; &Delta;t = variazione di <span class="term" data-term="quantita-di-moto">quantità di moto</span><br>' +
                '2. La quantità di moto <span class="term" data-term="conservazione-qdm">si conserva</span> (in ogni direzione!)<br>' +
                '3. Scomporre in <span class="term" data-term="componente">componenti</span> x e y semplifica tutto<br>' +
                '4. La simmetria delle velocità era un\'ipotesi del problema, non una legge generale',
            formula: 'm = \\frac{I}{v_0} = \\frac{0{,}6375}{0{,}707} = \\boxed{0{,}90 \\text{ kg}}',
            cleanDraw: true,
            draw(ctx, w, h, p) {
                const s = Draw.S(w, h);
                // Sfondo pulito chiaro
                ctx.fillStyle = '#faf8f5'; ctx.fillRect(0, 0, w, h);

                // Catena logica verticale: I → v₀ → m
                const cx = w / 2;
                const y1 = h * 0.18, y2 = h * 0.45, y3 = h * 0.72;
                const boxW = 140*s, boxH = 30*s;

                ctx.globalAlpha = p;

                // Step 1: Impulso
                Draw.roundRect(ctx, cx-boxW/2, y1-boxH/2, boxW, boxH, 6*s, '#f5f0ea');
                ctx.strokeStyle = '#d4956a'; ctx.lineWidth = 1.5*s;
                ctx.strokeRect(cx-boxW/2, y1-boxH/2, boxW, boxH);
                Draw.label(ctx, 'I = F \u00B7 \u0394t = 0,6375 N\u00B7s', cx, y1, '#d4956a', 11*s);

                // Freccia ↓
                if (p > 0.2) {
                    const fp = Math.min(1, (p-0.2)/0.2);
                    ctx.globalAlpha = fp;
                    Draw.arrow(ctx, cx, y1+boxH/2+4*s, cx, y2-boxH/2-4*s, '#888', 1.5*s, 7*s);
                    Draw.label(ctx, 'I = m \u00B7 v\u2080', cx+65*s, (y1+y2)/2, '#888', 9*s, false);
                }

                // Step 2: Velocità iniziale
                if (p > 0.3) {
                    const fp = Math.min(1, (p-0.3)/0.25);
                    ctx.globalAlpha = fp;
                    Draw.roundRect(ctx, cx-boxW/2, y2-boxH/2, boxW, boxH, 6*s, '#eef5f8');
                    ctx.strokeStyle = '#5a8fa8'; ctx.lineWidth = 1.5*s;
                    ctx.strokeRect(cx-boxW/2, y2-boxH/2, boxW, boxH);
                    Draw.label(ctx, 'v\u2080 = 2v\u2093 = 0,707 m/s', cx, y2, '#5a8fa8', 11*s);
                }

                // Freccia ↓
                if (p > 0.5) {
                    const fp = Math.min(1, (p-0.5)/0.2);
                    ctx.globalAlpha = fp;
                    Draw.arrow(ctx, cx, y2+boxH/2+4*s, cx, y3-boxH/2-4*s, '#888', 1.5*s, 7*s);
                    Draw.label(ctx, 'm = I / v\u2080', cx+60*s, (y2+y3)/2, '#888', 9*s, false);
                }

                // Step 3: Risultato massa
                if (p > 0.6) {
                    const fp = Math.min(1, (p-0.6)/0.25);
                    ctx.globalAlpha = fp;
                    const rW = 160*s, rH = 40*s;
                    Draw.roundRect(ctx, cx-rW/2, y3-rH/2, rW, rH, 8*s, '#e4f2e7');
                    ctx.strokeStyle = '#5a9a6a'; ctx.lineWidth = 2*s;
                    ctx.strokeRect(cx-rW/2, y3-rH/2, rW, rH);
                    Draw.label(ctx, 'm = 0,90 kg', cx, y3-5*s, '#3d8b44', 15*s);
                    Draw.label(ctx, '(circa 900 grammi)', cx, y3+14*s, '#5a9a6a', 10*s, false);
                }
            }
        }
    ];

    return { steps, statement };
})();
