import React from "react";
import "./shopCard.css";

function ProductCard({ source, title}) {
  return (
    <div className={"productCard"}>
      <div className="product-image">
        <img 
          src={source} 
          alt={source} 
          className="dior-product-image" 
        />
      </div>
      <div className="dior-product-details">
        <h3 className="dior-product-name">{source}</h3>
        <p className="dior-product-years">{source}</p>
      </div>
    </div>
  );
}

export default ProductCard;