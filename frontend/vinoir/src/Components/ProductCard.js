import React from "react";
import { 
  Box, 
  Typography, 
  Button, 
  IconButton,
  Badge,
  Tooltip
} from "@mui/material";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  Favorite,
  FavoriteBorder,
  AddShoppingCart
} from "@mui/icons-material";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { 
    wishlist, 
    addToWishlist, 
    removeFromWishlist,
    loading: wishlistLoading
  } = useWishlist();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const isInWishlist = wishlist.some(item => item._id === product._id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ ...product, quantity: 1 });
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isLoggedIn) {
      navigate('/login?redirect=' + window.location.pathname);
      return;
    }

    if (isInWishlist) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <Box 
      component={Link}
      to={`/fragrance/${product._id}`}
      sx={{
        textDecoration: 'none',
        color: 'inherit',
        position: 'relative',
        display: 'block',
        height: '100%',
        '&:hover': {
          transform: 'translateY(-5px)',
          transition: 'transform 0.3s ease',
          '& .product-actions': {
            opacity: 1
          }
        }
      }}
    >
      {/* Wishlist Button */}
      <Box sx={{ 
        position: 'absolute', 
        top: 8, 
        right: 8,
        zIndex: 1 
      }}>
        <Tooltip title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}>
          <IconButton
            onClick={handleWishlistToggle}
            disabled={wishlistLoading}
            sx={{
              backgroundColor: 'rgba(255,255,255,0.8)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.9)'
              }
            }}
            color={isInWishlist ? "error" : "default"}
          >
            {isInWishlist ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
        </Tooltip>
      </Box>

      {/* Product Image */}
      <Box sx={{ 
        height: '300px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f5f2',
        borderRadius: '8px',
        overflow: 'hidden',
        mb: 2,
        position: 'relative'
      }}>
        <img
          src={product.images?.[0]?.url || '/images/fallback.jpg'}
          alt={product.name}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
            transition: 'transform 0.3s ease'
          }}
          onError={(e) => {
            e.target.src = '/images/fallback.jpg';
          }}
        />
      </Box>
      
      {/* Product Details */}
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {product.category}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 2 }}>
          R {product.price.toFixed(2)}
        </Typography>
        
        {/* Add to Cart Button */}
        <Button
          variant="outlined"
          startIcon={<AddShoppingCart />}
          onClick={handleAddToCart}
          fullWidth
          sx={{
            color: '#146e3a',
            borderColor: '#146e3a',
            '&:hover': {
              backgroundColor: '#146e3a',
              color: 'white'
            }
          }}
        >
          Add to Cart
        </Button>
      </Box>

      {/* Sale Badge (example) */}
      {product.onSale && (
        <Box sx={{
          position: 'absolute',
          top: 8,
          left: 8,
          backgroundColor: '#146e3a',
          color: 'white',
          px: 1,
          borderRadius: '4px',
          zIndex: 1
        }}>
          <Typography variant="caption">SALE</Typography>
        </Box>
      )}
    </Box>
  );
};

export default ProductCard;