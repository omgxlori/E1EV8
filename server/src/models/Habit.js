import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize.js'; // Make sure you have the correct path

const Habit = sequelize.define('Habit', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  habitName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  completedDays: {
    type: DataTypes.ARRAY(DataTypes.BOOLEAN),  // An array to track completion for each day of the week (Monday to Sunday)
    allowNull: false,
    defaultValue: Array(7).fill(false),  // Default value is an array with 7 `false` values representing no completion
  },
});

export default Habit;
