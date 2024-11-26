import path from 'path';
import fs from 'fs';
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch'; // Ensure this is installed via `npm install node-fetch`
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

// Define paths
const __dirname = path.resolve(); // Root directory of the project
const distPath = path.join(__dirname, '..', 'client', 'dist'); // Go up one level, then into client/dist
const indexPath = path.join(distPath, 'index.html'); // Point to index.html inside dist

// Debugging logs for static file serving
console.log('Dist Path:', distPath);
console.log('Dist Exists:', fs.existsSync(distPath));
console.log('Index.html Exists:', fs.existsSync(indexPath));

// Serve static files from the React frontend
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
} else {
  console.error('Dist folder not found. Frontend will not be served.');
}

// API Routes
app.use('/quotes', quoteRoutes);
app.use('/auth', authRoutes);
app.use('/api/habits', habitRoutes);

// Route for fetching a quote from ZenQuotes API
app.get('/api/quote', async (req, res) => {
  try {
    console.log('Fetching quote from ZenQuotes API...');
    const response = await fetch('https://zenquotes.io/api/random');

    if (!response.ok) {
      console.error('ZenQuotes API Error:', response.statusText);
      throw new Error(`ZenQuotes API returned status: ${response.status}`);
    }

    const data = await response.json();
    console.log('ZenQuotes Data:', data);

    if (!data || !Array.isArray(data) || data.length === 0) {
      throw new Error('No quote received from ZenQuotes');
    }

    res.json({
      quote: data[0].q || 'No quote available',
      author: data[0].a || 'Unknown',
    });
  } catch (error) {
    console.error('Error in /api/quote:', error.message);
    res.status(500).json({ error: 'Failed to fetch quote' });
  }
});


// Catch-all route for React frontend
app.get('*', (req, res) => {
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    console.error('Error: index.html not found!');
    res.status(404).send('Frontend not found.');
  }
});

// Test and synchronize database connection
sequelize
  .sync({ alter: true }) // Ensures tables are created or updated
  .then(() => {
    console.log('Database synchronized successfully!');
    return sequelize.authenticate();
  })
  .then(() => {
    console.log('Database connected successfully!');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
