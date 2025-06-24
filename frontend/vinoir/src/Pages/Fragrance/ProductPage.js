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
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setProduct(data);

        // Fetch recommended products
        const recommendedRes = await fetch('http://localhost:5000/api/products');
        const allProducts = await recommendedRes.json();
        const filtered = allProducts.filter(p => p._id !== id).slice(0, 4);
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
    <Box>
      {/* Sticky Add to Cart Section */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          background: '#fff',
          zIndex: 10,
          p: 2,
          borderBottom: '1px solid #ddd',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#222' }}>{product.name}</Typography>
        <Typography variant="body1" sx={{ fontWeight: 'medium', color: '#555' }}>${product.price}</Typography>
        <Button
          variant="contained"
          onClick={() => addToCart(product)}
          sx={{ backgroundColor: '#146e3a', fontWeight: 'bold', '&:hover': { backgroundColor: '#0d5a2c' } }}
        >
          Add to Cart
        </Button>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          maxWidth: '1000px',
          mx: 'auto',
          my: 6,
          px: 3
        }}
      >
        <img
          src={product.images?.[0]?.url || '/images/fallback.jpg'}
          alt={product.images?.[0]?.altText || product.name}
          style={{ width: '100%', borderRadius: '12px', marginBottom: '2rem' }}
        />

        <Typography
          variant="h4"
          sx={{ fontFamily: 'Playfair Display, serif', fontWeight: 'bold', textAlign: 'center', mb: 1, color: '#222' }}
        >
          {product.name}
        </Typography>

        <Typography variant="h6" sx={{ textAlign: 'center', color: '#222', mb: 2 }}>
          ${product.price}
        </Typography>

        {/* Tabbed Section */}
        <Tabs value={tabIndex} onChange={(e, newVal) => setTabIndex(newVal)} centered sx={{ mb: 3 }}>
          <Tab label="Description" />
          <Tab label="Ingredients" />
        </Tabs>

        <Box>
          {tabIndex === 0 && (
            <Typography sx={{ color: '#333', mb: 3, textAlign: 'center' }}>
              {product.description}
            </Typography>
          )}
          {tabIndex === 1 && (
            <Typography sx={{ color: '#333', mb: 3, textAlign: 'center' }}>
              {product.fragranceNotes?.topNotes?.join(', ')}, {product.fragranceNotes?.middleNotes?.join(', ')}, {product.fragranceNotes?.baseNotes?.join(', ')}
            </Typography>
          )}
        </Box>
      </Box>

      {/* Recommended Products */}
      <Box sx={{ px: 3, pb: 6, maxWidth: '1200px', mx: 'auto' }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#222' }}>
          You may also like
        </Typography>
        <Grid container spacing={3}>
          {recommended.map((rec) => (
            <Grid item xs={12} sm={6} md={3} key={rec._id}>
              <ProductCard product={rec} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default ProductPage;
