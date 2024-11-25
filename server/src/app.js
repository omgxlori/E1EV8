import path from 'path';
import express from 'express';
import cors from 'cors';
import quoteRoutes from './routes/quoteRoutes.js';
import authRoutes from './routes/authRoutes.js';
import habitRoutes from './routes/habitRoutes.js';
import sequelize from './config/sequelize.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: './.env' });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the frontend
const __dirname = path.resolve(); // Get the current directory
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// API Routes
app.use('/quotes', quoteRoutes);
app.use('/auth', authRoutes);
app.use('/api/habits', habitRoutes);

// Catch-all route to serve React app
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
