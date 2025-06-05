require('dotenv').config();

const express = require('express');
const Database = require('./models/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Test database connection on startup
Database.testConnection().then(isConnected => {
    if (!isConnected) {
        console.error('Fatal: Could not connect to database');
        process.exit(1);
    }

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('public'));

    app.get('/', (req, res) => {
        res.send('Task Management System API is running.');
    });

    const apiRoutes = require('./routes/apiRoutes');
    app.use('/api', apiRoutes);

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
});
