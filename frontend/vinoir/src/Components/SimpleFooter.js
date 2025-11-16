import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import emailjs from "@emailjs/browser";
import "./Footer.css";

export default function SimpleFooter() {
  const year = new Date().getFullYear();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    try {
      if (emailjs) {
        await emailjs.send(
          "service_jtead7u",
          "template_63xglp9",
          {
            to_email: "241040@virtualwindow.co.za",
            from_name: "Newsletter Subscription",
            from_email: newsletterEmail,
            subject: "Newsletter Subscription",
            message: `New newsletter subscription from: ${newsletterEmail}`,
          }
        );
      }

      setNewsletterSubmitted(true);
      setNewsletterEmail("");
      setTimeout(() => setNewsletterSubmitted(false), 3000);
    } catch (err) {
      console.error("Newsletter signup failed:", err);
    }
  };

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
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
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

  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    backgroundColor: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.3)",
    borderRadius: "8px",
    color: "white",
    fontSize: "14px",
    marginBottom: "10px"
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    backgroundColor: "#6a4c93",
    border: "none",
    borderRadius: "8px",
    color: "white",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.3s ease"
  };

  const bottomStyle = {
    textAlign: "center",
    paddingTop: "20px",
    borderTop: "1px solid rgba(255,255,255,0.2)",
    fontSize: "12px",
    color: "rgba(255,255,255,0.6)"
  };

  return (
    <footer style={footerStyle} role="contentinfo" aria-labelledby="footer-heading">
      <div style={contentStyle}>
        <div style={sectionStyle} id="footer-brand">
          <h2 style={headingStyle}>VINOIR</h2>
          <p style={{ margin: 0, fontSize: "14px", color: "rgba(255,255,255,0.8)" }}>
            Luxury fragrances for the discerning individual
          </p>
        </div>

        <div style={sectionStyle} aria-label="Explore navigation links">
          <h3 style={headingStyle}>Explore</h3>
          <RouterLink to="/" style={linkStyle} aria-label="Home">
            Home
          </RouterLink>
          <RouterLink to="/shop" style={linkStyle} aria-label="Shop">
            Shop
          </RouterLink>
          <RouterLink to="/about" style={linkStyle} aria-label="About">
            About
          </RouterLink>
          <RouterLink to="/contact" style={linkStyle} aria-label="Contact">
            Contact
          </RouterLink>
        </div>

        <div style={sectionStyle} aria-label="Legal navigation links">
          <h3 style={headingStyle}>Legal</h3>
          <RouterLink to="/privacy-policy" style={linkStyle} aria-label="Privacy Policy">
            Privacy Policy
          </RouterLink>
          <RouterLink to="/terms-of-service" style={linkStyle} aria-label="Terms of Service">
            Terms of Service
          </RouterLink>
        </div>

        <div style={sectionStyle} aria-label="Contact information">
          <h3 style={headingStyle}>Connect</h3>
          <a href="mailto:info@vinoir.com" style={linkStyle} aria-label="Email">
            📧 info@vinoir.com
          </a>
          <a href="tel:+15551234567" style={linkStyle} aria-label="Phone">
            📞 +1 (555) 123-4567
          </a>
        </div>

        <div style={sectionStyle} aria-label="Newsletter signup">
          <h3 style={headingStyle}>Stay Updated</h3>
          {newsletterSubmitted ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: '24px', marginBottom: '10px' }}>✅</div>
              <p style={{ margin: 0, fontSize: "14px", color: "rgba(255,255,255,0.8)" }}>
                Thank you for subscribing!
              </p>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                placeholder="📧 Your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                style={inputStyle}
              />
              <button
                type="submit"
                style={buttonStyle}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#5a3c83'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#6a4c93'}
              >
                Subscribe ✨
              </button>
            </form>
          )}
        </div>
      </div>

      <div style={bottomStyle} aria-hidden="false">
        <p style={{ margin: 0 }}>
          © {year} VINOIR. All rights reserved.
        </p>
      </div>
    </footer>
  );
}