import React from "react";
import { 
  Box, 
  Typography, 
  Container,
  Paper,
  Divider
} from "@mui/material";
import HeroSection from "../Components/HeroSection";
import heroImage from "../assets/spritz.jpeg";

const TermsOfService = () => {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        title="TERMS OF SERVICE"
        backgroundImage={heroImage}
        buttonText="CONTACT US"
        buttonLink="/contact"
      />

      {/* Terms of Service Content */}
      <Box sx={{ py: 8, background: 'linear-gradient(135deg, #f8f5f2 0%, #ffffff 100%)' }}>
        <Container maxWidth="lg">
          <Paper
            elevation={0}
            sx={{
              p: 6,
              background: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '20px',
              border: '1px solid rgba(45, 90, 61, 0.1)',
              boxShadow: '0 20px 40px rgba(45, 90, 61, 0.1)'
            }}
          >
            <Typography 
              variant="h3" 
              sx={{
                fontFamily: '"Playfair Display", serif',
                color: '#2d5a3d',
                mb: 2,
                textAlign: 'center'
              }}
            >
              Terms of Service
            </Typography>
            
            <Typography variant="body2" sx={{ textAlign: 'center', mb: 4, color: '#666' }}>
              Last updated: September 30, 2025
            </Typography>

            <Divider sx={{ mb: 4, borderColor: 'rgba(45, 90, 61, 0.2)' }} />

            <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.8 }}>
              Welcome to Vinoir. These Terms of Service ("Terms") govern your use of our website and the purchase of our 
              luxury fragrances. By accessing our website or making a purchase, you agree to be bound by these Terms.
            </Typography>

            {/* Acceptance of Terms */}
            <Typography 
              variant="h5" 
              sx={{
                fontFamily: '"Playfair Display", serif',
                color: '#2d5a3d',
                mb: 3,
                mt: 4
              }}
            >
              1. Acceptance of Terms
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.8 }}>
              By accessing and using this website, you accept and agree to be bound by the terms and provision of this 
              agreement. If you do not agree to these terms, you should not use this website.
            </Typography>

            {/* Product Information */}
            <Typography 
              variant="h5" 
              sx={{
                fontFamily: '"Playfair Display", serif',
                color: '#2d5a3d',
                mb: 3,
                mt: 4
              }}
            >
              2. Product Information and Availability
            </Typography>
            <Box component="ul" sx={{ pl: 4, mb: 4 }}>
              <li>All fragrances are handcrafted and may vary slightly in scent due to natural ingredients</li>
              <li>Product availability is subject to change without notice</li>
              <li>We reserve the right to limit quantities of any products or services</li>
              <li>Product images are for illustration purposes and may not reflect the exact appearance</li>
              <li>We strive to display accurate colors, but actual colors may vary depending on your display</li>
            </Box>

            {/* Pricing and Payment */}
            <Typography 
              variant="h5" 
              sx={{
                fontFamily: '"Playfair Display", serif',
                color: '#2d5a3d',
                mb: 3,
                mt: 4
              }}
            >
              3. Pricing and Payment
            </Typography>
            <Box component="ul" sx={{ pl: 4, mb: 4 }}>
              <li>All prices are displayed in USD and are subject to change without notice</li>
              <li>Payment must be made in full before products are shipped</li>
              <li>We accept major credit cards and secure payment methods</li>
              <li>You are responsible for any applicable taxes, duties, or customs fees</li>
              <li>Promotional codes cannot be combined unless specifically stated</li>
            </Box>

            {/* Orders and Shipping */}
            <Typography 
              variant="h5" 
              sx={{
                fontFamily: '"Playfair Display", serif',
                color: '#2d5a3d',
                mb: 3,
                mt: 4
              }}
            >
              4. Orders and Shipping
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
              <strong>Order Processing:</strong>
            </Typography>
            <Box component="ul" sx={{ pl: 4, mb: 3 }}>
              <li>Orders are processed within 2-3 business days</li>
              <li>You will receive a confirmation email when your order is placed</li>
              <li>We reserve the right to refuse any order for any reason</li>
            </Box>

            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
              <strong>Shipping:</strong>
            </Typography>
            <Box component="ul" sx={{ pl: 4, mb: 4 }}>
              <li>Shipping times vary by location (5-15 business days internationally)</li>
              <li>Shipping costs are calculated at checkout</li>
              <li>Risk of loss passes to you upon delivery to the carrier</li>
              <li>We are not responsible for delays caused by customs or shipping carriers</li>
            </Box>

            {/* Returns and Exchanges */}
            <Typography 
              variant="h5" 
              sx={{
                fontFamily: '"Playfair Display", serif',
                color: '#2d5a3d',
                mb: 3,
                mt: 4
              }}
            >
              5. Returns and Exchanges
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
              Due to the personal nature of fragrances and hygiene considerations:
            </Typography>
            <Box component="ul" sx={{ pl: 4, mb: 4 }}>
              <li>All sales are final - we do not accept returns on opened fragrances</li>
              <li>Unopened products may be returned within 14 days of delivery</li>
              <li>Products must be in original packaging and condition</li>
              <li>Customer is responsible for return shipping costs</li>
              <li>Refunds will be processed within 5-7 business days after receipt</li>
              <li>We will replace damaged or defective products at no charge</li>
            </Box>

            {/* Age Restrictions */}
            <Typography 
              variant="h5" 
              sx={{
                fontFamily: '"Playfair Display", serif',
                color: '#2d5a3d',
                mb: 3,
                mt: 4
              }}
            >
              6. Age Restrictions
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.8 }}>
              You must be at least 18 years old to make a purchase from Vinoir. By making a purchase, you represent 
              that you are at least 18 years old and have the legal right to enter into this agreement.
            </Typography>

            {/* Intellectual Property */}
            <Typography 
              variant="h5" 
              sx={{
                fontFamily: '"Playfair Display", serif',
                color: '#2d5a3d',
                mb: 3,
                mt: 4
              }}
            >
              7. Intellectual Property
            </Typography>
            <Box component="ul" sx={{ pl: 4, mb: 4 }}>
              <li>All content on this website is owned by Vinoir and protected by copyright</li>
              <li>The Vinoir name, logo, and fragrance names are trademarks of Vinoir</li>
              <li>You may not reproduce, distribute, or create derivative works without permission</li>
              <li>Product formulations and scent compositions are proprietary trade secrets</li>
            </Box>

            {/* Prohibited Uses */}
            <Typography 
              variant="h5" 
              sx={{
                fontFamily: '"Playfair Display", serif',
                color: '#2d5a3d',
                mb: 3,
                mt: 4
              }}
            >
              8. Prohibited Uses
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
              You may not use our website or products to:
            </Typography>
            <Box component="ul" sx={{ pl: 4, mb: 4 }}>
              <li>Violate any applicable laws or regulations</li>
              <li>Transmit viruses or malicious code</li>
              <li>Attempt to reverse engineer our fragrance formulations</li>
              <li>Resell products without authorization</li>
              <li>Use our trademarks or copyrighted material without permission</li>
              <li>Engage in any fraudulent or deceptive practices</li>
            </Box>

            {/* Disclaimers */}
            <Typography 
              variant="h5" 
              sx={{
                fontFamily: '"Playfair Display", serif',
                color: '#2d5a3d',
                mb: 3,
                mt: 4
              }}
            >
              9. Disclaimers and Limitations
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
              <strong>Allergies and Sensitivities:</strong>
            </Typography>
            <Box component="ul" sx={{ pl: 4, mb: 3 }}>
              <li>Please review ingredient lists carefully if you have known allergies</li>
              <li>We recommend patch testing before full use</li>
              <li>Discontinue use if irritation occurs</li>
              <li>Consult a physician if you experience adverse reactions</li>
            </Box>

            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
              <strong>Limitation of Liability:</strong>
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.8 }}>
              Vinoir shall not be liable for any indirect, incidental, special, or consequential damages arising from 
              the use of our products or website. Our total liability shall not exceed the amount paid for the product.
            </Typography>

            {/* Governing Law */}
            <Typography 
              variant="h5" 
              sx={{
                fontFamily: '"Playfair Display", serif',
                color: '#2d5a3d',
                mb: 3,
                mt: 4
              }}
            >
              10. Governing Law
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.8 }}>
              These Terms shall be governed by and construed in accordance with the laws of South Africa. Any disputes 
              arising under these Terms shall be subject to the exclusive jurisdiction of the courts of South Africa.
            </Typography>

            {/* Changes to Terms */}
            <Typography 
              variant="h5" 
              sx={{
                fontFamily: '"Playfair Display", serif',
                color: '#2d5a3d',
                mb: 3,
                mt: 4
              }}
            >
              11. Changes to Terms
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.8 }}>
              We reserve the right to update these Terms at any time. Changes will be effective immediately upon posting 
              on our website. Your continued use of our website after changes are posted constitutes acceptance of the new Terms.
            </Typography>

            {/* Contact Information */}
            <Typography 
              variant="h5" 
              sx={{
                fontFamily: '"Playfair Display", serif',
                color: '#2d5a3d',
                mb: 3,
                mt: 4
              }}
            >
              12. Contact Information
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
              If you have any questions about these Terms of Service, please contact us:
            </Typography>
            <Box sx={{ 
              p: 3, 
              background: 'rgba(45, 90, 61, 0.05)', 
              borderRadius: '12px',
              border: '1px solid rgba(45, 90, 61, 0.1)'
            }}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Vinoir</strong>
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Email: legal@vinoir.com
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Phone: +27 21 123 4567
              </Typography>
              <Typography variant="body1">
                Address: Stellenbosch Wine Country, Western Cape, South Africa
              </Typography>
            </Box>

            <Divider sx={{ my: 4, borderColor: 'rgba(45, 90, 61, 0.2)' }} />
            
            <Typography variant="body2" sx={{ textAlign: 'center', fontStyle: 'italic', color: '#666' }}>
              Thank you for choosing Vinoir. We appreciate your business and look forward to providing you with 
              exceptional luxury fragrances.
            </Typography>
          </Paper>
        </Container>
      </Box>
    </div>
  );
};

export default TermsOfService;