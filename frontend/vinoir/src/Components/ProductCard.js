import React from "react";
import { Card, CardMedia, CardContent, Typography, Button, Box } from "@mui/material";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <Card sx={{
      width: '100%',
      height: '100%',
      margin:'0 auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: 'none',
      border: '1px solid rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
        '& .luxury-overlay': {
          opacity: 1
        }
      }
    }}>
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
          justifyContent: 'center'
        }}>
          <Button
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart({
                ...product,
                id: product._id || product.id // Ensure we have a consistent ID
              });
            }}
            sx={{
              fontFamily: "serif",
              backgroundColor: '#09301e',
              color: 'white',
              '&:hover': {
                backgroundColor: '#09301e'
              }
            }}
          >
            Add to Cart
          </Button>
        </Box>
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
    </Card>
  );
};

export default ProductCard;