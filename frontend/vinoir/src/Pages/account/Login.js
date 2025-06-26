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
  Paper,
  IconButton,
  InputAdornment
} from "@mui/material";
import { 
  Visibility, 
  VisibilityOff,
  EmojiEmotions,
  CheckCircle
} from "@mui/icons-material";
import EmojiSelector from "../../Components/EmojiSelector";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [emojiPassword, setEmojiPassword] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { showNotification } = useNotification();

  // Pre-fill email if coming from protected route
  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    // Frontend validation
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
        "http://localhost:5000/api/users/login",
        {
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
        email: email.trim(),
        name: response.data.user?.name || email.split('@')[0]
      });

      // Store token and update auth state
      localStorage.setItem("token", response.data.token);
      login(response.data.token, response.data.user);

      // Show success state
      setSuccess(true);
      
      // Show notification
      showNotification(`Welcome back, ${response.data.user?.name || email.split('@')[0]}!`, 'success');
      
      // Auto-redirect after delay
      setTimeout(() => {
        const redirectTo = location.state?.from?.pathname || "/";
        navigate(redirectTo);
      }, 1500);
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      const errorMessage = error.response?.data?.message || 
        "Invalid email or password. Please try again.";
      
      setError(errorMessage);
      showNotification(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleEmojiSelector = () => {
    setShowEmojiSelector(!showEmojiSelector);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
        {!success ? (
          <Fade in={!success} timeout={500}>
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
                Welcome Back
              </Typography>

              <form onSubmit={handleSubmit}>
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

                <TextField
                  label="Emoji Password"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={emojiPassword.join('')}
                  onClick={toggleEmojiSelector}
                  InputProps={{
                    readOnly: true,
                    style: {
                      borderRadius: "12px",
                      backgroundColor: "#fff",
                      cursor: "pointer",
                      fontSize: "1.5rem",
                      letterSpacing: "0.5rem",
                    },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={togglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ marginBottom: "0.5rem" }}
                />

                <Typography
                  variant="body2"
                  sx={{
                    color: "#666",
                    marginBottom: "1.5rem",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem"
                  }}
                >
                  <EmojiEmotions color="primary" />
                  Click above to select your emoji password
                </Typography>

                {showEmojiSelector && (
                  <EmojiSelector
                    selectedEmojis={emojiPassword}
                    setSelectedEmojis={setEmojiPassword}
                    maxLength={5}
                    onClose={() => setShowEmojiSelector(false)}
                  />
                )}

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
                    "Login"
                  )}
                </Button>
              </form>

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

              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                marginTop: "1.5rem",
                flexWrap: 'wrap',
                gap: 1
              }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#555",
                  }}
                >
                  Don't have an account?{" "}
                  <Link 
                    to="/register" 
                    state={{ email }}
                    style={{ 
                      color: "#146e3a", 
                      fontWeight: "bold",
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    Register here
                  </Link>
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: "#555",
                  }}
                >
                  <Link 
                    to="/forgot-password" 
                    style={{ 
                      color: "#146e3a", 
                      fontWeight: "bold",
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    Forgot your password?
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Fade>
        ) : (
          <Fade in={success} timeout={500}>
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Box sx={{ mb: 3 }}>
                <CheckCircle sx={{ 
                  fontSize: 80, 
                  color: '#4caf50',
                  mb: 2 
                }} />
                
                <Typography variant="h4" sx={{ 
                  fontWeight: 'bold', 
                  color: '#146e3a',
                  mb: 1
                }}>
                  Welcome back, {userData?.name}!
                </Typography>
                
                <Typography variant="body1" sx={{ color: '#555', mb: 2 }}>
                  You've successfully logged in to your Vinoir account.
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
                  Redirecting you now...
                </Typography>
              </Box>
              
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
                Go to Home Now
              </Button>
            </Box>
          </Fade>
        )}
      </Paper>
    </Box>
  );
};

export default Login;