import React from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const OrderConfirmation = () => {
  const { state } = useLocation();
  const orderDetails = state?.orderDetails || {};

  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: "0 auto",
        p: { xs: 2, md: 4 },
        textAlign: "center",
      }}
    >
      <CheckCircleIcon color="success" sx={{ fontSize: 80, mb: 2 }} />

      <Typography variant="h4" sx={{ mb: 2, color: "#146e3a" }}>
        Order Confirmed!
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, maxWidth: 600, mx: "auto" }}>
        Thank you for your purchase, {orderDetails.customer || "customer"}! Your
        order #{orderDetails.orderNumber || "000000"} has been received and is
        being processed.
      </Typography>

      {orderDetails.total && (
        <Paper sx={{ p: 3, mb: 4, textAlign: "left" }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Order Summary
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <List>
            <ListItem>
              <ListItemText
                primary="Order Number"
                secondary={orderDetails.orderNumber || "N/A"}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Items"
                secondary={orderDetails.items || 0}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Total"
                secondary={`R ${orderDetails.total?.toFixed(2) || "0.00"}`}
              />
            </ListItem>
          </List>
        </Paper>
      )}

      <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
        <Button
          variant="contained"
          component={Link}
          to="/shop"
          sx={{
            backgroundColor: "#146e3a",
            "&:hover": { backgroundColor: "#0d5a2c" },
            px: 4,
            py: 1.5,
          }}
        >
          Continue Shopping
        </Button>
      </Box>
    </Box>
  );
};

export default OrderConfirmation;
