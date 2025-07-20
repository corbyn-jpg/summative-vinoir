import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress, Alert } from '@mui/material';
import { useCart } from '../../context/CartContext';

function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setFetchError(null);
    fetch(`http://localhost:5000/api/products/${id}`)
      .then(async (response) => {
        if (!response.ok) {
          const msg = response.status === 404
            ? 'Product not found'
            : 'Failed to fetch product';
          throw new Error(msg);
        }
        return response.json();
      })
      .then((data) => setProduct(data))
      .catch((error) => setFetchError(error.message))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (fetchError) {
    return (
      <Alert severity="error" sx={{ mt: 4, mb: 4, maxWidth: 600, mx: 'auto' }}>
        {fetchError}
      </Alert>
    );
  }

  if (!product) {
    return (
      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Typography variant="h4" sx={{ color: '#c62828', fontWeight: 'bold' }}>
          Product not found
        </Typography>
      </Box>
    );
  }

  const mainImage = product.images?.[0];
  const imgUrl = mainImage?.url || '/placeholder-product.jpg';
  const altText = mainImage?.altText || product.name || 'Product image';

  const inStock = product.stock === undefined || product.stock > 0;

  return (
    <Box
      sx={{
        maxWidth: '800px',
        margin: '3rem auto',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
        background: 'linear-gradient(145deg, #fff, #f3f3f3)',
      }}
    >
      <img
        src={imgUrl}
        alt={altText}
        style={{
          width: '100%',
          height: 'auto',
          borderRadius: '12px',
          marginBottom: '1.5rem',
          background: '#eee',
        }}
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
      <Typography
        variant="h6"
        sx={{ textAlign: 'center', color: '#555', marginBottom: '1rem' }}
      >
        ${Number(product.price).toFixed(2)}
      </Typography>
      <Typography
        sx={{ textAlign: 'center', color: '#333', marginBottom: '2rem' }}
      >
        {product.description}
      </Typography>
      <Button
        variant="contained"
        onClick={() => addToCart({ ...product, id: product._id || product.id })}
        sx={{
          display: 'block',
          margin: '0 auto',
          backgroundColor: '#146e3a',
          color: '#fff',
          fontWeight: 'bold',
          '&:hover': { backgroundColor: '#0d5a2c' },
        }}
        disabled={!inStock}
      >
        {inStock ? 'Add to Cart' : 'Out of Stock'}
      </Button>
    </Box>
  );
}

export default ProductPage;
