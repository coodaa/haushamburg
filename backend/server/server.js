const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/products.json');

app.get('/api/products', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("❌ Fehler beim Laden der Produkte:", err);
            return res.status(500).json({ error: "Fehler beim Laden der Produkte" });
        }
        res.json(JSON.parse(data));
    });
});
