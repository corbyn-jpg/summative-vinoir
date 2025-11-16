import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

function OrdersPage() {
  const orders = [
    { id: 1, date: '2025-06-01', total: '$120.00', status: 'Delivered' },
    { id: 2, date: '2025-06-10', total: '$150.00', status: 'Processing' },
    { id: 3, date: '2025-06-15', total: '$200.00', status: 'Shipped' },
  ];

  return (
    <Box
      sx={{
        maxWidth: '800px',
        margin: '3rem auto',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
        background: 'linear-gradient(145deg, #ffffff, #f3f3f3)',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontFamily: 'Playfair Display, serif',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '1.5rem',
          color: '#222',
        }}
      >
        My Orders
      </Typography>

      <List>
        {orders.map((order) => (
          <ListItem key={order.id} sx={{ borderBottom: '1px solid #ddd' }}>
            <ListItemText
              primary={`Order #${order.id} - ${order.date}`}
              secondary={`Total: ${order.total} | Status: ${order.status}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default OrdersPage;