// src/Components/ProductCard.js
import React from "react";
import "./ProductCard.css";

function ProductCard({ product }) {
  return (
    <div className="vinoir-product-card">
      <div className="vinoir-product-image-container">
        <img
          src={product.image}
          alt={product.name}
          className="vinoir-product-image"
        />
      </div>
      <div className="vinoir-product-details">
        <h3 className="vinoir-product-name">{product.name}</h3>
        {product.years && <p className="vinoir-product-years">{product.years}</p>}
      </div>
    </div>
  );
}

export default ProductCard;
