import React from "react";
import { Button } from "@mui/material";
import { useCart } from "../context/CartContext";
import "./ProductCard.css";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="vinoir-product-card">
      <div className="vinoir-product-image-container">
        <img
          src={product.images?.[0]?.url || "/images/fallback.jpg"}
          alt={product.images?.[0]?.altText || product.name}
          className="vinoir-product-image"
        />
      </div>

      <div className="vinoir-product-details">
        <h3 className="vinoir-product-name">{product.name}</h3>

        {product.price && (
          <p className="vinoir-product-price">R {product.price}</p>
        )}

        {product.description && (
          <p className="vinoir-product-description">{product.description}</p>
        )}

        <Button
          variant="outlined"
          className="add-to-cart-btn"
          onClick={() => addToCart(product)}
          sx={{
            mt: 2,
            color: "#146e3a",
            borderColor: "#146e3a",
            "&:hover": {
              backgroundColor: "#146e3a",
              color: "white",
              borderColor: "#146e3a",
            },
          }}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

export default ProductCard;
