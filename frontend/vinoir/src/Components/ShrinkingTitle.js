// ShrinkingTitle.js
import React, { useEffect, useState } from "react";
import "./ShrinkingTitle.css";

export default function ShrinkingTitle() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`title-wrapper ${scrolled ? "shrink" : ""}`}>VINOIR</div>
  );
}
