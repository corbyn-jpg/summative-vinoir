import React, { useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { IconButton, Tooltip } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./WishlistButton.css";

const WishlistButton = ({ product, size = "medium" }) => {
  const navigate = useNavigate();
  const { wishlist = [], addToWishlist, removeFromWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();

  const prodId = product?._id || product?.id;
  const isInWishlist = useMemo(
    () => Boolean(wishlist && wishlist.some((it) => (it?._id || it?.id) === prodId)),
    [wishlist, prodId]
  );

  const handleClick = useCallback(
    async (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (!isAuthenticated) {
        navigate("/login?redirect=" + encodeURIComponent(window.location.pathname));
        return;
      }
      
      try {
        if (isInWishlist) {
          await removeFromWishlist(prodId);
        } else {
          await addToWishlist(product);
        }
      } catch (error) {
        console.error('Wishlist action failed:', error);
      }
    },
    [isAuthenticated, navigate, isInWishlist, removeFromWishlist, addToWishlist, prodId, product]
  );

  return (
    <Tooltip title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}>
      <IconButton
        onClick={handleClick}
        size={size}
        className={`wishlist-toggle ${isInWishlist ? "active" : ""}`}
        aria-pressed={isInWishlist}
        aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        sx={{
          color: isInWishlist ? '#6a4c93' : 'inherit',
          '&:hover': {
            backgroundColor: isInWishlist ? 'rgba(106, 76, 147, 0.1)' : 'rgba(0, 0, 0, 0.04)'
          }
        }}
      >
        {isInWishlist ? <Favorite fontSize={size === "small" ? "small" : "medium"} /> : <FavoriteBorder fontSize={size === "small" ? "small" : "medium"} />}
      </IconButton>
    </Tooltip>
  );
};

WishlistButton.propTypes = {
  product: PropTypes.object.isRequired,
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

export default React.memo(WishlistButton);