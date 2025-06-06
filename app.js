require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Database = require('./models/db');

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  'https://se-production-13b7.up.railway.app',
  'https://se-production-4541.up.railway.app',
  'http://localhost:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin like mobile apps or curl
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
app.use(express.static('public'));

// Routes
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');

app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);

// Health check
app.get('/api', (req, res) => {
  res.json({ status: 'API Running' });
});

// Start server
async function startServer() {
  try {
    await Database.testConnection();
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Startup failed:', error);
    process.exit(1);
  }
}

startServer();
