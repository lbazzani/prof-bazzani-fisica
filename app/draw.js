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
    }
};

window.Draw = Draw;
