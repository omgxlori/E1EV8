import { useState } from 'react';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    timeZone: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if password and confirmPassword match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch('https://e1ev8.onrender.com/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          timeZone: formData.timeZone,
          confirmPassword: formData.confirmPassword,
        }),
      });

      const result = await response.json();
      
      if (response.ok) {
        // Handle successful signup
        console.log('User created:', result);
        alert('Sign up successful!');
        // You can redirect the user or perform any other action here
      } else {
        // Handle errors returned from the backend
        console.error(result.error);
        alert(result.error || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
      </label>
      <label>
        Last Name:
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </label>
      <label>
        Password:
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
      </label>
      <label>
        Confirm Password:
        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
      </label>
      <label>
        Time Zone:
        <select name="timeZone" value={formData.timeZone} onChange={handleChange} required>
          <option value="">Select Time Zone</option>
          <option value="Pacific/Honolulu">Hawaii-Aleutian Standard Time (HAST) - UTC-10:00</option>
          <option value="America/Anchorage">Alaska Standard Time (AKST) - UTC-09:00</option>
          <option value="America/Los_Angeles">Pacific Standard Time (PST) - UTC-08:00</option>
          <option value="America/Denver">Mountain Standard Time (MST) - UTC-07:00</option>
          <option value="America/Chicago">Central Standard Time (CST) - UTC-06:00</option>
          <option value="America/New_York">Eastern Standard Time (EST) - UTC-05:00</option>
          <option value="Atlantic/Bermuda">Atlantic Standard Time (AST) - UTC-04:00</option>
          <option value="Europe/London">Greenwich Mean Time (GMT) - UTC+00:00</option>
          <option value="Europe/Paris">Central European Time (CET) - UTC+01:00</option>
          <option value="Asia/Dubai">Gulf Standard Time (GST) - UTC+04:00</option>
          <option value="Asia/Kolkata">India Standard Time (IST) - UTC+05:30</option>
          <option value="Asia/Singapore">Singapore Standard Time (SGT) - UTC+08:00</option>
          <option value="Asia/Tokyo">Japan Standard Time (JST) - UTC+09:00</option>
          <option value="Australia/Sydney">Australian Eastern Standard Time (AEST) - UTC+10:00</option>
          {/* Add more time zones as needed */}
        </select>
      </label>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupForm;
