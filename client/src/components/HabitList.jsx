import { useState, useEffect } from 'react'; 
import Confetti from 'react-confetti';
import MotivationalQuote from './MotivationalQuote';
import './HabitList.css';

// Helper function to format the date as "Day, Month Date"
const formatDate = (date) => {
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

// Helper function to get the Monday of the current week
const getWeekStartDate = (offset = 0) => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1) + offset * 7;
  const startDate = new Date(now.setDate(diff));
  startDate.setHours(0, 0, 0, 0);
  return startDate;
};

// Helper function to get the end date of the week (Sunday)
const getWeekEndDate = (startDate) => {
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);
  return endDate;
};

// Function to determine the time of day
const getGreeting = () => {
  const hours = new Date().getHours();
  if (hours >= 5 && hours < 12) return 'Good morning';
  if (hours >= 12 && hours < 18) return 'Good afternoon';
  return 'Good evening';
};

const HabitTable = () => {
  const [habits, setHabits] = useState([]); // Store habits
  const [newHabit, setNewHabit] = useState(''); // New habit input
  const [checkedBoxes, setCheckedBoxes] = useState({}); // Stores the checked state for each habit's days
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentWeekStartDate, setCurrentWeekStartDate] = useState(getWeekStartDate(0));

  const [editingHabitIndex, setEditingHabitIndex] = useState(null); // Index of the habit being edited
  const [editingHabitName, setEditingHabitName] = useState(''); // New name for the habit

  // Retrieve user info from localStorage (user is saved here upon successful login)
  const user = JSON.parse(localStorage.getItem('user')); // Get logged-in user from localStorage
  const userName = user ? user.firstName : 'User'; // If user is logged in, use their first name, else default to "User"

  // Load habits and progress from localStorage (if available)
  useEffect(() => {
    const savedHabits = localStorage.getItem('habits');
    const savedCheckedBoxes = localStorage.getItem('checkedBoxes');
    const savedWeekStartDate = localStorage.getItem('currentWeekStartDate');

    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    }

    if (savedCheckedBoxes) {
      setCheckedBoxes(JSON.parse(savedCheckedBoxes));
    }

    if (savedWeekStartDate) {
      setCurrentWeekStartDate(new Date(savedWeekStartDate));
    }
  }, []);

  // Handle adding a new habit
  const addHabit = async () => {
    if (newHabit.trim() === '') return;

    const updatedHabits = [...habits, newHabit];
    setHabits(updatedHabits);
    localStorage.setItem('habits', JSON.stringify(updatedHabits)); // Save to localStorage

    const newCheckedBoxes = { ...checkedBoxes };
    const weekKey = currentWeekStartDate.toDateString();
    newCheckedBoxes[weekKey] = [
      ...(newCheckedBoxes[weekKey] || []),
      Array(7).fill(false), // Add a new row of checkboxes for the new habit
    ];
    setCheckedBoxes(newCheckedBoxes);
    localStorage.setItem('checkedBoxes', JSON.stringify(newCheckedBoxes)); // Save to localStorage

    // Save habit to backend
    try {
      const habitData = {
        habitName: newHabit,
        completedDays: Array(7).fill(false), // All days are uncompleted by default
      };
      await fetch('https://e1ev8.onrender.com/api/habits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Send the token to authenticate
        },
        body: JSON.stringify(habitData),
      });

      setNewHabit(''); // Clear input after submission
    } catch (error) {
      console.error('Error adding habit:', error);
      alert('Failed to add habit.');
    }
  };

  // Handle editing habit name
  const handleEditClick = (habitIndex) => {
    setEditingHabitIndex(habitIndex);
    setEditingHabitName(habits[habitIndex]);
  };

  // Save the edited habit
  const handleSaveEdit = async () => {
    const updatedHabits = [...habits];
    updatedHabits[editingHabitIndex] = editingHabitName; // Update the habit name
  
    setHabits(updatedHabits);
    localStorage.setItem('habits', JSON.stringify(updatedHabits)); // Save to localStorage
    // Save updated habit to backend
    try {
      await fetch('https://e1ev8.onrender.com/api/habits', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          habitName: editingHabitName,
        }),
      });

      setEditingHabitIndex(null); // Reset the editing state
    } catch (error) {
      console.error('Error saving edited habit:', error);
      alert('Failed to save edited habit.');
    }
  };

  // Cancel habit edit
  const handleCancelEdit = () => {
    setEditingHabitIndex(null);
    setEditingHabitName('');
  };

  // Handle deleting a habit
  const handleDeleteHabit = async (habitName) => {
    try {
      await fetch('https://e1ev8.onrender.com/api/habits', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ habitName }),
      });

      setHabits(habits.filter((habit) => habit !== habitName));
      alert('Habit deleted successfully');
    } catch (error) {
      console.error('Error deleting habit:', error);
      alert('Failed to delete habit');
    }
  };

  // Handle checkbox change (toggle checkbox)
  const handleCheckboxChange = (habitIndex, dayIndex) => {
    const newCheckedBoxes = { ...checkedBoxes };
    const weekKey = currentWeekStartDate.toDateString();
    newCheckedBoxes[weekKey] = newCheckedBoxes[weekKey].map((habit, index) =>
      index === habitIndex
        ? habit.map((checked, i) => (i === dayIndex ? !checked : checked))
        : habit
    );
    setCheckedBoxes(newCheckedBoxes);

    // Save the updated checked state to localStorage
    localStorage.setItem('checkedBoxes', JSON.stringify(newCheckedBoxes));
  };

  // Calculate the total checkboxes and progress percentage
  const totalCheckboxes = habits.length * 7;
  const checkedCount =
    (checkedBoxes[currentWeekStartDate.toDateString()]?.flat().filter(Boolean).length || 0);
  const percentage = Math.round((checkedCount / totalCheckboxes) * 100);

  // Show confetti if all checkboxes are checked
  useEffect(() => {
    if (percentage === 100) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [percentage]);

  const currentWeekEndDate = getWeekEndDate(currentWeekStartDate);

  return (
    <div>
      {/* Display greeting based on the time of day */}
      <h2>{getGreeting()}, {userName}!</h2>

      {/* Motivational quote */}
      <MotivationalQuote />

      {/* Display percentage of habit progress */}
      <p>{percentage}% achieved for this week</p>
      {showConfetti && <Confetti />}

      {/* Progress bar */}
      <div
        className="w3-light-grey w3-round-xlarge"
        style={{
          height: '24px',
          width: '100%',
          backgroundColor: '#ddd',
          borderRadius: '12px',
          overflow: 'hidden',
          marginBottom: '20px',
        }}
      >
        <div
          className="w3-container w3-blue"
          style={{
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: '#007BFF',
            borderRadius: '12px 0 0 12px',
            transition: 'width 0.3s ease',
          }}
        >
          {percentage > 0 && <span style={{ color: '#fff', paddingLeft: '10px' }}>{percentage}%</span>}
        </div>
      </div>

      {/* Date range for current week */}
      <p>{formatDate(currentWeekStartDate)} - {formatDate(currentWeekEndDate)}</p>

      {/* Habit input and add button */}
      <div className="add-habit" style={{ margin: '20px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <input
          type="text"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder="Enter new habit"
          style={{ marginBottom: '10px' }}
        />
        <button onClick={addHabit}>Add Habit</button>
      </div>

      {/* Habit list table */}
      <table className="habit-table" border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Habit</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
            <th>Sun</th>
            <th>Actions</th> {/* Column for Edit/Delete buttons */}
          </tr>
        </thead>
        <tbody>
          {habits.map((habit, habitIndex) => (
            <tr key={habitIndex}>
              <td>
                {editingHabitIndex === habitIndex ? (
                  <>
                    <input
                      type="text"
                      value={editingHabitName}
                      onChange={(e) => setEditingHabitName(e.target.value)}
                    />
                    <button onClick={handleSaveEdit}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </>
                ) : (
                  habit
                )}
              </td>
              {Array(7)
                .fill()
                .map((_, dayIndex) => (
                  <td key={dayIndex}>
                    <input
                      type="checkbox"
                      checked={
                        checkedBoxes[currentWeekStartDate.toDateString()]?.[habitIndex]?.[dayIndex] || false
                      }
                      onChange={() => handleCheckboxChange(habitIndex, dayIndex)}
                    />
                  </td>
                ))}
              <td>
                <button onClick={() => handleEditClick(habitIndex)}>Edit</button>
                <button onClick={() => handleDeleteHabit(habit)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HabitTable;
