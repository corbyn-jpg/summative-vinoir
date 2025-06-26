<<<<<<< HEAD
// src/Pages/ShopSection.js
import React from "react";
import { Box, Typography } from "@mui/material";
import ProductCard from "../Components/ProductCard";
import "./ShopSection.css";

const productData = [
  {
    id: 1,
    name: "BRIAN HALE & JOHN",
    years: "1980-2005",
    image: "/images/dior1.jpg",
  },
  {
    id: 2,
    name: "WINTERVILLE, INC.",
    years: "1996-2012",
    image: "/images/dior2.jpg",
  },
  {
    id: 3,
    name: "DENNIS WHITE & CHRISTOPHER PAUL",
    years: "1978",
    image: "/images/dior3.jpg",
  },
  { id: 4, name: "BENNIE FERGUSON & BOB", image: "/images/dior4.jpg" },
];

function ShopSection() {
  return (
    <Box className="dior-shop-section" style={{ padding: "80px 0" }}>
      <Typography
        variant="h2"
        className="dior-shop-title"
        sx={{ textAlign: "center", color: " 731d8d", fontFamily: "serif" }}
      >
        SHOP
      </Typography>

      {/*margin-bottom: 64px;
  font-weight: 700;
  letter-spacing: 1px;
  text-align: center;
  font-size: 2.5rem;
  color: #731d8d;
  position: relative;*/}
      <Box className="vinoir-product-grid">
        {productData.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </Box>
    </Box>
=======
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import './ShopSection.css';

function ShopSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError('Error fetching products');
        console.error('❌ Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="shop-section">
      <h2>All Products</h2>
      <div className="products-grid">
        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p>{error}</p>
        ) : products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
>>>>>>> Test
  );
}

export default ShopSection;