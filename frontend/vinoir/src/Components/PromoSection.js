import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import "./PromoSection.css";

// PromoItem "class-like" data model
const promoItems = [
  {
    id: 1,
    title: "Élégance Noir",
    subtitle: "A mysterious oriental blend",
    image: "/images/promo1.jpg",
  },
  {
    id: 2,
    title: "Lumière d'Or",
    subtitle: "Golden citrus top notes",
    image: "/images/promo2.jpg",
  },
  {
    id: 3,
    title: "Velvet Rose",
    subtitle: "Luxurious floral bouquet",
    image: "/images/promo3.jpg",
  },
  {
    id: 4,
    title: "Oud Royal",
    subtitle: "Regal woody intensity",
    image: "/images/promo4.jpg",
  },
  {
    id: 5,
    title: "Jardin Secret",
    subtitle: "Fresh green accords",
    image: "/images/promo5.jpg",
  },
];

const PromoSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-advance every 5 seconds with smooth animation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % promoItems.length);
        setIsTransitioning(false);
      }, 500); // match with animation duration
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Get 3 visible items for the carousel
  const getVisibleItems = () => {
    return Array.from({ length: 3 }, (_, i) =>
      promoItems[(activeIndex + i) % promoItems.length]
    );
  };

  return (
    <Box className="promo-container">
      <Typography variant="h2" className="promo-title">
        PRODUCT PROMO
      </Typography>

      <Box
        className={`promo-carousel-container ${
          isTransitioning ? "transitioning" : ""
        }`}
      >
        <Box className="promo-carousel">
          {getVisibleItems().map((item, index) => (
            <Card
              key={item.id}
              className={`promo-card ${index === 1 ? "active-card" : ""}`}
            >
              <CardMedia
                component="img"
                image={item.image}
                alt={item.title}
                className="promo-image"
              />
              <CardContent className="promo-content">
                <Typography className="promo-item-title">
                  {item.title}
                </Typography>
                <Typography className="promo-item-subtitle">
                  {item.subtitle}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      <Box className="promo-indicators">
        {promoItems.map((_, index) => (
          <IconButton
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`indicator-dot ${
              activeIndex === index ? "active" : ""
            }`}
          />
        ))}
      </Box>
    </Box>
  );
};

export default PromoSection;
