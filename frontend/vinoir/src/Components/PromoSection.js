import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton, Card, CardMedia } from "@mui/material";
import "./PromoSection.css";

const PromoSection = ({ products = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const featuredProducts = products.filter(p => p.featured).slice(0, 5); // Get top 5 featured products

  // Auto-advance every 5 seconds
  useEffect(() => {
    if (featuredProducts.length < 2) return;
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % featuredProducts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredProducts.length]);

  if (featuredProducts.length === 0) return null;

  return (
    <Box sx={{ 
      px: 2, 
      py: 4,
      maxWidth: 'xl',
      mx: 'auto'
    }}>
      <Typography variant="h5" sx={{ 
        mb: 2, 
        textAlign: 'center',
        fontWeight: 'bold',
        letterSpacing: 1
      }}>
        FEATURED FRAGRANCES
      </Typography>

      <Box sx={{
        position: 'relative',
        height: { xs: 300, sm: 400 },
        overflow: 'hidden'
      }}>
        {featuredProducts.map((product, index) => (
          <Card key={product._id} sx={{
            position: 'absolute',
            width: '70%',
            left: '15%',
            height: '100%',
            transition: 'transform 0.5s ease, opacity 0.5s ease, z-index 0.5s ease',
            transform: `translateX(${(index - activeIndex) * 110}%)`,
            opacity: Math.abs(index - activeIndex) > 1 ? 0 : 1,
            zIndex: index === activeIndex ? 2 : 1
          }}>
            <CardMedia
              component="img"
              image={product.images?.[0]?.url || '/placeholder.jpg'}
              alt={product.name}
              sx={{
                height: '70%',
                objectFit: 'cover'
              }}
            />
            <Box sx={{ 
              p: 1.5,
              textAlign: 'center'
            }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {product.name}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {product.category}
              </Typography>
            </Box>
          </Card>
        ))}
      </Box>

      <Box sx={{ 
        display: 'flex',
        justifyContent: 'center',
        mt: 2,
        gap: 1
      }}>
        {featuredProducts.map((_, index) => (
          <IconButton
            key={index}
            size="small"
            onClick={() => setActiveIndex(index)}
            sx={{
              p: 0,
              '&:before': {
                content: '""',
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: activeIndex === index ? 'primary.main' : 'grey.400',
                transition: 'all 0.3s'
              }
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default PromoSection;