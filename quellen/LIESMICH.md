# Quellen des Mathe-Lernnavigators

- `aufgaben/` – Skizzen-Baukasten (`02_sketch.js`) und alle Aufgaben mit Lösungen je BPE (`04_bpe1.js` … `06_bpe3.js`)
- `student.html` – Vorlage der Schülerdatei (Arcade-Design, Spielstand, Freischalt-Logik)
- `solutions.html` – Vorlage der Lösungsdatei für Lehrkräfte
- `build.js` – erzeugt beide Dateien neu

Nach Änderungen an Aufgaben im Repo-Hauptordner ausführen:

    node quellen/build.js .

Das Skript bricht ab, wenn ein Level nicht genau 5 Aufgaben mit Lösung hat, und prüft, dass keine Lösungen in der Schülerdatei landen.
