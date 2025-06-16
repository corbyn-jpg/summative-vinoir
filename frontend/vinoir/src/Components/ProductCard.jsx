import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';
import PropTypes from 'prop-types';
import Product from '../models/Product'; // Import the Product class

function ProductCard({ product, onAddToCart }) {
  return (
    <Card sx={{ maxWidth: 345, borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
      <CardMedia
        component="img"
        height="300"
        image={product.image}
        alt={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Typography variant="h6">{product.getFormattedPrice()}</Typography>
          <Button 
            variant="contained" 
            startIcon={<AddShoppingCart />}
            onClick={() => onAddToCart(product)}
          >
            Add
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

ProductCard.propTypes = {
  product: PropTypes.instanceOf(Product).isRequired, // Ensure product is an instance of Product
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductCard;