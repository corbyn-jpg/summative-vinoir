// src/Pages/ShopSection.js
import React from "react";
import ProductCard from "../Components/ProductCard";
import "./ShopSection.css";

const productData = [
  { id: 1, name: "Product 1", price: "100", image: "/images/product1.jpg" },
  { id: 2, name: "Product 2", price: "200", image: "/images/product2.jpg" },
  { id: 3, name: "Product 3", price: "300", image: "/images/product3.jpg" },
  { id: 4, name: "Product 4", price: "400", image: "/images/product4.jpg" },
  { id: 5, name: "Product 5", price: "500", image: "/images/product5.jpg" },
  { id: 6, name: "Product 6", price: "600", image: "/images/product6.jpg" },
  { id: 7, name: "Product 7", price: "700", image: "/images/product7.jpg" },
  { id: 8, name: "Product 8", price: "800", image: "/images/product8.jpg" },
];

function ShopSection() {
  return (
    <div className="shop-section">
      <h1 className="shop-title">Our Products</h1>
      <div className="product-grid">
        {productData.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}

export default ShopSection;
