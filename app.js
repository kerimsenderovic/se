require('dotenv').config();
const express = require('express');
const Database = require('./models/db');

const app = express();
const PORT = process.env.PORT || 3000;


async function startServer() {
  try {
    const isConnected = await Database.testConnection();
    if (!isConnected) {
      console.error('Fatal: Could not connect to database after multiple attempts');
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

    
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send('Something broke!');
    });

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Server startup failed:', error);
    process.exit(1);
  }
}

startServer();