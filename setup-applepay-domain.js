const fs = require('fs');
const path = require('path');

// Verzeichnis .well-known im aktuellen Verzeichnis erstellen
const wellKnownDir = path.join(__dirname, '.well-known');
if (!fs.existsSync(wellKnownDir)) {
  fs.mkdirSync(wellKnownDir);
  console.log('Verzeichnis .well-known erstellt.');
} else {
  console.log('Verzeichnis .well-known existiert bereits.');
}

// Pfad zur Domain Association File
const filePath = path.join(wellKnownDir, 'apple-developer-merchantid-domain-association');

// Inhalt der Datei (ersetze diesen Platzhalter durch den echten Inhalt)
const fileContent = "YOUR_FILE_CONTENT_HERE";

// Datei schreiben (überschreibt ggf. die existierende Datei)
fs.writeFileSync(filePath, fileContent, { encoding: 'utf8' });
console.log('Datei apple-developer-merchantid-domain-association wurde erstellt.');
