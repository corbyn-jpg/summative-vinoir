// ...existing code...
import React from "react";
import { Box, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <Box component="footer" className="luxury-footer" role="contentinfo" aria-labelledby="footer-heading">
      <Box className="footer-content">
        <Box className="footer-section" id="footer-brand">
          <Typography variant="h6" className="footer-heading" component="h2">
            VINOIR
          </Typography>
          <Typography variant="body2" className="footer-text" component="p">
            Luxury fragrances for the discerning individual
          </Typography>
        </Box>

        <Box className="footer-section" aria-label="Explore navigation links">
          <Typography variant="subtitle1" className="footer-heading" component="h3">
            Explore
          </Typography>
          <Link component={RouterLink} to="/" className="footer-link" underline="hover" color="inherit" aria-label="Home">
            Home
          </Link>
          <Link component={RouterLink} to="/shop" className="footer-link" underline="hover" color="inherit" aria-label="Shop">
            Shop
          </Link>
          <Link component={RouterLink} to="/about" className="footer-link" underline="hover" color="inherit" aria-label="About">
            About
          </Link>
          <Link component={RouterLink} to="/contact" className="footer-link" underline="hover" color="inherit" aria-label="Contact">
            Contact
          </Link>
        </Box>

        <Box className="footer-section" aria-label="Legal navigation links">
          <Typography variant="subtitle1" className="footer-heading" component="h3">
            Legal
          </Typography>
          <Link component={RouterLink} to="/privacy" className="footer-link" underline="hover" color="inherit" aria-label="Privacy Policy">
            Privacy Policy
          </Link>
          <Link component={RouterLink} to="/terms" className="footer-link" underline="hover" color="inherit" aria-label="Terms of Service">
            Terms of Service
          </Link>
        </Box>

        <Box className="footer-section" aria-label="Contact information">
          <Typography variant="subtitle1" className="footer-heading" component="h3">
            Connect
          </Typography>
          <Typography variant="body2" className="footer-text" component="p">
            <Link href="mailto:info@vinoir.com" underline="hover" color="inherit" aria-label="Email">
              info@vinoir.com
            </Link>
          </Typography>
          <Typography variant="body2" className="footer-text" component="p">
            <Link href="tel:+15551234567" underline="hover" color="inherit" aria-label="Phone">
              +1 (555) 123-4567
            </Link>
          </Typography>
        </Box>
      </Box>

      <Box className="footer-bottom" sx={{ textAlign: "center", py: 2 }} aria-hidden="false">
        <Typography variant="caption" className="footer-copyright" component="p">
          © {year} VINOIR. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
// ...existing code...