import React, { useState } from 'react';
import axios from 'axios';

const CreateUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Clear previous messages
    setMessage('');
    setError('');

    // Basic validation
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
      setMessage('User created successfully!');
      // Redirect to the home page after successful registration
      setTimeout(() => {
        window.location.href = '/';
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      setError(error.response?.data?.message || 'Error creating user.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', fontFamily: 'Arial' }}>
      <h1>Register User</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Name:</label><br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Password:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '0.5rem',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Register
        </button>
      </form>
      {message && <p style={{ marginTop: '1rem', color: 'green' }}>{message}</p>}
      {error && <p style={{ marginTop: '1rem', color: 'red' }}>{error}</p>}
    </div>
  );
};

export default CreateUser;