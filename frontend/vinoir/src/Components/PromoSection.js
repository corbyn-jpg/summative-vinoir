import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton, Card, CardMedia, CardContent } from "@mui/material";
import "./PromoSection.css";

const PromoSection = ({ products = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Get 4 featured products or fallback to first 4
  const promoItems = products.length > 0 
    ? products.filter(p => p.featured).slice(0, 4) 
    : Array(4).fill().map((_, i) => ({
        id: i+1,
        name: `Sample Product ${i+1}`,
        description: "Premium fragrance collection",
        images: [{ url: `/images/promo${i+1}.jpg` }]
      }));

  // Auto-advance every 5 seconds
  useEffect(() => {
    if (promoItems.length <= 1) return;
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % promoItems.length);
        setIsTransitioning(false);
      }, 300);
    }, 5000);
    return () => clearInterval(interval);
  }, [promoItems.length]);

  // Get 3 visible items for the carousel (center card is active)
  const getVisibleItems = () => {
    const items = [];
    const length = promoItems.length;
    
    // Previous item
    items.push(promoItems[(activeIndex - 1 + length) % length]);
    // Current active item
    items.push(promoItems[activeIndex]);
    // Next item
    items.push(promoItems[(activeIndex + 1) % length]);
    
    return items;
  };

  return (
    <Box className="promo-container">
      <Typography variant="h2" className="promo-title">
        CURATED COLLECTIONS
      </Typography>

      <Box className={`promo-carousel-container ${isTransitioning ? "transitioning" : ""}`}>
        <Box className="promo-carousel">
          {getVisibleItems().map((item, index) => (
            <Card 
              key={item.id || item._id}
              className={`promo-card ${index === 1 ? "active-card" : ""}`}
            >
              <CardMedia
                component="img"
                image={item.images?.[0]?.url || `/images/promo${(item.id || 1)}.jpg`}
                alt={item.name}
                className="promo-image"
                onError={(e) => {
                  e.target.src = '/images/fallback.jpg';
                }}
              />
              <CardContent className="promo-content">
                <Typography variant="h5" className="promo-item-title">
                  {item.name}
                </Typography>
                <Typography variant="body2" className="promo-item-subtitle">
                  {item.description?.substring(0, 60) + (item.description?.length > 60 ? '...' : '')}
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
            onClick={() => {
              setIsTransitioning(true);
              setTimeout(() => {
                setActiveIndex(index);
                setIsTransitioning(false);
              }, 300);
            }}
            className={`indicator-dot ${activeIndex === index ? "active" : ""}`}
            size="small"
          />
        ))}
      </Box>
    </Box>
  );
};

export default PromoSection;