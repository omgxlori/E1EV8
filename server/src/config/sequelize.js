import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

// Log to ensure environment variables are loaded correctly
console.log({
  DB_NAME: process.env.DB_NAME,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
});

// Create Sequelize instance
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: 5432, // Default PostgreSQL port
  logging: false, // Set to true to log SQL queries for debugging
  dialectOptions: {
    ssl: {
      require: true, // Required for Render-hosted PostgreSQL
      rejectUnauthorized: false, // Allows self-signed certificates
    },
  },
});

export default sequelize;
