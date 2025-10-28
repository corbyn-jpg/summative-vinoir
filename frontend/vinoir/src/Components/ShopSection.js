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
      <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
                  <Typography 
                    variant="h1" 
                    sx={{
                      fontFamily: '"Playfair Display", serif',
                      color: '#e6d478',
                      mb: 3,
                      fontSize: { xs: '3rem', md: '5rem', lg: '6rem' },
                      fontWeight: 300,
                      letterSpacing: '0.02em',
                      lineHeight: 1.1
                    }}
                  >
                    OUR PICKS
                  </Typography>
                  <Typography 
                    variant="h4" 
                    sx={{
                      color: '#fff',
                      fontStyle: 'italic',
                      fontFamily: '"Cormorant Garamond", serif',
                      fontSize: { xs: '1.5rem', md: '2rem', lg: '2.5rem' },
                      maxWidth: '800px',
                      mx: 'auto'
                    }}
                  >
                    See our team's top picks from the collection, curated for you.
                  </Typography>
                </Box>
      
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