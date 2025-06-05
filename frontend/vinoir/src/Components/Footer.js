import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <Box component="footer" className="luxury-footer">
      <Box className="footer-content">
        <Box className="footer-section">
          <Typography variant="h6" className="footer-heading">
            VINOIR
          </Typography>
          <Typography variant="body2" className="footer-text">
            Luxury fragrances for the discerning individual
          </Typography>
        </Box>

        <Box className="footer-section">
          <Typography variant="subtitle1" className="footer-heading">
            Explore
          </Typography>
          <Link component={RouterLink} to="/" className="footer-link">
            Home
          </Link>
          <Link component={RouterLink} to="/shop" className="footer-link">
            Shop
          </Link>
          <Link component={RouterLink} to="/about" className="footer-link">
            About
          </Link>
          <Link component={RouterLink} to="/contact" className="footer-link">
            Contact
          </Link>
        </Box>

        <Box className="footer-section">
          <Typography variant="subtitle1" className="footer-heading">
            Legal
          </Typography>
          <Link component={RouterLink} to="/privacy" className="footer-link">
            Privacy Policy
          </Link>
          <Link component={RouterLink} to="/terms" className="footer-link">
            Terms of Service
          </Link>
        </Box>

        <Box className="footer-section">
          <Typography variant="subtitle1" className="footer-heading">
            Connect
          </Typography>
          <Typography variant="body2" className="footer-text">
            info@vinoir.com
          </Typography>
          <Typography variant="body2" className="footer-text">
            +1 (555) 123-4567
          </Typography>
        </Box>
      </Box>

      <Box className="footer-bottom">
        <Typography variant="caption" className="footer-copyright">
          © {new Date().getFullYear()} VINOIR. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;