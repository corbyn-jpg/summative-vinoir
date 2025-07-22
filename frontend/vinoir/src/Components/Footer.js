import React from "react";
import { Box, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <Box component="footer" className="luxury-footer">
      <Box className="footer-content">
        {/* Brand Section */}
        <Box className="footer-section">
          <Typography
            variant="h6"
            className="footer-heading"
            sx={{ fontFamily: "serif" }}
            component="h2"
          >
            VINOIR
          </Typography>
          <Typography
            variant="body2"
            className="footer-text"
            sx={{ fontFamily: "serif" }}
          >
            Luxury fragrances for the discerning individual
          </Typography>
        </Box>

        {/* Explore Links */}
        <Box className="footer-section" aria-label="Explore navigation links">
          <Typography
            variant="subtitle1"
            className="footer-heading"
            sx={{ fontFamily: "serif" }}
            component="h3"
          >
            Explore
          </Typography>
          <Link
            component={RouterLink}
            to="/"
            className="footer-link"
            sx={{ fontFamily: "serif" }}
            underline="hover"
          >
            Home
          </Link>
          <Link
            component={RouterLink}
            to="/shop"
            className="footer-link"
            sx={{ fontFamily: "serif" }}
            underline="hover"
          >
            Shop
          </Link>
          <Link
            component={RouterLink}
            to="/about"
            className="footer-link"
            sx={{ fontFamily: "serif" }}
            underline="hover"
          >
            About
          </Link>
          <Link
            component={RouterLink}
            to="/contact"
            className="footer-link"
            sx={{ fontFamily: "serif" }}
            underline="hover"
          >
            Contact
          </Link>
        </Box>

        {/* Legal Links */}
        <Box className="footer-section" aria-label="Legal navigation links">
          <Typography
            variant="subtitle1"
            className="footer-heading"
            sx={{ fontFamily: "serif" }}
            component="h3"
          >
            Legal
          </Typography>
          <Link
            component={RouterLink}
            to="/privacy"
            className="footer-link"
            sx={{ fontFamily: "serif" }}
            underline="hover"
          >
            Privacy Policy
          </Link>
          <Link
            component={RouterLink}
            to="/terms"
            className="footer-link"
            sx={{ fontFamily: "serif" }}
            underline="hover"
          >
            Terms of Service
          </Link>
        </Box>

        {/* Contact Section */}
        <Box className="footer-section">
          <Typography
            variant="subtitle1"
            className="footer-heading"
            sx={{ fontFamily: "serif" }}
            component="h3"
          >
            Connect
          </Typography>
          <Typography
            variant="body2"
            className="footer-text"
            sx={{ fontFamily: "serif" }}
            component="p"
          >
            <Link href="mailto:info@vinoir.com" underline="hover" color="inherit">
              info@vinoir.com
            </Link>
          </Typography>
          <Typography
            variant="body2"
            className="footer-text"
            sx={{ fontFamily: "serif" }}
            component="p"
          >
            <Link href="tel:+15551234567" underline="hover" color="inherit">
              +1 (555) 123-4567
            </Link>
          </Typography>
        </Box>
      </Box>

      <Box className="footer-bottom" sx={{ textAlign: 'center', py: 2 }}>
        <Typography
          variant="caption"
          className="footer-copyright"
          sx={{ fontFamily: "serif" }}
          component="p"
          aria-label="Copyright"
        >
          © {new Date().getFullYear()} VINOIR. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;
