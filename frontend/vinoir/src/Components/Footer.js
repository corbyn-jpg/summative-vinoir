import React from "react";
import { Box, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <Box component="footer" className="luxury-footer">
      <Box className="footer-content">
        <Box className="footer-section">
          <Typography
            variant="h6"
            className="footer-heading"
            sx={{ fontFamily: "serif" }}
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

        <Box className="footer-section">
          <Typography
            variant="subtitle1"
            className="footer-heading"
            sx={{ fontFamily: "serif" }}
          >
            Explore
          </Typography>
          <Link
            component={RouterLink}
            to="/"
            className="footer-link"
            sx={{ fontFamily: "serif" }}
          >
            Home
          </Link>
          <Link
            component={RouterLink}
            to="/shop"
            className="footer-link"
            sx={{ fontFamily: "serif" }}
          >
            Shop
          </Link>
          <Link
            component={RouterLink}
            to="/about"
            className="footer-link"
            sx={{ fontFamily: "serif" }}
          >
            About
          </Link>
          <Link
            component={RouterLink}
            to="/contact"
            className="footer-link"
            sx={{ fontFamily: "serif" }}
          >
            Contact
          </Link>
        </Box>

        <Box className="footer-section">
          <Typography
            variant="subtitle1"
            className="footer-heading"
            sx={{ fontFamily: "serif" }}
          >
            Legal
          </Typography>
          <Link
            component={RouterLink}
            to="/privacy"
            className="footer-link"
            sx={{ fontFamily: "serif" }}
          >
            Privacy Policy
          </Link>
          <Link
            component={RouterLink}
            to="/terms"
            className="footer-link"
            sx={{ fontFamily: "serif" }}
          >
            Terms of Service
          </Link>
        </Box>

        <Box className="footer-section">
          <Typography
            variant="subtitle1"
            className="footer-heading"
            sx={{ fontFamily: "serif" }}
          >
            Connect
          </Typography>
          <Typography
            variant="body2"
            className="footer-text"
            sx={{ fontFamily: "serif" }}
          >
            info@vinoir.com
          </Typography>
          <Typography
            variant="body2"
            className="footer-text"
            sx={{ fontFamily: "serif" }}
          >
            +1 (555) 123-4567
          </Typography>
        </Box>
      </Box>

      <Box className="footer-bottom">
        <Typography
          variant="caption"
          className="footer-copyright"
          sx={{ fontFamily: "serif" }}
        >
          © {new Date().getFullYear()} VINOIR. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;
