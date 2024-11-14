import { useState } from 'react';

const HabitOverview = () => {
  // State to track the current date
  const [currentDate, setCurrentDate] = useState(new Date());

  // Function to get the start and end dates of the current week
  const getWeekDates = (date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay() + 1); // Monday
    const endOfWeek = new Date(date);
    endOfWeek.setDate(date.getDate() - date.getDay() + 7); // Sunday

    const options = { month: 'short', day: 'numeric' };
    const startOfWeekStr = startOfWeek.toLocaleDateString(undefined, options);
    const endOfWeekStr = endOfWeek.toLocaleDateString(undefined, options);

    return `${startOfWeekStr} - ${endOfWeekStr}`;
  };

  // Handlers for navigating weeks
  const goToPreviousWeek = () => {
    const previousWeek = new Date(currentDate);
    previousWeek.setDate(currentDate.getDate() - 7);
    setCurrentDate(previousWeek);
  };

  const goToNextWeek = () => {
    const nextWeek = new Date(currentDate);
    nextWeek.setDate(currentDate.getDate() + 7);
    setCurrentDate(nextWeek);
  };

  return (
    <div className="habit-overview">
      <div className="week-navigation">
        <button onClick={goToPreviousWeek}>&larr;</button>
        <h2>{getWeekDates(currentDate)}</h2>
        <button onClick={goToNextWeek}>&rarr;</button>
      </div>
      <p>Up 50% from the week before</p>
      <div className="progress-bar">
        <div className="progress" style={{ width: '86%' }}></div>
      </div>
    </div>
  );
};

export default HabitOverview;