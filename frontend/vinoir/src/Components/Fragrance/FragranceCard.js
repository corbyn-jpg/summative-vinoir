import React from 'react';
import { Button } from '@mui/material';
import { useCart } from '../../context/CartContext';
import './FragranceCard.css';

function FragranceCard({ product }) { // Corrected function definition
  const { addToCart } = useCart();

  return (
    <div className="fragrance-card">
      {/* Product image and details */}
      <Button 
        variant="contained" 
        onClick={() => addToCart(product)}
        sx={{
          backgroundColor: '#146e3a',
          '&:hover': { backgroundColor: '#0d5a2c' }
        }}
      >
        Add to Cart
      </Button>
    </div>
  );
}

export default FragranceCard;