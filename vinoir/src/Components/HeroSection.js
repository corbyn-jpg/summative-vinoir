import React from "react";
import { Box, Typography, Button } from "@mui/material";

function HeroSection({ title, subtitle, buttonText, backgroundImage, videoSrc }) {
  return (
    <Box
      sx={{
        height: "100vh", // Full viewport height
        width: "100%", // Full width
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Image or Video */}
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
            objectFit: "cover", // Ensures the video covers the entire area
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
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover", // Ensures the image covers the entire area
            backgroundPosition: "center", // Centers the image
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -1,
          }}
        />
      )}

      {/* Overlay Content */}
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
          backgroundColor: "rgba(0, 0, 0, 0.3)", // Optional dark overlay
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
          {title}
        </Typography>
        <Typography variant="h6">{subtitle}</Typography>
        <Button
          variant="outlined"
          sx={{
            mt: 3,
            color: "white",
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