import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext'; // Ensure CartContext is implemented
import productData from '../../data/products'; // Mock product data

function ProductPage() {
  const { id } = useParams(); // Get product ID from URL
  const { addToCart } = useCart();
  const product = productData.find((item) => item.id === parseInt(id)); // Find product by ID

  if (!product) {
    return (
      <Box sx={{ textAlign: 'center', marginTop: '3rem' }}>
        <Typography variant="h4" sx={{ color: '#c62828', fontWeight: 'bold' }}>
          Product not found
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: '800px', margin: '3rem auto', padding: '2rem', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)', background: 'linear-gradient(145deg, #ffffff, #f3f3f3)' }}>
      <img src={product.image} alt={product.name} style={{ width: '100%', height: 'auto', borderRadius: '12px', marginBottom: '1.5rem' }} />
      <Typography variant="h4" sx={{ fontFamily: 'Playfair Display, serif', fontWeight: 'bold', textAlign: 'center', marginBottom: '1rem', color: '#222' }}>
        {product.name}
      </Typography>
      <Typography variant="h6" sx={{ textAlign: 'center', color: '#555', marginBottom: '1rem' }}>
        ${product.price}
      </Typography>
      <Typography sx={{ textAlign: 'center', color: '#333', marginBottom: '2rem' }}>
        {product.description}
      </Typography>
      <Button variant="contained" onClick={() => addToCart(product)} sx={{ display: 'block', margin: '0 auto', backgroundColor: '#146e3a', color: '#fff', fontWeight: 'bold', '&:hover': { backgroundColor: '#0d5a2c' } }}>
        Add to Cart
      </Button>
    </Box>
  );
}

export default ProductPage;