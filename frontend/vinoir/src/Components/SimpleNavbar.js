import React from "react";
import { Link } from "react-router-dom";

// Simple custom button component
const SimpleButton = ({ onClick, children, style = {}, ariaLabel }) => (
  <button
    onClick={onClick}
    style={{
      backgroundColor: "transparent",
      border: "none",
      cursor: "pointer",
      padding: "8px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      ...style
    }}
    aria-label={ariaLabel}
  >
    {children}
  </button>
);

export default function SimpleNavbar() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "#146e3a",
        height: "80px",
        zIndex: 1200,
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        justifyContent: "space-between",
      }}
    >
      {/* Left side - Menu */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <SimpleButton ariaLabel="Menu">
          <span style={{ fontSize: "24px" }}>☰</span>
        </SimpleButton>
      </div>

      {/* Center - Logo/Title */}
      <div style={{ color: "white", fontSize: "24px", fontWeight: "bold" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          VINOIR
        </Link>
      </div>

      {/* Right side - Navigation buttons */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <SimpleButton ariaLabel="Search">
          <span style={{ fontSize: "20px" }}>🔍</span>
        </SimpleButton>
        <SimpleButton ariaLabel="Account">
          <span style={{ fontSize: "20px" }}>👤</span>
        </SimpleButton>
        <SimpleButton ariaLabel="Wishlist">
          <span style={{ fontSize: "20px" }}>💜</span>
        </SimpleButton>
        <SimpleButton ariaLabel="Cart">
          <span style={{ fontSize: "20px" }}>🛒</span>
        </SimpleButton>
      </div>
    </div>
  );
}