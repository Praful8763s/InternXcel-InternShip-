// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/register', (req, res) => {
    const { name, email, message } = req.body;
    console.log('Received data:', { name, email, message });
    res.json({ status: 'success', data: { name, email, message } });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
