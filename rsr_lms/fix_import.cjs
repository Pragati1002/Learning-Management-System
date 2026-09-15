const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'src/pages/assessments/AssessmentPage.jsx');
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/, Github/g, '');
fs.writeFileSync(file, content, 'utf8');
console.log('Fixed AssessmentPage.jsx');
