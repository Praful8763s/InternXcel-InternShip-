const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (name TEXT, email TEXT, message TEXT)");
});

app.post('/register', (req, res) => {
    const { name, email, message } = req.body;
    db.serialize(() => {
        const stmt = db.prepare("INSERT INTO users VALUES (?, ?, ?)");
        stmt.run(name, email, message);
        stmt.finalize();
    });
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
