import React, { useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  CircularProgress,
  Alert
} from '@mui/material';
import ProductCard from '../../Components/ProductCard';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

function WishlistPage() {
  const { 
    wishlist, 
    removeFromWishlist, 
    loading, 
    error 
  } = useWishlist();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login?redirect=/wishlist');
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return null; // Redirect will happen
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 3 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ 
      maxWidth: '1200px', 
      margin: '3rem auto', 
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
      background: 'linear-gradient(145deg, #ffffff, #f3f3f3)',
    }}>
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
        My Wishlist
      </Typography>

      {wishlist.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Your wishlist is empty
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to="/shop"
            sx={{
              backgroundColor: '#146e3a',
              '&:hover': { backgroundColor: '#0d5a2c' }
            }}
          >
            Browse Products
          </Button>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {wishlist.map(product => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
              <ProductCard 
                product={product} 
                showRemoveButton 
                onRemove={() => removeFromWishlist(product._id)}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default WishlistPage;