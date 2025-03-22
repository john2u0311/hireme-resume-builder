const fs = require('fs');
const path = require('path');

// Create a simple text file as a placeholder for now
const files = ['favicon.ico', 'logo192.png', 'logo512.png'];
const publicDir = path.join(__dirname, '..', 'public');

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  fs.writeFileSync(filePath, '');
  console.log(`Created ${file}`);
});