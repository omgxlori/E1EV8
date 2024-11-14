import { useState } from 'react';

const HabitTable = () => {
  // Example list of habits
  const habits = ['Exercise', 'Read a Book', 'Meditate', 'Drink Water'];

  // State to track checked status for all checkboxes
  const [checkedBoxes, setCheckedBoxes] = useState(
    Array(habits.length).fill(Array(7).fill(false))
  );

  // Function to handle checkbox change
  const handleCheckboxChange = (habitIndex, dayIndex) => {
    const newCheckedBoxes = checkedBoxes.map((habit, index) =>
      index === habitIndex
        ? habit.map((checked, i) => (i === dayIndex ? !checked : checked))
        : habit
    );

    setCheckedBoxes(newCheckedBoxes);
  };

  // Calculate the percentage of checkboxes checked
  const totalCheckboxes = habits.length * 7;
  const checkedCount = checkedBoxes.flat().filter(Boolean).length;
  const percentage = Math.round((checkedCount / totalCheckboxes) * 100);

  return (
    <div>
      <h2>Habit Tracker</h2>
      <p>{percentage}% achieved</p>
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
              {checkedBoxes[habitIndex].map((isChecked, dayIndex) => (
                <td key={dayIndex}>
                  <input
                    type="checkbox"
                    checked={isChecked}
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
