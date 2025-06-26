import { 
  Box, 
  Typography, 
  Button, 
  IconButton, 
  Badge,
  Tooltip,
  Skeleton,
  Fade,
  CircularProgress // Add this
} from '@mui/material';
import { 
  AddShoppingCart, 
  Favorite, 
  FavoriteBorder 
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";

const ProductCard = ({ product, loading = false }) => {
  const { addToCart, loading: cartLoading } = useCart();
  const { 
    wishlist, 
    addToWishlist, 
    removeFromWishlist,
    loading: wishlistLoading 
  } = useWishlist();
  const { isLoggedIn } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [wishlistAnimating, setWishlistAnimating] = useState(false);
  
  const isInWishlist = wishlist.some(item => item._id === product?._id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({ 
      ...product, 
      quantity: 1 
    });
    
    showNotification(`${product.name} added to cart!`, 'success');
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isLoggedIn) {
      showNotification('Please sign in to add to wishlist', 'info');
      navigate('/login', { 
        state: { 
          from: window.location.pathname,
          email: localStorage.getItem('lastEmail') || ''
        } 
      });
      return;
    }

    setWishlistAnimating(true);
    
    if (isInWishlist) {
      removeFromWishlist(product._id);
      showNotification('Removed from wishlist', 'info');
    } else {
      addToWishlist(product);
      showNotification('Added to wishlist!', 'success');
    }
    
    setTimeout(() => setWishlistAnimating(false), 800);
  };

  if (loading) {
    return (
      <Box sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      }}>
        <Skeleton 
          variant="rectangular" 
          width="100%" 
          height={300} 
          animation="wave"
        />
        <Box sx={{ p: 2 }}>
          <Skeleton variant="text" width="80%" height={28} animation="wave" />
          <Skeleton variant="text" width="60%" height={20} animation="wave" />
          <Skeleton variant="text" width="50%" height={24} animation="wave" />
          <Skeleton 
            variant="rectangular" 
            width="100%" 
            height={42} 
            sx={{ mt: 2, borderRadius: '8px' }} 
            animation="wave"
          />
        </Box>
      </Box>
    );
  }

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
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
          '& .product-image': {
            transform: 'scale(1.05)',
          },
          '& .product-actions': {
            opacity: 1,
          }
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Sale Badge */}
      {product.onSale && (
        <Box sx={{
          position: 'absolute',
          top: 12,
          left: 12,
          backgroundColor: '#e53935',
          color: 'white',
          px: 1.5,
          py: 0.5,
          borderRadius: '4px',
          zIndex: 1,
          fontWeight: 'bold',
          fontSize: '0.8rem'
        }}>
          SALE
        </Box>
      )}

      {/* Wishlist Button */}
      <Box sx={{ 
        position: 'absolute', 
        top: 12, 
        right: 12,
        zIndex: 1 
      }}>
        <Tooltip 
          title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"} 
          arrow
        >
          <IconButton
            onClick={handleWishlistToggle}
            disabled={wishlistLoading}
            sx={{
              backgroundColor: 'rgba(255,255,255,0.9)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,1)'
              },
              transition: 'transform 0.3s ease',
              transform: wishlistAnimating ? 'scale(1.3)' : 'scale(1)',
            }}
            color={isInWishlist ? "error" : "default"}
          >
            {wishlistLoading ? (
              <CircularProgress size={24} />
            ) : isInWishlist ? (
              <Favorite />
            ) : (
              <FavoriteBorder />
            )}
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
        overflow: 'hidden',
        position: 'relative'
      }}>
        <Box
          className="product-image"
          component="img"
          src={product.images?.[0]?.url || '/images/fallback.jpg'}
          alt={product.name}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
          }}
          onError={(e) => {
            e.target.src = '/images/fallback.jpg';
          }}
        />
        
        {/* Quick Actions */}
        <Fade in={isHovered}>
          <Box 
            className="product-actions"
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: 'rgba(20, 110, 58, 0.9)',
              display: 'flex',
              justifyContent: 'center',
              opacity: 0,
              transition: 'opacity 0.3s ease',
              py: 1,
              zIndex: 2
            }}
          >
            <Button
              variant="contained"
              startIcon={<AddShoppingCart />}
              onClick={handleAddToCart}
              disabled={cartLoading}
              sx={{
                color: 'white',
                backgroundColor: 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.2)'
                }
              }}
            >
              {cartLoading ? 'Adding...' : 'Add to Cart'}
            </Button>
          </Box>
        </Fade>
      </Box>
      
      {/* Product Details */}
      <Box sx={{ p: 2.5 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 'bold',
            mb: 0.5,
            minHeight: '3em',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {product.name}
        </Typography>
        
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: 1,
            minHeight: '1.5em',
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {product.category}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography 
            variant="body1" 
            sx={{ 
              fontWeight: 'bold',
              color: product.onSale ? '#e53935' : 'inherit'
            }}
          >
            R {product.price.toFixed(2)}
          </Typography>
          
          {product.onSale && (
            <Typography 
              variant="body2" 
              sx={{ 
                ml: 1.5,
                textDecoration: 'line-through',
                color: 'text.secondary'
              }}
            >
              R {product.originalPrice?.toFixed(2)}
            </Typography>
          )}
        </Box>
        
        {/* Add to Cart Button (always visible) */}
        <Button
          variant="outlined"
          startIcon={<AddShoppingCart />}
          onClick={handleAddToCart}
          disabled={cartLoading}
          fullWidth
          sx={{
            color: '#146e3a',
            borderColor: '#146e3a',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#146e3a',
              color: 'white',
              borderColor: '#146e3a'
            }
          }}
        >
          {cartLoading ? 'Adding...' : 'Add to Cart'}
        </Button>
      </Box>
    </Box>
  );
};

export default ProductCard;