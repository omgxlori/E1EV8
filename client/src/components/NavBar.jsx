import './NavBar.css'; // Import your CSS file for styling
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate and Link
import PropTypes from 'prop-types'; // Import PropTypes for prop validation

const NavBar = ({ isLoggedIn, handleLogout }) => {
  const navigate = useNavigate(); // Initialize the navigation function

  // Handles navigation to sign-up page
  const handleSignUpClick = () => {
    navigate('/signup');
  };

  // Handles navigation to login page
  const handleLogInClick = () => {
    navigate('/login');
  };

  // Handles log-out functionality
  const handleLogOutClick = () => {
    handleLogout(); // Call the logOut function passed down from App.jsx
    navigate('/'); // Redirect to the home page after logout
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h1 className="logo">E1EV8</h1>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li> {/* Home link */}
          <li><Link to="/habit-tracker">Habit Tracker</Link></li> {/* Habit Tracker link */}
        </ul>
      </div>
      <div className="nav-right">
        {/* Conditionally render buttons based on login status */}
        {!isLoggedIn ? (
          <>
            <button className="nav-button" onClick={handleSignUpClick}>Sign Up</button>
            <button className="nav-button" onClick={handleLogInClick}>Log In</button>
          </>
        ) : (
          <button className="nav-button" onClick={handleLogOutClick}>Log Out</button> // Show "Log Out" when logged in
        )}
      </div>
    </nav>
  );
};

// Prop Types validation
NavBar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default NavBar;
