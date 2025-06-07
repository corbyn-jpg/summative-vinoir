// src/Pages/AccountPage/OrdersPage.js
import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Button, List, ListItem, 
  ListItemText, Divider, Paper 
} from '@mui/material';
import { ArrowBack, ShoppingBag } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/orders', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  return (
    <Box className="account-page-container">
      <Button 
        startIcon={<ArrowBack />} 
        onClick={() => navigate('/account')}
        sx={{ mb: 3 }}
      >
        Back to Account
      </Button>

      <Typography variant="h4" className="account-page-heading">
        My Orders
      </Typography>

      {isLoading ? (
        <Typography variant="h6">Loading...</Typography>
      ) : orders.length > 0 ? (
        <Paper elevation={0}>
          <List>
            {orders.map((order) => (
              <React.Fragment key={order.id}>
                <ListItem>
                  <ListItemText
                    primary={`Order #${order.id}`}
                    secondary={`${order.date} • $${order.total}`}
                  />
                  <ShoppingBag color="primary" />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Paper>
      ) : (
        <Typography variant="body1" sx={{ mt: 2 }}>
          You haven't placed any orders yet
        </Typography>
      )}
    </Box>
  );
}

export default OrdersPage;