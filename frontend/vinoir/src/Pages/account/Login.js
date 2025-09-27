// src/Pages/Login/Login.js
import React, { useState } from "react";
import axios from "axios";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import EmojiSelector from "../../Components/EmojiSelector";

const Login = () => {
  const [email, setEmail] = useState("");
  const [emojiPassword, setEmojiPassword] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

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
      console.log("Sending login request with:", {
        email: email.trim(),
        password: emojiPassword.join(""),
      });

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

      // Store token with correct key and update auth context
      localStorage.setItem("vinoir_token", response.data.token);
      
      // Update auth context with user data
      if (login) {
        await login(response.data.token, response.data.user);
      }
      
      setMessage("✨ Login successful! Welcome back to Vinoir!");

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setError(
        error.response?.data?.message ||
          "Invalid email or password. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "600px",
        margin: "3rem auto",
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
        background: "linear-gradient(145deg, #ffffff, #f3f3f3)",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontFamily: "Playfair Display, serif",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "1.5rem",
          color: "#222",
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
        />

        <EmojiSelector
          selectedEmojis={emojiPassword}
          setSelectedEmojis={setEmojiPassword}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isLoading}
          sx={{
            padding: "0.9rem",
            background: "linear-gradient(145deg, #333, #555)",
            color: "#fff",
            fontWeight: "bold",
            borderRadius: "8px",
            marginTop: "1.5rem",
            "&:hover": {
              background: "linear-gradient(145deg, #555, #333)",
            },
            "&:disabled": {
              background: "#e0e0e0",
              color: "#9e9e9e",
            },
          }}
        >
          {isLoading ? "Logging in..." : "Login"}
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
        Don't have an account?{" "}
        <a href="/register" style={{ color: "#333", fontWeight: "bold" }}>
          Register here
        </a>
      </Typography>
    </Box>
  );
};

export default Login;
