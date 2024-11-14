import './NavBar.css'; // Import your CSS file for styling
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

const NavBar = () => {
  const navigate = useNavigate(); // Initialize the navigation function

  const handleSignUpClick = () => {
    navigate('/signup'); // Navigates to the signup form
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h1 className="logo">E1EV8</h1>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#mood-tracker">Mood Tracker</a></li>
          <li><a href="#milestones">Milestones</a></li>
        </ul>
      </div>
      <div className="nav-right">
        <button className="nav-button" onClick={handleSignUpClick}>Sign Up</button>
        <button className="nav-button">Log In</button>
      </div>
    </nav>
  );
};

export default NavBar;
