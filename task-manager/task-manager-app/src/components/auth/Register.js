import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import './All.css';

const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/register', { email, username, password });
      console.log('Registration successful:', response.data);
      setNotification('You have registered successfully!');
      setTimeout(() => {
        setNotification('');
      }, 3000);
    } catch (error) {
      console.error('Error registering:', error);
      setNotification('Failed to register account');
    }
  };

  return (
    <div className='reg-container'>
      <h2>Register</h2>
      <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
      <p>Already have an account? <Link to="/">Login Here</Link></p>
      {notification && (
        <div className="popup">
          <p className={notification === 'You have registered successfully!' ? 'success-message' : 'error-message'}>{notification}</p>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
