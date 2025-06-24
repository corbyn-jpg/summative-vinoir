import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress, Tabs, Tab, Grid } from '@mui/material';
import { useCart } from '../../context/CartContext';
import ProductCard from '../../Components/ProductCard';

function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [recommended, setRecommended] = useState([]);

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
        const filtered = allProducts.filter(p => p._id !== id).slice(0, 3); // 3 recommended
        setRecommended(filtered);
      } catch (err) {
        setError(err.message);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return (
    <Box sx={{ textAlign: 'center', mt: 6 }}>
      <CircularProgress />
    </Box>
  );

  if (error || !product || !product._id) return (
    <Box sx={{ textAlign: 'center', mt: 6 }}>
      <Typography variant="h4" sx={{ color: '#c62828', fontWeight: 'bold' }}>
        {error || 'Product not found'}
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ maxWidth: 1400, mx: '0', px: 3, py: 6 }}> {/* wider container, aligned left */}
      {/* Product Detail Grid */}
      <Grid container spacing={6} alignItems="flex-start">
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
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ ml: { md: 2 }, mr: { md: 6 } }}> {/* keeps content next to image */}
            <Typography
              variant="h4"
              sx={{ fontFamily: 'Playfair Display, serif', fontWeight: 'bold', mb: 1, color: '#222' }}
            >
              {product.name}
            </Typography>

            <Typography variant="subtitle1" sx={{ color: '#222', mb: 1 }}>
              {product.category} • {product.size || 'Standard'}
            </Typography>

            <Typography variant="h5" sx={{ mb: 3, color: '#222' }}>
              ${product.price.toFixed(2)}
            </Typography>

            <Button
              variant="contained"
              onClick={() => addToCart(product)}
              size="large"
              sx={{ backgroundColor: '#146e3a', py: 1.5, width: '100%', mb: 3, '&:hover': { backgroundColor: '#0d5a2c' } }}
            >
              Add to Bag
            </Button>

            <Tabs value={tabIndex} onChange={(e, val) => setTabIndex(val)} centered sx={{ mb: 3 }}>
              <Tab label="Description" />
              <Tab label="Ingredients" />
            </Tabs>

            <Box>
              {tabIndex === 0 && (
                <Typography sx={{ color: '#333', mb: 3 }}>{product.description}</Typography>
              )}
              {tabIndex === 1 && (
                <Typography sx={{ color: '#333', mb: 3 }}>
                  {[
                    ...(product.fragranceNotes?.topNotes || []),
                    ...(product.fragranceNotes?.middleNotes || []),
                    ...(product.fragranceNotes?.baseNotes || []),
                  ].join(', ')}
                </Typography>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Recommended Products */}
      <Box sx={{ mt: 8 }} className="dior-shop-section">
  <Typography 
    variant="h4" 
    className="dior-shop-title"
    sx={{ mb: 4, color: '#222' }}
  >
    You may also like
  </Typography>
  
  <Box className="dior-product-grid">
    {recommended.map((rec) => (
      <Box key={rec._id} className="dior-product-item">
        <Box className="dior-product-image-container">
          <img
            src={rec.images?.[0]?.url || '/images/fallback.jpg'}
            alt={rec.name}
            className="dior-product-image"
          />
        </Box>
        <Typography className="dior-product-title">{rec.name}</Typography>
        <Typography className="dior-product-subtitle">{rec.category}</Typography>
        <Typography className="dior-product-subtitle">${rec.price.toFixed(2)}</Typography>
      </Box>
    ))}
  </Box>
</Box>

    </Box>
  );
}

export default ProductPage;
