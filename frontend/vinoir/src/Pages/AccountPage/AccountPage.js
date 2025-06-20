import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, List, ListItem, ListItemText,
  Divider, Paper, Avatar
} from '@mui/material';
import {
  Favorite, Person, ShoppingBag, ExitToApp
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import EmojiSelector from '../../Components/EmojiSelector';
import axios from 'axios';
import './AccountPage.css';

function AccountPage() {
  const [userData, setUserData] = useState(null);
  const [emojiPassword, setEmojiPassword] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
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
        setUserEmail(response.data.email);
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleSaveChanges = async () => {
    setSaving(true);
    setMessage('');
    setError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      await axios.patch(
        'http://localhost:5000/api/users/update-password',
        { password: emojiPassword.join('') },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setMessage('Your emoji password has been updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('Update error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Failed to update password. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Box className="account-page-container">
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box className="account-page-container">
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Avatar sx={{
          width: 60, height: 60, bgcolor: '#146e3a',
          fontSize: '1.5rem', mr: 2
        }}>
          {userData?.name?.charAt(0).toUpperCase()}
        </Avatar>
        <Box>
          <Typography variant="h5" component="h1" className="account-page-heading">
            Welcome, {userData?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {userEmail}
          </Typography>
          <Button
            onClick={handleLogout}
            startIcon={<ExitToApp />}
            sx={{
              mt: 1,
              color: '#555',
              textTransform: 'none',
              p: 0,
              '&:hover': { color: '#c62828', backgroundColor: 'transparent' }
            }}
          >
            Log out
          </Button>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Preferences */}
      <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
        Preferences
      </Typography>
      <Paper elevation={0} sx={{ mb: 3 }}>
        <List>
          <ListItem button onClick={() => navigate('/wishlist')} sx={{ borderRadius: 1 }}>
            <Favorite color="secondary" sx={{ mr: 2 }} />
            <ListItemText primary="Wishlist" />
          </ListItem>
        </List>
      </Paper>

      {/* Profile */}
      <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
        Your Profile
      </Typography>
      <Paper elevation={0} sx={{ mb: 3 }}>
        <List>
          <ListItem button onClick={() => navigate('/account/personal-data')} sx={{ borderRadius: 1 }}>
            <Person color="primary" sx={{ mr: 2 }} />
            <ListItemText primary="Personal data" />
          </ListItem>
        </List>
      </Paper>

      {/* Orders */}
      <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
        Orders
      </Typography>
      <Paper elevation={0} sx={{ mb: 4 }}>
        <List>
          <ListItem button onClick={() => navigate('/account/orders')} sx={{ borderRadius: 1 }}>
            <ShoppingBag color="primary" sx={{ mr: 2 }} />
            <ListItemText primary="Fragrance & Cosmetics orders" />
          </ListItem>
        </List>
      </Paper>

      {/* Emoji Password Update */}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        Emoji Password
      </Typography>
      <EmojiSelector
        selectedEmojis={emojiPassword}
        setSelectedEmojis={setEmojiPassword}
        maxLength={5}
      />

      <Button
        variant="contained"
        fullWidth
        disabled={saving || emojiPassword.length === 0}
        onClick={handleSaveChanges}
        sx={{
          mt: 2,
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
        {saving ? 'Saving...' : 'Save Changes'}
      </Button>

      {/* Feedback messages */}
      {message && (
        <Typography sx={{
          mt: 2,
          p: 2,
          backgroundColor: '#e8f5e9',
          color: '#2e7d32',
          fontWeight: 'bold',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          {message}
        </Typography>
      )}

      {error && (
        <Typography sx={{
          mt: 2,
          p: 2,
          backgroundColor: '#ffebee',
          color: '#c62828',
          fontWeight: 'bold',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}

export default AccountPage;
