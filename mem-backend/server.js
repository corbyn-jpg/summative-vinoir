// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Configuration Class (Single Responsibility Principle)
class ServerConfig {
  static initEnvironment() {
    dotenv.config();
    return {
      port: process.env.PORT || 5000,
      mongoUri: process.env.MONGO_URI,
      corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000'
    };
  }

  static configureMiddleware(app, corsOrigin) {
    // CORS Configuration
    app.use(cors({
      origin: corsOrigin,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }));

    // Body Parser
    app.use(express.json());

    // Request Logger
    app.use((req, res, next) => {
      console.log(`${req.method} ${req.path}`);
      next();
    });
  }

  static async connectDatabase(uri) {
    try {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('MongoDB connected successfully');
    } catch (err) {
      console.error('MongoDB connection error:', err);
      process.exit(1);
    }
  }
}

// Route Loader (Single Responsibility Principle)
class RouteLoader {
  static loadRoutes(app) {
    const userRoutes = require('./routes/userRoutes');
    app.use('/api/users', userRoutes);

    // Basic health check route
    app.get('/', (req, res) => {
      res.json({ 
        status: 'running',
        timestamp: new Date().toISOString() 
      });
    });
  }
}

// Error Handler (Single Responsibility Principle)
class ErrorHandler {
  static handleErrors(app) {
    // 404 Handler
    app.use((req, res) => {
      res.status(404).json({ 
        success: false,
        message: 'Endpoint not found' 
      });
    });

    // Global Error Handler
    app.use((err, req, res, next) => {
      console.error(err.stack);
      const statusCode = err.statusCode || 500;
      res.status(statusCode).json({
        success: false,
        message: err.message || 'Something broke!',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
      });
    });
  }
}

// Server Class (Main Application)
class Server {
  constructor() {
    this.app = express();
    this.config = ServerConfig.initEnvironment();
  }

  async initialize() {
    ServerConfig.configureMiddleware(this.app, this.config.corsOrigin);
    await ServerConfig.connectDatabase(this.config.mongoUri);
    RouteLoader.loadRoutes(this.app);
    ErrorHandler.handleErrors(this.app);
  }

  start() {
    this.app.listen(this.config.port, () => {
      console.log(`Server is running on port ${this.config.port}`);
      console.log(`Allowed CORS origin: ${this.config.corsOrigin}`);
    });
  }
}

// Application Bootstrap
(async () => {
  try {
    const server = new Server();
    await server.initialize();
    server.start();
  } catch (error) {
    console.error('Server initialization failed:', error);
    process.exit(1);
  }
})();