import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import HabitOverview from "./components/HabitOverview";
import HabitList from "./components/HabitList";
import NavBar from './components/NavBar';
import SignupForm from './components/SignupForm'; // Import your SignupForm component
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <NavBar />
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <HabitOverview />
              <HabitList />
            </>
          } />
          <Route path="/signup" element={<SignupForm />} /> {/* Add this route for SignupForm */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
