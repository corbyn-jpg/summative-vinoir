import React from "react";
import PromoSection from "../Components/PromoSection";
import ShopSection from "../Components/ShopSection";
import HeroSection from "../Components/HeroSection";

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        title="Welcome to Vinoir"
        subtitle="An Invitation to Venture Away"
        buttonText="Discover"
        backgroundImage="/images/dummy-image.jpg" // Local dummy image
      />

      {/* Promo Section */}
      <PromoSection />

      {/* Shop Section */}
      <ShopSection />
    </div>
  );
}

export default Home;