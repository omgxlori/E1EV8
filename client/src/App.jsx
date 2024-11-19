// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home'; // Home page component
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import HabitList from './components/HabitList'; // Habit Tracker component
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home page at "/" */}
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/habit-tracker" element={<HabitList />} /> {/* Habit Tracker page */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
