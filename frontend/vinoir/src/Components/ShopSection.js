import React from "react";
import ProductCard from "./ProductCard";
import { Box, Typography } from "@mui/material";

function ShopSection({ products = [] }) {
  const displayProducts = products.slice(0, 4); 
  
  return (
    <Box sx={{ 
      maxWidth: '1600px', 
      mx: 'auto', 
      px: 2,
      py: 6 
    }}>
      <Typography variant="h2" sx={{ 
        textAlign: 'center', 
        mb: 4,
        fontSize: '2rem',
        fontWeight: 300,
        fontFamily: 'Playfair Display, serif',
        letterSpacing: '0.1em'
      }}>
        OUR SIGNATURE SCENTS
      </Typography>
      
      <Box sx={{ 
        display: 'flex',
        justifyContent: 'center',
        gap: 4,
        flexWrap: 'wrap',
        '& > *': {
          flex: '0 1 calc(25% - 32px)',
          minWidth: '250px'
        }
      }}>
        {displayProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </Box>
    </Box>
  );
}

export default ShopSection;
