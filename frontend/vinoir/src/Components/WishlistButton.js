import { IconButton, Tooltip } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const WishlistButton = ({ product, size = 'medium' }) => {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { isAuthenticated } = useAuth(); // Consistent with AuthContext
  const navigate = useNavigate();

  // Make the check robust for both _id and id
  const prodId = product._id || product.id;
  const isInWishlist = wishlist.some(item => (item._id || item.id) === prodId);

  const handleClick = () => {
    if (!isAuthenticated) {
      navigate('/login?redirect=' + encodeURIComponent(window.location.pathname));
      return;
    }
    if (isInWishlist) {
      removeFromWishlist(prodId);
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
        aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        {isInWishlist ? <Favorite /> : <FavoriteBorder />}
      </IconButton>
    </Tooltip>
  );
};

export default WishlistButton;
