import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton, Card, CardMedia, CardContent } from "@mui/material";
import "./PromoSection.css";
import "./ProductCard.css";

const PromoSection = ({ products = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Get 4 featured products or fallback to first 5
  const promoItems = products.length > 0 
    ? products.filter(p => p.featured).slice(0, 5) 
    : [
        { id: 1, title: "Élégance Noir", subtitle: "A mysterious oriental blend", image: "/images/promo1.jpg" },
        { id: 2, title: "Lumière d'Or", subtitle: "Golden citrus top notes", image: "/images/promo2.jpg" },
        { id: 3, title: "Velvet Rose", subtitle: "Luxurious floral bouquet", image: "/images/promo3.jpg" },
        { id: 4, title: "Oud Royal", subtitle: "Regal woody intensity", image: "/images/promo4.jpg" },
        { id: 5, title: "Jardin Secret", subtitle: "Fresh green accords", image: "/images/promo5.jpg" }
      ];

  // Auto-advance every 5 seconds
  useEffect(() => {
    if (promoItems.length <= 1) return;
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % promoItems.length);
        setIsTransitioning(false);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, [promoItems.length]);

  // Get 3 visible items for the carousel
  const getVisibleItems = () => {
    return Array.from({ length: 3 }, (_, i) => 
      promoItems[(activeIndex + i) % promoItems.length]
    );
  };

  return (
    <Box className="promo-luxury-container">
      <Typography variant="h2" className="promo-luxury-title">
        CURATED COLLECTIONS
      </Typography>

      <Box className={`promo-carousel-container ${isTransitioning ? "transitioning" : ""}`}>
        <Box className="promo-carousel">
          {getVisibleItems().map((item, index) => (
            <Card 
              key={item.id || item._id}
              className={`promo-luxury-card ${index === 1 ? "active-card" : ""}`}
            >
              <CardMedia
                component="img"
                image={item.images?.[0]?.url || item.image}
                alt={item.title || item.name}
                className="promo-luxury-image"
                onError={(e) => {
                  e.target.src = '/images/fallback.jpg';
                }}
              />
              <CardContent className="promo-luxury-content">
                <Typography variant="h5" className="promo-item-title">
                  {item.title || item.name}
                </Typography>
                <Typography variant="body2" className="promo-item-subtitle">
                  {item.subtitle || item.description?.substring(0, 60) + '...'}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      <Box className="promo-luxury-indicators">
        {promoItems.map((_, index) => (
          <IconButton
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`luxury-dot ${activeIndex === index ? "active" : ""}`}
            size="small"
          />
        ))}
      </Box>
    </Box>
  );
};

export default PromoSection;