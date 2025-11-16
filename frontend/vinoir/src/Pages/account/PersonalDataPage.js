import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

function PersonalDataPage() {
  return (
    <Box
      sx={{
        maxWidth: '600px',
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
          marginBottom: '1.5rem',
          color: '#222',
        }}
      >
        Personal Data
      </Typography>

      <form>
        <TextField
          label="Full Name"
          variant="outlined"
          fullWidth
          margin="normal"
          sx={{ marginBottom: '1.5rem' }}
        />
        <TextField
          label="Email Address"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          sx={{ marginBottom: '1.5rem' }}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            padding: '0.9rem',
            background: 'linear-gradient(145deg, #333, #555)',
            color: '#fff',
            fontWeight: 'bold',
            borderRadius: '8px',
            marginTop: '1.5rem',
            '&:hover': {
              background: 'linear-gradient(145deg, #555, #333)',
            },
          }}
        >
          Save Changes
        </Button>
      </form>
    </Box>
  );
}

export default PersonalDataPage;