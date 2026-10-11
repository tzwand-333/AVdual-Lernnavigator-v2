
    const mt = s => `<span class='math'>${s}</span>`;

    /* ================= DATENBANK ================= */
    const db = {
        bpes: [
            { id: "bpe1", title: "BPE 1: Termumformungen", desc: "Variablen, Rechengesetze, Potenzen & Binome" },
            { id: "bpe2", title: "BPE 2: Gleichungen", desc: "Lineare & Quadratische Gleichungen, Formeln" },
            { id: "bpe3", title: "BPE 3: Geometrie", desc: "Pythagoras, Ähnlichkeit, Trigonometrie & Körper" }
        ],
        lfs: {
            "bpe1": [
                { id: "l1_1", title: "Terme aufstellen & einsetzen", desc: "Werte berechnen und Terme ableiten." },
                { id: "l1_2", title: "Zusammenfassen von Termen", desc: "Gleichartige Glieder und Klammern." },
                { id: "l1_3", title: "Multiplikation von Summen", desc: "Klammern ausmultiplizieren." },
                { id: "l1_4", title: "Binomische Formeln", desc: "Binome auflösen und multiplizieren." },
                { id: "l1_5", title: "Faktorisieren", desc: "Ausklammern und Binome rückwärts." },
                { id: "l1_6", title: "Potenzen", desc: "Rechengesetze für Potenzen anwenden." }
            ],
            "bpe2": [
                { id: "l2_1", title: "Mengen und reelle Zahlen", desc: "Zahlenbereiche unterscheiden." },
                { id: "l2_2", title: "Lineare Gleichungen", desc: "Gleichungen nach x auflösen." },
                { id: "l2_3", title: "Formeln umstellen", desc: "Variablen in Formeln isolieren." },
                { id: "l2_4", title: "Bruchgleichungen", desc: "Gleichungen mit Variablen im Nenner." },
                { id: "l2_5", title: "Reinquadratische Gleichungen", desc: "Gleichungen durch Wurzelziehen lösen." },
                { id: "l2_6", title: "Gemischtquadratische Gl.", desc: "Gleichungen mit der Lösungsformel lösen." }
            ],
            "bpe3": [
                { id: "l3_1", title: "Satz des Pythagoras & Thales", desc: "Berechnungen am rechtwinkligen Dreieck." },
                { id: "l3_2", title: "Ähnlichkeit", desc: "Maßstäbe und proportionale Figuren." },
                { id: "l3_3", title: "Kongruenz & Symmetrien", desc: "Deckungsgleichheit nachweisen." },
                { id: "l3_4", title: "Strahlensätze", desc: "Verhältnisse an schneidenden Geraden." },
                { id: "l3_5", title: "Trigonometrie", desc: "Sinus, Kosinus und Tangens." },
                { id: "l3_6", title: "Körper", desc: "Volumen und Oberfläche berechnen." }
            ]
        },
        /* Schwierigkeitsstufen im Game-Stil (intern weiterhin A / B / C) */
        levels: [
            { id: "A", title: "Rookie", icon: "🟢", stars: 1, tag: "Level 1", sub: "Grundlagen", desc: "Warm-up: einfache Aufgaben mit einem Rechenschritt zum Kernthema.", cssClass: "niveau-A" },
            { id: "B", title: "Pro", icon: "🟠", stars: 2, tag: "Level 2", sub: "Vertiefung", desc: "Mehrschrittige Aufgaben, Skizzen und erste Anwendungen.", cssClass: "niveau-B" },
            { id: "C", title: "Legend", icon: "🔴", stars: 3, tag: "Level 3", sub: "Transfer", desc: "Boss-Level: Sachaufgaben, Kombinationen, Begründen und Fehlersuche.", cssClass: "niveau-C" }
        ],
        tasks: {}
    };
