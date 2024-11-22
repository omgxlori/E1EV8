// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react'; // Import useState and useEffect to manage user state
import NavBar from './components/NavBar';
import Home from './components/Home'; // Home page component
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import HabitList from './components/HabitList'; // Habit Tracker component
import LoginRequired from './components/LoginRequired'; // LoginRequired page
import './App.css';

function App() {
  const [user, setUser] = useState(null); // user state to manage login info
  const [isLoggedIn, setIsLoggedIn] = useState(false); // state to track login status

  // Check for login status on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // If token exists, the user is logged in
      const storedUser = JSON.parse(localStorage.getItem('user'));
      setUser(storedUser);
    }
  }, []); // Empty array means this runs only once, like componentDidMount

  // Set user info on successful login and update login status
  const handleLogin = (user) => {
    setUser(user);
    setIsLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', user.token); // Store token if required
  };

  // Handle logout by clearing user data and updating login status
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="app-container">
        {/* Pass the login status and logout function to NavBar */}
        <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home page at "/" */}
          <Route path="/signup" element={<SignupForm />} />
          <Route
            path="/login"
            element={<LoginForm setUser={handleLogin} />} // Pass handleLogin to LoginForm
          />
          {/* Conditional routing: If user is logged in, show HabitList, else show LoginRequired */}
          <Route
            path="/habit-tracker"
            element={isLoggedIn ? <HabitList user={user} /> : <LoginRequired />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
