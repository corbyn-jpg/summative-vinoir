import React, { useState, useEffect } from 'react';
import { IconButton, Tooltip, Badge, CircularProgress } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext';

const WishlistButton = ({ product, size = 'medium', showBadge = true }) => {
  const { 
    wishlist, 
    addToWishlist, 
    removeFromWishlist, 
    loading: wishlistLoading 
  } = useWishlist();
  const { isLoggedIn } = useAuth();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const [localLoading, setLocalLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const isInWishlist = wishlist.some(item => item._id === product._id);

  useEffect(() => {
    // Reset loading state after operation completes
    if (!wishlistLoading) {
      setLocalLoading(false);
    }
  }, [wishlistLoading]);

  const handleClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isLoggedIn) {
      showNotification('Please sign in to manage your wishlist', 'info');
      navigate('/login', { state: { from: window.location.pathname } });
      return;
    }

    setLocalLoading(true);
    
    try {
      if (isInWishlist) {
        await removeFromWishlist(product._id);
        showNotification('Removed from wishlist', 'info');
      } else {
        await addToWishlist(product);
        showNotification('Added to wishlist!', 'success');
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 1000);
      }
    } catch (error) {
      showNotification('Failed to update wishlist', 'error');
    } finally {
      setLocalLoading(false);
    }
  };

  // Render the badge only if showBadge is true (for use in Navbar)
  const renderButton = () => (
    <IconButton
      onClick={handleClick}
      size={size}
      color={isInWishlist ? "error" : "default"}
      disabled={localLoading}
      sx={{
        transition: 'transform 0.3s ease',
        transform: isAnimating ? 'scale(1.3)' : 'scale(1)',
        '&:hover': {
          transform: isAnimating ? 'scale(1.3)' : 'scale(1.2)'
        }
      }}
    >
      {localLoading ? (
        <CircularProgress size={24} />
      ) : isInWishlist ? (
        <Favorite />
      ) : (
        <FavoriteBorder />
      )}
    </IconButton>
  );

  return (
    <Tooltip 
      title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"} 
      arrow
      placement="top"
    >
      {showBadge ? (
        <Badge 
          badgeContent={isInWishlist ? 1 : 0} 
          color="error" 
          overlap="circular"
          invisible={!isInWishlist}
        >
          {renderButton()}
        </Badge>
      ) : (
        renderButton()
      )}
    </Tooltip>
  );
};

export default WishlistButton;