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

// CORS middleware
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  credentials: true,
  optionsSuccessStatus: 204
}));

app.use(express.json());
app.use(express.static('public'));

// Import routes with error handling
let taskRoutes, userRoutes, projectRoutes;
try {
  taskRoutes = require('./routes/taskRoutes');
  userRoutes = require('./routes/userRoutes');
  projectRoutes = require('./routes/projectRoutes');
} catch (err) {
  console.error('Route loading failed:', err);
  process.exit(1);
}

// Verify routes before attaching them
const verifyRouter = (router) => {
  if (!router || typeof router !== 'function') {
    throw new Error('Invalid router configuration');
  }
  return router;
};

// Attach routes with error handling
try {
  app.use('/api/tasks', verifyRouter(taskRoutes));
  app.use('/api/users', verifyRouter(userRoutes));
  app.use('/api/projects', verifyRouter(projectRoutes));
} catch (err) {
  console.error('Route attachment failed:', err);
  process.exit(1);
}

// Health check
app.get('/api', (req, res) => {
  res.json({ 
    status: 'API Running',
    allowedOrigins: allowedOrigins,
    routes: ['/api/tasks', '/api/users', '/api/projects']
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({ 
    error: 'Server Error',
    message: err.message
  });
});

// Start server
async function startServer() {
  try {
    await Database.testConnection();
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
      console.log('Allowed origins:', allowedOrigins);
      console.log('Available routes:');
      console.log('- GET /api');
      console.log('- /api/tasks');
      console.log('- /api/users');
      console.log('- /api/projects');
    });
  } catch (error) {
    console.error('Startup failed:', error);
    process.exit(1);
  }
}

startServer();