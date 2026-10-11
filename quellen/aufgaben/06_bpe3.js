
    /* === BPE 3: GEOMETRIE === */
    const NMS = "nicht maßstabsgetreu";
    const KST_TRI = { pts: [[1, 1], [4, 1], [4, 3]], names: ["A", "B", "C"] };
    const KST_SVG = coordGrid({ shapes: [KST_TRI] });

    // Drache an der Schnur (Trigonometrie)
    const KITE_SVG = (() => {
        const g0 = 175, H = [60, 148], len = 210, a = 30 * Math.PI / 180, K = [H[0] + len * Math.cos(a), H[1] - len * Math.sin(a)];
        let g = L([15, g0], [310, g0], COL.gray, 'stroke-width="2.5"');
        g += L([48, g0], [48, 152], COL.white) + L([48, 152], [48, 132], COL.white) + `<circle cx="48" cy="125" r="6" stroke="${COL.white}"/>` + L([48, 142], H, COL.white);
        g += L(H, K, COL.white, 'stroke-width="1.5"');
        g += PG([[K[0], K[1] - 16], [K[0] + 11, K[1]], [K[0], K[1] + 20], [K[0] - 11, K[1]]], COL.red, "rgba(244,63,94,0.35)");
        g += L([K[0], K[1] + 20], [K[0], g0], COL.green, DASH) + L(H, [K[0], H[1]], COL.gray, DASH);
        g += rightMark([K[0], H[1]], H, K, COL.white, 9);
        g += angleMark(H, [K[0], H[1]], K, "30°", COL.amber, 40);
        g += edgeLbl(H, K, "50 m", COL.white, [K[0], H[1]], 8);
        g += T(K[0] + 10, (K[1] + H[1]) / 2 + 10, "h = ?", COL.red, "start");
        g += T(K[0] + 10, (H[1] + g0) / 2 + 5, "1,20 m", COL.blue, "start");
        return svgBox(320, 190, g);
    })();

    Object.assign(db.tasks, {
        "l3_1_A": {
            desc: "Satz des Pythagoras: Hypotenuse berechnen.",
            example: {
                q: "Berechne die fehlende Seite c im abgebildeten Dreieck.",
                svg: rightTri({ w: 4, h: 3, b: "b = 4 cm", v: "a = 3 cm", hyp: "c = ?" }),
                steps: ["Die gesuchte Seite c liegt gegenüber dem rechten Winkel: Sie ist die Hypotenuse.", "Formel ansetzen: <span class='math'>a<sup>2</sup> + b<sup>2</sup> = c<sup>2</sup></span>", "<span class='math'>3<sup>2</sup> + 4<sup>2</sup> = c<sup>2</sup> ➔ 9 + 16 = 25</span>", "Wurzel ziehen: <span class='math'>c = 5</span> cm"]
            },
            exercises: [
                { q: "Berechne die Hypotenuse c im abgebildeten Dreieck.", svg: rightTri({ w: 8, h: 6, b: "8 cm", v: "6 cm", hyp: "c = ?" }), a: mt("c = √(6² + 8²) = √100 = 10") + " cm" },
                { q: "Berechne die Hypotenuse c im abgebildeten Dreieck.", svg: rightTri({ w: 12, h: 5, b: "12 cm", v: "5 cm", hyp: "c = ?", flip: true }), a: mt("c = √(25 + 144) = √169 = 13") + " cm" },
                { q: "Berechne die Länge x im abgebildeten Dreieck.", svg: rightTri({ w: 12, h: 9, b: "12 m", v: "9 m", hyp: "x = ?", col: COL.green, fill: FILL.green }), a: mt("x = √(81 + 144) = √225 = 15") + " m" },
                { type: "concept", q: "Im abgebildeten Dreieck liegt der rechte Winkel bei R. Nenne die Hypotenuse und stelle den Satz des Pythagoras für dieses Dreieck auf.", svg: rightTri({ w: 4, h: 3, b: "p", v: "q", hyp: "r", names: ["R", "Q", "P"] }), a: "Die Hypotenuse ist r (sie liegt dem rechten Winkel gegenüber). " + mt("p<sup>2</sup> + q<sup>2</sup> = r<sup>2</sup>") },
                { q: "Berechne die Hypotenuse c und runde auf zwei Nachkommastellen.", svg: rightTri({ w: 7, h: 4, b: "7 cm", v: "4 cm", hyp: "c = ?", flip: true }), a: mt("c = √(16 + 49) = √65 ≈ 8,06") + " cm" }
            ]
        },
        "l3_1_B": {
            desc: "Satz des Pythagoras (Katheten), Umkehrung und Satz des Thales.",
            example: {
                q: "Berechne die fehlende Kathete b im abgebildeten Dreieck.",
                svg: rightTri({ w: 8, h: 6, b: "b = ?", v: "a = 6 cm", hyp: "c = 10 cm", flip: true, col: COL.green, fill: FILL.green }),
                steps: ["Gesucht ist eine Kathete, also wird subtrahiert.", "Formel umstellen: <span class='math'>b<sup>2</sup> = c<sup>2</sup> - a<sup>2</sup></span>", "<span class='math'>b<sup>2</sup> = 10<sup>2</sup> - 6<sup>2</sup> = 100 - 36 = 64</span>", "Wurzel ziehen: <span class='math'>b = 8</span> cm"]
            },
            exercises: [
                { q: "Berechne die fehlende Kathete b im abgebildeten Dreieck.", svg: rightTri({ w: 12, h: 9, b: "b = ?", v: "9 cm", hyp: "15 cm" }), a: mt("b = √(225 - 81) = √144 = 12") + " cm" },
                { q: "Berechne die Länge x und runde auf zwei Nachkommastellen.", svg: rightTri({ w: Math.sqrt(51), h: 7, b: "x = ?", v: "7 cm", hyp: "10 cm", flip: true }), a: mt("x = √(100 - 49) = √51 ≈ 7,14") + " cm" },
                { q: "Der Punkt C liegt auf dem Halbkreis über der Strecke AB (AB = 10 cm). Bestimme den Winkel γ und berechne anschließend die Länge der Strecke BC.", svg: thalesFig({ phi: 106.26, ab: "AB = 10 cm", ac: "6 cm", bc: "BC = ?", gamma: "γ = ?" }), a: "Nach dem Satz des Thales ist " + mt("γ = 90°") + ". Dann gilt: " + mt("BC = √(10² - 6²) = √64 = 8") + " cm" },
                { q: "Prüfe rechnerisch, ob ein Dreieck mit den Seitenlängen 7 cm, 24 cm und 25 cm rechtwinklig ist.", a: "Ja, denn <span class='math'>7<sup>2</sup> + 24<sup>2</sup> = 49 + 576 = 625 = 25<sup>2</sup></span>." },
                { q: "Prüfe rechnerisch, ob ein Dreieck mit den Seitenlängen 6 cm, 9 cm und 11 cm rechtwinklig ist.", a: "Nein, denn " + mt("6<sup>2</sup> + 9<sup>2</sup> = 36 + 81 = 117 ≠ 121 = 11<sup>2</sup>") }
            ]
        },
        "l3_1_C": {
            desc: "Anwendungen des Pythagoras in Körpern, Flächen, Sachsituationen und im Koordinatensystem.",
            example: {
                q: "Berechne die Länge der Raumdiagonale d im abgebildeten Quader.",
                svg: cuboid({ w: 100, h: 110, dx: 45, dy: 32, a: "a = 4 cm", b: "b = 3 cm", c: "c = 12 cm", diag: "d = ?", floor: "e" }),
                steps: ["Berechne zuerst die Bodendiagonale e (orange): <span class='math'>e<sup>2</sup> = 4<sup>2</sup> + 3<sup>2</sup> = 25 ➔ e = 5</span>", "Die Raumdiagonale d ist die Hypotenuse im Dreieck aus e und der Höhe c: <span class='math'>d<sup>2</sup> = e<sup>2</sup> + c<sup>2</sup></span>", "<span class='math'>d<sup>2</sup> = 25 + 12<sup>2</sup> = 169</span>", "Wurzel ziehen: <span class='math'>d = 13</span> cm"]
            },
            exercises: [
                { q: "Berechne die Höhe h und den Flächeninhalt des abgebildeten gleichschenkligen Dreiecks.", svg: svgBox(240, 155, shape([[45, 125], [195, 125], [120, 25]], { c: COL.green, f: FILL.green, lbl: ["c = 6 cm", "a = 5 cm", "a = 5 cm"] }) + L([120, 25], [120, 125], COL.red, DASH) + rightMark([120, 125], [120, 25], [195, 125], COL.red, 9) + T(126, 85, "h = ?", COL.red, "start")), a: "Halbes Dreieck nutzen: " + mt("h = √(5² - 3²) = √16 = 4") + " cm; " + mt("A = 6 · 4 / 2 = 12") + " cm²" },
                { type: "context", q: "Damit eine Leiter sicher steht, muss ihr Fuß mindestens 1,50 m von der Wand entfernt sein. Erreicht eine 6 m lange Leiter dann noch ein Fenster in 5,70 m Höhe?", svg: ladderFig({ w: 1.5, h: Math.sqrt(33.75), l: "6 m", g: "1,50 m", hh: "h = ?" }), a: mt("h = √(6² - 1,5²) = √33,75 ≈ 5,81") + " m. Ja, 5,81 m > 5,70 m – das Fenster wird erreicht." },
                { q: "Berechne die Länge der Raumdiagonale d des abgebildeten Würfels und runde auf zwei Nachkommastellen.", svg: cuboid({ w: 95, h: 95, dx: 42, dy: 30, a: "a = 5 cm", diag: "d = ?" }), a: "Bodendiagonale: " + mt("e<sup>2</sup> = 25 + 25 = 50") + "; " + mt("d = √(50 + 25) = √75 ≈ 8,66") + " cm" },
                { type: "context", q: "Fernseher werden nach ihrer Bildschirmdiagonale in Zoll verkauft (1 Zoll = 2,54 cm). Ein 55-Zoll-Fernseher hat ein 121,8 cm breites Bild. Berechne die Höhe des Bildes.", svg: svgBox(270, 150, shape([[45, 20], [225, 20], [225, 121], [45, 121]], { c: COL.blue, f: "rgba(15,23,42,0.6)", lbl: [null, "h = ?", "121,8 cm", null] }) + L([45, 121], [225, 20], COL.amber, DASH) + T(120, 62, "55 Zoll", COL.amber)), a: "Diagonale: " + mt("55 · 2,54 = 139,7") + " cm; " + mt("h = √(139,7² - 121,8²) ≈ √4680,9 ≈ 68,4") + " cm" },
                { q: "Berechne den Abstand der Punkte A(1|2) und B(7|10) im Koordinatensystem.", svg: coordGrid({ xmin: -1, xmax: 8, ymin: -1, ymax: 11, u: 17, points: [{ x: 1, y: 2, t: "A" }, { x: 7, y: 10, t: "B" }], segs: [[[1, 2], [7, 10], COL.red], [[1, 2], [7, 2], COL.gray], [[7, 2], [7, 10], COL.gray]] }), a: "Waagrecht: 7 − 1 = 6, senkrecht: 10 − 2 = 8. " + mt("AB = √(6² + 8²) = √100 = 10") + " LE" }
            ]
        },

        "l3_2_A": {
            desc: "Ähnlichkeit erkennen & Maßstab (Streckfaktor k) bestimmen.",
            example: {
                q: "Bestimme den Maßstab k (Bild : Original) der beiden abgebildeten Rechtecke.",
                svg: svgBox(320, 120, shape([[25, 60], [65, 60], [65, 80], [25, 80]], { lbl: ["4", "2"], title: "Original", titleY: 108 }) + L([90, 70], [125, 70], COL.gray) + PG([[130, 70], [122, 65], [122, 75]], COL.gray, COL.gray) + shape([[150, 25], [270, 25], [270, 85], [150, 85]], { c: COL.green, f: FILL.green, lbl: ["12", "6"], title: "Bild", titleY: 108 })),
                steps: ["Dividiere eine Bildlänge durch die entsprechende Originallänge.", "<span class='math'>k = 12 : 4 = 3</span> (zur Kontrolle: 6 : 2 = 3)", "Das Bild ist eine Vergrößerung mit k = 3."]
            },
            exercises: [
                { q: "Begründe, welche der beiden Figuren (Figur 1 oder Figur 2) zum Original ähnlich ist.", svg: svgBox(320, 115, shape([[20, 80], [60, 80], [20, 40]], { c: COL.white, f: FILL.gray, right: [0], title: "Original", titleY: 104 }) + shape([[100, 80], [180, 80], [100, 40]], { c: COL.red, f: FILL.red, right: [0], title: "Figur 1", titleY: 104 }) + shape([[225, 80], [285, 80], [225, 20]], { c: COL.green, f: FILL.green, right: [0], title: "Figur 2", titleY: 104 })), a: "Figur 2. Beide Katheten wurden mit demselben Faktor (1,5) vergrößert, die Winkel bleiben gleich. Figur 1 wurde nur in die Breite gezogen (verzerrt)." },
                { q: "Die beiden Dreiecke sind ähnlich. Bestimme den Streckfaktor k.", svg: svgBox(310, 135, shape([[55, 110], [95, 110], [55, 80]], { lbl: ["4 cm", null, "3 cm"], right: [0] }) + shape([[160, 110], [260, 110], [160, 35]], { c: COL.green, f: FILL.green, lbl: ["10 cm", null, "7,5 cm"], right: [0] })), a: mt("k = 10 : 4 = 2,5") + " (Kontrolle: 7,5 : 3 = 2,5)" },
                { q: "Die Seite eines Originals misst 5 cm, im Bild misst sie 15 cm. Bestimme den Maßstab k (Bild : Original).", a: "k = 3" },
                { q: "Die Seite eines Originals misst 20 cm, im Bild misst sie 10 cm. Bestimme k und gib an, ob es sich um eine Vergrößerung oder Verkleinerung handelt.", a: "k = 0,5 → Verkleinerung (k < 1)" },
                { q: "Ein Rechteck mit den Seiten 3 cm und 2 cm wird mit k = 4 vergrößert. Berechne die neuen Seitenlängen.", a: "12 cm und 8 cm" }
            ]
        },
        "l3_2_B": {
            desc: "Fehlende Seiten ähnlicher Figuren berechnen und Ähnlichkeit prüfen.",
            example: {
                q: "Die beiden abgebildeten Dreiecke sind ähnlich zueinander. Berechne die Seitenlänge x.",
                svg: svgBox(240, 135, shape([[20, 115], [44, 115], [20, 83]], { lbl: ["3", null, "4"], right: [0] }) + shape([[110, 115], [182, 115], [110, 19]], { c: COL.green, f: FILL.green, lbl: ["9", null, "x = ?"], right: [0] })),
                steps: ["Ermittle den Maßstab aus den Grundseiten: <span class='math'>k = 9 : 3 = 3</span>", "Wende den Maßstab auf die senkrechte Seite an: <span class='math'>x = 4 · 3 = 12</span>"]
            },
            exercises: [
                { q: "Die abgebildeten Vierecke sind ähnlich zueinander. Berechne die Längen y und z.", svg: svgBox(300, 140, shape([[25, 120], [65, 120], [65, 80], [25, 100]], { lbl: ["4", "4", null, "2"] }) + shape([[150, 120], [250, 120], [250, 20], [150, 70]], { c: COL.green, f: FILL.green, lbl: ["10", "y = ?", null, "z = ?"] })), a: mt("k = 10 : 4 = 2,5") + "; " + mt("y = 4 · 2,5 = 10") + "; " + mt("z = 2 · 2,5 = 5") },
                { q: "Ein Originaldreieck hat die Seiten 5 cm, 12 cm und 13 cm. Ein ähnliches Bilddreieck hat als kürzeste Seite 15 cm. Berechne die beiden anderen Seiten des Bilddreiecks.", a: "k = 3 → 36 cm und 39 cm" },
                { q: "Die beiden Rechtecke sind ähnlich. Berechne die Höhe h des großen Rechtecks.", svg: svgBox(330, 130, shape([[20, 70], [80, 70], [80, 110], [20, 110]], { lbl: ["6 cm", "4 cm"] }) + shape([[120, 30], [270, 30], [270, 110], [120, 110]], { c: COL.green, f: FILL.green, lbl: ["18 cm", "h = ?"] })), a: mt("k = 18 : 6 = 3") + "; " + mt("h = 4 · 3 = 12") + " cm" },
                { q: "Die beiden Dreiecke sind ähnlich. Berechne die Seitenlängen x und y.", svg: svgBox(320, 130, shape([[20, 110], [116, 110], [83, 75.1]], { lbl: ["8", "4", "6"] }) + shape([[150, 110], [294, 110], [244.5, 57.7]], { c: COL.green, f: FILL.green, lbl: ["y = ?", "x = ?", "9"] })), a: mt("k = 9 : 6 = 1,5") + "; " + mt("x = 4 · 1,5 = 6") + "; " + mt("y = 8 · 1,5 = 12") },
                { q: "Prüfe, ob ein Rechteck mit den Seiten 4 cm und 6 cm zu einem Rechteck mit den Seiten 6 cm und 8 cm ähnlich ist.", a: "Nicht ähnlich: " + mt("6 : 4 = 1,5") + ", aber " + mt("8 : 6 ≈ 1,33") + ". Die Faktoren sind verschieden." }
            ]
        },
        "l3_2_C": {
            desc: "Ähnlichkeit: Maßstab in Sachsituationen anwenden, Flächen und Rückwärtsrechnen.",
            example: {
                q: "Berechne die Basis x des liegenden Dreiecks. Es ist zum stehenden Dreieck ähnlich.",
                svg: svgBox(300, 135, shape([[50, 115], [80, 115], [50, 75]], { lbl: ["3", null, "4"], right: [0] }) + shape([[150, 115], [270, 115], [150, 25]], { c: COL.green, f: FILL.green, lbl: ["x = ?", null, "9"], right: [0] })),
                steps: ["Achtung, die Dreiecke sind verdreht: Vergleiche die kurzen Katheten miteinander.", "Die kurze Kathete (3) entspricht der neuen kurzen Kathete (9). Der Maßstab beträgt <span class='math'>k = 9 : 3 = 3</span>.", "Die gesuchte Basis x ist die lange Kathete und entspricht der alten Höhe (4).", "<span class='math'>x = 4 · 3 = 12</span>"]
            },
            exercises: [
                { type: "context", q: "Auf einer Wanderkarte im Maßstab 1 : 25 000 ist ein Weg 6,4 cm lang. Berechne die wirkliche Länge in km.", a: mt("6,4 cm · 25 000 = 160 000 cm = 1,6 km") },
                { q: "Ein gezeichnetes Bild ist 15 cm breit, das Original ist 3 cm breit. Eine weitere Strecke misst im Bild 25 cm. Berechne die Länge dieser Strecke im Original.", a: "5 cm (k = 5; zurückrechnen: 25 : 5 = 5)" },
                { q: "Ein Rechteck hat einen Flächeninhalt von 50 cm². Es wird mit dem Maßstab k = 2 vergrößert. Berechne den neuen Flächeninhalt.", a: "200 cm². Der Flächeninhalt wächst mit k², hier also mit 2² = 4." },
                { type: "context", q: "Ein Modellauto im Maßstab 1 : 18 ist 25 cm lang. Wie lang ist das echte Auto (in m)?", a: mt("25 cm · 18 = 450 cm = 4,50 m") },
                { type: "context", q: "Ein Foto (10 cm breit, 15 cm hoch) soll unverzerrt auf ein 60 cm breites Poster vergrößert werden. Berechne die Höhe des Posters und gib an, mit welchem Faktor der Flächeninhalt wächst.", svg: svgBox(260, 150, shape([[20, 100], [40, 100], [40, 130], [20, 130]], { lbl: [null, "15", "10"] }) + shape([[110, 10], [190, 10], [190, 130], [110, 130]], { c: COL.green, f: FILL.green, lbl: [null, "h = ?", "60"] }) + NOTE(255, 145, "Angaben in cm")), a: mt("k = 60 : 10 = 6") + "; " + mt("h = 15 · 6 = 90") + " cm; Fläche wächst mit " + mt("k<sup>2</sup> = 36") }
            ]
        },

        "l3_3_A": {
            desc: "Achsen- und Punktsymmetrie erkennen.",
            example: {
                q: "Bestimme die Anzahl der Symmetrieachsen eines Quadrats.",
                svg: svgBox(220, 170, PG([[60, 35], [160, 35], [160, 135], [60, 135]], COL.blue, FILL.blue) + L([110, 15], [110, 155], COL.amber, DASH) + L([40, 85], [180, 85], COL.amber, DASH) + L([45, 20], [175, 150], COL.amber, DASH) + L([175, 20], [45, 150], COL.amber, DASH)),
                steps: ["Eine senkrechte und eine waagrechte Achse durch die Seitenmitten.", "Zwei Achsen entlang der Diagonalen.", "Gesamt: 4 Symmetrieachsen (gestrichelt)."]
            },
            exercises: [
                { q: "Bestimme die Anzahl der Symmetrieachsen des abgebildeten Rechtecks.", svg: svgBox(220, 130, shape([[30, 25], [190, 25], [190, 105], [30, 105]])), a: "2 (senkrecht und waagrecht durch die Seitenmitten; die Diagonalen sind keine Symmetrieachsen)" },
                { q: "Bestimme die Anzahl der Symmetrieachsen des abgebildeten gleichschenkligen Dreiecks.", svg: svgBox(220, 140, shape([[40, 120], [180, 120], [110, 20]], { c: COL.green, f: FILL.green, ticks: { 1: 1, 2: 1 } })), a: "1 (die Höhe auf die Basis)" },
                { q: "Bestimme die Anzahl der Symmetrieachsen des abgebildeten gleichseitigen Dreiecks.", svg: svgBox(220, 145, shape([[45, 130], [175, 130], [110, 17.4]], { c: COL.green, f: FILL.green, ticks: { 0: 1, 1: 1, 2: 1 } })), a: "3 (je eine durch jede Ecke und die gegenüberliegende Seitenmitte)" },
                { q: "Welche der abgebildeten Buchstaben sind achsensymmetrisch, welche punktsymmetrisch?", svg: svgBox(320, 90, ["A", "N", "H", "S"].map((b, i) => `<text x="${45 + i * 77}" y="70" font-size="60" font-family="sans-serif" font-weight="bold" fill="${COL.white}" stroke="none" text-anchor="middle">${b}</text>`).join("")), a: "Achsensymmetrisch: A (senkrechte Achse) und H (zwei Achsen). Punktsymmetrisch: N, S und H." },
                { q: "Bestimme die Anzahl der Symmetrieachsen eines Kreises.", svg: svgBox(160, 130, `<circle cx="80" cy="65" r="50" stroke="${COL.blue}" fill="${FILL.blue}"/>` + DOT([80, 65])), a: "Unendlich viele (jede Gerade durch den Mittelpunkt)." }
            ]
        },
        "l3_3_B": {
            desc: "Kongruenzsätze anwenden.",
            example: {
                q: "Weise nach, dass die beiden abgebildeten Dreiecke kongruent sind.",
                svg: svgBox(330, 135, shape([[55, 110], [135, 110], [55, 50]], { lbl: ["4 cm", "5 cm", "3 cm"] }) + shape([[190, 40], [270, 40], [270, 100]], { c: COL.green, f: FILL.green, lbl: ["4 cm", "3 cm", "5 cm"] })),
                steps: ["Vergleiche die Seiten: Beide Dreiecke haben die Seiten 3 cm, 4 cm und 5 cm.", "Nach dem Kongruenzsatz <strong>SSS</strong> (Seite-Seite-Seite) sind sie deckungsgleich – auch wenn sie verschieden liegen."]
            },
            exercises: [
                { q: "Sind die beiden Dreiecke kongruent? Begründe mit einem Kongruenzsatz.", svg: svgBox(320, 130, shape([[20, 110], [118, 110], [73.6, 65]], { lbl: ["7 cm", null, "5 cm"], ang: { 0: "40°" } }) + shape([[300, 110], [202, 110], [246.4, 65]], { c: COL.green, f: FILL.green, lbl: ["7 cm", null, "5 cm"], ang: { 0: "40°" } })), a: "Ja, nach SWS: zwei Seiten (5 cm und 7 cm) und der von ihnen <strong>eingeschlossene</strong> Winkel (40°) stimmen überein." },
                { type: "concept", q: "Nenne die vier Kongruenzsätze für Dreiecke.", a: "SSS, SWS, WSW (bzw. SWW) und SsW (zwei Seiten und der Winkel gegenüber der längeren Seite)" },
                { q: "Beide Dreiecke haben die Winkel 40°, 60° und 80°. Sind sie kongruent? Begründe.", svg: svgBox(320, 130, shape([[15, 115], [115, 115], [82.4, 58.5]], { ang: { 0: "40°", 1: "60°", 2: "80°" }, angR: 11 }) + shape([[160, 115], [310, 115], [261, 30.2]], { c: COL.green, f: FILL.green, ang: { 0: "40°", 1: "60°", 2: "80°" }, angR: 18 })), a: "Nein. Gleiche Winkel bedeuten nur gleiche Form – die Dreiecke sind <strong>ähnlich</strong>, aber verschieden groß. Es gibt keinen Kongruenzsatz „WWW“." },
                { q: "Dreieck 1 hat die Katheten 6 cm und 8 cm mit einem rechten Winkel dazwischen. Dreieck 2 hat die Seiten 6 cm, 8 cm und 10 cm. Ermittle, ob sie kongruent sind.", svg: svgBox(330, 130, shape([[55, 110], [135, 110], [55, 50]], { lbl: ["8 cm", null, "6 cm"], right: [0] }) + shape([[190, 100], [270, 100], [270, 40]], { c: COL.green, f: FILL.green, lbl: ["8 cm", "6 cm", "10 cm"] })), a: "Ja. Bei Dreieck 1 ist die dritte Seite nach Pythagoras " + mt("√(36 + 64) = 10") + " cm. Beide stimmen in allen drei Seiten überein (SSS)." },
                { q: "Ist ein Dreieck durch c = 6 cm, α = 50° und β = 70° eindeutig bestimmt? Nenne den passenden Kongruenzsatz.", a: "Ja, nach WSW: Die Seite c und die beiden anliegenden Winkel α und β sind gegeben." }
            ]
        },
        "l3_3_C": {
            desc: "Kongruenzabbildungen im Koordinatensystem durchführen.",
            example: {
                q: "Nenne die drei Abbildungen, die kongruente Figuren erzeugen. Spiegle anschließend den Punkt P(3|2) an der x-Achse.",
                svg: coordGrid({ points: [{ x: 3, y: 2, t: "P" }, { x: 3, y: -2, t: "P'", c: COL.green }], segs: [[[3, 2], [3, -2], COL.gray]] }),
                steps: ["Kongruenzabbildungen: <strong>Verschiebung, Drehung, Spiegelung</strong>.", "Bei der Spiegelung an der x-Achse bleibt der x-Wert gleich, der y-Wert wechselt das Vorzeichen.", "<span class='math'>P(3|2) ➔ P'(3|-2)</span>"]
            },
            exercises: [
                { q: "Spiegle das abgebildete Dreieck ABC an der <strong>y-Achse</strong>. Gib die Koordinaten von A', B' und C' an.", svg: KST_SVG, a: "A'(−1|1), B'(−4|1), C'(−4|3)" },
                { q: "Spiegle das abgebildete Dreieck ABC am <strong>Ursprung</strong> (Punktspiegelung). Gib die Koordinaten von A', B' und C' an.", svg: KST_SVG, a: "A'(−1|−1), B'(−4|−1), C'(−4|−3)" },
                { q: "Verschiebe das abgebildete Dreieck ABC um 5 Einheiten nach links und 2 Einheiten nach unten. Gib die Koordinaten der Bildpunkte an.", svg: KST_SVG, a: "A'(−4|−1), B'(−1|−1), C'(−1|1)" },
                { q: "Drehe das abgebildete Dreieck ABC um 90° <strong>gegen</strong> den Uhrzeigersinn um den Ursprung. Gib die Koordinaten der Bildpunkte an. <em>Tipp: (x|y) ➔ (−y|x)</em>", svg: KST_SVG, a: "A'(−1|1), B'(−1|4), C'(−3|4)" },
                { type: "concept", q: "Begründe, ob eine zentrische Streckung mit k = 2 eine kongruente Figur erzeugt. Was passiert mit den Seitenlängen und dem Flächeninhalt?", a: "Nein, sie erzeugt eine ähnliche Figur: Seitenlängen verdoppeln sich, der Flächeninhalt vervierfacht sich (k² = 4)." }
            ]
        },

        "l3_4_A": {
            desc: "1. Strahlensatz (Abschnitte auf den Strahlen).",
            example: {
                q: "Die Strecken AB und A'B' sind parallel. Berechne den Abschnitt d.",
                svg: strahlV({ za: "2", aa: "d = ?", zb: "4", bb: "6", k: 0.4 }),
                steps: ["1. Strahlensatz: Die Abschnitte auf dem einen Strahl stehen im gleichen Verhältnis wie die entsprechenden Abschnitte auf dem anderen Strahl.", "<span class='math'>2 / d = 4 / 6</span>", "Über Kreuz multiplizieren: <span class='math'>4d = 12 ➔ d = 3</span>"]
            },
            exercises: [
                { q: "AB ∥ A'B'. Berechne x.", svg: strahlV({ za: "3", aa: "6", zb: "5", bb: "x = ?", k: 1 / 3 }), a: mt("3 / 6 = 5 / x ➔ x = 10") },
                { q: "AB ∥ A'B'. Berechne x.", svg: strahlV({ za: "4", aa: "8", zb: "x = ?", bb: "10", k: 1 / 3 }), a: mt("4 / 8 = x / 10 ➔ x = 5") },
                { q: "AB ∥ A'B'. Berechne x.", svg: strahlV({ za: "2", aa: "x = ?", zb: "3", bb: "9", k: 0.25 }), a: mt("2 / x = 3 / 9 ➔ x = 6") },
                { q: "AB ∥ A'B'. Die Länge ZA' ist als Gesamtstrecke angegeben (Maßlinie). Berechne y.", svg: strahlV({ za: "4", za2: "12", zb: "5", zb2: "y = ?", k: 1 / 3 }), a: mt("4 / 12 = 5 / y ➔ y = 15") },
                { type: "concept", q: "Nenne die geometrische Voraussetzung, damit die Strahlensätze angewendet werden dürfen.", a: "Die beiden Geraden, die die Strahlen schneiden (hier AB und A'B'), müssen parallel zueinander sein." }
            ]
        },
        "l3_4_B": {
            desc: "2. Strahlensatz (Parallelen mit Strahlenabschnitten vergleichen).",
            example: {
                q: "AB ∥ A'B'. Berechne die Länge der Parallelen x.",
                svg: strahlV({ za: "5", za2: "15", ab: "2", ab2: "x = ?", k: 1 / 3 }),
                steps: ["2. Strahlensatz: Kurze Parallele / lange Parallele = Abschnitt <strong>ab Z</strong> bis zur kurzen / Abschnitt <strong>ab Z</strong> bis zur langen Parallele.", "<span class='math'>2 / x = 5 / 15</span>", "Über Kreuz multiplizieren: <span class='math'>5x = 30 ➔ x = 6</span>"]
            },
            exercises: [
                { q: "AB ∥ A'B'. Berechne die Parallele x.", svg: strahlV({ zb: "3", zb2: "9", ab: "x = ?", ab2: "12", k: 1 / 3 }), a: mt("x / 12 = 3 / 9 ➔ x = 4") },
                { q: "AB ∥ A'B'. Berechne die Parallele y. <em>Achtung: Welche Strecke brauchst du ab Z?</em>", svg: strahlV({ za: "4", aa: "6", ab: "2", ab2: "y = ?", k: 0.4 }), a: "Erst " + mt("ZA' = 4 + 6 = 10") + ", dann " + mt("2 / y = 4 / 10 ➔ y = 5") },
                { q: "AB ∥ A'B'. Berechne die Länge ZA'.", svg: strahlV({ za: "2", za2: "ZA' = ?", ab: "3", ab2: "9", k: 1 / 3 }), a: mt("ZA' / 2 = 9 / 3 ➔ ZA' = 6") },
                { type: "concept", q: "Eine Parallele ist doppelt so lang wie die andere. Was folgt daraus für die zugehörigen Strahlenabschnitte ab dem Zentrum Z?", a: "Sie sind ebenfalls doppelt so lang (gleiches Verhältnis 1 : 2)." },
                { type: "error", q: "Begründe den Fehler in der folgenden Formel für den 2. Strahlensatz: <em>„Teilstück AA' / Teilstück ZA = Kurze Parallele / Lange Parallele“</em>.", a: "Beim 2. Strahlensatz müssen immer die Strecken <strong>ab dem Zentrum Z</strong> verglichen werden (ZA und ZA'), nie Teilstücke wie AA'." }
            ]
        },
        "l3_4_C": {
            desc: "X-Figur und Anwendungsaufgaben zu den Strahlensätzen.",
            example: {
                q: "AB ∥ A'B'. Berechne die fehlende Parallele x in der abgebildeten X-Figur.",
                svg: strahlX({ za: "4", za2: "8", ab: "3", ab2: "x = ?", dL: 70, dR: 140 }),
                steps: ["Bleibe auf derselben durchgehenden Geraden: ZA = 4, ZA' = 8.", "<span class='math'>3 / x = 4 / 8</span>", "<span class='math'>4x = 24 ➔ x = 6</span>"]
            },
            exercises: [
                { q: "AB ∥ A'B'. Berechne x in der abgebildeten X-Figur.", svg: strahlX({ za: "5", za2: "x = ?", ab: "4", ab2: "8", dL: 70, dR: 140 }), a: mt("5 / x = 4 / 8 ➔ x = 10") },
                { type: "context", q: "Ein 2 m großer Mann steht so, dass das Ende seines Schattens genau mit dem Ende des Baumschattens zusammenfällt. Sein Schatten ist 3 m lang, der Baumschatten 15 m. Berechne die Höhe des Baumes.", svg: shadowFig({ shadow: 15, height: 10, person: 3, pH: 2, pl: "2 m", ps: "3 m", sl: "15 m", hl: "h = ?" }), a: mt("h / 2 = 15 / 3 ➔ h = 10") + " m" },
                { type: "context", q: "Eine Rampe wird von zwei senkrechten Pfeilern gestützt (siehe Skizze). Berechne die Höhe h des zweiten Pfeilers und die Länge der Rampe zwischen den beiden Pfeilern (Strecke AA').", svg: strahlV({ td: 0, zb: "3 m", bb: "5 m", ab: "1,2 m", ab2: "h = ?", k: 3 / 8, tu: 0.4 }), a: mt("h / 1,2 = 8 / 3 ➔ h = 3,2") + " m. Pythagoras: " + mt("ZA = √(3² + 1,2²) ≈ 3,23") + " m, " + mt("ZA' = √(8² + 3,2²) ≈ 8,62") + " m → " + mt("AA' ≈ 5,39") + " m" },
                { q: "In einer X-Figur sind die Parallelen 4 cm und 10 cm lang. Der Abstand vom Zentrum Z zum Endpunkt A der kurzen Parallele beträgt 6 cm. Berechne die Länge ZA'.", svg: strahlX({ za: "6", za2: "ZA' = ?", ab: "4", ab2: "10", dL: 60, dR: 150 }), a: mt("ZA' / 6 = 10 / 4 ➔ ZA' = 15") + " cm" },
                { type: "context", q: "Ein 1 m langer Stab wirft einen 2 m langen Schatten. Zur gleichen Zeit wirft ein Turm einen 40 m langen Schatten. Berechne die Höhe des Turms.", a: mt("h / 1 = 40 / 2 ➔ h = 20") + " m" }
            ]
        },

        "l3_5_A": {
            desc: "Trigonometrie: Seiten benennen und Sinus, Kosinus, Tangens berechnen.",
            example: {
                q: "Nenne die Seiten, die die Funktion Sinus für den Winkel α in Beziehung setzt.",
                svg: rightTri({ w: 10, h: 5.77, b: "Ankathete", v: "Gegenkathete", hyp: "Hypotenuse", angB: "α", maxW: 230, maxH: 130 }),
                steps: ["Die <strong>Gegenkathete</strong> liegt dem Winkel α gegenüber, die <strong>Ankathete</strong> liegt am Winkel α an, die <strong>Hypotenuse</strong> liegt dem rechten Winkel gegenüber.", "Die Formel lautet: <span class='math'>sin(α) = Gegenkathete / Hypotenuse</span>"]
            },
            exercises: [
                { type: "concept", q: "Gib für den Winkel α an, welche Seite (p, q oder r) die Gegenkathete, die Ankathete und die Hypotenuse ist.", svg: rightTri({ w: 4, h: 3, b: "p", v: "q", hyp: "r", angB: "α" }), a: "Gegenkathete: q, Ankathete: p, Hypotenuse: r" },
                { type: "concept", q: "Gib nun für den Winkel β an, welche Seite die Gegenkathete und welche die Ankathete ist.", svg: rightTri({ w: 4, h: 3, b: "p", v: "q", hyp: "r", angA: "β" }), a: "Gegenkathete: p, Ankathete: q (die Hypotenuse bleibt r)" },
                { q: "Berechne tan(α) und bestimme α mit dem Taschenrechner.", svg: rightTri({ w: 4, h: 3, b: "4 cm", v: "3 cm", angB: "α" }), a: mt("tan(α) = 3 / 4 = 0,75 ➔ α ≈ 36,9°") },
                { q: "Berechne sin(α) und bestimme α mit dem Taschenrechner.", svg: rightTri({ w: 8.66, h: 5, v: "5 cm", hyp: "10 cm", angB: "α" }), a: mt("sin(α) = 5 / 10 = 0,5 ➔ α = 30°") },
                { q: "Berechne cos(α) und bestimme α mit dem Taschenrechner.", svg: rightTri({ w: 6, h: 8, b: "6 cm", hyp: "10 cm", angB: "α" }), a: mt("cos(α) = 6 / 10 = 0,6 ➔ α ≈ 53,1°") }
            ]
        },
        "l3_5_B": {
            desc: "Trigonometrie: fehlende Seiten und Winkel berechnen.",
            example: {
                q: "Berechne die Gegenkathete G im abgebildeten Dreieck.",
                svg: rightTri({ w: 8.66, h: 5, v: "G = ?", hyp: "Hyp = 10 cm", angB: "30°", col: COL.green, fill: FILL.green }),
                steps: ["Gegeben: Winkel und Hypotenuse; gesucht: Gegenkathete → Sinus.", "Stelle die Formel auf: <span class='math'>sin(30°) = G / 10</span>", "Umstellen: <span class='math'>G = 10 · sin(30°)</span>", "<span class='math'>G = 5</span> cm"]
            },
            exercises: [
                { q: "Berechne die Ankathete A im abgebildeten Dreieck.", svg: rightTri({ w: 10, h: 10, b: "A = ?", v: "10 cm", angB: "45°" }), a: mt("tan(45°) = 10 / A ➔ A = 10 / tan(45°) = 10") + " cm" },
                { q: "Berechne die Länge x.", svg: rightTri({ w: 9.83, h: 6.88, b: "x = ?", hyp: "12 cm", angB: "35°" }), a: mt("x = 12 · cos(35°) ≈ 9,83") + " cm" },
                { q: "Berechne die Länge y.", svg: rightTri({ w: 7, h: 8.96, b: "7 cm", v: "y = ?", angB: "52°", flip: true }), a: mt("y = 7 · tan(52°) ≈ 8,96") + " cm" },
                { q: "Berechne den Winkel α.", svg: rightTri({ w: 8, h: 6, b: "8 cm", hyp: "10 cm", angB: "α = ?" }), a: mt("cos(α) = 8 / 10 ➔ α ≈ 36,9°") },
                { q: "Berechne den Winkel α und die Hypotenuse c.", svg: rightTri({ w: 12, h: 5, b: "12 cm", v: "5 cm", angB: "α = ?", hyp: "c = ?" }), a: mt("tan(α) = 5 / 12 ➔ α ≈ 22,6°") + "; " + mt("c = √(25 + 144) = 13") + " cm" }
            ]
        },
        "l3_5_C": {
            desc: "Trigonometrie in Anwendungen und Sachsituationen.",
            example: {
                q: "Eine Rampe ist 100 m lang und überwindet eine Höhe von 10 m. Berechne den Neigungswinkel α.",
                svg: rightTri({ w: 3, h: 1, hyp: "Rampe 100 m", v: "10 m", angB: "α = ?", note: NMS, flip: true, maxW: 220 }),
                steps: ["Höhe = Gegenkathete, Rampe = Hypotenuse → Sinus.", "<span class='math'>sin(α) = 10 / 100 = 0,1</span>", "Umkehrfunktion anwenden: <span class='math'>α = sin<sup>-1</sup>(0,1) ≈ 5,7°</span>"]
            },
            exercises: [
                { type: "context", q: "Ein Verkehrsschild zeigt eine Steigung von 10 % an: Auf 100 m waagrechter Strecke steigt die Straße um 10 m. Berechne den Steigungswinkel α.", svg: rightTri({ w: 4, h: 1, b: "100 m", v: "10 m", angB: "α = ?", note: NMS, maxW: 220 }), a: mt("tan(α) = 10 / 100 = 0,1 ➔ α ≈ 5,7°") },
                { type: "context", q: "Eine 5 m lange Leiter lehnt unter einem Winkel von 70° zum Boden an einer Wand. Berechne die Höhe h an der Wand und den Abstand a des Leiterfußes zur Wand.", svg: ladderFig({ w: 1.71, h: 4.70, l: "5 m", ang: "70°", hh: "h = ?", g: "a = ?" }), a: mt("h = 5 · sin(70°) ≈ 4,70") + " m; " + mt("a = 5 · cos(70°) ≈ 1,71") + " m" },
                { type: "context", q: "Ein Baum wirft einen 15 m langen Schatten. Die Sonnenstrahlen treffen unter einem Winkel von 38° auf den Boden. Berechne die Höhe des Baumes.", svg: shadowFig({ shadow: 15, height: 11.72, sl: "15 m", hl: "h = ?", ang: "38°" }), a: mt("h = 15 · tan(38°) ≈ 11,72") + " m" },
                { type: "context", q: "Ein Drachen fliegt an einer 50 m langen, straff gespannten Schnur. Die Schnur bildet mit der Waagrechten einen Winkel von 30°. Die Hand hält die Schnur 1,20 m über dem Boden. Berechne die Flughöhe des Drachens über dem Boden.", svg: KITE_SVG, a: mt("h = 50 · sin(30°) = 25") + " m; Flughöhe: " + mt("25 + 1,20 = 26,20") + " m" },
                { q: "Eine quadratische Pyramide hat die Grundkante a = 10 m und die Höhe h = 10 m. Berechne den Neigungswinkel α der Seitenfläche gegenüber der Grundfläche.", svg: pyramid({ a: "a = 10 m", hl: "h = 10 m", half: "5 m", ha: "hₐ", ang: "α" }), a: "Im roten Stützdreieck: " + mt("tan(α) = 10 / 5 = 2 ➔ α ≈ 63,4°") }
            ]
        },

        "l3_6_A": {
            desc: "Volumen von Prismen und Zylindern.",
            example: {
                q: "Berechne das Volumen des abgebildeten Zylinders.",
                svg: cylinder({ r: "r = 5 cm", hl: "h = 10 cm" }),
                steps: ["Formel ansetzen: <span class='math'>V = Grundfläche · Höhe</span>", "Die Grundfläche ist ein Kreis: <span class='math'>G = π · r<sup>2</sup></span>", "<span class='math'>V = π · 5<sup>2</sup> · 10</span>", "<span class='math'>V = 250π ≈ 785,4</span> cm³"]
            },
            exercises: [
                { q: "Berechne das Volumen des abgebildeten Würfels.", svg: cuboid({ w: 90, h: 90, dx: 40, dy: 28, a: "a = 4 cm" }), a: mt("V = 4<sup>3</sup> = 64") + " cm³" },
                { q: "Berechne das Volumen des abgebildeten Quaders.", svg: cuboid({ w: 130, h: 75, dx: 50, dy: 32, a: "a = 5 cm", b: "b = 4 cm", c: "c = 3 cm" }), a: mt("V = 5 · 4 · 3 = 60") + " cm³" },
                { q: "Berechne das Volumen des abgebildeten Zylinders.", svg: cylinder({ rx: 40, ry: 11, h: 100, r: "r = 2 cm", hl: "h = 5 cm" }), a: mt("V = π · 2<sup>2</sup> · 5 = 20π ≈ 62,8") + " cm³" },
                { q: "Berechne das Volumen des abgebildeten Zylinders. <em>Achtung: Der Durchmesser ist gegeben!</em>", svg: cylinder({ d: "d = 6 cm", hl: "h = 10 cm" }), a: "r = 3 cm; " + mt("V = π · 3<sup>2</sup> · 10 = 90π ≈ 282,7") + " cm³" },
                { q: "Berechne das Volumen des abgebildeten Dreiecksprismas.", svg: prism({ g: "g = 6 cm", hg: "h = 5 cm", k: "k = 10 cm" }), a: "Grundfläche: " + mt("G = 6 · 5 / 2 = 15") + " cm²; " + mt("V = 15 · 10 = 150") + " cm³" }
            ]
        },
        "l3_6_B": {
            desc: "Pyramide, Kegel, Oberfläche & Rückwärtsrechnen.",
            example: {
                q: "Berechne das Gesamtvolumen des abgebildeten Silos (Zylinder + Kegel). Alle Maße in m.",
                svg: `<svg viewBox="0 0 200 150" width="100%" style="max-height:190px" stroke="currentColor" fill="none" stroke-width="2"><line x1="20" y1="20" x2="40" y2="20" stroke="#94a3b8" /><line x1="20" y1="140" x2="40" y2="140" stroke="#94a3b8" /><line x1="30" y1="20" x2="30" y2="140" stroke="#94a3b8" />${T(22, 85, "12", COL.gray)}<line x1="160" y1="70" x2="180" y2="70" stroke="#10b981" /><line x1="160" y1="140" x2="180" y2="140" stroke="#10b981" /><line x1="170" y1="70" x2="170" y2="140" stroke="#10b981" />${T(182, 110, "8", COL.green, "start")}<polygon points="100,20 140,70 60,70" stroke="${COL.blue}" fill="rgba(244, 63, 94, 0.1)" /><path d="M 60 70 L 60 140 A 40 10 0 0 0 140 140 L 140 70" stroke="${COL.blue}" fill="${FILL.blue}"/><ellipse cx="100" cy="70" rx="40" ry="10" stroke="${COL.blue}" stroke-dasharray="3,3" fill="none" /><line x1="100" y1="70" x2="140" y2="70" stroke="#f43f5e" />${T(120, 64, "r=3", COL.red)}</svg>`,
                steps: ["Bestimme die Kegelhöhe: <span class='math'>12 - 8 = 4</span>", "Volumen Zylinder: <span class='math'>π·3<sup>2</sup>·8 = 72π</span>", "Volumen Kegel: <span class='math'>1/3·π·3<sup>2</sup>·4 = 12π</span>", "Addiere die Volumina: <span class='math'>84π ≈ 263,9</span> m³"]
            },
            exercises: [
                { q: "Der abgebildete Würfel hat ein Volumen von 343 cm³. Berechne die Kantenlänge a.", svg: cuboid({ w: 90, h: 90, dx: 40, dy: 28, a: "a = ?", label: "V = 343 cm³" }), a: mt("a = ∛343 = 7") + " cm" },
                { q: "Der abgebildete Zylinder hat ein Volumen von 314 cm³. Berechne den Radius r.", svg: cylinder({ rx: 70, ry: 16, h: 60, r: "r = ?", hl: "h = 4 cm", label: "V = 314 cm³" }), a: mt("r<sup>2</sup> = 314 / (π · 4) ≈ 25 ➔ r ≈ 5") + " cm" },
                { q: "Berechne die Oberfläche des abgebildeten Quaders.", svg: cuboid({ w: 130, h: 75, dx: 50, dy: 32, a: "a = 5 cm", b: "b = 4 cm", c: "c = 3 cm" }), a: mt("O = 2 · (5·4 + 5·3 + 4·3) = 2 · 47 = 94") + " cm²" },
                { q: "Berechne das Volumen der abgebildeten quadratischen Pyramide.", svg: pyramid({ w: 130, h: 110, a: "a = 6 cm", hl: "h = 5 cm" }), a: mt("V = 1/3 · 6<sup>2</sup> · 5 = 60") + " cm³" },
                { q: "Berechne das Volumen des abgebildeten Kegels. Wie viel passt in einen Zylinder mit gleichem Radius und gleicher Höhe?", svg: cone({ r: "r = 3 cm", hl: "h = 4 cm", rx: 60, h: 85, by: 115 }), a: mt("V<sub>Kegel</sub> = 1/3 · π · 3<sup>2</sup> · 4 = 12π ≈ 37,7") + " cm³; der Zylinder fasst das Dreifache: " + mt("36π ≈ 113,1") + " cm³" }
            ]
        },
        "l3_6_C": {
            desc: "Körper, Pythagoras und Trigonometrie kombiniert.",
            example: {
                q: "Berechne das Volumen der abgebildeten quadratischen Pyramide.",
                svg: pyramid({ a: "a = 6 cm", hl: "h = ?", half: "3", ha: "hₐ = 5 cm" }),
                steps: ["Wende den Pythagoras im Inneren an (Dreieck aus h, halber Grundkante und hₐ): <span class='math'>h<sup>2</sup> + 3<sup>2</sup> = 5<sup>2</sup></span>", "<span class='math'>h<sup>2</sup> = 25 - 9 = 16 ➔ h = 4</span>", "Setze in die Volumenformel ein: <span class='math'>V = 1/3 · 36 · 4 = 48</span> cm³"]
            },
            exercises: [
                { q: "Berechne die Körperhöhe h und das Volumen des abgebildeten Kegels.", svg: cone({ r: "r = 4 cm", hl: "h = ?", ang: "60°" }), a: mt("h = 4 · tan(60°) ≈ 6,93") + " cm; " + mt("V = 1/3 · π · 4<sup>2</sup> · 6,93 ≈ 116,1") + " cm³" },
                { q: "Ein Kegel hat ein Volumen von 314 cm³ und einen Radius von 5 cm. Berechne zunächst die Körperhöhe h und anschließend die Länge der Mantellinie s.", svg: cone({ r: "r = 5 cm", hl: "h", s: "s = ?", label: "V = 314 cm³" }), a: mt("h = 3V / (π r<sup>2</sup>) = 942 / (25π) ≈ 12") + " cm; " + mt("s = √(12² + 5²) = 13") + " cm" },
                { q: "Auf einen Zylinder (r = 3 cm, h = 5 cm) ist eine Halbkugel aufgesetzt. Berechne die gesamte Oberfläche des Körpers.", svg: cylinder({ ty: 75, rx: 55, ry: 13, h: 80, hl: "h = 5 cm", r: "r = 3 cm", inner: c => `<path d="M ${c.cx - c.rx} ${c.ty} A ${c.rx} ${c.rx} 0 0 1 ${c.cx + c.rx} ${c.ty}" stroke="${COL.blue}" fill="${FILL.green}"/>` }), a: "Boden " + mt("9π") + " + Mantel " + mt("2π·3·5 = 30π") + " + Halbkugel " + mt("2π·3<sup>2</sup> = 18π") + " = " + mt("57π ≈ 179,1") + " cm²" },
                { q: "Durch einen Quader (4 cm × 4 cm × 10 cm) verläuft der Länge nach ein zylindrisches Loch mit dem Radius 1 cm. Berechne das verbleibende Volumen.", svg: cuboid({ w: 62, h: 150, dx: 34, dy: 24, a: "4 cm", b: "4 cm", c: "10 cm", inner: q => { const t = mid(q.FTL, q.BTR), b = mid(q.FBL, q.BBR); return `<ellipse cx="${t[0]}" cy="${t[1]}" rx="13" ry="6" stroke="${COL.red}" fill="rgba(15,23,42,0.8)"/>` + L([t[0] - 13, t[1]], [b[0] - 13, b[1]], COL.red, DASH) + L([t[0] + 13, t[1]], [b[0] + 13, b[1]], COL.red, DASH) + T(t[0] + 50, t[1] - 22, "r = 1 cm", COL.red, "start") + L([t[0] + 6, t[1] - 3], [t[0] + 48, t[1] - 20], COL.red, 'stroke-width="1"'); } }), a: mt("V = 4·4·10 - π·1<sup>2</sup>·10 = 160 - 10π ≈ 128,6") + " cm³" },
                { q: "Eine quadratische Pyramide hat die Grundkante a = 10 cm und die Seitenkante s = 13 cm. Berechne die Körperhöhe h und das Volumen.", svg: pyramid({ a: "a = 10 cm", s: "s = 13 cm", hl: "h = ?", diag: "d" }), a: "Diagonale " + mt("d = √200 ≈ 14,14") + ", halbe Diagonale " + mt("√50") + "; " + mt("h = √(169 - 50) = √119 ≈ 10,91") + " cm; " + mt("V = 1/3 · 100 · 10,91 ≈ 363,6") + " cm³" }
            ]
        }
    });
