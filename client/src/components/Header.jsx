import { useState, useEffect } from 'react';

const Header = () => {
  // Initialize the user's name and bedtime
  const [userName, setUserName] = useState("User");
  const [bedtime, setBedtime] = useState("22:00"); // Default bedtime (10:00 PM)

  // Function to determine the appropriate greeting based on the time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  // Function to calculate the time left until bedtime
  const getTimeUntilBedtime = () => {
    const now = new Date();
    const [bedHour, bedMinute] = bedtime.split(":").map(Number);
    const bedtimeToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      bedHour,
      bedMinute
    );

    let timeDifference = bedtimeToday - now;
    if (timeDifference < 0) {
      // If the bedtime has already passed today, calculate for the next day
      timeDifference += 24 * 60 * 60 * 1000;
    }

    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours} hrs ${minutes} mins till bedtime`;
  };

  // Load the user's name and bedtime from local storage when the component mounts
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const storedBedtime = localStorage.getItem("bedtime");

    if (storedName) {
      setUserName(storedName);
    }
    if (storedBedtime) {
      setBedtime(storedBedtime);
    }
  }, []);

  return (
    <div className="header">
      <h1>{getGreeting()}, {userName}</h1>
      <p>{getTimeUntilBedtime()}</p>
    </div>
  );
};

export default Header;
