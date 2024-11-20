import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Home.css'; // Import your CSS file

const Home = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const [breathingText, setBreathingText] = useState('breathe in'); // Initially set to 'breathe in'
  const navigate = useNavigate(); // Initialize the navigation function

  useEffect(() => {
    setFadeIn(true); // Trigger the fade-in effect

    // Set up an interval to switch between "breathe in" and "breathe out"
    const interval = setInterval(() => {
      setBreathingText((prevText) => (prevText === 'breathe in' ? 'breathe out' : 'breathe in')); // Reverse the logic
    }, 2000); // Change text every 2 seconds (half of the 4s animation duration)

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  // Function to handle "Get Started" button click
  const handleGetStartedClick = () => {
    navigate('/signup'); // Navigate to the sign-up form
  };

  // Function to handle "Log In" button click
  const handleLogInClick = () => {
    navigate('/login'); // Navigate to the login form
  };

  return (
    <div className="home-container">
      <h2 className="breathing-text">{breathingText}</h2> {/* Breathing text */}
      <div className={`gif-container ${fadeIn ? 'fade-in' : ''}`}>
        <img
          src="/e1ev8.png"
          alt="E1EV8 Logo Animation"
          className="logo-gif"
        />
      </div>
      <h1 className="welcome-text">
        welcome to e1ev8, your personal habit tracker
      </h1>
      <div className="button-container">
        <button className="home-button" onClick={handleGetStartedClick}>
          Get Started
        </button>
        <button className="home-button" onClick={handleLogInClick}>
          Log In
        </button>
      </div>
    </div>
  );
};

export default Home;
