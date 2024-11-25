import path from 'path';
import fs from 'fs';
import express from 'express';
import cors from 'cors';
import quoteRoutes from './routes/quoteRoutes.js';
import authRoutes from './routes/authRoutes.js';
import habitRoutes from './routes/habitRoutes.js';
import sequelize from './config/sequelize.js';
import dotenv from 'dotenv';
import { exec } from 'child_process';

// Load environment variables
dotenv.config({ path: './.env' });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the frontend
const __dirname = path.resolve(); // Get the root directory
const distPath = path.join(__dirname, 'client', 'dist');
const indexPath = path.join(distPath, 'index.html');

// Debugging logs
console.log('Current working directory:', process.cwd());
console.log('Dist Path:', distPath);
console.log('Dist Exists:', fs.existsSync(distPath));
console.log('Index.html Exists:', fs.existsSync(indexPath));

// List directory structure for debugging
exec('ls -R /opt/render/project/src', (err, stdout, stderr) => {
  if (err) {
    console.error('Error listing directory structure:', err);
  } else {
    console.log('Directory structure:', stdout);
  }
});

app.use(express.static(distPath));

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
