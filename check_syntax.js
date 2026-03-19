const fs = require('fs');
const src = fs.readFileSync('app/[locale]/page.tsx', 'utf8');

// Find script tags and check syntax
const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/g;
let match;
let count = 0;
while ((match = scriptRegex.exec(src)) !== null) {
  count++;
  const js = match[1]
    .replace(/\$\{t\([^)]+\)\}/g, '"TRANSLATED"')
    .replace(/\$\{locale\}/g, 'en');
  try {
    new Function(js);
    console.log('Script #' + count + ': OK (' + js.length + ' chars)');
  } catch(e) {
    console.log('Script #' + count + ': ERROR - ' + e.message);
    // Find the problematic area
    const lines = js.split('\n');
    for (let i = 0; i < lines.length; i++) {
      try { new Function(lines.slice(0, i+1).join('\n')); }
      catch(e2) {
        console.log('  First error at JS line ' + (i+1) + ': ' + lines[i].substring(0, 200));
        break;
      }
    }
  }
}
console.log('Total scripts checked:', count);
