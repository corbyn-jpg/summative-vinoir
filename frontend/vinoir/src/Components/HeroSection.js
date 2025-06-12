import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom"; 

function HeroSection({ title, subtitle, buttonText, buttonLink, videoSrc }) {
  // Set default image path directly in the component
  const defaultBackground = "/images/vin.png";
  
  return (
    <Box
      sx={{
        width: "100vw",
        position: "relative",
        overflow: "hidden",
        height: { xs: "100vh", sm: "100vh" },
        minHeight: "500px",
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
        <Box
          sx={{
            backgroundImage: `url(${defaultBackground})`, // Using the default here
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -1,
          }}
        />
      )}
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
          backgroundColor: "rgba(0, 0, 0, 0.3)",
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 500, mb: 2, fontFamily: 'serif' }}>
          {title}
        </Typography>
        <Typography variant="h5" sx={{ fontFamily: 'serif' }}>{subtitle}</Typography>
        <Button
            component={Link}
            to={buttonLink}
            variant="outlined"
            sx={{
              mt: 3,
              color: "white",
              fontFamily: 'serif',
              borderColor: "white",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
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