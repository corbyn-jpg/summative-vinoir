import React from "react";
import { Link } from "react-router-dom";

export default function CleanNavbar() {
  const navStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#146e3a",
    height: "80px",
    zIndex: 1200,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 24px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };

  const logoStyle = {
    color: "white",
    fontSize: "28px",
    fontWeight: "bold",
    textDecoration: "none",
    fontFamily: '"Playfair Display", serif',
    letterSpacing: "0.1em",
  };

  const navLinksStyle = {
    display: "flex",
    gap: "30px",
    listStyle: "none",
    margin: 0,
    padding: 0,
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "500",
    transition: "color 0.3s ease",
  };

  return (
    <nav style={navStyle}>
      <Link to="/" style={logoStyle}>
        VINOIR
      </Link>
      
      <ul style={navLinksStyle}>
        <li>
          <Link 
            to="/" 
            style={linkStyle}
            onMouseEnter={(e) => e.target.style.color = "#d4af37"}
            onMouseLeave={(e) => e.target.style.color = "white"}
          >
            Home
          </Link>
        </li>
        <li>
          <Link 
            to="/shop" 
            style={linkStyle}
            onMouseEnter={(e) => e.target.style.color = "#d4af37"}
            onMouseLeave={(e) => e.target.style.color = "white"}
          >
            Shop
          </Link>
        </li>
        <li>
          <Link 
            to="/about" 
            style={linkStyle}
            onMouseEnter={(e) => e.target.style.color = "#d4af37"}
            onMouseLeave={(e) => e.target.style.color = "white"}
          >
            About
          </Link>
        </li>
        <li>
          <Link 
            to="/contact" 
            style={linkStyle}
            onMouseEnter={(e) => e.target.style.color = "#d4af37"}
            onMouseLeave={(e) => e.target.style.color = "white"}
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}