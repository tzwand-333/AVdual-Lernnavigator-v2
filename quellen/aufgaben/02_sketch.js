    /* ================= SKIZZEN-BAUKASTEN =================
       Kleine Hilfsfunktionen, die die SVG-Skizzen der Aufgaben erzeugen.
       Alle Koordinaten sind SVG-Pixel im jeweiligen viewBox. */
    const COL = { blue: "#38bdf8", green: "#10b981", red: "#f43f5e", amber: "#f59e0b", gray: "#94a3b8", white: "#e2e8f0", violet: "#a78bfa" };
    const FILL = { blue: "rgba(56,189,248,0.12)", green: "rgba(16,185,129,0.12)", red: "rgba(244,63,94,0.12)", amber: "rgba(245,158,11,0.12)", gray: "rgba(148,163,184,0.10)", violet: "rgba(167,139,250,0.14)", none: "none" };
    const DASH = 'stroke-dasharray="5,4"';

    const rd = v => Math.round(v * 10) / 10;
    const P2 = P => P.map(p => rd(p[0]) + "," + rd(p[1])).join(" ");
    const unit = (A, B) => { const dx = B[0] - A[0], dy = B[1] - A[1], l = Math.hypot(dx, dy) || 1; return [dx / l, dy / l]; };
    const add = (A, v, s = 1) => [A[0] + v[0] * s, A[1] + v[1] * s];
    const mid = (A, B) => [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
    const centroid = P => [P.reduce((s, p) => s + p[0], 0) / P.length, P.reduce((s, p) => s + p[1], 0) / P.length];
    const textW = (t, fs = 13) => String(t).replace(/<[^>]*>/g, "").length * fs * 0.6;

    function svgBox(w, h, inner, maxPx) {
        const mh = maxPx || Math.min(230, Math.round(h * 1.3));
        return `<svg viewBox="0 0 ${rd(w)} ${rd(h)}" width="100%" style="max-height:${mh}px" stroke="currentColor" fill="none" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">${inner}</svg>`;
    }
    // Beschriftung (Unbekannte mit "?" werden automatisch rot)
    function T(x, y, t, c = COL.blue, a = "middle", fs = 13) {
        if (String(t).includes("?")) c = COL.red;
        return `<text x="${rd(x)}" y="${rd(y)}" fill="${c}" text-anchor="${a}" font-size="${fs}" class="svg-lbl">${t}</text>`;
    }
    function NOTE(x, y, t, a = "end") { return `<text x="${rd(x)}" y="${rd(y)}" fill="${COL.gray}" text-anchor="${a}" font-size="10" class="svg-note">${t}</text>`; }
    function L(A, B, c = COL.gray, extra = "") { return `<line x1="${rd(A[0])}" y1="${rd(A[1])}" x2="${rd(B[0])}" y2="${rd(B[1])}" stroke="${c}" ${extra}/>`; }
    function PG(P, c = COL.blue, f = FILL.blue, extra = "") { return `<polygon points="${P2(P)}" stroke="${c}" fill="${f}" ${extra}/>`; }
    function PL(P, c = COL.gray, extra = "") { return `<polyline points="${P2(P)}" stroke="${c}" ${extra}/>`; }
    function DOT(A, c = COL.white, r = 3) { return `<circle cx="${rd(A[0])}" cy="${rd(A[1])}" r="${r}" fill="${c}" stroke="none"/>`; }

    // Beschriftung einer Strecke AB, nach außen (weg von "center") versetzt
    function edgeLbl(A, B, t, c, center, gap = 6) {
        const m = mid(A, B); let n = [-(B[1] - A[1]), B[0] - A[0]]; const l = Math.hypot(n[0], n[1]) || 1; n = [n[0] / l, n[1] / l];
        if ((m[0] - center[0]) * n[0] + (m[1] - center[1]) * n[1] < 0) n = [-n[0], -n[1]];
        const d = gap + Math.abs(n[0]) * textW(t) / 2 + Math.abs(n[1]) * 6;
        return T(m[0] + n[0] * d, m[1] + n[1] * d + 4.5, t, c);
    }
    function vtxLbl(V, t, center, c = COL.white, d = 12) {
        const u = unit(center, V); const dd = d + Math.abs(u[0]) * textW(t) / 2;
        return T(V[0] + u[0] * dd, V[1] + u[1] * dd + 4.5, t, c);
    }
    function rightMark(V, A, B, c = COL.white, s = 11) {
        const u = unit(V, A), w = unit(V, B);
        const p1 = add(V, u, s), p3 = add(V, w, s), p2 = [V[0] + (u[0] + w[0]) * s, V[1] + (u[1] + w[1]) * s];
        const d = [V[0] + (u[0] + w[0]) * s * 0.5, V[1] + (u[1] + w[1]) * s * 0.5];
        return `<polyline points="${P2([p1, p2, p3])}" stroke="${c}" stroke-width="1.5"/>` + DOT(d, c, 1.6);
    }
    function angleMark(V, A, B, t, c = COL.amber, r = 26) {
        const u = unit(V, A), w = unit(V, B), s = add(V, u, r), e = add(V, w, r);
        const sweep = (u[0] * w[1] - u[1] * w[0]) > 0 ? 1 : 0;
        let g = `<path d="M ${rd(V[0])} ${rd(V[1])} L ${rd(s[0])} ${rd(s[1])} A ${r} ${r} 0 0 ${sweep} ${rd(e[0])} ${rd(e[1])} Z" stroke="${c}" stroke-width="1.5" fill="${c}" fill-opacity="0.2"/>`;
        if (t) {
            const b = unit([0, 0], [u[0] + w[0], u[1] + w[1]]);
            const d = r + 5 + Math.abs(b[0]) * textW(t) / 2 + Math.abs(b[1]) * 6;
            g += T(V[0] + b[0] * d, V[1] + b[1] * d + 4.5, t, c);
        }
        return g;
    }
    // Maßlinie neben einer Strecke (für Gesamtlängen)
    function dimLine(A, B, t, c, center, off = 22) {
        let n = [-(B[1] - A[1]), B[0] - A[0]]; const l = Math.hypot(n[0], n[1]) || 1; n = [n[0] / l, n[1] / l];
        const m = mid(A, B); if ((m[0] - center[0]) * n[0] + (m[1] - center[1]) * n[1] < 0) n = [-n[0], -n[1]];
        const A1 = add(A, n, off), B1 = add(B, n, off);
        return L(A1, B1, c, 'stroke-width="1.5"') + L(add(A1, n, -5), add(A1, n, 5), c, 'stroke-width="1.5"') + L(add(B1, n, -5), add(B1, n, 5), c, 'stroke-width="1.5"') + edgeLbl(A1, B1, t, c, center, 4);
    }
    function ticks(A, B, n = 1, c = COL.white) {
        const m = mid(A, B), u = unit(A, B), p = [-u[1], u[0]]; let g = "";
        for (let i = 0; i < n; i++) { const o = (i - (n - 1) / 2) * 5; const q = add(m, u, o); g += L(add(q, p, -6), add(q, p, 6), c, 'stroke-width="1.8"'); }
        return g;
    }

    // Allgemeine Figur: Polygon mit Seitenbeschriftung (Seite i = Punkt i -> Punkt i+1)
    function shape(P, o = {}) {
        const c = o.c || COL.blue, ctr = centroid(P);
        let g = PG(P, c, o.f || FILL.blue, o.dash ? DASH : "");
        (o.right || []).forEach(i => { g += rightMark(P[i], P[(i + P.length - 1) % P.length], P[(i + 1) % P.length], c); });
        Object.entries(o.ang || {}).forEach(([i, t]) => { i = +i; g += angleMark(P[i], P[(i + P.length - 1) % P.length], P[(i + 1) % P.length], t, o.angC || COL.amber, o.angR || 22); });
        Object.entries(o.ticks || {}).forEach(([i, n]) => { i = +i; g += ticks(P[i], P[(i + 1) % P.length], n, c); });
        (o.lbl || []).forEach((t, i) => { if (!t) return; const A = P[i], B = P[(i + 1) % P.length], m = mid(A, B); const cc = (o.inLbl || []).includes(i) ? [2 * m[0] - ctr[0], 2 * m[1] - ctr[1]] : ctr; g += edgeLbl(A, B, t, o.lc || c, cc); });
        (o.names || []).forEach((t, i) => { if (t) g += vtxLbl(P[i], t, ctr); });
        if (o.title) g += T(ctr[0], o.titleY || (Math.max(...P.map(p => p[1])) + 34), o.title, c, "middle", 12);
        return g;
    }

    // Rechtwinkliges Dreieck (maßstäblich): w = waagrechte Kathete, h = senkrechte Kathete
    function rightTri(o) {
        const c = o.col || COL.blue, f = o.fill || FILL.blue;
        const s = Math.min((o.maxW || 170) / o.w, (o.maxH || 100) / o.h);
        const W = o.w * s, H = o.h * s, mx = o.mx || Math.max(64, textW(o.v || "") + 22, (o.names ? 30 : 0)), top = o.top || 26;
        const VW = W + 2 * mx, VH = H + top + (o.bottom || 36);
        let C = [mx, top + H], B = [mx + W, top + H], A = [mx, top];
        if (o.flip) { C = [mx + W, top + H]; B = [mx, top + H]; A = [mx + W, top]; }
        const ctr = centroid([A, B, C]);
        let g = PG([A, B, C], c, f) + rightMark(C, A, B, c);
        if (o.angB) g += angleMark(B, C, A, o.angB, COL.amber, o.angR || 28);
        if (o.angA) g += angleMark(A, C, B, o.angA, COL.amber, o.angR || 24);
        if (o.b) g += edgeLbl(C, B, o.b, o.bc || c, ctr);
        if (o.v) g += edgeLbl(C, A, o.v, o.vc || c, ctr);
        if (o.hyp) g += edgeLbl(A, B, o.hyp, o.hc || c, ctr);
        if (o.names) { const [nc, nb, na] = o.names; g += vtxLbl(C, nc, ctr) + vtxLbl(B, nb, ctr) + vtxLbl(A, na, ctr); }
        if (o.note) g += NOTE(VW - 4, VH - 4, o.note);
        return svgBox(VW, VH, g, o.maxPx);
    }

    // Satz des Thales: Halbkreis über AB, C auf dem Kreisbogen
    function thalesFig(o = {}) {
        const M = [160, 135], R = 110, phi = (o.phi || 125) * Math.PI / 180;
        const A = [M[0] - R, M[1]], B = [M[0] + R, M[1]], C = [M[0] + R * Math.cos(phi), M[1] - R * Math.sin(phi)];
        const ctr = centroid([A, B, C]);
        let g = `<path d="M ${A[0]} ${A[1]} A ${R} ${R} 0 0 1 ${B[0]} ${B[1]}" stroke="${COL.gray}" ${DASH}/>`;
        g += PG([A, B, C], COL.blue, FILL.blue);
        if (o.right) g += rightMark(C, A, B, COL.amber);
        if (o.gamma) g += angleMark(C, A, B, o.gamma, COL.amber, 20);
        g += DOT(M, COL.white) + T(M[0], M[1] + 18, "M", COL.white);
        g += vtxLbl(A, "A", ctr) + vtxLbl(B, "B", ctr) + T(C[0], C[1] - 10, "C", COL.white);
        if (o.ab) g += T((A[0] + M[0]) / 2, M[1] + 18, o.ab, COL.blue);
        if (o.ac) g += edgeLbl(A, C, o.ac, COL.blue, ctr);
        if (o.bc) g += edgeLbl(C, B, o.bc, COL.blue, ctr);
        return svgBox(320, 162, g);
    }

    // Strahlensatz-Figur (V-Figur). k = Verhältnis ZA : ZA'
    function strahlV(o = {}) {
        const Z = [30, o.td === 0 ? 150 : 140], k = o.k || 0.42, Lx = 230, tu = o.tu || 0.40, td = (o.td === undefined) ? 0.13 : o.td;
        const x1 = Z[0] + k * Lx, x2 = Z[0] + Lx;
        const A = [x1, Z[1] - k * Lx * tu], A2 = [x2, Z[1] - Lx * tu], B = [x1, Z[1] + k * Lx * td], B2 = [x2, Z[1] + Lx * td];
        const E1 = [x2 + 26, Z[1] - (Lx + 26) * tu], E2 = [x2 + 26, Z[1] + (Lx + 26) * td];
        const below = [x1, Z[1] + 200], above = [x1, Z[1] - 200], left = [Z[0] - 300, (A[1] + B[1]) / 2];
        let g = (o.pre || "") + L(Z, E1, COL.white) + L(Z, E2, COL.white);
        g += L(A, B, COL.amber, 'stroke-width="3"') + L(A2, B2, COL.amber, 'stroke-width="3"');
        g += [Z, A, A2, B, B2].map(p => DOT(p)).join("");
        if (o.names !== false) {
            const nm = o.names || ["Z", "A", "A'", "B", "B'"];
            g += T(Z[0] - 12, Z[1] + 5, nm[0], COL.white) + T(A[0] - 8, A[1] - 9, nm[1], COL.white, "end") + T(A2[0] - 8, A2[1] - 9, nm[2], COL.white, "end");
            if (td > 0) g += T(B[0] - 4, B[1] + 18, nm[3], COL.white, "end") + T(B2[0] - 4, B2[1] + 18, nm[4], COL.white, "end");
            else g += T(B[0], B[1] + 18, nm[3], COL.white) + T(B2[0], B2[1] + 18, nm[4], COL.white);
        }
        if (o.za) g += edgeLbl(Z, A, o.za, COL.blue, below);
        if (o.aa) g += edgeLbl(A, A2, o.aa, COL.blue, below);
        if (o.zb) g += edgeLbl(Z, B, o.zb, COL.green, above, td > 0 ? 6 : 20);
        if (o.bb) g += edgeLbl(B, B2, o.bb, COL.green, above, td > 0 ? 6 : 20);
        if (o.ab) g += edgeLbl(A, B, o.ab, COL.amber, left);
        if (o.ab2) g += edgeLbl(A2, B2, o.ab2, COL.amber, left);
        if (o.za2) g += dimLine(Z, A2, o.za2, COL.blue, below, o.za || o.aa ? 30 : 16);
        if (o.zb2) g += dimLine(Z, B2, o.zb2, COL.green, above, (o.zb || o.bb) ? 34 : 20);
        const VH = Math.max(B2[1], Z[1]) + ((o.zb2) ? 64 : 34);
        return svgBox(320, VH, g);
    }

    // X-Figur (Zentrum Z zwischen den Parallelen)
    function strahlX(o = {}) {
        const Z = [155, 95], s = 0.5, dL = o.dL || 80, dR = o.dR || 115;
        const xL = Z[0] - dL, xR = Z[0] + dR;
        const A = [xL, Z[1] - s * dL], B = [xL, Z[1] + s * dL], A2 = [xR, Z[1] + s * dR], B2 = [xR, Z[1] - s * dR];
        const ext = 20;
        let g = L([xL - ext, Z[1] - s * (dL + ext)], [xR + ext, Z[1] + s * (dR + ext)], COL.white);
        g += L([xL - ext, Z[1] + s * (dL + ext)], [xR + ext, Z[1] - s * (dR + ext)], COL.white);
        g += L(A, B, COL.amber, 'stroke-width="3"') + L(A2, B2, COL.amber, 'stroke-width="3"');
        g += [Z, A, B, A2, B2].map(p => DOT(p)).join("");
        g += T(Z[0], Z[1] - 12, "Z", COL.white) + T(A[0] - 10, A[1] - 4, "A", COL.white, "end") + T(B[0] - 10, B[1] + 10, "B", COL.white, "end") + T(A2[0] + 10, A2[1] + 10, "A'", COL.white, "start") + T(B2[0] + 10, B2[1] - 4, "B'", COL.white, "start");
        if (o.za) g += edgeLbl(Z, A, o.za, COL.blue, B);
        if (o.zb) g += edgeLbl(Z, B, o.zb, COL.green, A);
        if (o.za2) g += edgeLbl(Z, A2, o.za2, COL.blue, B2);
        if (o.zb2) g += edgeLbl(Z, B2, o.zb2, COL.green, A2);
        if (o.ab) g += edgeLbl(A, B, o.ab, COL.amber, Z);
        if (o.ab2) g += edgeLbl(A2, B2, o.ab2, COL.amber, Z);
        return svgBox(355, 190, g);
    }

    // Quader / Würfel (Schrägbild)
    function cuboid(o = {}) {
        const w = o.w || 120, h = o.h || 70, dx = o.dx || 45, dy = o.dy || 30, x0 = o.x0 || 40, y0 = 18 + dy;
        const FBL = [x0, y0 + h], FBR = [x0 + w, y0 + h], FTR = [x0 + w, y0], FTL = [x0, y0];
        const BBL = [x0 + dx, y0 + h - dy], BBR = [x0 + w + dx, y0 + h - dy], BTR = [x0 + w + dx, y0 - dy], BTL = [x0 + dx, y0 - dy];
        const c = o.col || COL.blue, ctr = [x0 + (w + dx) / 2, y0 + (h - dy) / 2];
        let g = PG([FTL, BTL, BTR, FTR], c, FILL.blue) + PG([FTR, BTR, BBR, FBR], c, "rgba(56,189,248,0.06)") + PG([FBL, FBR, FTR, FTL], c, FILL.blue);
        g += L(BBL, FBL, COL.gray, DASH) + L(BBL, BTL, COL.gray, DASH) + L(BBL, BBR, COL.gray, DASH);
        if (o.inner) g += o.inner({ FBL, FBR, FTR, FTL, BBL, BBR, BTR, BTL });
        if (o.floor) { g += L(FBL, BBR, COL.amber, DASH); g += T((FBL[0] + BBR[0]) / 2 + 4, (FBL[1] + BBR[1]) / 2 - 6, o.floor, COL.amber); }
        if (o.diag) { g += L(FBL, BTR, COL.red, 'stroke-dasharray="6,4" stroke-width="2.5"'); const m = mid(FBL, BTR); g += T(m[0] - 10, m[1] - 8, o.diag, COL.red, "end"); }
        if (o.a) g += edgeLbl(FBL, FBR, o.a, c, ctr);
        if (o.b) g += edgeLbl(FBR, BBR, o.b, c, [ctr[0] - 100, ctr[1] - 100]);
        if (o.c) g += edgeLbl(BBR, BTR, o.c, c, ctr);
        if (o.label) g += T(ctr[0] - 8, ctr[1] + 14, o.label, COL.white);
        return svgBox(x0 + w + dx + 88, y0 + h + 34, g);
    }

    // Zylinder
    function cylinder(o = {}) {
        const cx = o.cx || 110, rx = o.rx || 60, ry = o.ry || 15, ty = o.ty || 40, h = o.h || 110, by = ty + h, c = o.col || COL.blue;
        let g = `<path d="M ${cx - rx} ${ty} L ${cx - rx} ${by} A ${rx} ${ry} 0 0 0 ${cx + rx} ${by} L ${cx + rx} ${ty}" stroke="${c}" fill="${FILL.blue}"/>`;
        g += `<path d="M ${cx - rx} ${by} A ${rx} ${ry} 0 0 1 ${cx + rx} ${by}" stroke="${COL.gray}" ${DASH}/>`;
        g += `<ellipse cx="${cx}" cy="${ty}" rx="${rx}" ry="${ry}" stroke="${c}" fill="rgba(56,189,248,0.18)"/>`;
        if (o.inner) g += o.inner({ cx, rx, ry, ty, by });
        if (o.r) { g += L([cx, ty], [cx + rx, ty], COL.red) + DOT([cx, ty]) + T(cx + rx / 2, ty - ry - 5, o.r, COL.red); }
        if (o.d) { g += L([cx - rx, ty], [cx + rx, ty], COL.red) + T(cx, ty - ry - 5, o.d, COL.red); }
        if (o.hl) { const x = cx + rx + 16; g += L([x, ty], [x, by], COL.green, 'stroke-width="1.5"') + L([x - 5, ty], [x + 5, ty], COL.green) + L([x - 5, by], [x + 5, by], COL.green) + T(x + 8, (ty + by) / 2 + 5, o.hl, COL.green, "start"); }
        if (o.label) g += T(cx, (ty + by) / 2 + 12, o.label, COL.white);
        return svgBox(cx + rx + 105, by + ry + 14, g);
    }

    // Kegel
    function cone(o = {}) {
        const cx = o.cx || 110, rx = o.rx || 65, ry = o.ry || 15, by = o.by || 150, h = o.h || 120, S = [cx, by - h], c = o.col || COL.blue;
        const R = [cx + rx, by], Lp = [cx - rx, by], M = [cx, by];
        let g = `<path d="M ${Lp[0]} ${by} L ${S[0]} ${S[1]} L ${R[0]} ${by} A ${rx} ${ry} 0 0 1 ${Lp[0]} ${by}" stroke="${c}" fill="${FILL.blue}"/>`;
        g += `<path d="M ${Lp[0]} ${by} A ${rx} ${ry} 0 0 1 ${R[0]} ${by}" stroke="${COL.gray}" ${DASH}/>`;
        if (o.hl) g += L(S, M, COL.red, 'stroke-dasharray="5,4" stroke-width="2.5"') + T(cx - 8, by - h / 2 + 4, o.hl, COL.red, "end");
        if (o.r) g += L(M, R, COL.blue) + DOT(M) + T(cx + rx / 2, by + ry + 14, o.r, COL.blue);
        if (o.ang) g += angleMark(R, M, S, o.ang, COL.amber, 24);
        if (o.s) g += edgeLbl(S, R, o.s, COL.green, M);
        if (o.label) g += T(cx + rx + 20, 30, o.label, COL.white, "start");
        return svgBox(cx + rx + (o.label ? 140 : 70), by + ry + 24, g);
    }

    // Quadratische Pyramide (Schrägbild)
    function pyramid(o = {}) {
        const x0 = 40, yb = 165, w = o.w || 150, dx = 60, dy = 40, h = o.h || 120;
        const FL = [x0, yb], FR = [x0 + w, yb], BR = [x0 + w + dx, yb - dy], BL = [x0 + dx, yb - dy];
        const Mc = [x0 + w / 2 + dx / 2, yb - dy / 2], S = [Mc[0], Mc[1] - h], MR = mid(FR, BR), MF = mid(FL, FR);
        let g = PG([FL, FR, S], COL.blue, FILL.blue) + PG([FR, BR, S], COL.blue, "rgba(56,189,248,0.06)");
        g += L(FL, BL, COL.gray, DASH) + L(BL, BR, COL.gray, DASH) + L(BL, S, COL.gray, DASH);
        if (o.hl) g += L(Mc, S, COL.red, 'stroke-dasharray="5,4" stroke-width="2.5"') + DOT(Mc) + T(Mc[0] - 8, Mc[1] - h / 2, o.hl, COL.red, "end");
        if (o.half) g += L(Mc, MR, COL.blue, DASH) + T((Mc[0] + MR[0]) / 2 + 2, (Mc[1] + MR[1]) / 2 + 16, o.half, COL.blue);
        if (o.ha) g += L(S, MR, COL.green, 'stroke-width="2.5"') + T(BR[0] + 8, (S[1] + BR[1]) / 2, o.ha, COL.green, "start") + L([BR[0] + 6, (S[1] + BR[1]) / 2 - 4], mid(S, MR), COL.green, 'stroke-width="1"');
        if (o.haF) g += L(S, MF, COL.green, 'stroke-width="2.5"') + T((S[0] + MF[0]) / 2 - 8, (S[1] + MF[1]) / 2 + 20, o.haF, COL.green, "end");
        if (o.s) g += L(S, FR, COL.amber, 'stroke-width="2.5"') + T((S[0] + FR[0]) / 2 + 12, (S[1] + FR[1]) / 2 + 22, o.s, COL.amber, "start");
        if (o.diag) g += L(FL, BR, COL.violet, DASH) + T(Mc[0] + 30, Mc[1] + 4, o.diag, COL.violet, "start");
        if (o.ang) g += angleMark(MR, Mc, S, o.ang, COL.amber, 20);
        if (o.a) g += T(MF[0], yb + 20, o.a, COL.blue);
        return svgBox(x0 + w + dx + 100, yb + 30, g);
    }

    // Dreiecksprisma (Schrägbild)
    function prism(o = {}) {
        const x0 = 40, yb = 150, g0 = 110, hg = 80, dx = 120, dy = 40, tip = o.tip || 0.4;
        const P1 = [x0, yb], P2 = [x0 + g0, yb], P3 = [x0 + g0 * tip, yb - hg], Q1 = add(P1, [dx, -dy]), Q2 = add(P2, [dx, -dy]), Q3 = add(P3, [dx, -dy]);
        let g = PG([P2, Q2, Q3, P3], COL.blue, "rgba(56,189,248,0.06)") + PG([P1, P2, P3], COL.blue, FILL.blue);
        g += L(P1, Q1, COL.gray, DASH) + L(Q1, Q2, COL.gray, DASH) + L(Q1, Q3, COL.gray, DASH);
        if (o.right) g += rightMark(P1, P2, P3, COL.blue);
        if (o.hg) { const F = [P3[0], yb]; g += L(P3, F, COL.red, DASH) + T(P3[0] - 6, yb - hg / 2 + 4, o.hg, COL.red, "end"); }
        if (o.v) g += T(P1[0] - 6, yb - hg / 2 + 4, o.v, COL.blue, "end");
        if (o.g) g += T(x0 + g0 / 2, yb + 18, o.g, COL.blue);
        if (o.k) g += T((P2[0] + Q2[0]) / 2 + 12, (P2[1] + Q2[1]) / 2 + 14, o.k, COL.green, "start");
        if (o.label) g += T(Q3[0] + 30, Q3[1] - 4, o.label, COL.white, "start");
        return svgBox(x0 + g0 + dx + 70, yb + 28, g);
    }

    // Koordinatensystem mit Figuren
    function coordGrid(o = {}) {
        const xmin = o.xmin ?? -5, xmax = o.xmax ?? 5, ymin = o.ymin ?? -4, ymax = o.ymax ?? 4, u = o.u || 24, pad = 18;
        const X = x => pad + (x - xmin) * u, Y = y => pad + (ymax - y) * u;
        const W = (xmax - xmin) * u + 2 * pad, H = (ymax - ymin) * u + 2 * pad;
        let g = "";
        for (let x = xmin; x <= xmax; x++) g += L([X(x), Y(ymin)], [X(x), Y(ymax)], "rgba(148,163,184,0.18)", 'stroke-width="1"');
        for (let y = ymin; y <= ymax; y++) g += L([X(xmin), Y(y)], [X(xmax), Y(y)], "rgba(148,163,184,0.18)", 'stroke-width="1"');
        g += L([X(xmin), Y(0)], [X(xmax) + 8, Y(0)], COL.gray, 'stroke-width="1.5"') + L([X(0), Y(ymin)], [X(0), Y(ymax) - 8], COL.gray, 'stroke-width="1.5"');
        g += PG([[X(xmax) + 10, Y(0)], [X(xmax) + 2, Y(0) - 4], [X(xmax) + 2, Y(0) + 4]], COL.gray, COL.gray) + PG([[X(0), Y(ymax) - 10], [X(0) - 4, Y(ymax) - 2], [X(0) + 4, Y(ymax) - 2]], COL.gray, COL.gray);
        for (let x = xmin; x <= xmax; x++) if (x !== 0) g += `<text x="${X(x)}" y="${Y(0) + 13}" fill="${COL.gray}" font-size="9" text-anchor="middle" stroke="none" font-family="sans-serif">${x}</text>`;
        for (let y = ymin; y <= ymax; y++) if (y !== 0) g += `<text x="${X(0) - 5}" y="${Y(y) + 3}" fill="${COL.gray}" font-size="9" text-anchor="end" stroke="none" font-family="sans-serif">${y}</text>`;
        g += T(X(xmax) + 2, Y(0) - 8, "x", COL.gray, "end", 12) + T(X(0) + 8, Y(ymax) + 2, "y", COL.gray, "start", 12);
        (o.shapes || []).forEach(sh => {
            const P = sh.pts.map(p => [X(p[0]), Y(p[1])]), ctr = centroid(P);
            g += P.length > 1 ? PG(P, sh.c || COL.blue, sh.f || FILL.blue, sh.dash ? DASH : "") : "";
            P.forEach((p, i) => { g += DOT(p, sh.c || COL.blue); if (sh.names && sh.names[i]) g += vtxLbl(p, sh.names[i], P.length > 1 ? ctr : [p[0] - 10, p[1] + 10], sh.c || COL.blue, 10); });
        });
        (o.points || []).forEach(pt => { const p = [X(pt.x), Y(pt.y)]; g += DOT(p, pt.c || COL.amber, 3.5) + T(p[0] + 7, p[1] - 7, pt.t, pt.c || COL.amber, "start", 12); });
        (o.segs || []).forEach(sg => { g += L([X(sg[0][0]), Y(sg[0][1])], [X(sg[1][0]), Y(sg[1][1])], sg[2] || COL.red, DASH); });
        return svgBox(W, H, g, o.maxPx || 230);
    }

    // Leiter an der Wand: w = Abstand zur Wand, h = Höhe an der Wand
    function ladderFig(o) {
        const s = Math.min(170 / o.w, 120 / o.h), W = o.w * s, H = o.h * s, Cx = 70 + W, Cy = 30 + H;
        const F = [Cx - W, Cy], Tp = [Cx, Cy - H];
        let g = `<rect x="${Cx}" y="${Cy - H - 18}" width="14" height="${H + 18}" fill="rgba(148,163,184,0.25)" stroke="${COL.gray}"/>`;
        g += L([F[0] - 40, Cy], [Cx + 30, Cy], COL.gray, 'stroke-width="2.5"');
        const u = unit(F, Tp), p = [-u[1], u[0]], len = Math.hypot(W, H);
        g += L(add(F, p, 4), add(Tp, p, 4), COL.amber, 'stroke-width="2.5"') + L(add(F, p, -4), add(Tp, p, -4), COL.amber, 'stroke-width="2.5"');
        for (let d = 12; d < len - 4; d += 14) { const q = add(F, u, d); g += L(add(q, p, 4), add(q, p, -4), COL.amber, 'stroke-width="1.5"'); }
        g += rightMark([Cx, Cy], F, Tp, COL.white, 10);
        const ctr = centroid([F, Tp, [Cx, Cy]]);
        if (o.l) g += edgeLbl(F, Tp, o.l, COL.amber, ctr, 10);
        if (o.g) g += T((F[0] + Cx) / 2, Cy + 20, o.g, COL.blue);
        if (o.hh) { const x = Cx + 24; g += L([x, Tp[1]], [x, Cy], COL.green, 'stroke-width="1.5"') + L([x - 4, Tp[1]], [x + 4, Tp[1]], COL.green) + T(x + 8, (Tp[1] + Cy) / 2 + 5, o.hh, COL.green, "start"); }
        if (o.ang) g += angleMark(F, [Cx, Cy], Tp, o.ang, COL.amber, 26);
        return svgBox(Cx + 100, Cy + 30, g);
    }

    // Baum / Turm mit Schatten; optional eine Person im Schatten (Strahlensatz)
    function shadowFig(o) {
        const Z = [30, 160], s = 250 / o.shadow, tx = Z[0] + o.shadow * s, th = Math.min(o.height * s, 125) * (o.hScale || 1);
        let g = L([Z[0] - 15, Z[1]], [tx + 50, Z[1]], COL.gray, 'stroke-width="2.5"');
        g += `<rect x="${tx - 4}" y="${Z[1] - th * 0.45}" width="8" height="${th * 0.45}" fill="#92400e" stroke="none"/>`;
        g += `<ellipse cx="${tx}" cy="${Z[1] - th * 0.65}" rx="${th * 0.22}" ry="${th * 0.35}" fill="rgba(16,185,129,0.35)" stroke="${COL.green}"/>`;
        const top = [tx, Z[1] - th];
        g += L(Z, top, COL.amber, 'stroke-dasharray="6,4"') + L(Z, [tx, Z[1]], "#475569", 'stroke-width="6" stroke-linecap="butt"');
        if (o.person) {
            const px = Z[0] + o.person * s, ph = th * o.pH / o.height, head = [px, Z[1] - ph];
            g += L([px, Z[1]], [px, Z[1] - ph * 0.55], COL.white) + L([px, Z[1] - ph * 0.55], [px, Z[1] - ph + 6], COL.white) + `<circle cx="${px}" cy="${Z[1] - ph + 5}" r="5" stroke="${COL.white}" fill="none"/>`;
            if (o.pl) g += T(px - 8, Z[1] - ph / 2, o.pl, COL.white, "end");
            if (o.ps) g += T((Z[0] + px) / 2, Z[1] + 34, o.ps, COL.blue);
            g += L([Z[0], Z[1] + 22], [px, Z[1] + 22], COL.blue, 'stroke-width="1.5"');
            void head;
        }
        if (o.sl) g += T((Z[0] + tx) / 2 + (o.person ? 40 : 0), Z[1] + 18, o.sl, COL.blue);
        if (o.hl) g += T(tx + th * 0.22 + 8, Z[1] - th / 2, o.hl, COL.green, "start");
        if (o.ang) g += angleMark(Z, [tx, Z[1]], top, o.ang, COL.amber, 34);
        g += `<circle cx="${tx + 60}" cy="22" r="10" fill="rgba(245,158,11,0.5)" stroke="${COL.amber}"/>`;
        return svgBox(tx + 110, Z[1] + (o.person ? 42 : 30), g);
    }
