import React, { useState } from "react";
import { Box, Typography, IconButton, Grid, Card, CardMedia, CardContent } from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';

class PromoCarousel {
  constructor(items) {
    this.items = items;
    this.currentIndex = 0;
  }

  goTo(index) {
    this.currentIndex = index;
    return this.currentItem();
  }

  currentItem() {
    return this.items[this.currentIndex];
  }
}

const PromoItem = ({ item }) => (
  <Card sx={{ 
    width: 450, 
    height: 500,
    margin: "0 auto",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      transform: "translateY(-8px)",
      boxShadow: "0 12px 28px rgba(0,0,0,0.16)"
    }
  }}>
    <CardMedia
      component="img"
      height="380"
      image={item.image}
      alt={item.title}
      sx={{ 
        objectFit: "cover",
        borderTopLeftRadius: "16px",
        borderTopRightRadius: "16px"
      }}
    />
    <CardContent sx={{ textAlign: "center", py: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: "0.5px" }}>
        {item.title}
      </Typography>
    </CardContent>
  </Card>
);

function PromoSection() {
  const promoItems = [
    { id: 1, title: "Summer Collection", image: "/path-to-promo1.jpg" },
    { id: 2, title: "Limited Edition", image: "/path-to-promo2.jpg" },
    { id: 3, title: "New Arrivals", image: "/path-to-promo3.jpg" },
  ];

  const [carousel] = useState(() => new PromoCarousel(promoItems));
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleDotClick = (index) => {
    carousel.goTo(index);
    setCurrentIndex(index);
  };

  return (
    <Box sx={{ 
      py: 10, 
      textAlign: "center",
      backgroundColor: "#fafafa",
      minHeight: "80vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "120px",
        background: "linear-gradient(to bottom, rgba(0,0,0,0.03), transparent)",
        zIndex: 1
      }
    }}>
      <Typography variant="h3" sx={{ 
        mb: 8, 
        fontWeight: 700,
        letterSpacing: "1px",
        position: "relative",
        "&::after": {
          content: '""',
          display: "block",
          width: "80px",
          height: "4px",
          backgroundColor: "primary.main",
          margin: "16px auto 0",
          borderRadius: "2px"
        }
      }}>
        PRODUCT PROMO
      </Typography>
      
      <Box sx={{ 
        width: "100%",
        margin: "0 auto",
        position: "relative",
        zIndex: 2
      }}>
        <PromoItem item={carousel.goTo(currentIndex)} />
      </Box>

      <Box sx={{ 
        display: "flex", 
        justifyContent: "center",
        gap: 1.5,
        mt: 6,
        "& .MuiIconButton-root": {
          color: currentIndex === 0 ? "primary.main" : "action.disabled",
          transition: "color 0.3s ease",
          padding: 0,
          "&:hover": {
            backgroundColor: "transparent",
            color: "primary.main"
          }
        }
      }}>
        {promoItems.map((_, index) => (
          <IconButton 
            key={index}
            onClick={() => handleDotClick(index)}
            size="small"
          >
            <CircleIcon fontSize="small" />
          </IconButton>
        ))}
      </Box>
    </Box>
  );
}

export default PromoSection;