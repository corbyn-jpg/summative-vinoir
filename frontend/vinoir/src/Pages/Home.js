import React from "react";
import PromoSection from "../Components/PromoSection";
import ShopSection from "../Components/ShopSection";
import HeroSection from "../Components/HeroSection";
import ReactiveTitle from "../Components/ReactiveTitle";

function Home() {
  return (
    <div>
      {/* Reactive Title */}
      <ReactiveTitle />

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
    </div>
  );
}

export default Home;