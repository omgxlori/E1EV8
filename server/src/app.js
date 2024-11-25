import path from 'path';
import fs from 'fs';
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

// Corrected path to `dist` folder
const __dirname = path.resolve(); // Root directory of the project
const distPath = path.join(__dirname, '..', 'client', 'dist'); // Go up one level, then into client/dist
const indexPath = path.join(distPath, 'index.html'); // Point to index.html inside dist

// Debugging logs
console.log('Dist Path:', distPath);
console.log('Dist Exists:', fs.existsSync(distPath));
console.log('Index.html Exists:', fs.existsSync(indexPath));

// Serve static files from the frontend
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
} else {
  console.error('Dist folder not found. Frontend will not be served.');
}

// API Routes
app.use('/quotes', quoteRoutes);
app.use('/auth', authRoutes);
app.use('/api/habits', habitRoutes);

// Catch-all route to serve React app
app.get('*', (req, res) => {
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    console.error('Error: index.html not found!');
    res.status(404).send('Frontend not found.');
  }
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
