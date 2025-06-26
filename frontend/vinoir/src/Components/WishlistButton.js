// src/components/WishlistButton.js
import { IconButton, Tooltip, Badge } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const WishlistButton = ({ product, size = 'medium' }) => {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const isInWishlist = wishlist.some(item => item._id === product._id);

  const handleClick = () => {
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
    <Tooltip title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}>
      <IconButton
        onClick={handleClick}
        size={size}
        color={isInWishlist ? "error" : "default"}
      >
        {isInWishlist ? <Favorite /> : <FavoriteBorder />}
      </IconButton>
    </Tooltip>
  );
};

export default WishlistButton;