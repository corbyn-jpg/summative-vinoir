import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Divider, 
  IconButton,
  Stack,
  Paper
} from '@mui/material';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const CartPage = () => {
  const { 
    cart, 
    removeFromCart, 
    updateCartItem, 
    clearCart 
  } = useCart();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  if (cart.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', p: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Your cart is empty
        </Typography>
        <Button 
          variant="contained" 
          component={Link} 
          to="/shop"
          sx={{ backgroundColor: '#146e3a', '&:hover': { backgroundColor: '#0d5a2c' } }}
        >
          Continue Shopping
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: '0 auto' }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        Your Shopping Cart ({cart.length})
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {cart.map((item) => (
            <Paper key={item._id} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={4} sm={3}>
                  <img 
                    src={item.images?.[0]?.url || '/images/fallback.jpg'} 
                    alt={item.name}
                    style={{ 
                      width: '100%', 
                      borderRadius: '8px',
                      maxHeight: '150px',
                      objectFit: 'cover'
                    }}
                  />
                </Grid>
                <Grid item xs={8} sm={9}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="h6" component={Link} to={`/fragrance/${item._id}`}>
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.category}
                      </Typography>
                    </Box>
                    <IconButton 
                      onClick={() => removeFromCart(item._id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                  
                  <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <IconButton 
                        size="small" 
                        onClick={() => updateCartItem(item._id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography>{item.quantity}</Typography>
                      <IconButton 
                        size="small" 
                        onClick={() => updateCartItem(item._id, item.quantity + 1)}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                    <Typography variant="h6">
                      R {(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Order Summary
            </Typography>
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Subtotal</Typography>
              <Typography>R {calculateTotal().toFixed(2)}</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Shipping</Typography>
              <Typography>Free</Typography>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6">R {calculateTotal().toFixed(2)}</Typography>
            </Box>
            
            <Button 
              fullWidth 
              variant="contained" 
              size="large"
              component={Link}
              to="/checkout"
              sx={{ 
                backgroundColor: '#146e3a',
                '&:hover': { backgroundColor: '#0d5a2c' }
              }}
            >
              Proceed to Checkout
            </Button>
            
            <Button 
              fullWidth 
              variant="outlined" 
              size="large"
              onClick={clearCart}
              sx={{ 
                mt: 2,
                color: '#146e3a',
                borderColor: '#146e3a',
                '&:hover': { 
                  backgroundColor: '#146e3a',
                  color: 'white'
                }
              }}
            >
              Clear Cart
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartPage;