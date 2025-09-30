import React, { useState } from "react";
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Card, 
  CardContent,
  Container,
  Divider,
  IconButton,
  Fade,
  Grow
} from "@mui/material";
import { 
  Email, 
  Phone, 
  LocationOn, 
  Schedule,
  Send,
  Close,
  CheckCircle,
  Star,
  Spa,
  LocalFlorist
} from "@mui/icons-material";
import emailjs from "emailjs-com";

// Initialize EmailJS
emailjs.init("_QatdQkHx_mavwiI-");

const ContactPageLuxury = () => {
  const [formData, setFormData] = useState({
    name: "", email: "", subject: "", message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await emailjs.send(
        "service_jtead7u",
        "template_63xglp9",
        {
          to_email: "241040@virtualwindow.co.za",
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }
      );

      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError("Failed to send message. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ 
      background: 'linear-gradient(180deg, #f8f5f2 0%, #ffffff 100%)',
      minHeight: '100vh',
      pt: { xs: 15, sm: 20 }
    }}>
      
      {/* ===== LUXURY HERO SECTION ===== */}
      <Box
        sx={{
          height: { xs: '50vh', md: '60vh' },
          background: `
            linear-gradient(
              rgba(45, 90, 61, 0.7),
              rgba(106, 76, 147, 0.7)
            ),
            url('/images/dior7.jpg') center/cover no-repeat
          `,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Floating Elements */}
        <Box sx={{ 
          position: 'absolute', 
          top: '20%', 
          left: '10%',
          animation: 'float 6s ease-in-out infinite'
        }}>
          <Spa sx={{ fontSize: 60, color: 'rgba(255,255,255,0.1)' }} />
        </Box>
        <Box sx={{ 
          position: 'absolute', 
          bottom: '15%', 
          right: '15%',
          animation: 'float 8s ease-in-out infinite reverse'
        }}>
          <LocalFlorist sx={{ fontSize: 80, color: 'rgba(255,255,255,0.1)' }} />
        </Box>

        <Container maxWidth="lg">
          <Fade in timeout={1000}>
            <Box textAlign="center" color="white">
              <Typography 
                variant="h1" 
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: { xs: '3rem', md: '4.5rem' },
                  fontWeight: 300,
                  letterSpacing: '0.02em',
                  mb: 2
                }}
              >
                Connect with Vinoir
              </Typography>
              <Typography 
                variant="h5" 
                sx={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontStyle: 'italic',
                  opacity: 0.9,
                  maxWidth: '600px',
                  mx: 'auto'
                }}
              >
                Where every conversation begins with the essence of luxury
              </Typography>
            </Box>
          </Fade>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          
          {/* ===== CONTACT FORM SECTION ===== */}
          <Grid item xs={12} lg={8}>
            <Grow in timeout={1200}>
              <Card
                elevation={0}
                sx={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,245,242,0.9) 100%)',
                  borderRadius: '24px',
                  border: '1px solid rgba(45, 90, 61, 0.1)',
                  boxShadow: '0 20px 40px rgba(45, 90, 61, 0.1)',
                  overflow: 'hidden'
                }}
              >
                {/* Form Header */}
                <Box
                  sx={{
                    background: 'linear-gradient(135deg, #2d5a3d 0%, #6a4c93 100%)',
                    p: 4,
                    color: 'white',
                    position: 'relative'
                  }}
                >
                  <Typography 
                    variant="h3" 
                    sx={{
                      fontFamily: '"Playfair Display", serif',
                      fontWeight: 300,
                      letterSpacing: '0.02em',
                      mb: 1
                    }}
                  >
                    Share Your Story
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    Let us craft the perfect fragrance experience for you
                  </Typography>
                </Box>

                <CardContent sx={{ p: 5 }}>
                  {isSubmitted ? (
                    <Fade in>
                      <Box textAlign="center" py={4}>
                        <CheckCircle sx={{ 
                          fontSize: 80, 
                          color: '#2d5a3d', 
                          mb: 2,
                          animation: 'pulse 2s infinite'
                        }} />
                        <Typography 
                          variant="h4" 
                          sx={{
                            fontFamily: '"Playfair Display", serif',
                            color: '#2d5a3d',
                            mb: 2
                          }}
                        >
                          Message Sent Successfully!
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 4, color: '#666' }}>
                          We've received your message and will respond within 24 hours.
                        </Typography>
                        <Button
                          variant="outlined"
                          onClick={() => setIsSubmitted(false)}
                          sx={{
                            borderColor: '#2d5a3d',
                            color: '#2d5a3d',
                            borderRadius: '12px',
                            px: 4,
                            py: 1.5,
                            '&:hover': {
                              backgroundColor: 'rgba(45, 90, 61, 0.05)'
                            }
                          }}
                        >
                          Send Another Message
                        </Button>
                      </Box>
                    </Fade>
                  ) : (
                    <Box component="form" onSubmit={handleSubmit}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            name="name"
                            label="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: '12px',
                                fontFamily: '"Cormorant Garamond", serif'
                              }
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            name="email"
                            label="Email Address"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: '12px',
                                fontFamily: '"Cormorant Garamond", serif'
                              }
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            select
                            name="subject"
                            label="How can we assist you?"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            SelectProps={{ native: true }}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: '12px',
                                fontFamily: '"Cormorant Garamond", serif'
                              }
                            }}
                          >
                            <option value="">Select your inquiry type</option>
                            <option value="Fragrance Consultation">Fragrance Consultation</option>
                            <option value="Custom Blend Request">Custom Blend Request</option>
                            <option value="Order Support">Order Support</option>
                            <option value="Press & Media">Press & Media</option>
                            <option value="Partnership Opportunity">Partnership Opportunity</option>
                            <option value="VIP Services">VIP Services</option>
                            <option value="Other">Other</option>
                          </TextField>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            multiline
                            rows={6}
                            name="message"
                            label="Your message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            placeholder="Tell us about your fragrance preferences, special occasions, or any questions you have..."
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: '12px',
                                fontFamily: '"Cormorant Garamond", serif'
                              }
                            }}
                          />
                        </Grid>
                        
                        {error && (
                          <Grid item xs={12}>
                            <Typography color="error" sx={{ textAlign: 'center' }}>
                              {error}
                            </Typography>
                          </Grid>
                        )}

                        <Grid item xs={12}>
                          <Button
                            type="submit"
                            fullWidth
                            disabled={isLoading}
                            endIcon={<Send />}
                            sx={{
                              background: 'linear-gradient(135deg, #2d5a3d 0%, #6a4c93 100%)',
                              color: 'white',
                              py: 2,
                              borderRadius: '12px',
                              fontSize: '1.1rem',
                              fontWeight: 600,
                              textTransform: 'none',
                              '&:hover': {
                                background: 'linear-gradient(135deg, #1e3e29 0%, #4a3269 100%)',
                                transform: 'translateY(-1px)',
                                boxShadow: '0 4px 12px rgba(45, 90, 61, 0.3)'
                              },
                              transition: 'all 0.3s ease'
                            }}
                          >
                            {isLoading ? 'Sending...' : 'Send Message'}
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grow>
          </Grid>

          {/* ===== CONTACT INFO & VIP SERVICES ===== */}
          <Grid item xs={12} lg={4}>
            <Box sx={{ position: 'sticky', top: 100 }}>
              
              {/* Contact Information */}
              <Grow in timeout={1400}>
                <Card
                  elevation={0}
                  sx={{
                    background: 'linear-gradient(135deg, #2d5a3d 0%, #6a4c93 100%)',
                    color: 'white',
                    borderRadius: '24px',
                    mb: 4,
                    overflow: 'hidden'
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Typography 
                      variant="h5" 
                      sx={{
                        fontFamily: '"Playfair Display", serif',
                        mb: 3,
                        fontWeight: 300
                      }}
                    >
                      Get in Touch
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Email sx={{ mr: 2, color: 'rgba(255,255,255,0.8)' }} />
                      <Box>
                        <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                          Email
                        </Typography>
                        <Typography variant="body1">
                          241040@virtualwindow.co.za
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Phone sx={{ mr: 2, color: 'rgba(255,255,255,0.8)' }} />
                      <Box>
                        <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                          Phone
                        </Typography>
                        <Typography variant="body1">
                          +27 12 345 6789
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <LocationOn sx={{ mr: 2, color: 'rgba(255,255,255,0.8)' }} />
                      <Box>
                        <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                          Visit Our Atelier
                        </Typography>
                        <Typography variant="body1">
                          Open Window - Centurion<br />
                          1297 John Vorster<br />
                          Centurion, Gauteng
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Schedule sx={{ mr: 2, color: 'rgba(255,255,255,0.8)' }} />
                      <Box>
                        <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                          Hours
                        </Typography>
                        <Typography variant="body1">
                          Mon-Fri: 9AM-6PM<br />
                          Sat: 10AM-4PM<br />
                          Sun: By Appointment
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grow>

              {/* VIP Services */}
              <Grow in timeout={1600}>
                <Card
                  elevation={0}
                  sx={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,245,242,0.9) 100%)',
                    borderRadius: '24px',
                    border: '1px solid rgba(45, 90, 61, 0.1)',
                    boxShadow: '0 20px 40px rgba(45, 90, 61, 0.1)'
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Typography 
                      variant="h6" 
                      sx={{
                        fontFamily: '"Playfair Display", serif',
                        color: '#2d5a3d',
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <Star sx={{ mr: 1, color: '#6a4c93' }} />
                      VIP Services
                    </Typography>
                    
                    <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
                      Experience luxury beyond the ordinary
                    </Typography>

                    <Box sx={{ '& > *': { mb: 1.5 } }}>
                      <Typography variant="body2">
                        • Personal Fragrance Consultation
                      </Typography>
                      <Typography variant="body2">
                        • Custom Blend Creation
                      </Typography>
                      <Typography variant="body2">
                        • Private Shopping Sessions
                      </Typography>
                      <Typography variant="body2">
                        • Home Delivery Service
                      </Typography>
                      <Typography variant="body2">
                        • Gift Wrapping & Personalization
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grow>
            </Box>
          </Grid>
        </Grid>

        {/* ===== LOCATION MAP ===== */}
        <Box sx={{ mt: 8 }}>
          <Typography 
            variant="h4" 
            sx={{
              fontFamily: '"Playfair Display", serif',
              textAlign: 'center',
              color: '#2d5a3d',
              mb: 4
            }}
          >
            Visit Our Luxury Atelier
          </Typography>
          
          <Card
            elevation={0}
            sx={{
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(45, 90, 61, 0.1)'
            }}
          >
            <Box sx={{ height: 400, filter: 'saturate(0.8) contrast(1.1)' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.8473501694!2d28.2094135!3d-25.8919438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e956608911ce097%3A0x519896b4b6eda40a!2sOpen%20Window%20-%20Centurion!5e0!3m2!1sen!2sza!4v1718200000000!5m2!1sen!2sza"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Vinoir Luxury Atelier Location"
              />
            </Box>
          </Card>
        </Box>
      </Container>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </Box>
  );
};

export default ContactPageLuxury;