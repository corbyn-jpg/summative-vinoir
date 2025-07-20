import React from "react";
import ProductCard from "./ProductCard";
import { Box, Typography } from "@mui/material";
import "./ShopSection.css";

function ShopSection({ products }) {
  // Ensure we always work with an array
  const safeProducts = Array.isArray(products) ? products : [];
  const displayProducts = safeProducts.slice(0, 4);

  return (
    <Box className="shop-section-container">
      <Typography variant="h2" className="section-title">
        OUR SIGNATURE SCENTS
      </Typography>

      <Box className="vinoir-product-grid">
        {displayProducts.length ? (
          displayProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <Typography
            variant="body1"
            sx={{ color: "#777", marginTop: "1.5rem", textAlign: "center" }}
          >
            No products found.
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default ShopSection;
