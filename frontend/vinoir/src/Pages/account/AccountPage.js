// AccountPage.js
import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import EmojiSelector from '../../Components/EmojiSelector';

function AccountPage() {
  const [emojiPassword, setEmojiPassword] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveChanges = () => {
    setIsLoading(true);
    setMessage('');
    
    // Simulate API call
    setTimeout(() => {
      setMessage('Your emoji password has been updated successfully!');
      setIsLoading(false);
      setTimeout(() => setMessage(''), 3000);
    }, 1500);
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
    </Box>
  );
}

export default AccountPage;