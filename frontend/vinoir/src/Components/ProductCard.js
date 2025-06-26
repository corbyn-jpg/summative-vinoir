import React from "react";
import { Card, CardMedia, CardContent, Typography, Button, Box } from "@mui/material";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      ...product,
      id: product._id || product.id
    });
  };

  return (
    <Card 
      component={Link}
      to={`/fragrance/${product._id}`}
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: 'none',
        border: '1px solid rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
        textDecoration: 'none',
        position: 'relative',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
          '& .luxury-overlay': {
            opacity: 1
          }
        }
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          image={product.images?.[0]?.url || '/images/fallback.jpg'}
          alt={product.name}
          sx={{
            height: 280,
            objectFit: 'cover',
            filter: 'brightness(0.95)'
          }}
        />
      </Box>

      <CardContent sx={{ 
        flexGrow: 1,
        p: 2.5,
        background: 'linear-gradient(to bottom, #f9f9f9, #f0f0f0)'
      }}>
        <Typography variant="h6" sx={{ 
          fontWeight: 600,
          mb: 0.5,
          fontFamily: '"Playfair Display", serif',
          color: '#333'
        }}>
          {product.name}
        </Typography>
        <Typography variant="body2" sx={{ 
          mb: 1,
          color: '#666',
          fontStyle: 'italic',
          fontSize: '0.8rem'
        }}>
          {product.category}
        </Typography>
        <Typography variant="h6" sx={{ 
          fontWeight: 700,
          color: '#146e3a',
          letterSpacing: '0.5px'
        }}>
          R {product.price.toFixed(2)}
        </Typography>
      </CardContent>

      {/* Add to Cart Button - Positioned absolutely to prevent link triggering */}
      <Box className="luxury-overlay" sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.3))',
        opacity: 0,
        transition: 'opacity 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none' // This allows clicks to pass through to the link
      }}>
        <Box sx={{ pointerEvents: 'auto' }}> {/* This enables clicks just for the button */}
          <Button
            variant="contained"
            onClick={handleAddToCart}
            sx={{
              backgroundColor: 'rgba(20, 110, 58, 0.9)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(15, 85, 45, 0.9)'
              }
            }}
          >
            Add to Cart
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

export default ProductCard;