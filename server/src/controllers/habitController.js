import Habit from '../models/Habit.js';  // Import your Habit model

// Controller for handling adding a habit
export const addHabit = async (req, res) => {
  const { userId, habitName, completedDays } = req.body; // Get habit name and completion days from the request body

  if (!habitName || !userId || !Array.isArray(completedDays) || completedDays.length !== 7) {
    return res.status(400).json({ error: 'Invalid data. Habit name, user ID, and days are required.' });
  }

  try {
    // Create a new habit for the user
    const newHabit = await Habit.create({
      userId,
      habitName,
      completedDays,  // Save the completion days array
    });

    res.status(201).json({
      message: 'Habit added successfully',
      habit: newHabit,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add habit' });
  }
};

// Controller for handling updating an existing habit
export const updateHabit = async (req, res) => {
  const { id, habitName, completedDays } = req.body;  // Get habit ID, name, and completion days from the request body

  if (!habitName || !Array.isArray(completedDays) || completedDays.length !== 7 || !id) {
    return res.status(400).json({ error: 'Invalid data. Habit ID, habit name, and days are required.' });
  }

  try {
    // Find the habit by ID and update it
    const habit = await Habit.findByPk(id);
    if (!habit) {
      return res.status(404).json({ error: 'Habit not found' });
    }

    // Update the habit with the new name and completion days
    habit.habitName = habitName;
    habit.completedDays = completedDays;

    // Save the updated habit
    await habit.save();

    res.status(200).json({
      message: 'Habit updated successfully',
      habit: habit,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update habit' });
  }
};
