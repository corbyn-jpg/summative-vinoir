// ...existing code...
import React, { useState } from "react";
import { Box, Typography, Link, TextField, Button, InputAdornment, Fade } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Email, Send, CheckCircle } from "@mui/icons-material";
import emailjs from "@emailjs/browser";
import "./Footer.css";

export default function Footer() {
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
          <Link component={RouterLink} to="/privacy-policy" className="footer-link" underline="hover" color="inherit" aria-label="Privacy Policy">
            Privacy Policy
          </Link>
          <Link component={RouterLink} to="/terms-of-service" className="footer-link" underline="hover" color="inherit" aria-label="Terms of Service">
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

        <Box className="footer-section" aria-label="Newsletter signup">
          <Typography variant="subtitle1" className="footer-heading" component="h3">
            Stay Updated
          </Typography>
          {newsletterSubmitted ? (
            <Fade in>
              <Box sx={{ textAlign: 'center', py: 2 }}>
                <CheckCircle sx={{ color: '#6a4c93', mb: 1 }} />
                <Typography variant="body2" className="footer-text">
                  Thank you for subscribing!
                </Typography>
              </Box>
            </Fade>
          ) : (
            <Box 
              component="form" 
              onSubmit={handleNewsletterSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                fullWidth
                size="small"
                type="email"
                placeholder="Your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: 'rgba(255,255,255,0.7)', fontSize: 18 }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 1,
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '0.875rem',
                    '& fieldset': {
                      borderColor: 'rgba(255,255,255,0.3)'
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255,255,255,0.5)'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#6a4c93'
                    }
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: 'rgba(255,255,255,0.7)',
                    opacity: 1
                  }
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                endIcon={<Send sx={{ fontSize: 16 }} />}
                sx={{
                  backgroundColor: '#6a4c93',
                  borderRadius: '8px',
                  py: 0.8,
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#5a3c83'
                  }
                }}
              >
                Subscribe
              </Button>
            </Box>
          )}
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