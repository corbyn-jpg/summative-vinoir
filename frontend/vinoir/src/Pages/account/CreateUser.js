// src/Pages/CreateUser/CreateUser.js
import React, { useState } from "react";
import axios from "axios";
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Container,
  Paper,
  InputAdornment,
  Stepper,
  Step,
  StepLabel,
  Fade,
  Grow
} from "@mui/material";
import { PersonOutline, EmailOutlined, CheckCircle } from "@mui/icons-material";
import EmojiSelector from "../../Components/EmojiSelector";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emojiPassword, setEmojiPassword] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const steps = ['Personal Details', 'Signature Password', 'Welcome to Vinoir'];

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");
    setIsLoading(true);

    // Validation
    if (!name || name.trim().length < 2) {
      setError("Please enter a valid name (at least 2 characters).");
      setIsLoading(false);
      return;
    }

    if (!email || !validateEmail(email)) {
      setError("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    if (emojiPassword.length < 3) {
      setError("Please select at least 3 emojis for your password.");
      setIsLoading(false);
      return;
    }

    try {
      console.log("Sending registration request with:", {
        name: name.trim(),
        email: email.trim(),
        password: emojiPassword.join(""),
      });

      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          name: name.trim(),
          email: email.trim(),
          password: emojiPassword.join(""),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      localStorage.setItem("token", response.data.token);
      
      // Success animation sequence
      setCurrentStep(2);
      setShowSuccess(true);
      setMessage("✨ Welcome to the world of luxury fragrances! ✨");

      setTimeout(() => {
        window.location.href = "/?registered=true";
      }, 3000);
    } catch (error) {
      console.error(
        "Registration error:",
        error.response?.data || error.message
      );
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: { xs: 8, sm: 12 } }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant="h2"
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 300,
            color: '#2d5a3d',
            mb: 2,
            letterSpacing: '0.02em'
          }}
        >
          Join Vinoir
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontFamily: '"Cormorant Garamond", serif',
            color: '#666',
            fontStyle: 'italic',
            mb: 4
          }}
        >
          Enter the world of luxury fragrances
        </Typography>

        {/* Progress Stepper */}
        <Box sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
          <Stepper activeStep={currentStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel 
                  sx={{
                    '& .MuiStepLabel-label': {
                      fontFamily: '"Cormorant Garamond", serif',
                      fontSize: '1rem'
                    },
                    '& .MuiStepIcon-root': {
                      color: 'rgba(45, 90, 61, 0.3)',
                      '&.Mui-active': { color: '#2d5a3d' },
                      '&.Mui-completed': { color: '#2d5a3d' }
                    }
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </Box>

      {/* Main Form */}
      <Paper
        elevation={12}
        sx={{
          maxWidth: 600,
          mx: 'auto',
          overflow: 'hidden',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,248,248,0.9) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(45, 90, 61, 0.1)'
        }}
      >
        {/* Header */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #2d5a3d 0%, #6a4c93 100%)',
            p: 4,
            color: 'white',
            position: 'relative'
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'radial-gradient(circle at 30% 70%, rgba(255,255,255,0.1) 0%, transparent 50%)',
              pointerEvents: 'none'
            }}
          />
          <Typography
            variant="h4"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 300,
              textAlign: 'center',
              position: 'relative'
            }}
          >
            Create Your Account
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              opacity: 0.9,
              mt: 1,
              fontStyle: 'italic',
              position: 'relative'
            }}
          >
            Your luxury fragrance journey begins here
          </Typography>
        </Box>

        {/* Form Content */}
        <Box sx={{ p: 4 }}>
          {showSuccess ? (
            /* Success Animation */
            <Fade in={showSuccess} timeout={800}>
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Grow in={showSuccess} timeout={1000}>
                  <Box
                    sx={{
                      width: 120,
                      height: 120,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #2d5a3d 0%, #6a4c93 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 24px',
                      animation: 'luxuryPulse 2s ease-in-out infinite',
                      '@keyframes luxuryPulse': {
                        '0%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(45, 90, 61, 0.7)' },
                        '70%': { transform: 'scale(1.05)', boxShadow: '0 0 0 20px rgba(45, 90, 61, 0)' },
                        '100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(45, 90, 61, 0)' }
                      }
                    }}
                  >
                    <CheckCircle sx={{ fontSize: 60, color: 'white' }} />
                  </Box>
                </Grow>
                
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: '"Playfair Display", serif',
                    color: '#2d5a3d',
                    mb: 2
                  }}
                >
                  Welcome to Vinoir!
                </Typography>
                
                <Typography
                  variant="body1"
                  sx={{
                    color: '#666',
                    mb: 3,
                    fontStyle: 'italic'
                  }}
                >
                  {message}
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 1,
                    fontSize: '2rem',
                    animation: 'sparkle 1.5s ease-in-out infinite',
                    '@keyframes sparkle': {
                      '0%, 100%': { opacity: 1 },
                      '50%': { opacity: 0.7 }
                    }
                  }}
                >
                  ✨🌟✨
                </Box>
              </Box>
            </Fade>
          ) : (
            /* Registration Form */
            <form onSubmit={handleSubmit}>
              <Fade in={!showSuccess} timeout={600}>
                <Box>
                  {/* Name Field */}
                  <TextField
                    label="Full Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonOutline sx={{ color: '#2d5a3d' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      mb: 3,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: 'rgba(45, 90, 61, 0.02)',
                        '& fieldset': { borderColor: 'rgba(45, 90, 61, 0.3)' },
                        '&:hover fieldset': { borderColor: '#2d5a3d' },
                        '&.Mui-focused fieldset': { borderColor: '#2d5a3d', borderWidth: '2px' }
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(45, 90, 61, 0.7)',
                        '&.Mui-focused': { color: '#2d5a3d' }
                      }
                    }}
                  />

                  {/* Email Field */}
                  <TextField
                    label="Email Address"
                    type="email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailOutlined sx={{ color: '#2d5a3d' }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      mb: 4,
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: 'rgba(45, 90, 61, 0.02)',
                        '& fieldset': { borderColor: 'rgba(45, 90, 61, 0.3)' },
                        '&:hover fieldset': { borderColor: '#2d5a3d' },
                        '&.Mui-focused fieldset': { borderColor: '#2d5a3d', borderWidth: '2px' }
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgba(45, 90, 61, 0.7)',
                        '&.Mui-focused': { color: '#2d5a3d' }
                      }
                    }}
                  />

                  {/* Emoji Password Section */}
                  <Box
                    sx={{
                      mb: 4,
                      p: 3,
                      backgroundColor: 'rgba(45, 90, 61, 0.02)',
                      borderRadius: '16px',
                      border: '1px solid rgba(45, 90, 61, 0.1)'
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: '"Playfair Display", serif',
                        color: '#2d5a3d',
                        mb: 1,
                        textAlign: 'center'
                      }}
                    >
                      🎭 Create Your Signature Password
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#666',
                        textAlign: 'center',
                        mb: 3,
                        fontStyle: 'italic'
                      }}
                    >
                      Choose 3-5 emojis that represent you. This unique combination will be your luxury key to Vinoir.
                    </Typography>
                    <EmojiSelector
                      selectedEmojis={emojiPassword}
                      setSelectedEmojis={setEmojiPassword}
                      maxLength={5}
                    />
                  </Box>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={isLoading || emojiPassword.length < 3}
                    sx={{
                      py: 1.8,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      borderRadius: '12px',
                      textTransform: 'none',
                      letterSpacing: '0.5px',
                      background: 'linear-gradient(135deg, #2d5a3d 0%, #6a4c93 100%)',
                      "&:hover": {
                        background: 'linear-gradient(135deg, #1e3e29 0%, #4a3269 100%)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(45, 90, 61, 0.3)'
                      },
                      "&:disabled": {
                        backgroundColor: '#cccccc',
                        color: '#888'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {isLoading ? "Creating Your Account..." : "Enter the World of Luxury ✨"}
                  </Button>
                </Box>
              </Fade>
            </form>
          )}

          {/* Error Message */}
          {error && !showSuccess && (
            <Fade in={!!error} timeout={400}>
              <Box
                sx={{
                  mt: 3,
                  p: 3,
                  backgroundColor: 'rgba(211, 47, 47, 0.05)',
                  borderRadius: '12px',
                  border: '1px solid rgba(211, 47, 47, 0.2)',
                  textAlign: 'center'
                }}
              >
                <Typography color="error" sx={{ fontWeight: 500 }}>
                  {error}
                </Typography>
              </Box>
            </Fade>
          )}

          {/* Login Link */}
          {!showSuccess && (
            <Box sx={{ textAlign: 'center', mt: 4, pt: 3, borderTop: '1px solid rgba(45, 90, 61, 0.1)' }}>
              <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
                Already part of the luxury experience?
              </Typography>
              <Button
                component="a"
                href="/login"
                variant="text"
                sx={{
                  color: '#2d5a3d',
                  fontWeight: 600,
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'rgba(45, 90, 61, 0.05)'
                  }
                }}
              >
                Sign In Here →
              </Button>
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateUser;
