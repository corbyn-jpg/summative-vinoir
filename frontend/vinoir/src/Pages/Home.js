import React from "react";
import PromoSection from "../Components/PromoSection";
import ShopSection from "../Components/ShopSection";
import HeroSection from "../Components/HeroSection";
import { Box } from "@mui/material";

function Home() {
  return (
    <Box component="main" sx={{
      pt: { xs: '130px', sm: '180px' }, // Responsive padding top
      px: { xs: 2, sm: 3 }, // Responsive padding x-axis
      pb: 4 // Padding bottom
    }}>
      {/* Hero Section */}
      <HeroSection
        title="Welcome to Vinoir"
        subtitle="An Invitation to Venture Away"
        buttonText="Discover"
        backgroundImage="/images/dummy-image.jpg"
      />

      {/* Promo Section */}
      <PromoSection />

      {/* Shop Section */}
      <ShopSection />
    </Box>
  );
}

export default Home;