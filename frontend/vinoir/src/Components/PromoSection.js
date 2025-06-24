import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PromoSection = ({ products = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef(null);
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  // Use only real, featured products (avoid fallback)
  const promoItems = products.filter(p => p.featured && p._id).slice(0, 5);

  // Auto-rotate logic
  useEffect(() => {
    if (promoItems.length <= 1) return;

    const rotate = () => {
      if (!isHovered) {
        setActiveIndex(prev => (prev + 1) % promoItems.length);
      }
    };

    intervalRef.current = setInterval(rotate, 3000);
    return () => clearInterval(intervalRef.current);
  }, [promoItems.length, isHovered]);

  // Card position style
  const getCardStyle = (index) => {
    const total = promoItems.length;
    const position = (index - activeIndex + total) % total;

    if (position === 0) {
      return {
        transform: 'translateX(0) scale(1)',
        zIndex: 5,
        opacity: 1,
        filter: 'none'
      };
    } else if (position === 1) {
      return {
        transform: 'translateX(50%) scale(0.9)',
        zIndex: 4,
        opacity: 0.9,
        filter: 'brightness(0.95)'
      };
    } else if (position === total - 1) {
      return {
        transform: 'translateX(-50%) scale(0.9)',
        zIndex: 4,
        opacity: 0.9,
        filter: 'brightness(0.95)'
      };
    } else {
      return {
        transform: position < total / 2 
          ? 'translateX(-90%) scale(0.8)' 
          : 'translateX(90%) scale(0.8)',
        zIndex: 3 - Math.abs(position - total / 2),
        opacity: 0,
        pointerEvents: 'none'
      };
    }
  };

  if (promoItems.length === 0) return null;

  return (
    <Box 
      sx={{
        py: 14,
        backgroundColor: "#f8f5f2",
        width: "100%",
        overflow: "hidden",
        position: "relative"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Typography variant="h2" sx={{
        fontWeight: 700,
        letterSpacing: 2,
        textAlign: "center",
        color: "#731d8d",
        mb: 10,
        fontSize: "2.5rem",
        textTransform: "uppercase",
        position: "relative",
        '&::after': {
          content: '""',
          display: "block",
          width: 120,
          height: 5,
          backgroundColor: "#146e3a",
          margin: "30px auto 0",
          borderRadius: 3,
        }
      }}>
        CURATED COLLECTIONS
      </Typography>

      <Box sx={{
        width: "100%",
        height: "700px",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        {promoItems.map((item, index) => {
          const style = getCardStyle(index);

          return (
            <Card
              key={item._id}
              onClick={() => navigate(`/fragrance/${item._id}`)}
              sx={{
                position: "absolute",
                width: "450px",
                height: "600px",
                borderRadius: "24px",
                backgroundColor: "#fff",
                boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
                cursor: "pointer",
                transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                overflow: "hidden",
                '&:hover': {
                  boxShadow: "0 25px 60px rgba(0,0,0,0.25)",
                  transform: `${style.transform} scale(1.04)`
                },
                ...style
              }}
            >
              <CardMedia
                component="img"
                image={item.images?.[0]?.url || "/images/fallback.jpg"}
                alt={item.name}
                sx={{
                  width: "100%",
                  height: "72%",
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                  '&:hover': {
                    transform: "scale(1.07)"
                  }
                }}
              />
              <CardContent sx={{
                height: "28%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                px: 5
              }}>
                <Typography variant="h5" sx={{ 
                  fontWeight: 600, 
                  mb: 2,
                  color: "#333",
                  fontSize: "1.5rem",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: "100%"
                }}>
                  {item.name}
                </Typography>
                <Typography variant="body1" sx={{ 
                  color: "#666", 
                  lineHeight: 1.6,
                  fontSize: "1.1rem",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden"
                }}>
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Box>

      <Box sx={{
        display: "flex",
        justifyContent: "center",
        gap: 2,
        mt: 10
      }}>
        {promoItems.map((_, index) => (
          <Box
            key={index}
            onClick={() => setActiveIndex(index)}
            sx={{
              width: "16px",
              height: "16px",
              borderRadius: "50%",
              backgroundColor: activeIndex === index ? "#731d8d" : "#ddd",
              cursor: "pointer",
              transition: "all 0.3s ease",
              '&:hover': {
                transform: "scale(1.4)",
                backgroundColor: activeIndex === index ? "#5a166f" : "#ccc"
              }
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default PromoSection;
