import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { useCart } from '../../context/CartContext';

function ProductPage() {
  const { id } = useParams(); // Get product ID from URL
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !product || !product._id) {
    return (
      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Typography variant="h4" sx={{ color: '#c62828', fontWeight: 'bold' }}>
          {error || 'Product not found'}
        </Typography>
      </Box>
    );
  }

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
      <img
        src={product.images?.[0]?.url || '/images/fallback.jpg'}
        alt={product.images?.[0]?.altText || product.name}
        style={{ width: '100%', height: 'auto', borderRadius: '12px', marginBottom: '1.5rem' }}
      />
      <Typography
        variant="h4"
        sx={{
          fontFamily: 'Playfair Display, serif',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '1rem',
          color: '#222',
        }}
      >
        {product.name}
      </Typography>
      <Typography variant="h6" sx={{ textAlign: 'center', color: '#555', marginBottom: '1rem' }}>
        ${product.price}
      </Typography>
      <Typography sx={{ textAlign: 'center', color: '#333', marginBottom: '2rem' }}>
        {product.description}
      </Typography>
      <Button
        variant="contained"
        onClick={() => addToCart(product)}
        sx={{
          display: 'block',
          margin: '0 auto',
          backgroundColor: '#146e3a',
          color: '#fff',
          fontWeight: 'bold',
          '&:hover': { backgroundColor: '#0d5a2c' },
        }}
      >
        Add to Cart
      </Button>
    </Box>
  );
}

export default ProductPage;
