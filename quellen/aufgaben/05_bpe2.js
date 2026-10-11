
    /* === BPE 2: GLEICHUNGEN === */
    const SET_DIAGRAM = svgBox(330, 175,
        `<rect x="8" y="8" width="314" height="159" rx="16" stroke="${COL.violet}" fill="${FILL.violet}"/>` +
        `<rect x="22" y="34" width="206" height="122" rx="14" stroke="${COL.blue}" fill="${FILL.blue}"/>` +
        `<rect x="36" y="60" width="138" height="86" rx="12" stroke="${COL.green}" fill="${FILL.green}"/>` +
        `<rect x="50" y="86" width="64" height="50" rx="10" stroke="${COL.amber}" fill="${FILL.amber}"/>` +
        T(22, 27, "ℝ", COL.violet, "middle", 16) + T(36, 53, "ℚ", COL.blue, "middle", 16) + T(50, 79, "ℤ", COL.green, "middle", 16) + T(63, 104, "ℕ", COL.amber, "middle", 16) +
        T(275, 60, "irrationale", COL.violet, "middle", 11) + T(275, 74, "Zahlen", COL.violet, "middle", 11));

    Object.assign(db.tasks, {
        "l2_1_A": { desc: "Zahlen den Mengen ℕ, ℤ und ℚ zuordnen.", example: { q: "Bestimme die engste Zahlenmenge, zu der −3 gehört.", steps: ["−3 ist keine natürliche Zahl (negativ), aber eine ganze Zahl ohne Komma.", "Die engste Menge ist <strong>ℤ</strong> (ganze Zahlen). Natürlich gehört −3 auch zu ℚ und ℝ."] }, exercises: [
            { q: "Gib alle Mengen (ℕ, ℤ, ℚ) an, zu denen die Zahl <span class='math'>7</span> gehört.", a: "ℕ, ℤ und ℚ" },
            { q: "Gib alle Mengen (ℕ, ℤ, ℚ) an, zu denen die Zahl <span class='math'>-4</span> gehört.", a: "ℤ und ℚ" },
            { q: "Gib alle Mengen (ℕ, ℤ, ℚ) an, zu denen die Zahl <span class='math'>3/4</span> gehört.", a: "nur ℚ" },
            { q: "Gib alle Mengen (ℕ, ℤ, ℚ) an, zu denen die Zahl <span class='math'>0,25</span> gehört.", a: "nur ℚ (0,25 = 1/4)" },
            { q: "Gib alle Mengen (ℕ, ℤ, ℚ) an, zu denen die Zahl <span class='math'>-12/3</span> gehört. <em>Tipp: Erst kürzen!</em>", a: "−12/3 = −4 → ℤ und ℚ" }
        ] },
        "l2_1_B": { desc: "Rationale und irrationale Zahlen unterscheiden.", example: { q: "Begründe, ob die Zahl √2 rational oder irrational ist.", steps: ["Die Wurzel aus 2 lässt sich nicht als Bruch schreiben.", "Als Dezimalzahl ist sie unendlich lang und <strong>nicht</strong> periodisch: 1,41421356…", "√2 ist also irrational."] }, exercises: [
            { q: "Entscheide und begründe: Ist <span class='math'>√9</span> rational oder irrational?", a: "Rational, denn √9 = 3." },
            { q: "Entscheide und begründe: Ist <span class='math'>√10</span> rational oder irrational?", a: "Irrational, denn 10 ist keine Quadratzahl; die Dezimalzahl 3,1622… ist unendlich und nicht periodisch." },
            { q: "Entscheide und begründe: Ist die Kreiszahl <span class='math'>π</span> rational oder irrational?", a: "Irrational (π = 3,14159… unendlich, nicht periodisch)." },
            { q: "Entscheide und begründe: Ist <span class='math'>0,123123123…</span> rational oder irrational?", a: "Rational, denn die Dezimalzahl ist periodisch (Periode 123)." },
            { q: "Gib eine irrationale Zahl an, die zwischen 3 und 4 liegt.", a: "z. B. √10 ≈ 3,16 oder π ≈ 3,14 (jede Wurzel √n mit 9 < n < 16)" }
        ] },
        "l2_1_C": { desc: "Die reellen Zahlen ℝ: Zusammenhänge begründen, vergleichen und umwandeln.", example: { q: "Ordne die Zahlen <span class='math'>5</span>, <span class='math'>-2</span>, <span class='math'>0,5</span> und <span class='math'>√2</span> in das Mengendiagramm ein.", svg: SET_DIAGRAM, steps: ["5 ist eine natürliche Zahl → innerstes Feld ℕ.", "−2 ist ganz, aber negativ → Feld ℤ (außerhalb von ℕ).", "0,5 = 1/2 ist ein Bruch → Feld ℚ (außerhalb von ℤ).", "√2 ist irrational → Feld ℝ außerhalb von ℚ."] }, exercises: [
            { type: "tf", q: "Wahr oder falsch? <em>„Jede ganze Zahl ist auch eine rationale Zahl.“</em> Begründe.", a: "Wahr. Jede ganze Zahl lässt sich als Bruch schreiben, z. B. −3 = −3/1." },
            { type: "tf", q: "Wahr oder falsch? <em>„Die Summe zweier irrationaler Zahlen ist immer irrational.“</em> Begründe mit einem Beispiel.", a: "Falsch. Gegenbeispiel: √2 + (−√2) = 0, und 0 ist rational." },
            { q: "Ist <span class='math'>√(-4)</span> eine reelle Zahl? Begründe.", a: "Nein. Jede reelle Zahl ergibt quadriert eine Zahl ≥ 0, also gibt es keine reelle Zahl mit x² = −4." },
            { q: "Schreibe die periodische Zahl <span class='math'>0,444…</span> als Bruch. <em>Tipp: 0,111… = 1/9</em>", a: mt("0,444… = 4 · 1/9 = 4/9") },
            { q: "Ordne der Größe nach (kleinste zuerst): <span class='math'>√5</span>; <span class='math'>2,2</span>; <span class='math'>9/4</span>; <span class='math'>π - 1</span>", a: "π − 1 ≈ 2,14 < 2,2 < √5 ≈ 2,236 < 9/4 = 2,25" }
        ] },

        "l2_2_A": { desc: "Einfache lineare Gleichungen lösen.", example: { q: "Löse die Gleichung nach x auf: <span class='math'>x + 7 = 12</span>", steps: ["Subtrahiere 7 auf beiden Seiten.", "<span class='math'>x = 5</span>"] }, exercises: [ { q: "Löse nach x auf: <span class='math'>4x = 24</span>", a: "<span class='math'>x = 6</span>" }, { q: "Löse nach x auf: <span class='math'>x - 3 = 10</span>", a: "<span class='math'>x = 13</span>" }, { q: "Löse nach x auf: <span class='math'>2x + 1 = 9</span>", a: "<span class='math'>x = 4</span>" }, { q: "Löse nach x auf: <span class='math'>-x = 5</span>", a: "<span class='math'>x = -5</span>" }, { q: "Löse nach x auf: <span class='math'>x / 2 = 4</span>", a: "<span class='math'>x = 8</span>" } ] },
        "l2_2_B": { desc: "Lineare Gleichungen mit Klammern und Variablen auf beiden Seiten.", example: { q: "Löse die Gleichung nach x auf: <span class='math'>5x - 2 = 2x + 10</span>", steps: ["Subtrahiere 2x: <span class='math'>3x - 2 = 10</span>", "Addiere 2: <span class='math'>3x = 12</span>", "Dividiere durch 3: <span class='math'>x = 4</span>"] }, exercises: [ { q: "Löse nach x auf: <span class='math'>2(x + 3) = 14</span>", a: "<span class='math'>x = 4</span>" }, { q: "Löse nach x auf: <span class='math'>6x = 2x + 20</span>", a: "<span class='math'>x = 5</span>" }, { q: "Löse nach x auf: <span class='math'>4(x - 1) = 2x + 6</span>", a: "<span class='math'>x = 5</span>" }, { q: "Löse nach x auf: <span class='math'>10 - 2x = x - 5</span>", a: "<span class='math'>x = 5</span>" }, { q: "Löse nach x auf: <span class='math'>3x + 4 = x - 2</span>", a: "<span class='math'>x = -3</span>" } ] },
        "l2_2_C": { desc: "Komplexe lineare Gleichungen, Sonderfälle und Textgleichungen.", example: { q: "Löse die Gleichung: <span class='math'>2x = 2x + 5</span>", steps: ["Subtrahiere 2x auf beiden Seiten: <span class='math'>0 = 5</span>", "Diese Aussage ist falsch. Die Gleichung besitzt keine Lösung: L = { }."] }, exercises: [
            { q: "Löse nach x auf: <span class='math'>3(x - 1) = 3x - 3</span>", a: "<span class='math'>0 = 0</span> (immer wahr) → unendlich viele Lösungen, L = ℝ" },
            { q: "Löse nach x auf: <span class='math'>(x + 2)(x - 2) = x<sup>2</sup> - 2x</span>", a: "<span class='math'>x<sup>2</sup> - 4 = x<sup>2</sup> - 2x ➔ -4 = -2x ➔ x = 2</span>" },
            { q: "Löse nach x auf: <span class='math'>x/2 + x/4 = 3</span>", a: "Mit 4 multiplizieren: <span class='math'>2x + x = 12 ➔ x = 4</span>" },
            { type: "context", q: "Denke dir eine Zahl. Verdopple sie und addiere 7. Du erhältst dasselbe, wie wenn du die Zahl verfünffachst und 8 subtrahierst. Stelle eine Gleichung auf und bestimme die Zahl.", a: mt("2x + 7 = 5x - 8 ➔ 15 = 3x ➔ x = 5") },
            { q: "Löse nach x auf: <span class='math'>4 - x = -(x - 4)</span>", a: "<span class='math'>4 - x = -x + 4</span> → immer wahr → unendlich viele Lösungen, L = ℝ" }
        ] },

        "l2_3_A": { desc: "Einfache Formeln umstellen.", example: { q: "Stelle die Formel <span class='math'>A = a · b</span> nach <span class='math'>b</span> um.", steps: ["Dividiere beide Seiten durch a: <span class='math'>b = A / a</span>"] }, exercises: [ { q: "Stelle um nach I: <span class='math'>U = R · I</span>", a: "<span class='math'>I = U / R</span>" }, { q: "Stelle um nach s: <span class='math'>v = s / t</span>", a: "<span class='math'>s = v · t</span>" }, { q: "Stelle um nach m: <span class='math'>y = m · x</span>", a: "<span class='math'>m = y / x</span>" }, { q: "Stelle um nach x: <span class='math'>K = x + y</span>", a: "<span class='math'>x = K - y</span>" }, { q: "Stelle um nach b: <span class='math'>a = b - c</span>", a: "<span class='math'>b = a + c</span>" } ] },
        "l2_3_B": { desc: "Formeln mit Brüchen und Summen umstellen (zwei Schritte).", example: { q: "Stelle die Formel für den Flächeninhalt eines Trapezes <span class='math'>A = (a + c)/2 · h</span> nach <span class='math'>h</span> um.", steps: ["Multipliziere mit 2: <span class='math'>2A = (a + c) · h</span>", "Dividiere durch (a + c): <span class='math'>h = 2A / (a + c)</span>"] }, exercises: [ { q: "Stelle um nach a: <span class='math'>U = 2a + 2b</span>", a: "<span class='math'>a = (U - 2b) / 2</span>" }, { q: "Stelle um nach r: <span class='math'>U = 2πr</span>", a: "<span class='math'>r = U / (2π)</span>" }, { q: "Stelle um nach h: <span class='math'>A = g·h/2</span>", a: "<span class='math'>h = 2A / g</span>" }, { q: "Stelle um nach m: <span class='math'>y = m·x + c</span>", a: "<span class='math'>m = (y - c) / x</span>" }, { q: "Stelle um nach c: <span class='math'>V = a·b·c</span>", a: "<span class='math'>c = V / (a·b)</span>" } ] },
        "l2_3_C": { desc: "Formeln mit Quadraten und Wurzeln umstellen und anwenden.", example: { q: "Stelle die Formel <span class='math'>a<sup>2</sup> + b<sup>2</sup> = c<sup>2</sup></span> nach <span class='math'>a</span> um.", steps: ["Subtrahiere b²: <span class='math'>a<sup>2</sup> = c<sup>2</sup> - b<sup>2</sup></span>", "Ziehe die Wurzel: <span class='math'>a = √(c<sup>2</sup> - b<sup>2</sup>)</span>"] }, exercises: [
            { q: "Stelle um nach r: <span class='math'>A = πr<sup>2</sup></span>", a: "<span class='math'>r = √(A/π)</span>" },
            { q: "Stelle um nach v: <span class='math'>E = 0,5mv<sup>2</sup></span>", a: "<span class='math'>v = √(2E/m)</span>" },
            { q: "Stelle um nach r: <span class='math'>O = 4πr<sup>2</sup></span>", a: "<span class='math'>r = √(O/(4π))</span>" },
            { type: "context", q: "Die Umrechnung von Grad Celsius in Grad Fahrenheit lautet <span class='math'>F = 1,8 · C + 32</span>. Stelle nach C um und berechne, wie viel °C 86 °F sind.", a: mt("C = (F - 32) / 1,8") + "; " + mt("C = (86 - 32) / 1,8 = 30") + " °C" },
            { q: "Stelle um nach l: <span class='math'>T = 2π√(l/g)</span>", a: "<span class='math'>l = g · (T/(2π))<sup>2</sup></span>" }
        ] },

        "l2_4_A": {
            desc: "Einfache Bruchgleichungen (Variable im Nenner).",
            example: { q: "Löse die Bruchgleichung nach x auf: <span class='math'>10 / x = 2</span>", steps: ["Achtung: x darf nicht 0 sein (D = ℝ \\ {0}).", "Multipliziere mit x: <span class='math'>10 = 2x</span>", "Dividiere durch 2: <span class='math'>x = 5</span>"] },
            exercises: [
                { q: "Löse nach x auf: <span class='math'>24 / x = 6</span>", a: "<span class='math'>x = 4</span>" },
                { q: "Löse nach x auf: <span class='math'>5 / x = 1</span>", a: "<span class='math'>x = 5</span>" },
                { q: "Löse nach x auf: <span class='math'>12 / x = -3</span>", a: "<span class='math'>x = -4</span>" },
                { q: "Löse nach x auf: <span class='math'>-8 / x = 2</span>", a: "<span class='math'>x = -4</span>" },
                { q: "Löse nach x auf: <span class='math'>1 / x = 0,5</span>", a: "<span class='math'>x = 2</span>" }
            ]
        },
        "l2_4_B": {
            desc: "Bruchgleichungen mit Definitionsmenge und Kreuzmultiplikation lösen.",
            example: { q: "Gib die Definitionsmenge an und löse: <span class='math'>4 / x = 2 / 3</span>", steps: ["Der Nenner darf nicht 0 werden: <span class='math'>D = ℝ \\ {0}</span>", "Multipliziere über Kreuz: <span class='math'>4 · 3 = 2 · x</span>", "<span class='math'>12 = 2x ➔ x = 6</span> (liegt in D)"] },
            exercises: [
                { q: "Gib D an und löse: <span class='math'>6 / x = 3 / 2</span>", a: "D = ℝ \\ {0}; <span class='math'>x = 4</span>" },
                { q: "Gib D an und löse: <span class='math'>5 / (x - 1) = 5 / 2</span>", a: "D = ℝ \\ {1}; <span class='math'>x = 3</span>" },
                { q: "Löse nach x auf: <span class='math'>x / 5 = 4 / 10</span>", a: "<span class='math'>x = 2</span>" },
                { q: "Gib D an und löse: <span class='math'>2 / x = 3 / (x + 2)</span>", a: "D = ℝ \\ {−2; 0}; <span class='math'>2x + 4 = 3x ➔ x = 4</span>" },
                { q: "Gib D an und löse: <span class='math'>10 / x = 5 / 3</span>", a: "D = ℝ \\ {0}; <span class='math'>x = 6</span>" }
            ]
        },
        "l2_4_C": {
            desc: "Komplexere Bruchgleichungen lösen und die Lösung mit der Definitionsmenge prüfen.",
            example: { q: "Löse die Bruchgleichung nach x auf: <span class='math'>4 / (x - 2) - 2 / (x - 2) = 1</span>", steps: ["Definitionsmenge: <span class='math'>D = ℝ \\ {2}</span>", "Subtrahiere die Zähler (Nenner sind gleich): <span class='math'>2 / (x - 2) = 1</span>", "Multipliziere mit dem Nenner: <span class='math'>2 = x - 2</span>", "Löse auf: <span class='math'>x = 4</span> (liegt in D)"] },
            exercises: [
                { q: "Löse nach x auf: <span class='math'>5 / (2x - 1) = 3 / (x + 1)</span>", a: "Über Kreuz: <span class='math'>5x + 5 = 6x - 3 ➔ x = 8</span>" },
                { q: "Gib D an und löse: <span class='math'>x / (x + 3) = 2 / (x + 3)</span>", a: "D = ℝ \\ {−3}; Zähler gleichsetzen: <span class='math'>x = 2</span>" },
                { q: "Löse nach x auf: <span class='math'>7 / x = 14 / (x + 2)</span>", a: "Über Kreuz: <span class='math'>7x + 14 = 14x ➔ 14 = 7x ➔ x = 2</span>" },
                { type: "error", q: "Gib D an und löse: <span class='math'>x / (x - 2) = 2 / (x - 2)</span>. Was fällt dir auf?", a: "D = ℝ \\ {2}. Rechnerisch ergibt sich x = 2, das liegt aber <strong>nicht</strong> in D → keine Lösung, L = { }." },
                { q: "Löse nach x auf: <span class='math'>2 / (3x - 1) = 4 / (5x + 2)</span>", a: "Über Kreuz: <span class='math'>10x + 4 = 12x - 4 ➔ 8 = 2x ➔ x = 4</span>" }
            ]
        },

        "l2_5_A": { desc: "Reinquadratische Gleichungen der Form x² = c.", example: { q: "Löse nach x auf: <span class='math'>x<sup>2</sup> = 25</span>", steps: ["Ziehe die Wurzel. Achtung: Es gibt zwei Lösungen!", "<span class='math'>x<sub>1</sub> = 5</span> und <span class='math'>x<sub>2</sub> = -5</span>, denn auch (−5)² = 25."] }, exercises: [ { q: "Löse nach x auf: <span class='math'>x<sup>2</sup> = 81</span>", a: "9, −9" }, { q: "Löse nach x auf: <span class='math'>x<sup>2</sup> = 100</span>", a: "10, −10" }, { q: "Löse nach x auf: <span class='math'>x<sup>2</sup> = 0</span>", a: "0 (nur eine Lösung)" }, { q: "Löse nach x auf: <span class='math'>x<sup>2</sup> = 144</span>", a: "12, −12" }, { q: "Löse nach x auf und runde auf zwei Nachkommastellen: <span class='math'>x<sup>2</sup> = 2</span>", a: "√2 ≈ 1,41 und −√2 ≈ −1,41" } ] },
        "l2_5_B": { desc: "Reinquadratische Gleichungen erst umformen, dann Wurzel ziehen.", example: { q: "Löse nach x auf: <span class='math'>2x<sup>2</sup> - 18 = 0</span>", steps: ["Isoliere x²: <span class='math'>2x<sup>2</sup> = 18 ➔ x<sup>2</sup> = 9</span>", "Ziehe die Wurzel: <span class='math'>x = 3, -3</span>"] }, exercises: [ { q: "Löse nach x auf: <span class='math'>3x<sup>2</sup> = 27</span>", a: "3, −3" }, { q: "Löse nach x auf: <span class='math'>x<sup>2</sup> + 10 = 35</span>", a: "5, −5" }, { q: "Löse nach x auf: <span class='math'>5x<sup>2</sup> - 20 = 0</span>", a: "2, −2" }, { q: "Löse nach x auf: <span class='math'>x<sup>2</sup> + 16 = 0</span>", a: mt("x<sup>2</sup> = -16") + " → keine Lösung (ein Quadrat ist nie negativ), L = { }" }, { q: "Löse nach x auf: <span class='math'>0,5x<sup>2</sup> = 8</span>", a: "4, −4" } ] },
        "l2_5_C": { desc: "Reinquadratische Gleichungen mit Klammern und in Sachaufgaben.", example: { q: "Löse nach x auf: <span class='math'>(x - 2)<sup>2</sup> = 16</span>", steps: ["Ziehe die Wurzel: <span class='math'>x - 2 = 4</span> oder <span class='math'>x - 2 = -4</span>", "Löse auf: <span class='math'>x = 6, x = -2</span>"] }, exercises: [
            { q: "Löse nach x auf: <span class='math'>(x + 1)<sup>2</sup> = 9</span>", a: "2, −4" },
            { q: "Löse nach x auf: <span class='math'>2(x - 3)<sup>2</sup> = 50</span>", a: mt("(x - 3)<sup>2</sup> = 25") + " → 8, −2" },
            { type: "context", q: "Ein Quadrat wird an jeder Seite um 2 cm verlängert. Das neue Quadrat hat einen Flächeninhalt von 81 cm². Stelle eine Gleichung auf und berechne die ursprüngliche Seitenlänge.", svg: svgBox(220, 160, `<rect x="40" y="20" width="120" height="120" stroke="${COL.amber}" fill="${FILL.amber}" ${DASH}/><rect x="40" y="47" width="93" height="93" stroke="${COL.blue}" fill="${FILL.blue}"/>` + T(86, 155, "a", COL.blue) + T(146, 155, "2", COL.amber) + T(100, 34, "A = 81 cm²", COL.amber, "middle", 12)), a: mt("(a + 2)<sup>2</sup> = 81 ➔ a + 2 = 9 ➔ a = 7") + " cm (die Lösung a = −11 ist als Länge nicht sinnvoll)" },
            { q: "Löse nach x auf: <span class='math'>3(x + 2)<sup>2</sup> = 27</span>", a: "1, −5" },
            { q: "Löse nach x auf: <span class='math'>(2x - 4)<sup>2</sup> = 0</span>", a: "2 (nur eine Lösung)" }
        ] },

        "l2_6_A": { desc: "Lösungsformel: Parameter bestimmen.", example: { q: "Bestimme die Parameter a, b und c in der Gleichung <span class='math'>2x<sup>2</sup> + 5x - 3 = 0</span>.", steps: ["a ist der Faktor vor x²: a = 2", "b ist der Faktor vor x: b = 5", "c ist die Zahl ohne x: c = −3"] }, exercises: [ { q: "Bestimme a, b, c in: <span class='math'>-x<sup>2</sup> + 4x + 1 = 0</span>", a: "a = −1, b = 4, c = 1" }, { q: "Bestimme a, b, c in: <span class='math'>3x<sup>2</sup> - 7 = 0</span>", a: "a = 3, b = 0, c = −7" }, { q: "Bestimme a, b, c in: <span class='math'>x<sup>2</sup> - x = 0</span>", a: "a = 1, b = −1, c = 0" }, { q: "Bestimme a, b, c in: <span class='math'>5x + x<sup>2</sup> = 0</span>", a: "a = 1, b = 5, c = 0" }, { q: "Bestimme a, b, c in: <span class='math'>x<sup>2</sup> - 2x + 8 = 0</span>", a: "a = 1, b = −2, c = 8" } ] },
        "l2_6_B": { desc: "Gemischtquadratische Gleichungen mit der Lösungsformel lösen.", example: { q: "Löse nach x auf: <span class='math'>x<sup>2</sup> - 6x + 8 = 0</span>", steps: ["Wende die abc-Formel an: <span class='math'>x = (-(-6) ± √(36 - 32)) / 2</span>", "<span class='math'>x = (6 ± 2) / 2 ➔ x<sub>1</sub>=4, x<sub>2</sub>=2</span>"] }, exercises: [ { q: "Löse nach x auf: <span class='math'>x<sup>2</sup> + 2x - 3 = 0</span>", a: "1, −3" }, { q: "Löse nach x auf: <span class='math'>x<sup>2</sup> - 4x + 4 = 0</span>", a: "2 (Diskriminante = 0)" }, { q: "Löse nach x auf: <span class='math'>2x<sup>2</sup> - 4x - 6 = 0</span>", a: "3, −1" }, { q: "Löse nach x auf: <span class='math'>x<sup>2</sup> + x - 2 = 0</span>", a: "1, −2" }, { q: "Löse nach x auf: <span class='math'>-x<sup>2</sup> + 4x - 3 = 0</span>", a: "3, 1" } ] },
        "l2_6_C": { desc: "Umstellen auf Normalform, Lösen und Sachaufgaben.", example: { q: "Löse nach x auf: <span class='math'>x(x - 2) = 8</span>", steps: ["Ausmultiplizieren und Umstellen: <span class='math'>x<sup>2</sup> - 2x - 8 = 0</span>", "Lösen mit der Formel: <span class='math'>x = (2 ± √(4 + 32)) / 2 = (2 ± 6) / 2</span>", "<span class='math'>x<sub>1</sub> = 4, x<sub>2</sub> = -2</span>"] }, exercises: [
            { q: "Löse nach x auf: <span class='math'>x<sup>2</sup> = 5x</span>", a: "0, 5" },
            { q: "Löse nach x auf: <span class='math'>2x<sup>2</sup> + 4x = -2</span>", a: "−1" },
            { q: "Löse nach x auf: <span class='math'>(x - 1)(x + 2) = 4</span>", a: mt("x<sup>2</sup> + x - 6 = 0") + " → 2, −3" },
            { type: "context", q: "Ein Rechteck ist 3 cm länger als breit und hat einen Flächeninhalt von 40 cm². Stelle eine Gleichung auf und berechne die Seitenlängen.", svg: svgBox(240, 120, shape([[40, 20], [200, 20], [200, 90], [40, 90]], { lbl: ["x + 3", null, null, "x"] }) + T(120, 60, "A = 40 cm²", COL.white, "middle", 12)), a: mt("x(x + 3) = 40 ➔ x<sup>2</sup> + 3x - 40 = 0 ➔ x = 5") + " (x = −8 entfällt) → 5 cm breit, 8 cm lang" },
            { q: "Löse nach x auf: <span class='math'>3x<sup>2</sup> = 6x + 9</span>", a: "3, −1" }
        ] }
    });
