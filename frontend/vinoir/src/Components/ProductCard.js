// src/Components/ProductCard.js
import React from "react";
import { Button } from "@mui/material";
import "./ProductCard.css";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-details">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">£{parseFloat(product.price).toFixed(2)}</p>
        <Button variant="contained" fullWidth className="add-button">
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

export default ProductCard;
