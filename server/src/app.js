import express from 'express';
import cors from 'cors';
import path from 'path';
import quoteRoutes from './routes/quoteRoutes.js';
import authRoutes from './routes/authRoutes.js'; // Import auth routes for signup, login, and user management
import habitRoutes from './routes/habitRoutes.js'; // Import habit routes to handle habits
import sequelize from './config/sequelize.js'; // Import Sequelize setup file
import dotenv from 'dotenv'; // Load environment variables

// Load environment variables from the server folder's .env file
dotenv.config({ path: './.env' });

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON body from the client

// Serve static files from the frontend
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// API Routes
app.use('/quotes', quoteRoutes); // Handles quote API routes
app.use('/auth', authRoutes); // Use '/auth' prefix for signup and login routes
app.use('/api/habits', habitRoutes); // Use '/api/habits' prefix for habit-related requests

// Serve the frontend for any other route
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
});

// Test database connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected successfully!');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// Set up port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

console.log('Current working directory:', process.cwd());
