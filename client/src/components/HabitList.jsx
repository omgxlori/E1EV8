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
    return savedHabits ? JSON.parse(savedHabits) : ['Exercise', 'Read a Book', 'Meditate', 'Drink Water'];
  });

  const [newHabit, setNewHabit] = useState('');
  const [editingHabitIndex, setEditingHabitIndex] = useState(null);
  const [editingHabitText, setEditingHabitText] = useState('');
  const [currentWeekStartDate, setCurrentWeekStartDate] = useState(getWeekStartDate());
  const [checkedBoxes, setCheckedBoxes] = useState(() => {
    const savedData = localStorage.getItem(`habitProgress_${getWeekStartDate().toDateString()}`);
    return savedData ? JSON.parse(savedData) : Array.from({ length: 4 }, () => Array(7).fill(false));
  });

  const [showConfetti, setShowConfetti] = useState(false);
  const [greeting, setGreeting] = useState('');
  const [timeUntilBedtime, setTimeUntilBedtime] = useState('');
  const userName = 'User'; // Replace this with the actual user's name
  const bedtime = '22:00'; // Replace this with the user's set bedtime in 24-hour format (HH:mm)

  // Create a greeting based on the time of day
  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting(`Good Morning, ${userName}`);
    } else if (currentHour < 18) {
      setGreeting(`Good Afternoon, ${userName}`);
    } else {
      setGreeting(`Good Evening, ${userName}`);
    }
  }, [userName]);

  // Calculate time until bedtime
  useEffect(() => {
    const calculateTimeUntilBedtime = () => {
      const [bedHour, bedMinute] = bedtime.split(':').map(Number);
      const now = new Date();
      const bedTime = new Date();
      bedTime.setHours(bedHour, bedMinute, 0, 0);

      if (now > bedTime) {
        bedTime.setDate(bedTime.getDate() + 1);
      }

      const diffMs = bedTime - now;
      const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
      const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      setTimeUntilBedtime(`${diffHrs} hrs and ${diffMins} minutes until bedtime`);
    };

    calculateTimeUntilBedtime();
    const interval = setInterval(calculateTimeUntilBedtime, 60000);
    return () => clearInterval(interval);
  }, [bedtime]);

  // Load progress for the current week from local storage
  useEffect(() => {
    const weekKey = `habitProgress_${currentWeekStartDate.toDateString()}`;
    const savedData = localStorage.getItem(weekKey);
    if (savedData) {
      setCheckedBoxes(JSON.parse(savedData));
    } else {
      setCheckedBoxes(Array.from({ length: habits.length }, () => Array(7).fill(false)));
    }
  }, [currentWeekStartDate, habits.length]);

  // Save progress to local storage whenever checkboxes or week change
  useEffect(() => {
    const weekKey = `habitProgress_${currentWeekStartDate.toDateString()}`;
    localStorage.setItem(weekKey, JSON.stringify(checkedBoxes));
  }, [checkedBoxes, currentWeekStartDate]);

  // Save habits to local storage whenever the habits list changes
  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  // Function to navigate to the next or previous week
  const changeWeek = (offset) => {
    const newWeekStartDate = new Date(currentWeekStartDate);
    newWeekStartDate.setDate(newWeekStartDate.getDate() + offset * 7);
    setCurrentWeekStartDate(newWeekStartDate);
  };

  const addHabit = () => {
    if (newHabit.trim() === '') return;
    setHabits((prevHabits) => [...prevHabits, newHabit]);
    setCheckedBoxes((prevCheckedBoxes) => [
      ...prevCheckedBoxes,
      Array(7).fill(false), // Add a new row of checkboxes for the new habit
    ]);
    setNewHabit('');
  };

  const startEditingHabit = (index) => {
    setEditingHabitIndex(index);
    setEditingHabitText(habits[index]);
  };

  const saveEditedHabit = () => {
    const updatedHabits = [...habits];
    updatedHabits[editingHabitIndex] = editingHabitText;
    setHabits(updatedHabits);
    setEditingHabitIndex(null);
    setEditingHabitText('');
  };

  const deleteHabit = (index) => {
    const updatedHabits = habits.filter((_, habitIndex) => habitIndex !== index);
    const updatedCheckedBoxes = checkedBoxes.filter((_, habitIndex) => habitIndex !== index);
    setHabits(updatedHabits);
    setCheckedBoxes(updatedCheckedBoxes);
  };

  const handleCheckboxChange = (habitIndex, dayIndex) => {
    const newCheckedBoxes = checkedBoxes.map((habit, index) =>
      index === habitIndex ? habit.map((checked, i) => (i === dayIndex ? !checked : checked)) : habit
    );
    setCheckedBoxes(newCheckedBoxes);
  };

  const totalCheckboxes = habits.length * 7;
  const checkedCount = checkedBoxes.flat().filter(Boolean).length;
  const percentage = Math.round((checkedCount / totalCheckboxes) * 100);

  useEffect(() => {
    if (percentage === 100) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [percentage]);

  const currentWeekEndDate = getWeekEndDate(currentWeekStartDate);

  return (
    <div>
      <h2>{greeting}</h2>
      <p>{timeUntilBedtime}</p>
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
                  <div>
                    <input
                      type="text"
                      value={editingHabitText}
                      onChange={(e) => setEditingHabitText(e.target.value)}
                    />
                    <button onClick={saveEditedHabit}>Save</button>
                    <button onClick={() => setEditingHabitIndex(null)}>Cancel</button>
                    <button onClick={() => deleteHabit(habitIndex)}>Delete</button>
                  </div>
                ) : (
                  <span onClick={() => startEditingHabit(habitIndex)}>{habit}</span>
                )}
              </td>
              {Array(7)
                .fill()
                .map((_, dayIndex) => (
                  <td key={dayIndex}>
                    <input
                      type="checkbox"
                      checked={checkedBoxes[habitIndex]?.[dayIndex] || false}
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
