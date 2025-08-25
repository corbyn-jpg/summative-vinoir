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
    (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (!isAuthenticated) {
        navigate("/login?redirect=" + encodeURIComponent(window.location.pathname));
        return;
      }
      if (isInWishlist) {
        removeFromWishlist(prodId);
      } else {
        addToWishlist(product);
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
        color="inherit"
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