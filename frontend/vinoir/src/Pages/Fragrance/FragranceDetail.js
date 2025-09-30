// ...existing code...
import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { getProductById } from "../../services/ProductService";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";
import "./FragranceDetail.css";

export default function FragranceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState(null);
  const { addToCart } = useCart();
  const { toggleWishlist, wishlist } = useWishlist();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getProductById(id)
      .then((p) => {
        if (!mounted) return;
        setProduct(p || null);
        setMainImage((p && (p.images?.[0]?.url || p.image)) || "/images/dior1.jpg");
      })
      .catch((err) => {
        console.error(err);
        if (mounted) setProduct(null);
      })
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, [id]);

  const handleWishlistClick = useCallback(async () => {
    if (!isAuthenticated) {
      navigate("/login?redirect=" + encodeURIComponent(window.location.pathname));
      return;
    }
    try {
      await toggleWishlist(product);
    } catch (error) {
      console.error('Wishlist toggle failed:', error);
    }
  }, [isAuthenticated, navigate, toggleWishlist, product]);

  if (loading) return <div className="pd-loading">Loading…</div>;
  if (!product) return <div className="pd-notfound">Product not found</div>;

  const prodId = product.id || product._id;
  const inWishlist = Array.isArray(wishlist) && wishlist.some((p) => (p.id || p._id) === prodId);
  const images = Array.isArray(product.images) && product.images.length ? product.images.map((i) => i.url) : product.image ? [product.image] : ["/images/dior1.jpg"];
  const priceText = product.price ? `R ${Number(product.price).toFixed(2)}` : "N/A";

  return (
    <Box component="main" className="product-detail fade-in" role="main" aria-labelledby="pd-title">
      <Button
        startIcon={<ArrowBackIosNewIcon fontSize="small" />}
        onClick={() => navigate(-1)}
        className="pd-back"
        aria-label="Go back"
      >
        Back
      </Button>

      <Box className="product-grid">
        <Box className="product-gallery card" aria-label="Product images">
          <div className="main-image-wrapper">
            <img src={mainImage} alt={product.name} className="main-image" />
            {product.onSale && <span className="sale-badge">Sale</span>}
          </div>

          {images.length > 1 && (
            <div className="thumb-row" role="list" aria-label="Image thumbnails">
              {images.map((src, i) => (
                <button
                  key={i}
                  className={`thumb-btn ${mainImage === src ? "active" : ""}`}
                  onClick={() => setMainImage(src)}
                  aria-pressed={mainImage === src}
                  aria-label={`Show image ${i + 1}`}
                >
                  <img src={src} alt={`${product.name} ${i + 1}`} />
                </button>
              ))}
            </div>
          )}
        </Box>

        <Box className="product-info card" aria-labelledby="pd-title">
          <Typography id="pd-title" component="h1" variant="h4" className="product-title">
            {product.name}
          </Typography>

          {product.category && <Typography className="product-category muted">{product.category}</Typography>}

          <Typography className="product-price" variant="h5" component="p" aria-live="polite">
            {priceText}
          </Typography>

          <Typography className="product-desc" component="div">
            {product.description || "A refined scent with top, heart and base notes to inspire the senses."}
          </Typography>

          <Box className="product-actions" mt={2}>
            <Button
              variant="contained"
              onClick={() => addToCart(product)}
              className="btn-add"
              aria-label="Add to cart"
            >
              Add to cart
            </Button>

            <IconButton
              onClick={handleWishlistClick}
              className="wishlist-toggle"
              sx={{
                color: inWishlist ? '#6a4c93' : 'inherit',
                '&:hover': {
                  backgroundColor: inWishlist ? 'rgba(106, 76, 147, 0.1)' : 'rgba(0, 0, 0, 0.04)'
                }
              }}
              aria-pressed={inWishlist}
              aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              {inWishlist ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </Box>

          <Box className="product-meta" mt={3}>
            <Typography variant="caption" className="muted">
              SKU: {product.sku || prodId}
            </Typography>
            {product.brand && (
              <Typography variant="caption" className="muted" sx={{ display: "block" }}>
                Brand: {product.brand}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
// ...existing code...