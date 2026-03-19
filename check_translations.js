const en = require('./messages/en.json');
const fr = require('./messages/fr.json');

function checkValues(obj, path, issues) {
  for (const [k, v] of Object.entries(obj)) {
    const p = path ? path + '.' + k : k;
    if (typeof v === 'object' && v !== null) {
      checkValues(v, p, issues);
    } else if (typeof v === 'string') {
      if (v.includes('`')) issues.push(p + ' contains BACKTICK');
      if (v.includes('${')) issues.push(p + ' contains INTERPOLATION');
      if (v.includes('</script>')) issues.push(p + ' contains SCRIPT CLOSE');
    }
  }
}

let issues = [];
checkValues(en.homepage || {}, 'en.homepage', issues);
checkValues(fr.homepage || {}, 'fr.homepage', issues);
checkValues(en, 'en', issues);
checkValues(fr, 'fr', issues);
if (issues.length === 0) console.log('No dangerous characters found');
else issues.forEach(i => console.log('ISSUE:', i));
