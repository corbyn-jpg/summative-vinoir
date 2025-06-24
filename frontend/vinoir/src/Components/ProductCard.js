import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom"; // Added for navigation
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent link navigation
    e.stopPropagation(); // Stop event bubbling
    addToCart(product);
  };

  return (
    <Box 
      className="vinoir-product-card"
      component={Link} // Makes entire card clickable
      to={`/fragrance/${product._id}`}
      sx={{
        textDecoration: 'none', // Removes underline from link
        color: 'inherit' // Maintains text color
      }}
    >
      <Box className="vinoir-product-image-container">
        <img
          src={product.images?.[0]?.url || '/images/fallback.jpg'}
          alt={product.name}
          className="vinoir-product-image"
          onError={(e) => {
            e.target.src = '/images/fallback.jpg';
          }}
        />
      </Box>
      
      <Box className="vinoir-product-details">
        <Typography className="vinoir-product-name">
          {product.name}
        </Typography>
        <Typography className="vinoir-product-category">
          {product.category}
        </Typography>
        <Typography className="vinoir-product-price">
          R {product.price.toFixed(2)}
        </Typography>
        <Button
          variant="outlined"
          className="add-to-cart-btn"
          onClick={handleAddToCart}
          sx={{
            mt: 2,
            color: "#146e3a",
            borderColor: "#146e3a",
            "&:hover": {
              backgroundColor: "#146e3a",
              color: "white"
            },
            // Prevent button from stretching full width
            width: 'fit-content',
            mx: 'auto',
            display: 'block'
          }}
        >
          ADD TO CART
        </Button>
      </Box>
    </Box>
  );
};

export default ProductCard;