// src/Pages/AccountPage/AccountPage.js
import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import EmojiSelector from '../../Components/EmojiSelector';
import axios from 'axios';

function AccountPage() {
  const [emojiPassword, setEmojiPassword] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Fetch user data when component mounts
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          window.location.href = '/login';
          return;
        }

        const response = await axios.get('http://localhost:5000/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserEmail(response.data.email);
        if (response.data.password) {
          setEmojiPassword(response.data.password.split(''));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    };

    fetchUserData();
  }, []);

  const handleSaveChanges = async () => {
    setIsLoading(true);
    setMessage('');
    setError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      await axios.patch(
        'http://localhost:5000/api/users/update-password',
        {
          password: emojiPassword.join(''),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setMessage('Your emoji password has been updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Update error:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Failed to update password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: '800px',
        margin: '3rem auto',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
        background: 'linear-gradient(145deg, #ffffff, #f3f3f3)',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontFamily: 'Playfair Display, serif',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '2rem',
          color: '#222',
        }}
      >
        My Account
      </Typography>

      {userEmail && (
        <Typography
          variant="h6"
          sx={{
            textAlign: 'center',
            marginBottom: '2rem',
            color: '#444',
          }}
        >
          Logged in as: {userEmail}
        </Typography>
      )}
      
      <EmojiSelector
        selectedEmojis={emojiPassword}
        setSelectedEmojis={setEmojiPassword}
        maxLength={5}
      />
      
      <Button
        variant="contained"
        fullWidth
        disabled={isLoading || emojiPassword.length === 0}
        onClick={handleSaveChanges}
        sx={{
          padding: '0.9rem',
          background: 'linear-gradient(145deg, #333, #555)',
          color: '#fff',
          fontWeight: 'bold',
          borderRadius: '8px',
          '&:hover': {
            background: 'linear-gradient(145deg, #555, #333)',
          },
          '&:disabled': {
            background: '#e0e0e0',
            color: '#9e9e9e',
          },
        }}
      >
        {isLoading ? 'Saving...' : 'Save Changes'}
      </Button>
      
      {message && (
        <Typography
          sx={{
            marginTop: '1.5rem',
            padding: '1rem',
            backgroundColor: '#e8f5e9',
            color: '#2e7d32',
            fontWeight: 'bold',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          {message}
        </Typography>
      )}

      {error && (
        <Typography
          sx={{
            marginTop: '1.5rem',
            padding: '1rem',
            backgroundColor: '#ffebee',
            color: '#c62828',
            fontWeight: 'bold',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          {error}
        </Typography>
      )}
    </Box>
  );
}

export default AccountPage;