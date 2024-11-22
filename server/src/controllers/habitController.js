import Habit from '../models/Habit.js';  // Assuming you have a Habit model

// Get all habits for a user
export const getHabits = async (req, res) => {
  try {
    const habits = await Habit.findAll({
      where: { userId: req.user.id } // Get all habits for the logged-in user
    });
    res.json(habits);  // Send back the user's habits
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving habits' });
  }
};

// Add a new habit
export const addHabit = async (req, res) => {
  const { habitName, completedDays } = req.body;  // Destructure from the request body

  try {
    const newHabit = await Habit.create({
      userId: req.user.id,  // Assuming you store userId in the session or token
      habitName,
      completedDays
    });
    res.status(201).json(newHabit); // Return the newly created habit
  } catch (error) {
    res.status(500).json({ error: 'Error creating habit' });
  }
};

// Update an existing habit
export const updateHabit = async (req, res) => {
  const { habitId, habitName, completedDays } = req.body;

  try {
    const habit = await Habit.findByPk(habitId);
    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    await habit.update({ habitName, completedDays });
    res.json(habit); // Return the updated habit
  } catch (error) {
    res.status(500).json({ error: 'Error updating habit' });
  }
};

// Delete a habit
export const deleteHabit = async (req, res) => {
  const { habitId } = req.body;

  try {
    const habit = await Habit.findByPk(habitId);
    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    await habit.destroy();  // Delete the habit from the database
    res.status(200).json({ message: 'Habit deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting habit' });
  }
};
