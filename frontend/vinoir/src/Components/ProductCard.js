// src/Components/ProductCard.js
import React from "react";
import "./ProductCard.css";

function ProductCard({ product, active }) {
  return (
    <div className={`dior-product-card ${active ? 'active' : ''}`}>
      <div className="dior-product-image-container">
        <img 
          src={product.image} 
          alt={product.name} 
          className="dior-product-image" 
        />
      </div>
      <div className="dior-product-details">
        <h3 className="dior-product-name">{product.name}</h3>
        <p className="dior-product-years">{product.years}</p>
      </div>
    </div>
  );
}

export default ProductCard;