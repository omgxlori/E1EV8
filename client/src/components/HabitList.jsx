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

  const [editingHabitIndex, setEditingHabitIndex] = useState(null); // Track habit in edit mode
  const [editingHabitName, setEditingHabitName] = useState(''); // Track the new name when editing

  const userName = 'John Doe'; // Replace with dynamic user info (e.g., from login)

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
  const addHabit = () => {
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

    setNewHabit('');
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

  // Handle edit button click
  const handleEditClick = (habitIndex) => {
    setEditingHabitIndex(habitIndex);
    setEditingHabitName(habits[habitIndex]);
  };

  // Handle save after editing habit
  const handleSaveEdit = () => {
    const updatedHabits = habits.map((habit, index) =>
      index === editingHabitIndex ? editingHabitName : habit
    );
    setHabits(updatedHabits);
    localStorage.setItem('habits', JSON.stringify(updatedHabits)); // Save to localStorage
    setEditingHabitIndex(null); // Stop editing
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingHabitIndex(null); // Stop editing
  };

  // Handle delete button click
  const handleDeleteHabit = (habitIndex) => {
    const updatedHabits = habits.filter((_, index) => index !== habitIndex);
    setHabits(updatedHabits);
    localStorage.setItem('habits', JSON.stringify(updatedHabits)); // Save to localStorage

    const newCheckedBoxes = { ...checkedBoxes };
    const weekKey = currentWeekStartDate.toDateString();
    delete newCheckedBoxes[weekKey][habitIndex]; // Remove the habit's checkbox data
    setCheckedBoxes(newCheckedBoxes);
    localStorage.setItem('checkedBoxes', JSON.stringify(newCheckedBoxes)); // Save to localStorage
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
      <h2>{getGreeting()}, {userName ? userName : 'User'}!</h2>

      {/* Motivational quote */}
      <MotivationalQuote />

      <p>{percentage}% achieved for this week</p>
      {showConfetti && <Confetti />}
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

      <p>{formatDate(currentWeekStartDate)} - {formatDate(currentWeekEndDate)}</p>

      <div
        className="add-habit"
        style={{
          margin: '20px 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <input
          type="text"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder="Enter new habit"
          style={{ marginBottom: '10px' }}
        />
        <button onClick={addHabit}>Add Habit</button>
      </div>

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
                  <>
                    {habit}
                    <button onClick={() => handleEditClick(habitIndex)}>Edit</button>
                    <button onClick={() => handleDeleteHabit(habitIndex)}>Delete</button>
                  </>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HabitTable;
