import React from "react";
import { Link } from "react-router-dom";

export default function CleanFooter() {
  const year = new Date().getFullYear();

  const footerStyle = {
    backgroundColor: "#1a1a1a",
    color: "white",
    padding: "40px 20px 20px",
    marginTop: "auto"
  };

  const contentStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "30px",
    marginBottom: "30px"
  };

  const sectionStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  };

  const headingStyle = {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "15px",
    color: "#6a4c93"
  };

  const linkStyle = {
    color: "rgba(255,255,255,0.8)",
    textDecoration: "none",
    fontSize: "14px",
    transition: "color 0.3s ease"
  };

  const bottomStyle = {
    textAlign: "center",
    paddingTop: "20px",
    borderTop: "1px solid rgba(255,255,255,0.2)",
    fontSize: "12px",
    color: "rgba(255,255,255,0.6)"
  };

  return (
    <footer style={footerStyle}>
      <div style={contentStyle}>
        <div style={sectionStyle}>
          <h3 style={headingStyle}>VINOIR</h3>
          <p style={{ margin: 0, fontSize: "14px", color: "rgba(255,255,255,0.8)" }}>
            Luxury fragrances for the discerning individual
          </p>
        </div>

        <div style={sectionStyle}>
          <h4 style={headingStyle}>Explore</h4>
          <Link to="/" style={linkStyle}>Home</Link>
          <Link to="/shop" style={linkStyle}>Shop</Link>
          <Link to="/about" style={linkStyle}>About</Link>
          <Link to="/contact" style={linkStyle}>Contact</Link>
        </div>

        <div style={sectionStyle}>
          <h4 style={headingStyle}>Legal</h4>
          <Link to="/privacy-policy" style={linkStyle}>Privacy Policy</Link>
          <Link to="/terms-of-service" style={linkStyle}>Terms of Service</Link>
        </div>

        <div style={sectionStyle}>
          <h4 style={headingStyle}>Connect</h4>
          <a href="mailto:info@vinoir.com" style={linkStyle}>
            info@vinoir.com
          </a>
          <a href="tel:+15551234567" style={linkStyle}>
            +1 (555) 123-4567
          </a>
        </div>
      </div>

      <div style={bottomStyle}>
        <p style={{ margin: 0 }}>
          © {year} VINOIR. All rights reserved.
        </p>
      </div>
    </footer>
  );
}