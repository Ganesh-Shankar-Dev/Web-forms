const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'yourusername',
    password: 'yourpassword',
    database: 'yourdatabase'
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});

app.post('/submit', (req, res) => {
    const { name, email, message } = req.body;
    const query = 'INSERT INTO form_data (name, email, message) VALUES (?, ?, ?)';

    connection.query(query, [name, email, message], (error, results) => {
        if (error) {
            res.status(500).json({ message: 'Database error' });
            return;
        }
        res.status(200).json({ message: 'Data submitted successfully' });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});