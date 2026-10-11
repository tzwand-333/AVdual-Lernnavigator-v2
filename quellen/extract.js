// Berechnet die Aufgabendatenbank (inkl. fertiger SVG-Skizzen) aus den Bausteinen vor.
const fs = require('fs'), vm = require('vm'), path = require('path');
const B = path.join(__dirname, 'aufgaben');
const code = ['02_sketch.js', '03_db_base.js', '04_bpe1.js', '05_bpe2.js', '06_bpe3.js'].map(f => fs.readFileSync(path.join(B, f), 'utf8')).join('\n') + '\n;globalThis.__db = db;';
const ctx = {}; vm.createContext(ctx); vm.runInContext(code, ctx);
module.exports = ctx.__db;
if (require.main === module) { const db = ctx.__db; console.log(Object.keys(db.tasks).length, 'Level;', db.bpes.map(b => b.title).join(' | ')); }
