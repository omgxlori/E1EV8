import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

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

const HabitTable = () => {
  const [habits, setHabits] = useState(() => {
    const savedHabits = localStorage.getItem('habits');
    return savedHabits ? JSON.parse(savedHabits) : [];
  });
  const [newHabit, setNewHabit] = useState('');
  const [checkedBoxes, setCheckedBoxes] = useState(() => {
    const savedCheckedBoxes = localStorage.getItem('checkedBoxes');
    return savedCheckedBoxes ? JSON.parse(savedCheckedBoxes) : {};
  });
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentWeekStartDate, setCurrentWeekStartDate] = useState(getWeekStartDate(0));

  // Save habits and checkedBoxes to localStorage
  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem('checkedBoxes', JSON.stringify(checkedBoxes));
  }, [checkedBoxes]);

  // Handle adding a new habit
  const addHabit = () => {
    if (newHabit.trim() === '') return;

    // Add the new habit to the list of habits
    setHabits((prevHabits) => [...prevHabits, newHabit]);

    // Initialize the checkboxes for the new habit in the current week
    const newCheckedBoxes = { ...checkedBoxes };
    const weekKey = currentWeekStartDate.toDateString();
    newCheckedBoxes[weekKey] = [
      ...(newCheckedBoxes[weekKey] || []),
      Array(7).fill(false), // Add a new row of checkboxes for the new habit
    ];
    setCheckedBoxes(newCheckedBoxes);

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
  };

  // Navigate to the next or previous week
  const changeWeek = (offset) => {
    const newWeekStartDate = new Date(currentWeekStartDate);
    newWeekStartDate.setDate(newWeekStartDate.getDate() + offset * 7);
    setCurrentWeekStartDate(newWeekStartDate);

    const weekKey = newWeekStartDate.toDateString();
    if (!(weekKey in checkedBoxes)) {
      setCheckedBoxes((prevCheckedBoxes) => ({
        ...prevCheckedBoxes,
        [weekKey]: habits.map(() => Array(7).fill(false)), // Initialize checkboxes for the new week
      }));
    }
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
      <h2>Habit Tracker</h2>
      <p>{percentage}% achieved</p>
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
      <div className="week-navigation">
        <button onClick={() => changeWeek(-1)}>← Previous Week</button>
        <span>
          {formatDate(currentWeekStartDate)} - {formatDate(currentWeekEndDate)}
        </span>
        <button onClick={() => changeWeek(1)}>Next Week →</button>
      </div>
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
              <td>{habit}</td>
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
