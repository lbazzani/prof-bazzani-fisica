// ===== Tema 7: Il diagramma di corpo libero =====

const Tema7 = (() => {
    const steps = [
        // ---- Step 1: A che serve il DCL? ----
        {
            title: 'A che serve il DCL?',
            text: 'Il <span class="term" data-term="diagramma-corpo-libero">diagramma di corpo libero</span> (DCL) è lo strumento più importante della meccanica. Prendi una scena complicata e la semplifichi: disegni <b>un solo oggetto</b> con delle frecce che rappresentano <b>tutte le forze</b> che agiscono su di esso.<br><br>' +
                'Senza DCL, è facilissimo dimenticare una <span class="term" data-term="forza">forza</span> o inventarne una che non esiste. Il DCL è il tuo <span class="highlight">"foglietto magico"</span> per risolvere qualsiasi problema di <span class="term" data-term="equilibrio">equilibrio</span>.<br><br>' +
                'La trasformazione è spettacolare: da una scena confusa a uno schema <b>chiaro e pulito</b>.',
            formula: null,
            cleanDraw: true,
            duration: 1400,
            draw(ctx, w, h, p) {
                const s = Draw.S(w, h);
                ctx.fillStyle = '#faf8f5';
                ctx.fillRect(0, 0, w, h);

                const leftX = w * 0.22;
                const rightX = w * 0.78;
                const cy = h * 0.5;

                // === Left side: messy scene with box on ramp ===
                if (p > 0.02) {
                    const fp = Math.min(1, (p - 0.02) / 0.25);
                    ctx.globalAlpha = fp;

                    // Ramp (inclined plane)
                    ctx.fillStyle = '#d0c8bb';
                    ctx.beginPath();
                    ctx.moveTo(leftX - 80 * s, cy + 60 * s);
                    ctx.lineTo(leftX + 60 * s, cy - 50 * s);
                    ctx.lineTo(leftX + 60 * s, cy + 60 * s);
                    ctx.closePath();
                    ctx.fill();
                    ctx.strokeStyle = '#b0a594';
                    ctx.lineWidth = 1.5 * s;
                    ctx.stroke();

                    // Ground under ramp
                    ctx.strokeStyle = '#b0a594';
                    ctx.lineWidth = 1.5 * s;
                    ctx.beginPath();
                    ctx.moveTo(leftX - 100 * s, cy + 60 * s);
                    ctx.lineTo(leftX + 80 * s, cy + 60 * s);
                    ctx.stroke();

                    // Box on ramp
                    const angle = Math.atan2(110 * s, 140 * s);
                    const boxCX = leftX - 15 * s;
                    const boxCY = cy + 5 * s;
                    ctx.save();
                    ctx.translate(boxCX, boxCY);
                    ctx.rotate(-angle);
                    Draw.roundRect(ctx, -18 * s, -15 * s, 36 * s, 30 * s, 3 * s, '#e8e0d4');
                    ctx.strokeStyle = '#b0a594';
                    ctx.lineWidth = 1.5 * s;
                    ctx.strokeRect(-18 * s, -15 * s, 36 * s, 30 * s);
                    ctx.restore();

                    // Rope line (visual clutter)
                    ctx.strokeStyle = '#888';
                    ctx.lineWidth = 1.5 * s;
                    ctx.beginPath();
                    ctx.moveTo(boxCX + 10 * s, boxCY - 15 * s);
                    ctx.lineTo(leftX + 55 * s, cy - 55 * s);
                    ctx.stroke();

                    // Pulley circle (clutter)
                    Draw.circle(ctx, leftX + 55 * s, cy - 55 * s, 6 * s, '#888', '#666', 1 * s);

                    // Extra visual clutter: wavy lines, question marks
                    ctx.fillStyle = '#c46b60';
                    ctx.font = `${14 * s}px sans-serif`;
                    ctx.textAlign = 'center';
                    ctx.fillText('?', leftX - 55 * s, cy - 15 * s);
                    ctx.fillText('?', leftX + 35 * s, cy - 30 * s);
                    ctx.fillText('?', leftX - 30 * s, cy + 40 * s);

                    // Label
                    Draw.label(ctx, 'Scena reale', leftX, cy + 82 * s, '#888', 10 * s, false);

                    ctx.globalAlpha = 1;
                }

                // === Middle arrow: "DCL" ===
                if (p > 0.3) {
                    const fp = Math.min(1, (p - 0.3) / 0.2);
                    ctx.globalAlpha = fp;

                    const midX = w * 0.5;
                    Draw.animatedArrow(ctx, midX - 35 * s, cy, midX + 35 * s, cy, '#d4956a', fp, 3.5 * s, 11 * s);
                    Draw.roundRect(ctx, midX - 22 * s, cy - 28 * s, 44 * s, 22 * s, 5 * s, '#fef3ee');
                    ctx.strokeStyle = '#d4956a';
                    ctx.lineWidth = 1.2 * s;
                    ctx.strokeRect(midX - 22 * s, cy - 28 * s, 44 * s, 22 * s);
                    Draw.label(ctx, 'DCL', midX, cy - 17 * s, '#d4956a', 12 * s);

                    ctx.globalAlpha = 1;
                }

                // === Right side: clean DCL ===
                if (p > 0.5) {
                    const fp = Math.min(1, (p - 0.5) / 0.25);
                    ctx.globalAlpha = fp;

                    // Clean isolated box
                    const bw = 40 * s, bh = 32 * s;
                    Draw.roundRect(ctx, rightX - bw / 2, cy - bh / 2, bw, bh, 4 * s, '#e8e0d4');
                    ctx.strokeStyle = '#b0a594';
                    ctx.lineWidth = 2 * s;
                    ctx.strokeRect(rightX - bw / 2, cy - bh / 2, bw, bh);

                    ctx.globalAlpha = 1;
                }

                // Force arrows on right side DCL
                // P (weight, downward)
                if (p > 0.58) {
                    const fp = Math.min(1, (p - 0.58) / 0.12);
                    Draw.animatedArrow(ctx, rightX, cy + 16 * s, rightX, cy + 65 * s, '#c46b60', fp, 3 * s, 10 * s);
                    if (fp > 0.5) Draw.label(ctx, 'P', rightX + 14 * s, cy + 50 * s, '#c46b60', 12 * s);
                }

                // N (normal, perpendicular to ramp - angled up-left)
                if (p > 0.68) {
                    const fp = Math.min(1, (p - 0.68) / 0.12);
                    const angle = Math.atan2(110, 140);
                    const nx = -Math.sin(angle) * 55 * s;
                    const ny = -Math.cos(angle) * 55 * s;
                    Draw.animatedArrow(ctx, rightX, cy, rightX + nx, cy + ny, '#5a8fa8', fp, 3 * s, 10 * s);
                    if (fp > 0.5) Draw.label(ctx, 'N', rightX + nx - 12 * s, cy + ny - 6 * s, '#5a8fa8', 12 * s);
                }

                // T (tension, along ramp upward)
                if (p > 0.78) {
                    const fp = Math.min(1, (p - 0.78) / 0.12);
                    const angle = Math.atan2(110, 140);
                    const tx = Math.cos(angle) * 55 * s;
                    const ty = -Math.sin(angle) * 55 * s;
                    Draw.animatedArrow(ctx, rightX, cy, rightX + tx, cy + ty, '#5a9a6a', fp, 3 * s, 10 * s);
                    if (fp > 0.5) Draw.label(ctx, 'T', rightX + tx + 10 * s, cy + ty - 6 * s, '#5a9a6a', 12 * s);
                }

                // Label "DCL" under clean diagram
                if (p > 0.85) {
                    const fp = (p - 0.85) / 0.15;
                    ctx.globalAlpha = fp;
                    Draw.roundRect(ctx, rightX - 50 * s, cy + 72 * s, 100 * s, 26 * s, 5 * s, '#e4f2e7');
                    ctx.strokeStyle = '#81c784';
                    ctx.lineWidth = 1.2 * s;
                    ctx.strokeRect(rightX - 50 * s, cy + 72 * s, 100 * s, 26 * s);
                    Draw.label(ctx, 'Chiaro!', rightX, cy + 85 * s, '#3d8b44', 11 * s);
                    ctx.globalAlpha = 1;
                }
            }
        },

        // ---- Step 2: Passo 1 – Scegli l'oggetto ----
        {
            title: "Passo 1: Scegli l'oggetto",
            text: 'Primo passo: decidi <b>quale oggetto</b> stai analizzando. Nei nostri problemi: l\'auto sul piano inclinato, la scala appoggiata al muro, oppure una delle palle da biliardo.<br><br>' +
                'Disegnalo <b>da solo</b>, senza nient\'altro intorno. Basta una forma semplice: un rettangolo, un cerchio, una linea. Questo è il tuo "protagonista".<br><br>' +
                'Tutto il resto (il piano, il muro, la fune...) sparisce: ne tieni conto solo attraverso le <span class="term" data-term="forza">forze</span> che esercitano sull\'oggetto.',
            formula: null,
            cleanDraw: true,
            duration: 1400,
            draw(ctx, w, h, p) {
                const s = Draw.S(w, h);
                ctx.fillStyle = '#faf8f5';
                ctx.fillRect(0, 0, w, h);

                const y1 = h * 0.3;
                const spacing = w * 0.28;
                const startX = w * 0.18;

                // === Three problem sketches side by side ===

                // 1) Car on ramp
                if (p > 0.02) {
                    const fp = Math.min(1, (p - 0.02) / 0.2);
                    // Fade out if car is selected (after p > 0.5)
                    const fadeOut = p > 0.55 ? Math.max(0.15, 1 - (p - 0.55) / 0.2) : 1;
                    ctx.globalAlpha = fp * fadeOut;

                    // Mini ramp
                    ctx.fillStyle = '#d0c8bb';
                    ctx.beginPath();
                    ctx.moveTo(startX - 30 * s, y1 + 25 * s);
                    ctx.lineTo(startX + 30 * s, y1 - 15 * s);
                    ctx.lineTo(startX + 30 * s, y1 + 25 * s);
                    ctx.closePath();
                    ctx.fill();

                    // Mini car
                    const carAngle = Math.atan2(40 * s, 60 * s);
                    ctx.save();
                    ctx.translate(startX - 2 * s, y1 + 3 * s);
                    ctx.rotate(-carAngle);
                    Draw.roundRect(ctx, -12 * s, -10 * s, 24 * s, 16 * s, 2 * s, '#c46b60');
                    ctx.restore();

                    Draw.label(ctx, 'Auto', startX, y1 + 40 * s, '#888', 9 * s, false);
                    ctx.globalAlpha = 1;
                }

                // 2) Ladder against wall
                if (p > 0.08) {
                    const fp = Math.min(1, (p - 0.08) / 0.2);
                    const fadeOut = p > 0.55 ? Math.max(0.15, 1 - (p - 0.55) / 0.2) : 1;
                    ctx.globalAlpha = fp * fadeOut;

                    const lx = startX + spacing;
                    // Wall
                    ctx.strokeStyle = '#b0a594';
                    ctx.lineWidth = 2 * s;
                    ctx.beginPath();
                    ctx.moveTo(lx + 20 * s, y1 - 28 * s);
                    ctx.lineTo(lx + 20 * s, y1 + 25 * s);
                    ctx.stroke();
                    // Ground
                    ctx.beginPath();
                    ctx.moveTo(lx - 25 * s, y1 + 25 * s);
                    ctx.lineTo(lx + 25 * s, y1 + 25 * s);
                    ctx.stroke();
                    // Ladder
                    ctx.strokeStyle = '#5a8fa8';
                    ctx.lineWidth = 3 * s;
                    ctx.beginPath();
                    ctx.moveTo(lx - 15 * s, y1 + 24 * s);
                    ctx.lineTo(lx + 18 * s, y1 - 22 * s);
                    ctx.stroke();

                    Draw.label(ctx, 'Scala', lx, y1 + 40 * s, '#888', 9 * s, false);
                    ctx.globalAlpha = 1;
                }

                // 3) Billiard ball
                if (p > 0.14) {
                    const fp = Math.min(1, (p - 0.14) / 0.2);
                    const fadeOut = p > 0.55 ? Math.max(0.15, 1 - (p - 0.55) / 0.2) : 1;
                    ctx.globalAlpha = fp * fadeOut;

                    const bx = startX + spacing * 2;
                    Draw.circle(ctx, bx, y1, 14 * s, '#d4956a', '#c0844a', 1.5 * s);
                    Draw.arc(ctx, bx, y1, 9 * s, 0.3, 2.8, '#c0844a', 1 * s);

                    Draw.label(ctx, 'Palla', bx, y1 + 40 * s, '#888', 9 * s, false);
                    ctx.globalAlpha = 1;
                }

                // === Selection circle around the car ===
                if (p > 0.4) {
                    const fp = Math.min(1, (p - 0.4) / 0.15);
                    ctx.globalAlpha = fp;
                    ctx.strokeStyle = '#c46b60';
                    ctx.lineWidth = 2.5 * s;
                    ctx.setLineDash([4 * s, 3 * s]);
                    ctx.beginPath();
                    ctx.arc(startX, y1 + 2 * s, 35 * s, 0, Math.PI * 2);
                    ctx.stroke();
                    ctx.setLineDash([]);
                    ctx.globalAlpha = 1;
                }

                // === Extracted isolated car (bottom center) ===
                if (p > 0.6) {
                    const fp = Math.min(1, (p - 0.6) / 0.25);
                    ctx.globalAlpha = fp;

                    const isoX = w * 0.5;
                    const isoY = h * 0.72;

                    // Simple rectangle representing the car
                    const bw = 50 * s, bh = 35 * s;
                    Draw.roundRect(ctx, isoX - bw / 2, isoY - bh / 2, bw, bh, 5 * s, '#c46b60');
                    ctx.strokeStyle = '#a85548';
                    ctx.lineWidth = 2 * s;
                    ctx.strokeRect(isoX - bw / 2, isoY - bh / 2, bw, bh);

                    Draw.label(ctx, 'Oggetto isolato', isoX, isoY + bh / 2 + 18 * s, '#2e2e2e', 11 * s);

                    // Arrow from selection to isolated
                    if (fp > 0.3) {
                        const ap = Math.min(1, (fp - 0.3) / 0.5);
                        Draw.animatedArrow(ctx, startX, y1 + 40 * s + 15 * s, isoX - 30 * s, isoY - bh / 2 - 10 * s, '#d4956a', ap, 2.5 * s, 9 * s);
                    }

                    ctx.globalAlpha = 1;
                }

                // Green box confirmation
                if (p > 0.88) {
                    const fp = (p - 0.88) / 0.12;
                    ctx.globalAlpha = fp;
                    Draw.roundRect(ctx, w * 0.65, h * 0.62, 110 * s, 28 * s, 5 * s, '#e4f2e7');
                    ctx.strokeStyle = '#81c784';
                    ctx.lineWidth = 1.2 * s;
                    ctx.strokeRect(w * 0.65, h * 0.62, 110 * s, 28 * s);
                    Draw.label(ctx, 'Solo lui!', w * 0.65 + 55 * s, h * 0.62 + 14 * s, '#3d8b44', 11 * s);
                    ctx.globalAlpha = 1;
                }
            }
        },

        // ---- Step 3: Passo 2 – Trova le forze ----
        {
            title: 'Passo 2: Trova le forze',
            text: 'Ora il passo chiave: identifica <b>TUTTE</b> le forze. Usa questa checklist:<br><br>' +
                '1) <span class="term" data-term="peso">PESO</span>: sempre presente, sempre verso il basso.<br>' +
                '2) Per ogni superficie di CONTATTO: <span class="term" data-term="reazione-normale">reazione normale</span> (perpendicolare alla superficie) e magari <span class="term" data-term="attrito">attrito</span> (parallelo).<br>' +
                '3) FUNI/CAVI: <span class="term" data-term="tensione">tensione</span> lungo la direzione della fune.<br>' +
                '4) <b>Nient\'altro!</b> Non inventare forze che non esistono.',
            formula: '\\text{Checklist: } \\vec{P} \\downarrow \\quad \\vec{N} \\perp \\text{superficie} \\quad \\vec{T} \\text{ lungo la fune}',
            cleanDraw: true,
            duration: 1800,
            draw(ctx, w, h, p) {
                const s = Draw.S(w, h);
                ctx.fillStyle = '#faf8f5';
                ctx.fillRect(0, 0, w, h);

                const cx = w * 0.4;
                const cy = h * 0.48;
                const bw = 50 * s, bh = 38 * s;

                // Inclined plane hint (faded)
                ctx.globalAlpha = 0.2;
                ctx.strokeStyle = '#b0a594';
                ctx.lineWidth = 1.5 * s;
                ctx.beginPath();
                ctx.moveTo(cx - 90 * s, cy + 70 * s);
                ctx.lineTo(cx + 70 * s, cy - 50 * s);
                ctx.stroke();
                ctx.globalAlpha = 1;

                // Car rectangle (always visible)
                if (p > 0.02) {
                    const fp = Math.min(1, (p - 0.02) / 0.15);
                    ctx.globalAlpha = fp;
                    Draw.roundRect(ctx, cx - bw / 2, cy - bh / 2, bw, bh, 4 * s, '#e8e0d4');
                    ctx.strokeStyle = '#b0a594';
                    ctx.lineWidth = 2 * s;
                    ctx.strokeRect(cx - bw / 2, cy - bh / 2, bw, bh);
                    Draw.label(ctx, 'Auto', cx, cy + 2 * s, '#888', 10 * s, false);
                    ctx.globalAlpha = 1;
                }

                // Checklist on the right
                const checkX = w * 0.72;
                const checkStartY = h * 0.2;
                const checkSpacing = 35 * s;

                // Force 1: P (weight, downward) + checkmark
                if (p > 0.15) {
                    const fp = Math.min(1, (p - 0.15) / 0.18);
                    ctx.globalAlpha = fp;

                    Draw.animatedArrow(ctx, cx, cy + bh / 2 + 4 * s, cx, cy + bh / 2 + 55 * s, '#c46b60', fp, 3 * s, 10 * s);
                    if (fp > 0.5) Draw.label(ctx, 'P', cx + 14 * s, cy + bh / 2 + 35 * s, '#c46b60', 13 * s);

                    // Checkmark
                    if (fp > 0.8) {
                        Draw.label(ctx, '\u2713 Peso', checkX, checkStartY, '#c46b60', 11 * s);
                    }
                    ctx.globalAlpha = 1;
                }

                // Force 2: N (normal, perpendicular to ramp surface) + checkmark
                if (p > 0.35) {
                    const fp = Math.min(1, (p - 0.35) / 0.18);
                    ctx.globalAlpha = fp;

                    const rampAngle = Math.atan2(120, 160);
                    const nx = -Math.sin(rampAngle) * 55 * s;
                    const ny = -Math.cos(rampAngle) * 55 * s;
                    Draw.animatedArrow(ctx, cx, cy, cx + nx, cy + ny, '#5a8fa8', fp, 3 * s, 10 * s);
                    if (fp > 0.5) Draw.label(ctx, 'N', cx + nx - 14 * s, cy + ny - 4 * s, '#5a8fa8', 13 * s);

                    // Checkmark
                    if (fp > 0.8) {
                        Draw.label(ctx, '\u2713 Normale', checkX, checkStartY + checkSpacing, '#5a8fa8', 11 * s);
                    }
                    ctx.globalAlpha = 1;
                }

                // Force 3: T (tension, along ramp upward) + checkmark
                if (p > 0.55) {
                    const fp = Math.min(1, (p - 0.55) / 0.18);
                    ctx.globalAlpha = fp;

                    const rampAngle = Math.atan2(120, 160);
                    const tx = Math.cos(rampAngle) * 55 * s;
                    const ty = -Math.sin(rampAngle) * 55 * s;
                    Draw.animatedArrow(ctx, cx, cy, cx + tx, cy + ty, '#5a9a6a', fp, 3 * s, 10 * s);
                    if (fp > 0.5) Draw.label(ctx, 'T', cx + tx + 10 * s, cy + ty - 4 * s, '#5a9a6a', 13 * s);

                    // Checkmark
                    if (fp > 0.8) {
                        Draw.label(ctx, '\u2713 Tensione', checkX, checkStartY + checkSpacing * 2, '#5a9a6a', 11 * s);
                    }
                    ctx.globalAlpha = 1;
                }

                // "Nient'altro!" label
                if (p > 0.75) {
                    const fp = Math.min(1, (p - 0.75) / 0.12);
                    ctx.globalAlpha = fp;
                    Draw.label(ctx, '\u2713 Nient\'altro!', checkX, checkStartY + checkSpacing * 3, '#d4956a', 11 * s);
                    ctx.globalAlpha = 1;
                }

                // Green result box
                if (p > 0.88) {
                    const fp = (p - 0.88) / 0.12;
                    ctx.globalAlpha = fp;
                    Draw.roundRect(ctx, checkX - 55 * s, checkStartY + checkSpacing * 3.8, 120 * s, 28 * s, 5 * s, '#e4f2e7');
                    ctx.strokeStyle = '#81c784';
                    ctx.lineWidth = 1.2 * s;
                    ctx.strokeRect(checkX - 55 * s, checkStartY + checkSpacing * 3.8, 120 * s, 28 * s);
                    Draw.label(ctx, 'DCL completo!', checkX + 5 * s, checkStartY + checkSpacing * 3.8 + 14 * s, '#3d8b44', 11 * s);
                    ctx.globalAlpha = 1;
                }
            }
        },

        // ---- Step 4: Passo 3 – Scegli gli assi ----
        {
            title: 'Passo 3: Scegli gli assi',
            text: 'La scelta degli assi rende i calcoli <b>molto più facili</b>. Sul piano inclinato: metti un asse <span class="highlight">LUNGO il piano</span> e uno <span class="highlight">PERPENDICOLARE</span> ad esso.<br><br>' +
                'Così la <span class="term" data-term="reazione-normale">reazione normale</span> ha una sola componente, e devi scomporre solo il <span class="term" data-term="peso">peso</span>. Se usi gli assi "sbagliati" (orizzontale/verticale), devi scomporre <b>tutte</b> le forze: un disastro!<br><br>' +
                'Per problemi orizzontali/verticali (come la scala): usa i classici assi x e y.',
            formula: null,
            cleanDraw: true,
            duration: 1600,
            draw(ctx, w, h, p) {
                const s = Draw.S(w, h);
                ctx.fillStyle = '#faf8f5';
                ctx.fillRect(0, 0, w, h);

                const leftX = w * 0.28;
                const rightX = w * 0.72;
                const cy = h * 0.48;
                const rampAngle = Math.atan2(110, 140);

                // === Left: "Wrong" axes (horizontal/vertical on inclined plane) ===
                if (p > 0.02) {
                    const fp = Math.min(1, (p - 0.02) / 0.25);
                    ctx.globalAlpha = fp;

                    // Title
                    Draw.label(ctx, 'Assi standard', leftX, h * 0.12, '#c46b60', 11 * s);

                    // Faded ramp
                    ctx.strokeStyle = '#d0c8bb';
                    ctx.lineWidth = 2 * s;
                    ctx.beginPath();
                    ctx.moveTo(leftX - 65 * s, cy + 45 * s);
                    ctx.lineTo(leftX + 45 * s, cy - 35 * s);
                    ctx.stroke();

                    // Box
                    const boxCX = leftX - 12 * s;
                    const boxCY = cy + 3 * s;
                    ctx.save();
                    ctx.translate(boxCX, boxCY);
                    ctx.rotate(-rampAngle);
                    Draw.roundRect(ctx, -14 * s, -11 * s, 28 * s, 22 * s, 3 * s, '#e8e0d4');
                    ctx.strokeStyle = '#b0a594';
                    ctx.lineWidth = 1.5 * s;
                    ctx.strokeRect(-14 * s, -11 * s, 28 * s, 22 * s);
                    ctx.restore();

                    // Horizontal/vertical axes
                    Draw.arrow(ctx, boxCX - 40 * s, boxCY, boxCX + 50 * s, boxCY, '#c46b60', 2 * s, 8 * s);
                    Draw.arrow(ctx, boxCX, boxCY + 40 * s, boxCX, boxCY - 50 * s, '#c46b60', 2 * s, 8 * s);
                    Draw.label(ctx, 'x', boxCX + 55 * s, boxCY - 4 * s, '#c46b60', 11 * s);
                    Draw.label(ctx, 'y', boxCX + 8 * s, boxCY - 55 * s, '#c46b60', 11 * s);

                    // Dashed decomposition lines (messy - everything needs decomposition)
                    if (fp > 0.6) {
                        const dp = (fp - 0.6) / 0.4;
                        ctx.globalAlpha = dp * 0.5;
                        // N decomposition
                        Draw.dashedLine(ctx, boxCX - 25 * s, boxCY - 30 * s, boxCX - 25 * s, boxCY, '#888', 1 * s);
                        Draw.dashedLine(ctx, boxCX - 25 * s, boxCY - 30 * s, boxCX, boxCY - 30 * s, '#888', 1 * s);
                        // T decomposition
                        Draw.dashedLine(ctx, boxCX + 20 * s, boxCY - 20 * s, boxCX + 20 * s, boxCY, '#888', 1 * s);
                        Draw.dashedLine(ctx, boxCX + 20 * s, boxCY - 20 * s, boxCX, boxCY - 20 * s, '#888', 1 * s);

                        ctx.globalAlpha = dp;
                        Draw.label(ctx, 'Tutto da scomporre!', leftX, cy + 65 * s, '#c46b60', 9 * s, false);
                    }

                    ctx.globalAlpha = 1;
                }

                // Red X on left
                if (p > 0.35) {
                    const fp = Math.min(1, (p - 0.35) / 0.1);
                    ctx.globalAlpha = fp;
                    ctx.fillStyle = '#c46b60';
                    ctx.font = `bold ${22 * s}px sans-serif`;
                    ctx.textAlign = 'center';
                    ctx.fillText('\u2717', leftX, h * 0.88);
                    ctx.globalAlpha = 1;
                }

                // === Right: "Smart" axes (along/perpendicular to plane) ===
                if (p > 0.4) {
                    const fp = Math.min(1, (p - 0.4) / 0.25);
                    ctx.globalAlpha = fp;

                    // Title
                    Draw.label(ctx, 'Assi "furbi"', rightX, h * 0.12, '#5a9a6a', 11 * s);

                    // Faded ramp
                    ctx.strokeStyle = '#d0c8bb';
                    ctx.lineWidth = 2 * s;
                    ctx.beginPath();
                    ctx.moveTo(rightX - 65 * s, cy + 45 * s);
                    ctx.lineTo(rightX + 45 * s, cy - 35 * s);
                    ctx.stroke();

                    // Box
                    const boxCX = rightX - 12 * s;
                    const boxCY = cy + 3 * s;
                    ctx.save();
                    ctx.translate(boxCX, boxCY);
                    ctx.rotate(-rampAngle);
                    Draw.roundRect(ctx, -14 * s, -11 * s, 28 * s, 22 * s, 3 * s, '#e8e0d4');
                    ctx.strokeStyle = '#b0a594';
                    ctx.lineWidth = 1.5 * s;
                    ctx.strokeRect(-14 * s, -11 * s, 28 * s, 22 * s);
                    ctx.restore();

                    // Rotated axes (along the plane and perpendicular)
                    const axLen = 55 * s;
                    // Along plane axis (x')
                    const axX = Math.cos(rampAngle) * axLen;
                    const axY = -Math.sin(rampAngle) * axLen;
                    Draw.arrow(ctx, boxCX - axX * 0.6, boxCY + axY * 0.6, boxCX + axX, boxCY - axY, '#5a9a6a', 2 * s, 8 * s);
                    Draw.label(ctx, "x'", boxCX + axX + 8 * s, boxCY - axY + 4 * s, '#5a9a6a', 11 * s);

                    // Perpendicular axis (y')
                    const ayX = -Math.sin(rampAngle) * axLen;
                    const ayY = -Math.cos(rampAngle) * axLen;
                    Draw.arrow(ctx, boxCX - ayX * 0.3, boxCY - ayY * 0.3, boxCX + ayX, boxCY + ayY, '#5a9a6a', 2 * s, 8 * s);
                    Draw.label(ctx, "y'", boxCX + ayX + 4 * s, boxCY + ayY - 8 * s, '#5a9a6a', 11 * s);

                    // N aligns perfectly with y'
                    if (fp > 0.5) {
                        const np = (fp - 0.5) / 0.5;
                        ctx.globalAlpha = np;
                        Draw.animatedArrow(ctx, boxCX, boxCY, boxCX + ayX * 0.7, boxCY + ayY * 0.7, '#5a8fa8', np, 2.5 * s, 9 * s);
                        Draw.label(ctx, 'N', boxCX + ayX * 0.7 + 10 * s, boxCY + ayY * 0.7 - 2 * s, '#5a8fa8', 11 * s);
                        Draw.label(ctx, 'Solo P da scomporre!', rightX, cy + 65 * s, '#5a9a6a', 9 * s, false);
                    }

                    ctx.globalAlpha = 1;
                }

                // Green checkmark on right
                if (p > 0.75) {
                    const fp = Math.min(1, (p - 0.75) / 0.1);
                    ctx.globalAlpha = fp;
                    ctx.fillStyle = '#5a9a6a';
                    ctx.font = `bold ${22 * s}px sans-serif`;
                    ctx.textAlign = 'center';
                    ctx.fillText('\u2713', rightX, h * 0.88);
                    ctx.globalAlpha = 1;
                }

                // Green result box
                if (p > 0.85) {
                    const fp = (p - 0.85) / 0.15;
                    ctx.globalAlpha = fp;
                    const bx = w * 0.5 - 70 * s;
                    const by = h * 0.9;
                    Draw.roundRect(ctx, bx, by, 140 * s, 26 * s, 5 * s, '#e4f2e7');
                    ctx.strokeStyle = '#81c784';
                    ctx.lineWidth = 1.2 * s;
                    ctx.strokeRect(bx, by, 140 * s, 26 * s);
                    Draw.label(ctx, 'Assi furbi = vita facile', bx + 70 * s, by + 13 * s, '#3d8b44', 10 * s);
                    ctx.globalAlpha = 1;
                }
            }
        },

        // ---- Step 5: Errori da evitare ----
        {
            title: 'Errori da evitare',
            text: 'Errori classici da non fare:<br><br>' +
                '1) <b>Dimenticare una forza</b> (soprattutto la <span class="term" data-term="reazione-normale">reazione normale</span>).<br>' +
                '2) Aggiungere "la forza del moto": se l\'oggetto è in <span class="term" data-term="equilibrio">equilibrio</span>, la forza totale è <b>ZERO</b>, non c\'è una forza che lo spinge!<br>' +
                '3) Disegnare forze sull\'oggetto <b>sbagliato</b> (confusione azione-reazione).<br>' +
                '4) Mettere il <span class="term" data-term="peso">peso</span> lungo il piano inclinato invece che <b>verticale verso il basso</b>.',
            formula: null,
            cleanDraw: true,
            duration: 1600,
            draw(ctx, w, h, p) {
                const s = Draw.S(w, h);
                ctx.fillStyle = '#faf8f5';
                ctx.fillRect(0, 0, w, h);

                const colW = w * 0.42;
                const wrongX = w * 0.24;
                const rightX = w * 0.74;
                const rampAngle = Math.atan2(110, 140);

                // === Mistake 1: Weight along slope (WRONG) ===
                if (p > 0.02) {
                    const fp = Math.min(1, (p - 0.02) / 0.22);
                    ctx.globalAlpha = fp;

                    const y1 = h * 0.3;

                    // Wrong: ramp + box with P along slope
                    // Mini ramp
                    ctx.strokeStyle = '#d0c8bb';
                    ctx.lineWidth = 1.5 * s;
                    ctx.beginPath();
                    ctx.moveTo(wrongX - 45 * s, y1 + 30 * s);
                    ctx.lineTo(wrongX + 35 * s, y1 - 22 * s);
                    ctx.stroke();

                    // Box
                    const bx1 = wrongX - 8 * s;
                    const by1 = y1 + 2 * s;
                    ctx.save();
                    ctx.translate(bx1, by1);
                    ctx.rotate(-rampAngle);
                    Draw.roundRect(ctx, -11 * s, -9 * s, 22 * s, 18 * s, 2 * s, '#e8e0d4');
                    ctx.strokeStyle = '#b0a594';
                    ctx.lineWidth = 1 * s;
                    ctx.strokeRect(-11 * s, -9 * s, 22 * s, 18 * s);
                    ctx.restore();

                    // P arrow along slope (WRONG direction)
                    const pLen = 40 * s;
                    const px = -Math.cos(rampAngle) * pLen;
                    const py = Math.sin(rampAngle) * pLen;
                    Draw.animatedArrow(ctx, bx1, by1, bx1 + px, by1 + py, '#c46b60', fp, 2.5 * s, 9 * s);
                    if (fp > 0.5) Draw.label(ctx, 'P?', bx1 + px - 12 * s, by1 + py + 4 * s, '#c46b60', 11 * s);

                    // Red X
                    if (fp > 0.8) {
                        ctx.fillStyle = '#c46b60';
                        ctx.font = `bold ${20 * s}px sans-serif`;
                        ctx.textAlign = 'center';
                        ctx.fillText('\u2717', wrongX, y1 - 35 * s);
                        Draw.label(ctx, 'SBAGLIATO', wrongX, y1 - 48 * s, '#c46b60', 9 * s, false);
                    }

                    ctx.globalAlpha = 1;
                }

                // === Correct: Weight straight down ===
                if (p > 0.25) {
                    const fp = Math.min(1, (p - 0.25) / 0.22);
                    ctx.globalAlpha = fp;

                    const y1 = h * 0.3;

                    // Mini ramp
                    ctx.strokeStyle = '#d0c8bb';
                    ctx.lineWidth = 1.5 * s;
                    ctx.beginPath();
                    ctx.moveTo(rightX - 45 * s, y1 + 30 * s);
                    ctx.lineTo(rightX + 35 * s, y1 - 22 * s);
                    ctx.stroke();

                    // Box
                    const bx2 = rightX - 8 * s;
                    const by2 = y1 + 2 * s;
                    ctx.save();
                    ctx.translate(bx2, by2);
                    ctx.rotate(-rampAngle);
                    Draw.roundRect(ctx, -11 * s, -9 * s, 22 * s, 18 * s, 2 * s, '#e8e0d4');
                    ctx.strokeStyle = '#b0a594';
                    ctx.lineWidth = 1 * s;
                    ctx.strokeRect(-11 * s, -9 * s, 22 * s, 18 * s);
                    ctx.restore();

                    // P arrow straight DOWN (CORRECT)
                    Draw.animatedArrow(ctx, bx2, by2, bx2, by2 + 45 * s, '#5a9a6a', fp, 2.5 * s, 9 * s);
                    if (fp > 0.5) Draw.label(ctx, 'P', bx2 + 14 * s, by2 + 35 * s, '#5a9a6a', 11 * s);

                    // Green checkmark
                    if (fp > 0.8) {
                        ctx.fillStyle = '#5a9a6a';
                        ctx.font = `bold ${20 * s}px sans-serif`;
                        ctx.textAlign = 'center';
                        ctx.fillText('\u2713', rightX, y1 - 35 * s);
                        Draw.label(ctx, 'CORRETTO', rightX, y1 - 48 * s, '#5a9a6a', 9 * s, false);
                    }

                    ctx.globalAlpha = 1;
                }

                // === Mistake 2: "Forza del moto" (WRONG) ===
                if (p > 0.48) {
                    const fp = Math.min(1, (p - 0.48) / 0.22);
                    ctx.globalAlpha = fp;

                    const y2 = h * 0.7;

                    // Box on flat surface (wrong)
                    ctx.strokeStyle = '#d0c8bb';
                    ctx.lineWidth = 1.5 * s;
                    ctx.beginPath();
                    ctx.moveTo(wrongX - 50 * s, y2 + 14 * s);
                    ctx.lineTo(wrongX + 50 * s, y2 + 14 * s);
                    ctx.stroke();

                    Draw.roundRect(ctx, wrongX - 15 * s, y2 - 12 * s, 30 * s, 24 * s, 3 * s, '#e8e0d4');
                    ctx.strokeStyle = '#b0a594';
                    ctx.lineWidth = 1 * s;
                    ctx.strokeRect(wrongX - 15 * s, y2 - 12 * s, 30 * s, 24 * s);

                    // Fake "force of motion" arrow
                    Draw.animatedArrow(ctx, wrongX + 16 * s, y2, wrongX + 55 * s, y2, '#c46b60', fp, 2.5 * s, 9 * s);
                    if (fp > 0.5) Draw.label(ctx, '"F moto"??', wrongX + 60 * s, y2 - 10 * s, '#c46b60', 9 * s, false);

                    // Red X
                    if (fp > 0.8) {
                        ctx.fillStyle = '#c46b60';
                        ctx.font = `bold ${20 * s}px sans-serif`;
                        ctx.textAlign = 'center';
                        ctx.fillText('\u2717', wrongX, y2 - 28 * s);
                    }

                    ctx.globalAlpha = 1;
                }

                // === Correct: No extra forces in equilibrium ===
                if (p > 0.65) {
                    const fp = Math.min(1, (p - 0.65) / 0.22);
                    ctx.globalAlpha = fp;

                    const y2 = h * 0.7;

                    // Box on flat surface (correct)
                    ctx.strokeStyle = '#d0c8bb';
                    ctx.lineWidth = 1.5 * s;
                    ctx.beginPath();
                    ctx.moveTo(rightX - 50 * s, y2 + 14 * s);
                    ctx.lineTo(rightX + 50 * s, y2 + 14 * s);
                    ctx.stroke();

                    Draw.roundRect(ctx, rightX - 15 * s, y2 - 12 * s, 30 * s, 24 * s, 3 * s, '#e8e0d4');
                    ctx.strokeStyle = '#b0a594';
                    ctx.lineWidth = 1 * s;
                    ctx.strokeRect(rightX - 15 * s, y2 - 12 * s, 30 * s, 24 * s);

                    // P down (weight)
                    const pStartY = y2 + 14 * s;
                    const pEndY = y2 + 42 * s;
                    Draw.animatedArrow(ctx, rightX, pStartY, rightX, pEndY, '#5a9a6a', fp, 2 * s, 8 * s);
                    if (fp > 0.4) Draw.label(ctx, 'P', rightX + 12 * s, y2 + 34 * s, '#5a9a6a', 10 * s);


                    // N up (normal reaction)
                    const nTopStart = y2 - 12 * s;
                    const nTopEnd = y2 - 42 * s;
                    Draw.animatedArrow(ctx, rightX, nTopStart, rightX, nTopEnd, '#5a8fa8', fp, 2 * s, 8 * s);
                    if (fp > 0.4) Draw.label(ctx, 'N', rightX + 12 * s, y2 - 34 * s, '#5a8fa8', 10 * s);

                    // Green checkmark
                    if (fp > 0.8) {
                        ctx.fillStyle = '#5a9a6a';
                        ctx.font = `bold ${20 * s}px sans-serif`;
                        ctx.textAlign = 'center';
                        ctx.fillText('\u2713', rightX, y2 - 28 * s);
                        Draw.label(ctx, 'Solo P e N!', rightX, y2 + 52 * s, '#5a9a6a', 9 * s, false);
                    }

                    ctx.globalAlpha = 1;
                }

                // Summary green box
                if (p > 0.9) {
                    const fp = (p - 0.9) / 0.1;
                    ctx.globalAlpha = fp;
                    const bx = w * 0.5 - 75 * s;
                    const by = h * 0.92;
                    Draw.roundRect(ctx, bx, by, 150 * s, 26 * s, 5 * s, '#e4f2e7');
                    ctx.strokeStyle = '#81c784';
                    ctx.lineWidth = 1.2 * s;
                    ctx.strokeRect(bx, by, 150 * s, 26 * s);
                    Draw.label(ctx, 'Controlla sempre il DCL!', bx + 75 * s, by + 13 * s, '#3d8b44', 10 * s);
                    ctx.globalAlpha = 1;
                }
            }
        }
    ];

    return { id: 'dcl', title: 'Il diagramma di corpo libero', icon: '\u{1F4CB}', category: 'Strumenti', order: 5, steps };
})();
if (typeof TopicRegistry !== 'undefined') TopicRegistry.register(Tema7);
