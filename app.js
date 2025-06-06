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

// 1. First apply raw CORS middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  next();
});

// 2. Then apply the cors package middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// 3. Explicit OPTIONS handler
app.options('*', cors());

app.use(express.json());
app.use(express.static('public'));

// Route loading with validation
const loadRouter = (path) => {
  try {
    const router = require(path);
    if (!router || typeof router !== 'function') {
      throw new Error(`Invalid router at ${path}`);
    }
    
    // Validate all routes in the router
    router.stack.forEach(layer => {
      if (layer.route) {
        const path = layer.route.path;
        if (path.includes(':/') || path.includes('/:')) {
          throw new Error(`Invalid route parameter in path: ${path}`);
        }
      }
    });
    
    return router;
  } catch (err) {
    console.error(`Error loading router ${path}:`, err);
    process.exit(1);
  }
};

// Load routes
const taskRoutes = loadRouter('./routes/taskRoutes');
const userRoutes = loadRouter('./routes/userRoutes');
const projectRoutes = loadRouter('./routes/projectRoutes');

// Attach routes
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);

// Health check endpoint
app.get('/api', (req, res) => {
  res.json({
    status: 'API Running',
    cors: {
      allowedOrigins: allowedOrigins,
      currentOrigin: req.headers.origin,
      allowed: allowedOrigins.includes(req.headers.origin)
    }
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  
  // Ensure CORS headers are set even on errors
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  
  res.status(err.status || 500).json({
    error: err.message || 'Server Error',
    cors: {
      allowedOrigins: allowedOrigins,
      currentOrigin: origin,
      allowed: allowedOrigins.includes(origin)
    }
  });
});

// Start server
async function startServer() {
  try {
    await Database.testConnection();
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
      console.log('Allowed origins:', allowedOrigins);
      console.log('CORS configuration:');
      console.log('- Pre-flight OPTIONS enabled');
      console.log('- Credentials allowed');
      console.log('- Dynamic origin checking');
    });
  } catch (error) {
    console.error('Startup failed:', error);
    process.exit(1);
  }
}

startServer();