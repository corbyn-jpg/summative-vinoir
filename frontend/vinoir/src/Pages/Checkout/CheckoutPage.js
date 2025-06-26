// src/Pages/checkout/CheckoutPage.js
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Divider,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useCart } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    zipCode: "",
    paymentMethod: "creditCard",
    termsAccepted: false,
  });

  const formatPrice = (price) => {
    const num = Number(price);
    return isNaN(num) ? "0.00" : num.toFixed(2);
  };

  const shipping = 50;
  const total = cartTotal + shipping;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setOrderSuccess(true);
      clearCart();
    }, 2000);
  };

  if (cart.length === 0 && !orderSuccess) {
    return (
      <Box sx={{ textAlign: "center", p: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Your cart is empty
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
  }

  if (orderSuccess) {
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
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: "0 auto" }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
        Checkout
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Shipping Information
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="ZIP/Postal Code"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Paper>

            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Payment Method
              </Typography>
              
              <FormControl fullWidth>
                <InputLabel>Payment Method</InputLabel>
                <Select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  label="Payment Method"
                >
                  <MenuItem value="creditCard">Credit Card</MenuItem>
                  <MenuItem value="paypal">PayPal</MenuItem>
                  <MenuItem value="bankTransfer">Bank Transfer</MenuItem>
                </Select>
              </FormControl>

              {formData.paymentMethod === "creditCard" && (
                <Box sx={{ mt: 2 }}>
                  <TextField
                    fullWidth
                    label="Card Number"
                    placeholder="1234 5678 9012 3456"
                    sx={{ mb: 2 }}
                  />
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Expiry Date"
                        placeholder="MM/YY"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="CVV"
                        placeholder="123"
                      />
                    </Grid>
                  </Grid>
                </Box>
              )}

              <FormControlLabel
                control={
                  <Checkbox
                    required
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                  />
                }
                label="I agree to the terms and conditions"
                sx={{ mt: 2 }}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={5}>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Order Summary
              </Typography>
              
              <Box sx={{ maxHeight: "300px", overflowY: "auto", mb: 2 }}>
                {cart.map((item) => (
                  <Box
                    key={item._id}
                    sx={{
                      display: "flex",
                      mb: 2,
                      p: 1,
                      alignItems: "center",
                    }}
                  >
                    <img
                      src={item.images?.[0]?.url || "/images/fallback.jpg"}
                      alt={item.name}
                      style={{
                        width: 60,
                        height: 60,
                        objectFit: "cover",
                        borderRadius: "4px",
                        marginRight: "16px",
                      }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle1">{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.quantity} × R {item.price.toFixed(2)}
                      </Typography>
                    </Box>
                    <Typography>
                      R {(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography>Subtotal</Typography>
                <Typography>R {formatPrice(cartTotal)}</Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography>Shipping</Typography>
                <Typography>R {formatPrice(shipping)}</Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6">R {formatPrice(total)}</Typography>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading || !formData.termsAccepted}
                sx={{
                  backgroundColor: "#146e3a",
                  "&:hover": { backgroundColor: "#0d5a2c" },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Place Order"
                )}
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default CheckoutPage;