import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

console.log(process.env);

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: 5432
});

export default sequelize;