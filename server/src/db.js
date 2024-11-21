// src/db.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('users_db', 'postgres', 'T0morrowland!', {
  host: 'localhost',
  dialect: 'postgres', // Use 'postgres' if you're using PostgreSQL
});

// Test the connection
try {
  await sequelize.authenticate();
  console.log('Database connection successful!');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

export default sequelize;
