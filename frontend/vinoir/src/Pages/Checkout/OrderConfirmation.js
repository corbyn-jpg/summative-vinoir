// src/Pages/checkout/OrderConfirmation.js
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const OrderConfirmation = () => {
  return (
    <Box sx={{ textAlign: "center", p: 4 }}>
      <Typography variant="h4" sx={{ mb: 2, color: "#146e3a" }}>
        Thank you for your order!
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Your order has been placed successfully. We've sent a confirmation to your email.
      </Typography>
      <Button
        variant="contained"
        component={Link}
        to="/shop"
        sx={{
          backgroundColor: "#146e3a",
          "&:hover": { backgroundColor: "#0d5a2c" },
        }}
      >
        Continue Shopping
      </Button>
    </Box>
  );
};

export default OrderConfirmation;