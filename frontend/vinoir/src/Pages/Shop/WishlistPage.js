import React from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Paper,
  CircularProgress
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { FavoriteBorder, ShoppingBag } from '@mui/icons-material';
import ProductCard from '../../Components/ProductCard';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import './ShopPage.css';

const WishlistPage = () => {
  const { wishlist, loading, error } = useWishlist();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <FavoriteBorder sx={{ fontSize: 80, color: '#ddd', mb: 2 }} />
        <Typography variant="h4" sx={{ mb: 2 }}>
          Your Wishlist Awaits
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: '#666' }}>
          Please sign in to view and manage your saved fragrances.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/login?redirect=/wishlist')}
          sx={{
            background: 'linear-gradient(135deg, #2d5a3d 0%, #6a4c93 100%)',
            px: 4
          }}
        >
          Sign In
        </Button>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading your wishlist...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" color="error" sx={{ mb: 2 }}>
          Error Loading Wishlist
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          {error}
        </Typography>
        <Button
          variant="outlined"
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant="h2"
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 300,
            color: '#2d5a3d',
            mb: 2
          }}
        >
          Your Wishlist
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: '#666',
            fontStyle: 'italic',
            mb: 2
          }}
        >
          {wishlist.length} {wishlist.length === 1 ? 'fragrance' : 'fragrances'} saved for later
        </Typography>
      </Box>

      {wishlist.length === 0 ? (
        /* Empty Wishlist */
        <Paper
          elevation={4}
          sx={{
            p: 8,
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(45, 90, 61, 0.05) 0%, rgba(106, 76, 147, 0.05) 100%)'
          }}
        >
          <FavoriteBorder sx={{ fontSize: 80, color: '#ddd', mb: 3 }} />
          <Typography variant="h4" sx={{ mb: 2, color: '#2d5a3d' }}>
            Your Wishlist is Empty
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: '#666' }}>
            Discover our exquisite collection of luxury fragrances and save your favorites here.
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/shop"
            startIcon={<ShoppingBag />}
            sx={{
              background: 'linear-gradient(135deg, #2d5a3d 0%, #6a4c93 100%)',
              px: 4,
              py: 1.5
            }}
          >
            Explore Fragrances
          </Button>
        </Paper>
      ) : (
        /* Wishlist Items */
        <Grid container spacing={4}>
          {wishlist.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product._id || product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Continue Shopping */}
      {wishlist.length > 0 && (
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button
            variant="outlined"
            size="large"
            component={Link}
            to="/shop"
            sx={{
              borderColor: '#2d5a3d',
              color: '#2d5a3d',
              px: 4,
              py: 1.5,
              '&:hover': {
                backgroundColor: 'rgba(45, 90, 61, 0.05)'
              }
            }}
          >
            Continue Shopping
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default WishlistPage;