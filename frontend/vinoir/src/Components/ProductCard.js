import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useCart } from "../context/CartContext";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <Box className="vinoir-product-card">
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
          onClick={() => addToCart(product)}
          sx={{
            mt: 2,
            color: "#146e3a",
            borderColor: "#146e3a",
            "&:hover": {
              backgroundColor: "#146e3a",
              color: "white"
            }
          }}
        >
          ADD TO CART
        </Button>
      </Box>
    </Box>
  );
};

export default ProductCard;