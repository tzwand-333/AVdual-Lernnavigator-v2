// Erzeugt die Schülerdatei (ohne Lösungen) und die Lösungsdatei für Lehrkräfte.
const fs = require('fs'), path = require('path');
const db = require('./extract.js');
const ICONS = { bpe1: '🧮', bpe2: '⚖️', bpe3: '📐' };
const bpes = db.bpes.map((b, i) => ({ id: b.id, nr: i + 1, name: b.title.split(': ')[1], desc: b.desc, icon: ICONS[b.id] }));
const lfs = JSON.parse(JSON.stringify(db.lfs));
const studentTasks = {}, solTasks = {};
for (const [k, t] of Object.entries(db.tasks)) {
  if (t.exercises.length !== 5 || t.exercises.some(e => !e.q || !e.a)) throw new Error('Unvollständig: ' + k);
  studentTasks[k] = { desc: t.desc, example: t.example, exercises: t.exercises.map(e => { const o = { q: e.q }; if (e.svg) o.svg = e.svg; if (e.type) o.type = e.type; return o; }) };
  solTasks[k] = t.exercises.map(e => ({ q: e.q, a: e.a }));
}
const js = (name, obj) => `    const ${name} = ${JSON.stringify(obj).replace(/<\//g, '<\\/')};`;
const [outDir] = process.argv.slice(2);
const stu = fs.readFileSync(path.join(__dirname, 'student.html'), 'utf8').replace('/*DATA*/', js('DB', { bpes, lfs, tasks: studentTasks }));
const sol = fs.readFileSync(path.join(__dirname, 'solutions.html'), 'utf8').replace('/*DATA*/', js('SOL', { bpes, lfs, tasks: solTasks }));
fs.writeFileSync(path.join(outDir, 'AVdual_OLZ_Mathe_Lernnavigator.html'), stu);
fs.writeFileSync(path.join(outDir, 'AVdual_OLZ_Mathe_Loesungen_fuer_Moodle.html'), sol);
console.log('Schülerdatei', stu.length, 'Bytes; Lösungsdatei', sol.length, 'Bytes');
// Kontrolle: keine Lösungstexte in der Schülerdatei
const leaks = Object.values(solTasks).flat().filter(e => e.a.length > 12 && stu.includes(JSON.stringify(e.a).slice(1, -1)));
console.log('Lösungen in Schülerdatei gefunden:', leaks.length);
