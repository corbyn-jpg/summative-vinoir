import React from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
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

const ProductCard = ({ product = {} }) => {
  const { addToCart } = useCart();
  const {
    wishlist = [],
    addToWishlist,
    removeFromWishlist,
    loading: wishlistLoading
  } = useWishlist();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const prodId = product.id || product._id;
  const isInWishlist = Array.isArray(wishlist) && wishlist.some(item => (item._id || item.id) === prodId);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await addToCart({ ...product, quantity: 1 });
  };

  const handleWishlistToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      navigate('/login?redirect=' + encodeURIComponent(window.location.pathname));
      return;
    }

    try {
      if (isInWishlist) {
        await removeFromWishlist(prodId);
      } else {
        await addToWishlist(product);
      }
    } catch (error) {
      console.error('Wishlist toggle failed:', error);
    }
  };

  const formatPrice = (price) => {
    if (price == null || isNaN(price)) return "R 0.00";
    return (
      "R " +
      Number(price)
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    );
  };

  return (
    <Box
      component={Link}
      to={`/fragrance/${prodId}`}
      sx={{
        textDecoration: "none",
        color: "inherit",
        position: "relative",
        display: "block",
        height: "100%",
        background: "rgba(26, 26, 26, 0.95)",
        border: "1px solid rgba(230, 212, 120, 0.2)",
        borderRadius: "15px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        transition: "all 0.3s ease",
        "&:hover": { 
          transform: "translateY(-8px)",
          borderColor: "rgba(230, 212, 120, 0.4)",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.3)",
          "& .product-actions": { opacity: 1 }
        },
        outline: "none",
        "&:focus-visible": { 
          boxShadow: "0 0 0 3px rgba(230, 212, 120, 0.5)", 
          borderRadius: "15px" 
        },
        cursor: 'pointer'
      }}
      aria-label={`View details of ${product.name}`}
      tabIndex={0}
    >
      <Box sx={{ 
        position: "absolute", 
        top: 12, 
        right: 12, 
        zIndex: 2, 
        pointerEvents: "auto" 
      }}>
        <Tooltip title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}>
          <IconButton
            onClick={handleWishlistToggle}
            disabled={wishlistLoading}
            sx={{ 
              background: "rgba(26, 26, 26, 0.8)",
              border: "1px solid rgba(230, 212, 120, 0.3)",
              backdropFilter: "blur(10px)",
              color: isInWishlist ? '#8b5a9e' : '#e6d478',
              "&:hover": { 
                background: "rgba(26, 26, 26, 0.95)",
                borderColor: "rgba(230, 212, 120, 0.5)",
                transform: "scale(1.05)"
              }
            }}
            aria-pressed={isInWishlist}
            aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            {isInWishlist ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={{ 
        height: 300, 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        background: "rgba(42, 73, 54, 0.3)",
        border: "1px solid rgba(144, 212, 167, 0.1)",
        borderRadius: "12px", 
        overflow: "hidden", 
        mb: 2, 
        position: "relative" 
      }}>
        <img
          src={product.images?.[0]?.url || product.image || "/images/dior1.jpg"}
          alt={product.name || "Product image"}
          style={{ 
            maxWidth: "100%", 
            maxHeight: "100%", 
            objectFit: "contain", 
            transition: "transform 0.3s ease, filter 0.3s ease" 
          }}
          onError={e => { e.target.onerror = null; e.target.src = "/images/dior1.jpg"; }}
          loading="lazy"
        />
      </Box>

      <Box sx={{ p: 0 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: "600",
            color: "#e6d478",
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "1.1rem",
            lineHeight: 1.3,
            mb: 1,
            transition: "color 300ms ease",
            "&:hover": { color: "#f0e89e" }
          }}
        >
          {product.name}
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            color: "rgba(144, 212, 167, 0.8)",
            mb: 1,
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            fontSize: "0.9rem"
          }}
        >
          {product.category}
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            fontWeight: "800", 
            color: "#90d4a7",
            fontSize: "1.1rem",
            mb: 2 
          }}
        >
          {formatPrice(product.price)}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddShoppingCart />}
          onClick={handleAddToCart}
          fullWidth
          sx={{ 
            background: "linear-gradient(135deg, #8b5a9e, #6d4682)",
            color: "#ffffff",
            border: "1px solid #ffffff",
            borderRadius: "10px",
            padding: "12px 16px",
            fontWeight: 700,
            fontSize: "0.9rem",
            textTransform: "none",
            transition: "all 300ms ease",
            "&:hover": { 
              background: "linear-gradient(135deg, #a66bb5, #8b5a9e)",
              transform: "translateY(-2px)",
              boxShadow: "0 8px 20px rgba(139, 90, 158, 0.4)",
              borderColor: "#ffffff"
            },
            fontFamily: "'Cormorant Garamond', serif"
          }}
          aria-label={`Add ${product.name} to cart`}
        >
          Add to Cart
        </Button>
      </Box>

      {product.onSale && (
        <Box sx={{ 
          position: "absolute", 
          top: 12, 
          left: 12, 
          background: "linear-gradient(90deg, #90d4a7, #7bc492)",
          color: "#08150b", 
          px: 2, 
          py: 1,
          borderRadius: "8px", 
          zIndex: 2, 
          fontWeight: "800", 
          fontSize: "0.75rem", 
          textTransform: "uppercase", 
          userSelect: "none",
          boxShadow: "0 8px 18px rgba(20,110,58,0.12)"
        }} 
        aria-label="Sale"
      >
        SALE
      </Box>
      )}
    </Box>
  );
};

export default ProductCard;