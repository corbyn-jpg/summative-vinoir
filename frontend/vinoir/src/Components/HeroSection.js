import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

function HeroSection({ title, subtitle, buttonText, buttonLink, videoSrc }) {
  // Enhanced luxury background - using one of your beautiful fragrance images
  // Try both relative and absolute paths to ensure it loads
  const heroImage = process.env.PUBLIC_URL + "/images/dior5.jpeg" || "/images/dior5.jpeg";

  return (
    <Box
      sx={{
        width: "100vw",
        position: "relative",
        overflow: "hidden",
        height: { xs: "100vh", sm: "100vh" },
        minHeight: "600px",
        left: "50%",
        right: "50%",
        marginX: "-50vw",
      }}
    >
      {videoSrc ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -1,
          }}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <>
          {/* Background Image using img element for better reliability */}
          <img
            src="/images/dior5.jpeg"
            alt="Luxury fragrance background"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 0,
              filter: "brightness(0.8) contrast(1.2)",
              animation: "imageZoom 20s ease-in-out infinite alternate",
            }}
            onError={(e) => {
              console.error("Failed to load hero image:", e.target.src);
              // Fallback to another image
              e.target.src = "/images/dior3.jpeg";
            }}
            onLoad={() => console.log("Hero image loaded successfully")}
          />
          
          {/* Color Overlay */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: `linear-gradient(
                135deg, 
                rgba(45, 90, 61, 0.4) 0%, 
                rgba(106, 76, 147, 0.3) 50%, 
                rgba(10, 10, 10, 0.5) 100%
              )`,
              zIndex: 1,
            }}
          />
          
          {/* CSS for the animation */}
          <style jsx>{`
            @keyframes imageZoom {
              0% {
                transform: scale(1);
              }
              100% {
                transform: scale(1.05);
              }
            }
          `}</style>
        </>
      )}

      {/* Content Container - Preserving your original layout but enhancing positioning */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          textAlign: "center",
          zIndex: 2,
          px: 3,
          pt: 8, // Add some top padding to account for ShrinkingTitle
        }}
      >
        {/* Keep original subtitle styling but enhance it */}
        <Typography 
          variant="h4" 
          sx={{ 
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.8rem" },
            fontWeight: 300,
            mb: 4,
            mt: 4, // Give space for VINOIR title above
            opacity: 0.95,
            letterSpacing: "0.05em",
            textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
            animation: "fadeInUp 1s ease-out 0.5s both",
            "@keyframes fadeInUp": {
              "0%": {
                opacity: 0,
                transform: "translateY(30px)",
              },
              "100%": {
                opacity: 0.95,
                transform: "translateY(0)",
              },
            },
          }}
        >
          {subtitle}
        </Typography>

        {/* Enhanced Call to Action Button */}
        <Button
          component={Link}
          to={buttonLink}
          variant="outlined"
          size="large"
          sx={{
            mt: 3,
            px: 4,
            py: 1.5,
            fontSize: "1.1rem",
            fontFamily: '"Cormorant Garamond", serif',
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#ffffff",
            borderColor: "#2d5a3d",
            backgroundColor: "rgba(45, 90, 61, 0.1)",
            backdropFilter: "blur(10px)",
            border: "2px solid rgba(45, 90, 61, 0.8)",
            borderRadius: "12px",
            transition: "all 0.4s ease-in-out",
            animation: "fadeInUp 1s ease-out 1s both",
            "@keyframes fadeInUp": {
              "0%": {
                opacity: 0,
                transform: "translateY(30px)",
              },
              "100%": {
                opacity: 1,
                transform: "translateY(0)",
              },
            },
            "&:hover": {
              backgroundColor: "#2d5a3d",
              borderColor: "#2d5a3d",
              color: "#ffffff",
              transform: "translateY(-3px)",
              boxShadow: "0 12px 30px rgba(45, 90, 61, 0.4)",
            },
          }}
        >
          {buttonText}
        </Button>
      </Box>
    </Box>
  );
}

export default HeroSection;
