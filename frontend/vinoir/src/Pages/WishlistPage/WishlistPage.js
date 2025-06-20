// src/Pages/WishlistPage/WishlistPage.js
import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, List, ListItem,
  ListItemText, ListItemAvatar, Avatar, Divider
} from '@mui/material';
import { ArrowBack, Favorite } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/wishlist', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setWishlistItems(response.data);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlist();
  }, [navigate]);

  return (
    <Box sx={{
      maxWidth: '800px',
      margin: '3rem auto',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fff',
    }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate('/account')}
        sx={{ mb: 3 }}
      >
        Back to Account
      </Button>

      <Typography
        variant="h4"
        sx={{
          fontFamily: 'Playfair Display, serif',
          fontWeight: 'bold',
          mb: 3
        }}
      >
        My Wishlist
      </Typography>

      {isLoading ? (
        <Typography variant="h6">Loading...</Typography>
      ) : wishlistItems.length > 0 ? (
        <List>
          {wishlistItems.map((item) => (
            <React.Fragment key={item.id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    src={item.image}
                    variant="square"
                    alt={item.name}
                    sx={{ width: 56, height: 56, mr: 2 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={item.name}
                  secondary={`$${item.price}`}
                />
                <Favorite color="secondary" />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      ) : (
        <Typography variant="body1" sx={{ mt: 2 }}>
          Your wishlist is empty.
        </Typography>
      )}
    </Box>
  );
}

export default WishlistPage;
