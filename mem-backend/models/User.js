import React, { useState } from 'react';
import axios from 'axios';
import './CreateUser.css';

const CreateUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage('');
    setError('');

    if (!name || !email || !password) {
      setError('All fields are required.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        name,
        email,
        password,
      });
      localStorage.setItem('token', response.data.token); // Save token to localStorage
      setMessage('Welcome to the Vinoir family! Your account has been created successfully.');
      setTimeout(() => {
        window.location.href = '/';
      }, 3000);
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred while creating your account.');
    }
  };

  return (
    <div className="create-user-container">
      <h1 className="create-user-heading">Join the Vinoir Experience</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          className="create-user-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          className="create-user-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="create-user-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="create-user-button">
          Create Account
        </button>
      </form>
      {message && <div className="create-user-alert-success">{message}</div>}
      {error && <div className="create-user-alert-error">{error}</div>}
    </div>
  );
};

export default CreateUser;