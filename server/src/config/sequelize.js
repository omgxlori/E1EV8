import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'T0morrowland!',  // Make sure to replace this with your actual password
  database: 'users_db',
});

export default sequelize;
