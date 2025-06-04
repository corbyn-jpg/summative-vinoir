import React, { useState } from "react";
import { Box, Typography, IconButton, Card, CardMedia, CardContent } from "@mui/material";
import "./PromoSection.css"; // Import the CSS file

const PromoSection = () => {
  const promoItems = [
    { 
      id: 1, 
      title: "Élégance Noir", 
      subtitle: "A mysterious oriental blend", 
      image: "/images/promo1.jpg" 
    },
    { 
      id: 2, 
      title: "Lumière d'Or", 
      subtitle: "Golden citrus top notes", 
      image: "/images/promo2.jpg" 
    },
    { 
      id: 3, 
      title: "Velvet Rose", 
      subtitle: "Luxurious floral bouquet", 
      image: "/images/promo3.jpg" 
    },
    { 
      id: 4, 
      title: "Oud Royal", 
      subtitle: "Regal woody intensity", 
      image: "/images/promo4.jpg" 
    },
    { 
      id: 5, 
      title: "Jardin Secret", 
      subtitle: "Fresh green accords", 
      image: "/images/promo5.jpg" 
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);


  const getVisibleItems = () => {
    const items = [];
    for (let i = 0; i < 3; i++) {
      items.push(promoItems[(activeIndex + i) % promoItems.length]);
    }
    return items;
  };

  return (
    <Box className="promo-container">
      <Typography variant="h3" className="promo-title">
        OUR COLLECTIONS
      </Typography>

      <Box className="promo-carousel">
        {getVisibleItems().map((item, index) => (
          <Card key={item.id} className={`promo-card ${index === 1 ? 'active-card' : ''}`}>
            <CardMedia
              component="img"
              image={item.image}
              alt={item.title}
              className="promo-image"
            />
            <CardContent className="promo-content">
              <Typography variant="h5" className="promo-item-title">
                {item.title}
              </Typography>
              <Typography variant="body2" className="promo-item-subtitle">
                {item.subtitle}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box className="promo-indicators">
        {promoItems.map((_, index) => (
          <IconButton 
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`indicator-dot ${activeIndex === index ? 'active' : ''}`}
          />
        ))}
      </Box>
    </Box>
  );
};

export default PromoSection;