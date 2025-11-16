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
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  // Calculate order summary
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 50;
  const total = subtotal + shipping;

  const clearCart = () => {
    // Create a copy to avoid mutation during iteration
    [...cart].forEach((item) => removeFromCart(item._id));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "address",
      "city",
      "country",
      "zipCode",
    ];

    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      setError(`Please fill in: ${missingFields.join(", ")}`);
      return false;
    }

    if (!formData.termsAccepted) {
      setError("Please accept the terms and conditions");
      return false;
    }

    setError(null);
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      // Simulate API call (replace with actual checkout API)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Clear cart
      clearCart();

      // Navigate to confirmation with order details
      navigate("/order-confirmation", {
        state: {
          orderDetails: {
            total,
            items: cart.length,
            orderNumber: `#${Date.now().toString().slice(-6)}`,
            customer: `${formData.firstName} ${formData.lastName}`,
          },
        },
      });
    } catch (err) {
      console.error("Checkout failed:", err);
      setError("Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
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

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: "0 auto" }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: "bold" }}>
        Checkout
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={4}>
          {/* Shipping Information Column */}
          <Grid item xs={12} md={7}>
            <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Shipping Information
              </Typography>

              <Grid container spacing={2}>
                {[
                  {
                    label: "First Name",
                    name: "firstName",
                    xs: 6,
                    required: true,
                  },
                  {
                    label: "Last Name",
                    name: "lastName",
                    xs: 6,
                    required: true,
                  },
                  {
                    label: "Email",
                    name: "email",
                    type: "email",
                    required: true,
                  },
                  { label: "Phone Number", name: "phone" },
                  { label: "Address", name: "address", required: true },
                  { label: "City", name: "city", xs: 6, required: true },
                  { label: "Country", name: "country", xs: 6, required: true },
                  {
                    label: "ZIP/Postal Code",
                    name: "zipCode",
                    xs: 6,
                    required: true,
                  },
                ].map((field) => (
                  <Grid item xs={field.xs || 12} key={field.name}>
                    <TextField
                      fullWidth
                      required={field.required}
                      label={field.label}
                      type={field.type || "text"}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                    />
                  </Grid>
                ))}
              </Grid>
            </Paper>

            {/* Payment Method Section */}
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
                      <TextField fullWidth label="CVV" placeholder="123" />
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

          {/* Order Summary Column */}
          <Grid item xs={12} md={5}>
            <Paper sx={{ p: 3, borderRadius: 2, position: "sticky", top: 20 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Order Summary
              </Typography>
              <Divider sx={{ my: 2 }} />

              {cart.map((item) => (
                <Box
                  key={item._id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1.5,
                  }}
                >
                  <Typography>
                    {item.name} × {item.quantity}
                  </Typography>
                  <Typography>
                    R {formatPrice(item.price * item.quantity)}
                  </Typography>
                </Box>
              ))}

              <Divider sx={{ my: 2 }} />

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography>Subtotal</Typography>
                <Typography>R {formatPrice(subtotal)}</Typography>
              </Box>

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography>Shipping</Typography>
                <Typography>R {formatPrice(shipping)}</Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
              >
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
                  py: 1.5,
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
