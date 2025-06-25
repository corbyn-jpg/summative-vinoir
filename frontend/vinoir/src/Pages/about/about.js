import React from 'react';
import HeroSection from '../../Components/HeroSection';
import Founder from '../../Components/Founder/Founder';
import './About.css';

// ✅ Static image imports
import marioImg from '../../assets/founders/mario.jpg';
import corbynImg from '../../assets/founders/corbyn.jpg';
import tristianImg from '../../assets/founders/tristian.jpg';
import heroImage from '../../assets/spritz.jpeg';
import heroVideo from '../../assets/scents.mp4';

const AboutPage = () => {
  const founders = [
    {
      name: "Mario Surprise Ojo",
      role: "Creative Director",
      bio: "With a background in luxury branding and a passion for natural aromas, Mario leads our scent development and creative vision.",
      image: marioImg
    },
    {
      name: "Corbyn Robinson",
      role: "Master Perfumer",
      bio: "Corbyn's expertise in extracting and blending natural essences brings our wilderness-inspired fragrances to life.",
      image: corbynImg
    },
    {
      name: "Tristian Leech",
      role: "Operations Director",
      bio: "Tristian ensures our sustainable sourcing and maintains relationships with our exclusive clientele worldwide.",
      image: tristianImg
    }
  ];

  return (
    <div className="about-container">
      {/* Hero Section */}
      <div className="hero-wrapper">
        <HeroSection 
          title={"ABOUT VINOIR"} 
          backgroundImage={heroImage} 
          buttonText={"CONTACT"} 
          videoSrc={heroVideo}
        />
      </div>

      {/* Mission Section */}
      <div className="mission-section">
        <div className="mission-content">
          <h1>Our Essence</h1>
          <p className="mission-text">
            Born in the heart of South Africa's wilderness, Vinoir is a luxury fragrance brand that captures the untamed beauty of nature in every bottle. 
            Founded in 2023, we specialize in crafting exclusive scents from the purest natural ingredients.
          </p>
          <p className="mission-text">
            We believe in the art of pairing the perfect wine with the right fragrance, creating an experience that tantalizes the senses. Our team is dedicated to sourcing the finest products from around the world.
          </p>
        </div>
      </div>

      {/* Founders Section */}
      <div className="founders-section">
        <h2 className="section-title">The Visionaries Behind Vinoir</h2>
        <div className="founders-grid">
          {founders.map((founder, index) => (
            <Founder
              key={index}
              name={founder.name}
              role={founder.role}
              bio={founder.bio}
              image={founder.image}
            />
          ))}
        </div>
      </div>

      {/* Process Section */}
      <div className="process-section">
        <h2 className="section-title">Our Artisanal Process</h2>
        <div className="process-steps">
          <div className="process-step">
            <div className="step-number">1</div>
            <h3>Wild Harvesting</h3>
            <p>Our team ventures into protected wilderness areas to hand-select botanicals at peak potency.</p>
          </div>
          <div className="process-step">
            <div className="step-number">2</div>
            <h3>Slow Extraction</h3>
            <p>Using traditional methods, we patiently extract essences to preserve their full complexity.</p>
          </div>
          <div className="process-step">
            <div className="step-number">3</div>
            <h3>Master Blending</h3>
            <p>Each fragrance is carefully composed by our perfumers and aged like fine wine.</p>
          </div>
        </div>
      </div>

      {/* Philosophy Section */}
      <div className="philosophy-section">
        <div className="philosophy-content">
          <h2>The Vinoir Philosophy</h2>
          <p>
            We believe true luxury lies in connection — to nature, to craftsmanship, and to the self. 
            Our fragrances are sensory narratives that evoke the wild spirit of Africa.
          </p>
          <p>
            By maintaining strict exclusivity (limited to 500 bottles per fragrance annually), 
            we ensure each creation remains as rare as the landscapes that inspire it.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
