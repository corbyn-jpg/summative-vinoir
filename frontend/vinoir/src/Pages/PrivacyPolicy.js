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

const PrivacyPolicy = () => {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        title="PRIVACY POLICY"
        backgroundImage={heroImage}
        buttonText="CONTACT US"
        buttonLink="/contact"
      />

      {/* Privacy Policy Content */}
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
              Privacy Policy
            </Typography>
            
            <Typography variant="body2" sx={{ textAlign: 'center', mb: 4, color: '#666' }}>
              Last updated: September 30, 2025
            </Typography>

            <Divider sx={{ mb: 4, borderColor: 'rgba(45, 90, 61, 0.2)' }} />

            <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.8 }}>
              At Vinoir, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our 
              website or make a purchase from us.
            </Typography>

            {/* Information We Collect */}
            <Typography 
              variant="h5" 
              sx={{
                fontFamily: '"Playfair Display", serif',
                color: '#2d5a3d',
                mb: 3,
                mt: 4
              }}
            >
              1. Information We Collect
            </Typography>
            
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#6a4c93' }}>
              Personal Information
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
              We may collect personal information that you provide directly to us, including:
            </Typography>
            <Box component="ul" sx={{ pl: 4, mb: 3 }}>
              <li>Name, email address, phone number</li>
              <li>Billing and shipping addresses</li>
              <li>Payment information (processed securely through third-party providers)</li>
              <li>Account preferences and fragrance preferences</li>
              <li>Communication preferences</li>
            </Box>

            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#6a4c93' }}>
              Automatically Collected Information
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
              When you visit our website, we may automatically collect certain information, including:
            </Typography>
            <Box component="ul" sx={{ pl: 4, mb: 4 }}>
              <li>IP address and browser information</li>
              <li>Device information and operating system</li>
              <li>Pages visited and time spent on our site</li>
              <li>Referring website and search terms used</li>
            </Box>

            {/* How We Use Information */}
            <Typography 
              variant="h5" 
              sx={{
                fontFamily: '"Playfair Display", serif',
                color: '#2d5a3d',
                mb: 3,
                mt: 4
              }}
            >
              2. How We Use Your Information
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
              We use the information we collect to:
            </Typography>
            <Box component="ul" sx={{ pl: 4, mb: 4 }}>
              <li>Process and fulfill your orders</li>
              <li>Provide customer service and support</li>
              <li>Send you updates about your orders and account</li>
              <li>Personalize your shopping experience</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </Box>

            {/* Information Sharing */}
            <Typography 
              variant="h5" 
              sx={{
                fontFamily: '"Playfair Display", serif',
                color: '#2d5a3d',
                mb: 3,
                mt: 4
              }}
            >
              3. Information Sharing and Disclosure
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
              We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:
            </Typography>
            <Box component="ul" sx={{ pl: 4, mb: 4 }}>
              <li>With service providers who assist us in operating our business</li>
              <li>With payment processors to complete transactions</li>
              <li>With shipping companies to deliver your orders</li>
              <li>When required by law or to protect our rights</li>
              <li>In connection with a business transfer or merger</li>
            </Box>

            {/* Data Security */}
            <Typography 
              variant="h5" 
              sx={{
                fontFamily: '"Playfair Display", serif',
                color: '#2d5a3d',
                mb: 3,
                mt: 4
              }}
            >
              4. Data Security
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.8 }}>
              We implement appropriate technical and organizational security measures to protect your personal information 
              against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over 
              the internet or electronic storage is 100% secure.
            </Typography>

            {/* Your Rights */}
            <Typography 
              variant="h5" 
              sx={{
                fontFamily: '"Playfair Display", serif',
                color: '#2d5a3d',
                mb: 3,
                mt: 4
              }}
            >
              5. Your Rights and Choices
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
              You have the right to:
            </Typography>
            <Box component="ul" sx={{ pl: 4, mb: 4 }}>
              <li>Access and update your personal information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt-out of marketing communications</li>
              <li>Request a copy of your personal information</li>
              <li>Object to processing of your personal information</li>
            </Box>

            {/* Cookies */}
            <Typography 
              variant="h5" 
              sx={{
                fontFamily: '"Playfair Display", serif',
                color: '#2d5a3d',
                mb: 3,
                mt: 4
              }}
            >
              6. Cookies and Tracking Technologies
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.8 }}>
              We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, 
              and understand where our visitors are coming from. You can control cookie settings through your browser preferences.
            </Typography>

            {/* Third-Party Links */}
            <Typography 
              variant="h5" 
              sx={{
                fontFamily: '"Playfair Display", serif',
                color: '#2d5a3d',
                mb: 3,
                mt: 4
              }}
            >
              7. Third-Party Links
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.8 }}>
              Our website may contain links to third-party websites. We are not responsible for the privacy practices or 
              content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
            </Typography>

            {/* Children's Privacy */}
            <Typography 
              variant="h5" 
              sx={{
                fontFamily: '"Playfair Display", serif',
                color: '#2d5a3d',
                mb: 3,
                mt: 4
              }}
            >
              8. Children's Privacy
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.8 }}>
              Our services are not intended for individuals under the age of 18. We do not knowingly collect personal 
              information from children under 18. If we become aware that we have collected personal information from a 
              child under 18, we will take steps to delete such information.
            </Typography>

            {/* Changes to Policy */}
            <Typography 
              variant="h5" 
              sx={{
                fontFamily: '"Playfair Display", serif',
                color: '#2d5a3d',
                mb: 3,
                mt: 4
              }}
            >
              9. Changes to This Privacy Policy
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.8 }}>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new 
              Privacy Policy on this page and updating the "Last updated" date at the top of this policy.
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
              10. Contact Us
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
              If you have any questions about this Privacy Policy or our privacy practices, please contact us:
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
                Email: privacy@vinoir.com
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Phone: +27 21 123 4567
              </Typography>
              <Typography variant="body1">
                Address: Stellenbosch Wine Country, Western Cape, South Africa
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>
    </div>
  );
};

export default PrivacyPolicy;