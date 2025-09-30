import React from "react";
import { Link } from "react-router-dom";

function CleanHome() {
  const heroStyle = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #2d5a3d 0%, #6a4c93 100%)",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "80px 20px 20px",
  };

  const containerStyle = {
    maxWidth: "800px",
    margin: "0 auto",
  };

  const titleStyle = {
    fontSize: "4rem",
    fontWeight: "300",
    marginBottom: "20px",
    fontFamily: '"Playfair Display", serif',
    letterSpacing: "0.1em",
  };

  const subtitleStyle = {
    fontSize: "1.4rem",
    marginBottom: "40px",
    opacity: 0.9,
    fontStyle: "italic",
  };

  const buttonStyle = {
    display: "inline-block",
    padding: "15px 40px",
    backgroundColor: "rgba(255,255,255,0.1)",
    border: "2px solid rgba(255,255,255,0.3)",
    borderRadius: "50px",
    color: "white",
    textDecoration: "none",
    fontSize: "1.1rem",
    fontWeight: "600",
    transition: "all 0.3s ease",
    cursor: "pointer",
  };

  const sectionStyle = {
    padding: "80px 20px",
    backgroundColor: "#f8f9fa",
  };

  const cardStyle = {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    textAlign: "center",
    margin: "20px",
    maxWidth: "300px",
  };

  const gridStyle = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "20px",
    maxWidth: "1200px",
    margin: "0 auto",
  };

  return (
    <div>
      {/* Hero Section */}
      <section style={heroStyle}>
        <div style={containerStyle}>
          <h1 style={titleStyle}>VINOIR</h1>
          <p style={subtitleStyle}>
            Discover the art of luxury fragrance
          </p>
          <Link 
            to="/shop" 
            style={buttonStyle}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "rgba(255,255,255,0.2)";
              e.target.style.borderColor = "white";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "rgba(255,255,255,0.1)";
              e.target.style.borderColor = "rgba(255,255,255,0.3)";
              e.target.style.transform = "translateY(0)";
            }}
          >
            Explore Collection
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section style={sectionStyle}>
        <div style={{ ...containerStyle, textAlign: "center", marginBottom: "60px" }}>
          <h2 style={{ 
            fontSize: "2.5rem", 
            color: "#2d5a3d", 
            marginBottom: "20px",
            fontFamily: '"Playfair Display", serif'
          }}>
            Why Choose Vinoir?
          </h2>
          <p style={{ fontSize: "1.2rem", color: "#666", maxWidth: "600px", margin: "0 auto" }}>
            Experience luxury fragrances crafted with the finest ingredients
          </p>
        </div>

        <div style={gridStyle}>
          <div style={cardStyle}>
            <div style={{ fontSize: "3rem", marginBottom: "20px" }}>🌹</div>
            <h3 style={{ color: "#2d5a3d", marginBottom: "15px" }}>Premium Quality</h3>
            <p style={{ color: "#666", lineHeight: "1.6" }}>
              Sourced from the world's finest fragrance houses
            </p>
          </div>

          <div style={cardStyle}>
            <div style={{ fontSize: "3rem", marginBottom: "20px" }}>✨</div>
            <h3 style={{ color: "#2d5a3d", marginBottom: "15px" }}>Unique Selection</h3>
            <p style={{ color: "#666", lineHeight: "1.6" }}>
              Curated collection of rare and exclusive fragrances
            </p>
          </div>

          <div style={cardStyle}>
            <div style={{ fontSize: "3rem", marginBottom: "20px" }}>💎</div>
            <h3 style={{ color: "#2d5a3d", marginBottom: "15px" }}>Luxury Experience</h3>
            <p style={{ color: "#666", lineHeight: "1.6" }}>
              From browsing to delivery, every moment is designed to delight
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        backgroundColor: "#2d5a3d",
        color: "white",
        padding: "80px 20px",
        textAlign: "center"
      }}>
        <div style={containerStyle}>
          <h2 style={{
            fontSize: "2.5rem",
            marginBottom: "20px",
            fontFamily: '"Playfair Display", serif'
          }}>
            Ready to Find Your Signature Scent?
          </h2>
          <p style={{ fontSize: "1.2rem", marginBottom: "40px", opacity: 0.9 }}>
            Browse our carefully curated collection of luxury fragrances
          </p>
          <Link 
            to="/shop"
            style={{
              ...buttonStyle,
              backgroundColor: "#6a4c93",
              borderColor: "#6a4c93"
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#5a3c83";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#6a4c93";
              e.target.style.transform = "translateY(0)";
            }}
          >
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
}

export default CleanHome;