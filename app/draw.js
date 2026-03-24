// ===== Draw Utilities — condivise tra esercizi e teoria =====

const REF_W = 570, REF_H = 380;

const Draw = {
    S(w, h) { return Math.min(w / REF_W, h / REF_H); },

    arrow(ctx, x1, y1, x2, y2, color, lineWidth = 2.5, headSize = 10) {
        const angle = Math.atan2(y2 - y1, x2 - x1);
        const len = Math.sqrt((x2-x1)**2 + (y2-y1)**2);
        if (len < 2) return;
        ctx.strokeStyle = color; ctx.fillStyle = color;
        ctx.lineWidth = lineWidth; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x2, y2);
        ctx.lineTo(x2 - headSize * Math.cos(angle - Math.PI / 6), y2 - headSize * Math.sin(angle - Math.PI / 6));
        ctx.lineTo(x2 - headSize * Math.cos(angle + Math.PI / 6), y2 - headSize * Math.sin(angle + Math.PI / 6));
        ctx.closePath(); ctx.fill();
    },

    animatedArrow(ctx, x1, y1, x2, y2, color, progress, lw, hs) {
        this.arrow(ctx, x1, y1, x1 + (x2 - x1) * progress, y1 + (y2 - y1) * progress, color, lw, hs);
    },

    dashedLine(ctx, x1, y1, x2, y2, color, lineWidth = 1.5) {
        ctx.strokeStyle = color; ctx.lineWidth = lineWidth;
        ctx.setLineDash([5, 3]); ctx.beginPath();
        ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); ctx.setLineDash([]);
    },

    label(ctx, text, x, y, color, fontSize = 14, bold = true) {
        const minSize = 8;
        const size = Math.max(minSize, fontSize);
        ctx.font = `${bold ? '700' : '400'} ${size}px Nunito, sans-serif`;
        ctx.fillStyle = color; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(text, x, y);
    },

    arc(ctx, cx, cy, radius, startAngle, endAngle, color, lineWidth = 1.5) {
        ctx.strokeStyle = color; ctx.lineWidth = lineWidth;
        ctx.beginPath(); ctx.arc(cx, cy, radius, startAngle, endAngle); ctx.stroke();
    },

    roundRect(ctx, x, y, w, h, r, fillColor) {
        ctx.fillStyle = fillColor; ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath(); ctx.fill();
    },

    circle(ctx, cx, cy, r, fillColor, strokeColor, lineWidth = 2) {
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
        if (fillColor) { ctx.fillStyle = fillColor; ctx.fill(); }
        if (strokeColor) { ctx.strokeStyle = strokeColor; ctx.lineWidth = lineWidth; ctx.stroke(); }
    },

    line(ctx, x1, y1, x2, y2, color, lineWidth = 2) {
        ctx.strokeStyle = color; ctx.lineWidth = lineWidth; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    },

    curvedArrow(ctx, cx, cy, radius, startAngle, endAngle, color, lineWidth = 2, headSize = 8) {
        ctx.strokeStyle = color; ctx.lineWidth = lineWidth; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.arc(cx, cy, radius, startAngle, endAngle); ctx.stroke();
        const dir = endAngle > startAngle ? 1 : -1;
        const tx = cx + radius * Math.cos(endAngle);
        const ty = cy + radius * Math.sin(endAngle);
        const tangent = endAngle + dir * Math.PI / 2;
        ctx.fillStyle = color; ctx.beginPath(); ctx.moveTo(tx, ty);
        ctx.lineTo(tx - headSize * Math.cos(tangent - Math.PI / 6), ty - headSize * Math.sin(tangent - Math.PI / 6));
        ctx.lineTo(tx - headSize * Math.cos(tangent + Math.PI / 6), ty - headSize * Math.sin(tangent + Math.PI / 6));
        ctx.closePath(); ctx.fill();
    },

    polygon(ctx, points, fillColor, strokeColor, lineWidth = 2) {
        if (!points || points.length < 2) return;
        ctx.beginPath(); ctx.moveTo(points[0][0], points[0][1]);
        for (let i = 1; i < points.length; i++) ctx.lineTo(points[i][0], points[i][1]);
        ctx.closePath();
        if (fillColor) { ctx.fillStyle = fillColor; ctx.fill(); }
        if (strokeColor) { ctx.strokeStyle = strokeColor; ctx.lineWidth = lineWidth; ctx.stroke(); }
    },

    brace(ctx, x1, y1, x2, y2, color, lineWidth = 1.5, label, labelColor, labelSize = 14) {
        const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
        const dx = x2 - x1, dy = y2 - y1;
        const len = Math.sqrt(dx * dx + dy * dy);
        if (len < 4) return;
        const nx = -dy / len, ny = dx / len;
        const bulge = len * 0.12;
        const q1x = (x1 + mx) / 2 + nx * bulge, q1y = (y1 + my) / 2 + ny * bulge;
        const q2x = (mx + x2) / 2 + nx * bulge, q2y = (my + y2) / 2 + ny * bulge;
        const tipX = mx + nx * bulge * 1.6, tipY = my + ny * bulge * 1.6;
        ctx.strokeStyle = color; ctx.lineWidth = lineWidth; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.quadraticCurveTo(q1x, q1y, tipX, tipY); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(x2, y2); ctx.quadraticCurveTo(q2x, q2y, tipX, tipY); ctx.stroke();
        if (label) {
            const lx = tipX + nx * (labelSize * 0.8), ly = tipY + ny * (labelSize * 0.8);
            this.label(ctx, label, lx, ly, labelColor || color, labelSize, false);
        }
    },

    grid(ctx, x, y, w, h, spacing, color = 'rgba(0,0,0,0.08)', lineWidth = 0.5) {
        ctx.strokeStyle = color; ctx.lineWidth = lineWidth;
        ctx.beginPath();
        for (let gx = x; gx <= x + w; gx += spacing) { ctx.moveTo(gx, y); ctx.lineTo(gx, y + h); }
        for (let gy = y; gy <= y + h; gy += spacing) { ctx.moveTo(x, gy); ctx.lineTo(x + w, gy); }
        ctx.stroke();
    },

    pill(ctx, x, y, w, h, fillColor, strokeColor, lineWidth = 2) {
        const r = h / 2;
        ctx.beginPath();
        ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y);
        ctx.arc(x + w - r, y + r, r, -Math.PI / 2, Math.PI / 2);
        ctx.lineTo(x + r, y + h);
        ctx.arc(x + r, y + r, r, Math.PI / 2, -Math.PI / 2);
        ctx.closePath();
        if (fillColor) { ctx.fillStyle = fillColor; ctx.fill(); }
        if (strokeColor) { ctx.strokeStyle = strokeColor; ctx.lineWidth = lineWidth; ctx.stroke(); }
    }
};

window.Draw = Draw;
