import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  CircularProgress,
  Fade,
  Paper
} from "@mui/material";
import EmojiSelector from "../../Components/EmojiSelector";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emojiPassword, setEmojiPassword] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(1); // 1: Form, 2: Success
  const [userData, setUserData] = useState(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { showNotification } = useNotification();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");
    setIsLoading(true);

    // Frontend validation
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

      // Save user data for success display
      setUserData({
        name: name.trim(),
        email: email.trim(),
      });

      // Store token and update auth state
      localStorage.setItem("token", response.data.token);
      login(response.data.token, {
        name: name.trim(),
        email: email.trim(),
      });

      // Show success state
      setSuccess(true);
      setStep(2);
      
      // Show notification
      showNotification(`Welcome ${name.trim()}! Your account was created successfully`, 'success');
      
      // Auto-redirect after delay
      setTimeout(() => {
        const redirectTo = location.state?.from || "/";
        navigate(redirectTo);
      }, 3000);
    } catch (error) {
      console.error(
        "Registration error:",
        error.response?.data || error.message
      );
      const errorMessage = error.response?.data?.message || 
        "Registration failed. Please try again.";
      
      setError(errorMessage);
      showNotification(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartOver = () => {
    setName("");
    setEmail("");
    setEmojiPassword([]);
    setError("");
    setMessage("");
    setSuccess(false);
    setStep(1);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        p: 3,
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%)',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          maxWidth: "600px",
          width: '100%',
          padding: { xs: '1.5rem', sm: '2.5rem' },
          borderRadius: "16px",
          boxShadow: "0 15px 35px rgba(0, 0, 0, 0.15)",
          background: "linear-gradient(145deg, #ffffff, #f8f9fa)",
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
          }
        }}
      >
        {step === 1 ? (
          <Fade in={step === 1} timeout={500}>
            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "Playfair Display, serif",
                  fontWeight: "bold",
                  textAlign: "center",
                  marginBottom: "1.5rem",
                  color: "#146e3a",
                }}
              >
                Join the Vinoir Experience
              </Typography>

              <form onSubmit={handleSubmit}>
                <TextField
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  sx={{ marginBottom: "1.5rem" }}
                  InputProps={{
                    style: {
                      borderRadius: "12px",
                      backgroundColor: "#fff",
                    }
                  }}
                />

                <TextField
                  label="Email Address"
                  type="email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  sx={{ marginBottom: "1.5rem" }}
                  InputProps={{
                    style: {
                      borderRadius: "12px",
                      backgroundColor: "#fff",
                    }
                  }}
                />

                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                    color: "#444",
                    marginBottom: "1rem",
                    textAlign: "center",
                  }}
                >
                  Create Your Emoji Password
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#666",
                    marginBottom: "1.5rem",
                    textAlign: "center",
                  }}
                >
                  Select 3-5 emojis that you'll remember as your password
                </Typography>

                <EmojiSelector
                  selectedEmojis={emojiPassword}
                  setSelectedEmojis={setEmojiPassword}
                  maxLength={5}
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={isLoading}
                  sx={{
                    padding: "0.9rem",
                    background: "linear-gradient(145deg, #146e3a, #0d5a2c)",
                    color: "#fff",
                    fontWeight: "bold",
                    borderRadius: "12px",
                    marginTop: "1.5rem",
                    fontSize: "1.1rem",
                    "&:hover": {
                      background: "linear-gradient(145deg, #0d5a2c, #146e3a)",
                    },
                    "&:disabled": {
                      background: "#e0e0e0",
                      color: "#9e9e9e",
                    },
                  }}
                >
                  {isLoading ? (
                    <CircularProgress size={24} sx={{ color: "white" }} />
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>

              {message && (
                <Typography
                  sx={{
                    marginTop: "1.5rem",
                    padding: "1rem",
                    backgroundColor: "#e8f5e9",
                    color: "#2e7d32",
                    fontWeight: "bold",
                    borderRadius: "8px",
                    textAlign: "center",
                  }}
                >
                  {message}
                </Typography>
              )}

              {error && (
                <Typography
                  sx={{
                    marginTop: "1.5rem",
                    padding: "1rem",
                    backgroundColor: "#ffebee",
                    color: "#c62828",
                    fontWeight: "bold",
                    borderRadius: "8px",
                    textAlign: "center",
                  }}
                >
                  {error}
                </Typography>
              )}

              <Typography
                variant="body2"
                sx={{
                  textAlign: "center",
                  marginTop: "1.5rem",
                  color: "#555",
                }}
              >
                Already have an account?{" "}
                <Link 
                  to="/login" 
                  style={{ 
                    color: "#146e3a", 
                    fontWeight: "bold",
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  Login here
                </Link>
              </Typography>
            </Box>
          </Fade>
        ) : (
          <Fade in={step === 2} timeout={500}>
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Box sx={{ mb: 3 }}>
                <Box sx={{
                  width: 80,
                  height: 80,
                  backgroundColor: '#e8f5e9',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  mb: 2
                }}>
                  <Typography variant="h3" sx={{ color: '#4caf50' }}>
                    ✓
                  </Typography>
                </Box>
                
                <Typography variant="h4" sx={{ 
                  fontWeight: 'bold', 
                  color: '#146e3a',
                  mb: 1
                }}>
                  Welcome, {userData?.name}!
                </Typography>
                
                <Typography variant="body1" sx={{ color: '#555', mb: 2 }}>
                  Your Vinoir account has been successfully created.
                </Typography>
                
                <Typography variant="body2" sx={{ 
                  backgroundColor: '#e8f5e9',
                  color: '#2e7d32',
                  p: 2,
                  borderRadius: '8px',
                  maxWidth: '400px',
                  margin: '0 auto',
                  mb: 3
                }}>
                  You'll be redirected to the homepage shortly
                </Typography>
              </Box>
              
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'center',
                gap: 2,
                flexWrap: 'wrap'
              }}>
                <Button
                  variant="contained"
                  onClick={() => navigate('/')}
                  sx={{
                    backgroundColor: '#146e3a',
                    '&:hover': { backgroundColor: '#0d5a2c' },
                    px: 4,
                    py: 1.5
                  }}
                >
                  Go to Home
                </Button>
                
                <Button
                  variant="outlined"
                  onClick={handleStartOver}
                  sx={{
                    color: '#146e3a',
                    borderColor: '#146e3a',
                    '&:hover': {
                      backgroundColor: '#146e3a',
                      color: 'white'
                    },
                    px: 4,
                    py: 1.5
                  }}
                >
                  Create Another Account
                </Button>
              </Box>
              
              <Typography variant="body2" sx={{ 
                mt: 3, 
                color: '#777',
                fontStyle: 'italic'
              }}>
                Check your email at {userData?.email} for a welcome message
              </Typography>
            </Box>
          </Fade>
        )}
      </Paper>
    </Box>
  );
};

export default CreateUser;