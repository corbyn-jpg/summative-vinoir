// src/Pages/AccountPage/PersonalDataPage.js
import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, List, ListItem, ListItemText, 
  Avatar, Button, Paper 
} from '@mui/material';
import { Person, Lock, ArrowBack } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EmojiSelector from '../../Components/EmojiSelector';

function PersonalDataPage() {
  const [userData, setUserData] = useState(null);
  const [emojiPassword, setEmojiPassword] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/users/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserData(response.data);
        if (response.data.password) {
          setEmojiPassword(response.data.password.split(''));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        localStorage.removeItem('token');
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (isLoading) {
    return (
      <Box className="account-page-container">
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box className="account-page-container">
      <Button 
        startIcon={<ArrowBack />} 
        onClick={() => navigate('/account')}
        sx={{ mb: 3 }}
      >
        Back to Account
      </Button>

      <Typography variant="h4" className="account-page-heading">
        Personal Data
      </Typography>

      <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar sx={{ 
            width: 80, 
            height: 80, 
            bgcolor: '#146e3a',
            fontSize: '2rem',
            mr: 3
          }}>
            {userData?.name?.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="h6">{userData?.name}</Typography>
            <Typography variant="body1">{userData?.email}</Typography>
          </Box>
        </Box>

        <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
          Emoji Password
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          p: 2,
          backgroundColor: '#f5f5f5',
          borderRadius: 1
        }}>
          <Lock color="action" sx={{ mr: 2 }} />
          <Box sx={{ display: 'flex' }}>
            {emojiPassword.map((emoji, index) => (
              <Typography key={index} variant="h5" sx={{ mx: 0.5 }}>
                {emoji}
              </Typography>
            ))}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default PersonalDataPage;