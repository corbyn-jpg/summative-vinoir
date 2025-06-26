// src/Pages/CreateUser/CreateUser.js
import React, { useState } from "react";
import axios from "axios";
import { Box, Typography, TextField, Button } from "@mui/material";
import EmojiSelector from "../../Components/EmojiSelector";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emojiPassword, setEmojiPassword] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      setMessage(
        "Welcome! Your account has been created successfully. Redirecting..."
      );

      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
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
        />

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
          {isLoading ? "Creating account..." : "Create Account"}
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
        <a href="/login" style={{ color: "#333", fontWeight: "bold" }}>
          Login here
        </a>
      </Typography>
    </Box>
  );
};

export default CreateUser;
