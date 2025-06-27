
import React from "react";
import ProductCard from "./ProductCard";
import { Box, Typography } from "@mui/material";
import "./ShopSection.css";

function ShopSection({ products = [] }) {
  // Take first 4 products (or featured products if you prefer)
  const displayProducts = products.slice(0, 4); 
  
  return (
    <Box className="shop-section-container">
      <Typography variant="h2" className="section-title">
        OUR SIGNATURE SCENTS
      </Typography>
      
      <Box className="vinoir-product-grid">
        {displayProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </Box>
    </Box>
  );
}

export default ShopSection;