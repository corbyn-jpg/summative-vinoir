import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useCart } from '../../context/CartContext'; // Ensure CartContext is implemented

function CartPage() {
  const { cart, removeFromCart } = useCart();

  return (
    <Box sx={{ maxWidth: '800px', margin: '3rem auto', padding: '2rem', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)', background: 'linear-gradient(145deg, #ffffff, #f3f3f3)' }}>
      <Typography variant="h4" sx={{ fontFamily: 'Playfair Display, serif', fontWeight: 'bold', textAlign: 'center', marginBottom: '1.5rem', color: '#222' }}>
        My Cart
      </Typography>

      {cart.length === 0 ? (
        <Typography sx={{ textAlign: 'center', color: '#555' }}>Your cart is empty</Typography>
      ) : (
        cart.map((item) => (
          <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #ddd', paddingBottom: '1rem' }}>
            <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
            <Box sx={{ marginLeft: '1rem', flexGrow: 1 }}>
              <Typography sx={{ fontWeight: 'bold', color: '#333' }}>{item.name}</Typography>
              <Typography sx={{ color: '#555' }}>${item.price} × {item.quantity}</Typography>
            </Box>
            <Button variant="outlined" color="error" onClick={() => removeFromCart(item.id)} sx={{ fontWeight: 'bold', borderColor: '#c62828', color: '#c62828', '&:hover': { backgroundColor: '#ffebee', borderColor: '#c62828' } }}>
              Remove
            </Button>
          </Box>
        ))
      )}

      {cart.length > 0 && (
        <Box sx={{ textAlign: 'center', marginTop: '2rem' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
            Total: ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
          </Typography>
          <Button variant="contained" sx={{ marginTop: '1rem', backgroundColor: '#146e3a', color: '#fff', fontWeight: 'bold', '&:hover': { backgroundColor: '#0d5a2c' } }}>
            Proceed to Checkout
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default CartPage;
