import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <div className="home">
      <h1>Welcome to E1EV8!</h1>
      <button onClick={handleSignUpClick}>Sign Up</button>
    </div>
  );
};

export default Home;
