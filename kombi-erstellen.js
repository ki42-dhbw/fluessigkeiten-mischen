// Erzeugt "fluessigkeiten-2d-3d.html": eine einzige Datei, die die 2D- und die
// 3D-Version enthält und zwischen beiden umschalten kann.
//
// Aufruf (im Ordner dieser Datei):   node kombi-erstellen.js
//
// Nach jeder Änderung an fluessigkeiten-mischen.html oder fluessigkeiten-3d.html
// erneut ausführen, damit die Kombi-Datei auf dem gleichen Stand ist.

const fs = require('fs');
const path = require('path');

const dir = __dirname;
const read = name => fs.readFileSync(path.join(dir, name), 'utf8');

// Als JavaScript-Zeichenkette einbetten, ohne dass der HTML-Parser darin "</script>" findet
const embed = text => JSON.stringify(text)
  .replace(/<\/script/gi, '<\\/script')
  .replace(/<!--/g, '<\\!--');

// Die Verweise auf die jeweils andere Einzeldatei werden in der Kombi-Datei nicht gebraucht
const stripLinks = html => html.replace(/\s*<a href="fluessigkeiten-[^"]+\.html"[^>]*>[^<]*<\/a>/g, '');

// Umschalter 2D/3D, der in die jeweils gezeigte Version eingefügt wird
const switcher = `
<style>
  #dimSwitch {
    position: fixed; top: 14px; right: 14px; z-index: 50;
    display: flex; gap: 4px; padding: 4px;
    font: 14px/1.2 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    background: rgba(255, 255, 255, 0.86);
    -webkit-backdrop-filter: blur(14px) saturate(1.3);
    backdrop-filter: blur(14px) saturate(1.3);
    border: 1px solid rgba(20, 35, 55, 0.12); border-radius: 12px;
    box-shadow: 0 10px 34px rgba(15, 30, 50, 0.2);
    user-select: none; -webkit-user-select: none;
  }
  #dimSwitch button {
    font: inherit; font-weight: 600; color: #1b2530; cursor: pointer;
    min-width: 52px; padding: 8px 12px; border: 0; border-radius: 8px; background: transparent;
  }
  #dimSwitch button:hover { background: rgba(20, 35, 55, 0.08); }
  #dimSwitch button[aria-pressed="true"] { background: #1b2530; color: #fff; cursor: default; }
</style>
<div id="dimSwitch" role="group" aria-label="Darstellung wählen">
  <button data-mode="2d" title="Flache Simulation mit allen Modi (auch Umrisse)">2D</button>
  <button data-mode="3d" title="Echte 3D-Simulation im drehbaren Becken">3D</button>
</div>
<script>
(() => {
  const mode = location.hash === '#3d' ? '3d' : '2d';
  document.querySelectorAll('#dimSwitch button').forEach(b => {
    b.setAttribute('aria-pressed', String(b.dataset.mode === mode));
    b.addEventListener('click', () => {
      if (b.dataset.mode === mode) return;
      // Die Seite mit der anderen Version neu laden; Kamera, Mikrofon und
      // Grafikspeicher der bisherigen Version werden dabei freigegeben.
      location.hash = b.dataset.mode;
      location.reload();
    });
  });
})();
</script>
`;

const prepare = name => {
  const html = stripLinks(read(name));
  const at = html.lastIndexOf('</body>');
  if (at < 0) throw new Error('Kein </body> in ' + name);
  return embed(html.slice(0, at) + switcher + html.slice(at));
};

const out = `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
<title>Flüssigkeiten mischen – 2D und 3D</title>
<!-- Diese Datei wird von kombi-erstellen.js aus den beiden Einzeldateien erzeugt. -->
<style>html, body { margin: 0; height: 100%; background: #e6ebf1; }</style>
</head>
<body>
<script>
(() => {
  'use strict';
  // Beide Versionen sind hier vollständig eingebettet. Gezeigt wird die, die in
  // der Adresse steht: ...html#2d (Vorgabe) oder ...html#3d.
  const PAGES = {
    '2d': ${prepare('fluessigkeiten-mischen.html')},
    '3d': ${prepare('fluessigkeiten-3d.html')}
  };
  const mode = location.hash === '#3d' ? '3d' : '2d';
  window.addEventListener('DOMContentLoaded', () => {
    document.open();
    document.write(PAGES[mode]);
    document.close();
  });
})();
</script>
</body>
</html>
`;

const target = path.join(dir, 'fluessigkeiten-2d-3d.html');
fs.writeFileSync(target, out);
console.log('Erzeugt: ' + target + ' (' + Math.round(out.length / 1024) + ' KB)');
