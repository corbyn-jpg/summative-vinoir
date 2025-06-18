// src/Pages/Fragrance/FragranceDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, Grid, Divider } from '@mui/material';
import { useCart } from '../../context/CartContext';

function FragranceDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Fetch product details from your API
        // const response = await fetchProductById(id);
        // setProduct(response.data);
        
        // Mock data for example
        setProduct({
          id,
          name: "Noir Essence",
          description: "A dark, mysterious fragrance with woody notes...",
          price: 120,
          size: "100ml",
          category: "Eau de Parfum",
          notes: ["Bergamot", "Patchouli", "Sandalwood"],
          image: "/images/fragrances/noir-essence.jpg"
        });
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <Box sx={{ maxWidth: 1200, margin: '4rem auto', padding: '2rem' }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <img 
            src={product.image} 
            alt={product.name}
            style={{ width: '100%', borderRadius: '8px' }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            {product.name}
          </Typography>
          <Typography variant="h5" sx={{ mb: 3, color: '#146e3a' }}>
            ${product.price}
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            {product.description}
          </Typography>
          
          <Divider sx={{ my: 3 }} />
          
          <Typography variant="h6" sx={{ mb: 2 }}>
            Fragrance Notes:
          </Typography>
          <ul>
            {product.notes.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
          
          <Button
            variant="contained"
            size="large"
            onClick={() => addToCart(product)}
            sx={{
              mt: 3,
              backgroundColor: '#146e3a',
              '&:hover': { backgroundColor: '#0d5a2c' }
            }}
          >
            Add to Cart
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FragranceDetail;