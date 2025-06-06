require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Database = require('./models/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Enhanced CORS configuration
const allowedOrigins = [
  'https://se-production-13b7.up.railway.app',
  'https://se-production-4541.up.railway.app',
  'http://localhost:3000'
];

// More permissive CORS middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());
app.use(express.static('public'));

// Import routes
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');

// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);

// Health check
app.get('/api', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', allowedOrigins.join(', '));
  res.json({ status: 'API Running' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  // Ensure CORS headers are present even on error responses
  res.header('Access-Control-Allow-Origin', allowedOrigins.join(', '));
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (err.message.includes('CORS policy')) {
    res.status(403).json({ error: err.message });
  } else {
    res.status(500).json({ error: 'Server Error' });
  }
});

// Start server
async function startServer() {
  try {
    await Database.testConnection();
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Allowed origins: ${allowedOrigins.join(', ')}`);
    });
  } catch (error) {
    console.error('Startup failed:', error);
    process.exit(1);
  }
}

startServer();