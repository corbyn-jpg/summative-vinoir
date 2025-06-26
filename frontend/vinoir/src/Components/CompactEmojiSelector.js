
import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';

const emojiOptions = [
  '🌹', '🌸', '🌼', '🌺', '🌷', '💐', '🍀', '🌿', '🍃', '🌾', '🌻', '🌵', '🌲', '🌳', '🌴',
  '🌱', '🌍', '🌞', '🌙', '✨', '💎', '🕊️', '🪷', '🪴', '🕯️', '🍋', '🍊', '🍎', '🍇', '🍓',
];

const CompactEmojiSelector = ({ selectedEmojis, setSelectedEmojis, maxLength = 5 }) => {
  const handleEmojiClick = (emoji) => {
    if (selectedEmojis.length >= maxLength) return;
    setSelectedEmojis((prev) => [...prev, emoji]);
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Grid container spacing={1} justifyContent="center">
        {emojiOptions.slice(0, 12).map((emoji, index) => (
          <Grid item key={index}>
            <Paper
              elevation={1}
              sx={{
                padding: '0.3rem',
                borderRadius: '50%',
                textAlign: 'center',
                cursor: 'pointer',
                fontSize: '1.2rem',
                transition: 'transform 0.2s ease',
                '&:hover': {
                  transform: 'scale(1.2)',
                },
              }}
              onClick={() => handleEmojiClick(emoji)}
            >
              {emoji}
            </Paper>
          </Grid>
        ))}
      </Grid>
      
      <Box sx={{ mt: 2, minHeight: '40px' }}>
        {selectedEmojis.length > 0 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            {selectedEmojis.map((emoji, index) => (
              <Typography
                key={index}
                component="span"
                sx={{
                  fontSize: '1.5rem',
                  margin: '0 0.1rem',
                }}
              >
                {emoji}
              </Typography>
            ))}
          </Box>
        ) : (
          <Typography variant="body2" sx={{ 
            color: '#777', 
            fontStyle: 'italic',
            textAlign: 'center'
          }}>
            No emojis selected yet
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default CompactEmojiSelector;