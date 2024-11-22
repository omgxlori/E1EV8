import { Link } from 'react-router-dom';

const LoginRequired = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h2>To access your habit tracker, please log in</h2>
      <p>
        If you already have an account, please 
        <Link to="/login" style={{ color: 'blue', textDecoration: 'underline' }}>
        log in here
        </Link>.
      </p>
    </div>
  );
};

export default LoginRequired;
