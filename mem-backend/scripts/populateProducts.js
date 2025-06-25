import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Typography, Button, CircularProgress, Tabs, Tab, Grid
} from '@mui/material';
import { useCart } from '../../context/CartContext';

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [recommended, setRecommended] = useState([]);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!response.ok) throw new Error('Product not found');
        const data = await response.json();
        setProduct(data);

        const recommendedRes = await fetch('http://localhost:5000/api/products');
        const allProducts = await recommendedRes.json();
        const filtered = allProducts.filter(p => p._id !== id).slice(0, 4);
        setRecommended(filtered);
      } catch (err) {
        setError(err.message);
        setProduct(null);
      } finally {
        setLoading(false);
        setFadeOut(false); // Reset fade state on load
      }
    };
    fetchProduct();
  }, [id]);

  const formatRand = (num) =>
    'R' + num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const handleProductClick = (productId) => {
    setFadeOut(true);
    setTimeout(() => {
      navigate(`/fragrance/${productId}`);
    }, 300); // match fade duration
  };

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
      className={`fade-container ${fadeOut ? 'fade-out' : ''}`}
      sx={{ width: '100%', px: { xs: 2, md: 6 }, pt: 4 }}
    >
      {/* Product Detail Grid */}
      <Grid container spacing={6} sx={{ width: '100%', mx: 0 }}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              backgroundColor: '#f8f5f2',
              borderRadius: 2,
              overflow: 'hidden',
              height: { xs: 350, md: 500 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={product.images?.[0]?.url || '/images/fallback.jpg'}
              alt={product.name}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
              }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontFamily: 'Playfair Display, serif',
                fontWeight: 'bold',
                mb: 1,
                color: '#222',
              }}
            >
              {product.name}
            </Typography>

            <Typography variant="subtitle1" sx={{ color: '#222', mb: 1 }}>
              {product.category} • {product.size || 'Standard'}
            </Typography>

            <Typography variant="h5" sx={{ mb: 3, color: '#222' }}>
              {formatRand(product.price)}
            </Typography>

            <Button
              variant="contained"
              onClick={() => addToCart(product)}
              size="large"
              sx={{
                backgroundColor: '#146e3a',
                py: 1.5,
                width: '100%',
                mb: 3,
                '&:hover': { backgroundColor: '#0d5a2c' }
              }}
            >
              Add to Bag
            </Button>

            <Tabs
              value={tabIndex}
              onChange={(e, val) => setTabIndex(val)}
              centered
              sx={{ mb: 3 }}
            >
              <Tab label="Description" />
              <Tab label="Ingredients" />
            </Tabs>

            <Box>
              {tabIndex === 0 && (
                <Typography sx={{ color: '#333', mb: 3 }}>{product.description}</Typography>
              )}
              {tabIndex === 1 && (
                <Typography sx={{ color: '#333', mb: 3 }}>
                  {[...(product.fragranceNotes?.topNotes || []), ...(product.fragranceNotes?.middleNotes || []), ...(product.fragranceNotes?.baseNotes || [])].join(', ')}
                </Typography>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Recommended Products */}
      <Box sx={{ mt: 8 }}>
        <Typography
          variant="h5"
          sx={{ mb: 4, fontWeight: 'bold', color: '#222', textAlign: 'center' }}
        >
          You may also like
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
            gap: 4,
          }}
        >
          {recommended.map((rec) => (
            <Box
              key={rec._id}
              sx={{
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'transform 0.35s ease, opacity 0.35s ease',
                '&:hover': { transform: 'scale(1.03)' },
              }}
              onClick={() => handleProductClick(rec._id)}
            >
              <Box
                sx={{
                  backgroundColor: '#f8f5f2',
                  borderRadius: 2,
                  overflow: 'hidden',
                  height: 300,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2
                }}
              >
                <img
                  src={rec.images?.[0]?.url || '/images/fallback.jpg'}
                  alt={rec.name}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                  }}
                />
              </Box>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{rec.name}</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>{rec.category}</Typography>
              <Typography variant="body2">{formatRand(rec.price)}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default ProductPage;
