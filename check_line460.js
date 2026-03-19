const fs = require('fs');
const src = fs.readFileSync('app/[locale]/page.tsx', 'utf8');

// Find the template literal
const startMarker = 'return `';
const startIdx = src.indexOf(startMarker) + startMarker.length;
const endIdx = src.indexOf('\n`\n}', startIdx);
const template = src.substring(startIdx, endIdx);

// Replace interpolations with dummy values
const html = template
  .replace(/\$\{t\([^)]+\)\}/g, 'TRANSLATED')
  .replace(/\$\{locale\}/g, 'en');

const lines = html.split('\n');
console.log('Total lines:', lines.length);
for (let i = 455; i <= 465; i++) {
  console.log('Line ' + i + ':', lines[i-1]);
}
