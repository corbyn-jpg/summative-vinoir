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
    image: "/images/dior1.jpg" 
  },
  { 
    id: 2, 
    name: "WINTERVILLE, INC.", 
    years: "1996-2012",
    image: "/images/dior2.jpg" 
  },
  { 
    id: 3, 
    name: "DENNIS WHITE & CHRISTOPHER PAUL", 
    years: "1978",
    image: "/images/dior3.jpg" 
  },
  { 
    id: 4, 
    name: "BENNIE FERGUSON & BOB", 
    image: "/images/dior4.jpg" 
  }
];

function ShopSection() {
  return (
    <Box className="dior-shop-section">
      <Typography variant="h1" className="dior-shop-title">
        CHRISTIAN DIOR
      </Typography>
      
      <Box className="dior-product-grid">
        {productData.map((product) => (
          <ProductCard 
            product={product} 
            key={product.id}
          />
        ))}
      </Box>
    </Box>
  );
}

export default ShopSection;