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
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const prodId = product.id || product._id;
  const isInWishlist = Array.isArray(wishlist) && wishlist.some(item => (item._id || item.id) === prodId);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ ...product, quantity: 1 });
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      navigate('/login?redirect=' + encodeURIComponent(window.location.pathname));
      return;
    }

    if (isInWishlist) {
      removeFromWishlist(prodId);
    } else {
      addToWishlist(product);
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
        transition: "transform 0.3s ease",
        "&:hover": { transform: "translateY(-5px)", "& .product-actions": { opacity: 1 } },
        outline: "none",
        "&:focus-visible": { boxShadow: "0 0 0 3px var(--gold-accent)", borderRadius: 1 },
        cursor: 'pointer'
      }}
      aria-label={`View details of ${product.name}`}
      tabIndex={0}
    >
      <Box sx={{ position: "absolute", top: 8, right: 8, zIndex: 2, pointerEvents: "auto" }}>
        <Tooltip title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}>
          <IconButton
            onClick={handleWishlistToggle}
            disabled={wishlistLoading}
            sx={{ backgroundColor: "rgba(255,255,255,0.8)", "&:hover": { backgroundColor: "rgba(255,255,255,0.95)" } }}
            color={isInWishlist ? "error" : "default"}
            aria-pressed={isInWishlist}
            aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            {isInWishlist ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={{ height: 300, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f8f5f2", borderRadius: 2, overflow: "hidden", mb: 2, position: "relative" }}>
        <img
          src={product.images?.[0]?.url || product.image || "/images/dior1.jpg"}
          alt={product.name || "Product image"}
          style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", transition: "transform 0.3s ease" }}
          onError={e => { e.target.onerror = null; e.target.src = "/images/dior1.jpg"; }}
          loading="lazy"
        />
      </Box>

      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>{product.name}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{product.category}</Typography>
        <Typography variant="body1" sx={{ fontWeight: "bold", mb: 2 }}>{formatPrice(product.price)}</Typography>
        <Button
          variant="outlined"
          startIcon={<AddShoppingCart />}
          onClick={handleAddToCart}
          fullWidth
          sx={{ color: "#146e3a", borderColor: "#146e3a", "&:hover": { backgroundColor: "#146e3a", color: "white" }, textTransform: "uppercase", fontWeight: 600, letterSpacing: "0.05em", fontFamily: "'Cormorant Garamond', serif", borderRadius: 1, py: 1.25 }}
          aria-label={`Add ${product.name} to cart`}
        >
          Add to Cart
        </Button>
      </Box>

      {product.onSale && (
        <Box sx={{ position: "absolute", top: 8, left: 8, backgroundColor: "#146e3a", color: "white", px: 1, borderRadius: 1, zIndex: 2, fontWeight: "bold", fontSize: "0.75rem", textTransform: "uppercase", userSelect: "none" }} aria-label="Sale">SALE</Box>
      )}
    </Box>
  );
};

export default ProductCard;