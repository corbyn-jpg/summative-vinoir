import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Button,
  Card,
  CardContent,
  Fade,
  Chip,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
  IconButton,
  Tab,
  Tabs,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider
} from '@mui/material';
import {
  ArrowBack,
  ShoppingBagOutlined,
  LocalShippingOutlined,
  CheckCircleOutlined,
  ExpandMore,
  ExpandLess,
  TrackChangesOutlined,
  StarOutlined,
  RefreshOutlined,
  ReceiptOutlined,
  HistoryOutlined
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [orderStats, setOrderStats] = useState({
    total: 0,
    pending: 0,
    delivered: 0,
    totalSpent: 0
  });
  
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Mock order data for demonstration
  const mockOrders = [
    {
      id: 'VIN-2024-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 12500,
      items: [
        {
          id: 1,
          name: 'Midnight Elegance',
          price: 8500,
          quantity: 1,
          image: '/images/dior1.jpg'
        },
        {
          id: 2,
          name: 'Royal Essence',
          price: 4000,
          quantity: 1,
          image: '/images/dior2.jpg'
        }
      ],
      shipping: {
        address: '123 Luxury Lane, Sandton, Johannesburg',
        method: 'Express Delivery',
        tracking: 'VIN123456789'
      }
    },
    {
      id: 'VIN-2024-002',
      date: '2024-01-10',
      status: 'shipped',
      total: 6500,
      items: [
        {
          id: 3,
          name: 'Golden Sunset',
          price: 6500,
          quantity: 1,
          image: '/images/dior3.jpeg'
        }
      ],
      shipping: {
        address: '456 Elite Street, Cape Town',
        method: 'Standard Delivery',
        tracking: 'VIN987654321'
      }
    },
    {
      id: 'VIN-2024-003',
      date: '2024-01-05',
      status: 'processing',
      total: 15000,
      items: [
        {
          id: 4,
          name: 'Diamond Collection Set',
          price: 15000,
          quantity: 1,
          image: '/images/dior4.jpeg'
        }
      ],
      shipping: {
        address: '789 Premium Plaza, Durban',
        method: 'Express Delivery',
        tracking: null
      }
    }
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }

    fetchOrderHistory();
  }, [isAuthenticated, navigate]);

  const fetchOrderHistory = async () => {
    try {
      const token = localStorage.getItem('vinoir_token');
      // For now, use mock data - you can replace with actual API call
      // const response = await axios.get('http://localhost:5000/api/orders/history', {
      //   headers: { Authorization: `Bearer ${token}` }
      // });
      
      // Use mock data for demonstration
      setTimeout(() => {
        setOrders(mockOrders);
        
        // Calculate stats
        const stats = mockOrders.reduce((acc, order) => {
          acc.total += 1;
          acc.totalSpent += order.total;
          
          switch (order.status) {
            case 'processing':
              acc.pending += 1;
              break;
            case 'delivered':
              acc.delivered += 1;
              break;
            default:
              break;
          }
          
          return acc;
        }, { total: 0, pending: 0, delivered: 0, totalSpent: 0 });
        
        setOrderStats(stats);
        setLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error('Error fetching order history:', error);
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return '#4caf50';
      case 'shipped':
        return '#2196f3';
      case 'processing':
        return '#ff9800';
      case 'cancelled':
        return '#f44336';
      default:
        return '#999';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircleOutlined />;
      case 'shipped':
        return <LocalShippingOutlined />;
      case 'processing':
        return <TrackChangesOutlined />;
      default:
        return <ShoppingBagOutlined />;
    }
  };

  const formatPrice = (price) => {
    return `R${price.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}`;
  };

  const filterOrdersByTab = (orders, tabIndex) => {
    switch (tabIndex) {
      case 0:
        return orders; // All orders
      case 1:
        return orders.filter(order => order.status === 'processing' || order.status === 'shipped');
      case 2:
        return orders.filter(order => order.status === 'delivered');
      default:
        return orders;
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ color: '#2d5a3d' }}>
          Loading your order history...
        </Typography>
      </Container>
    );
  }

  const filteredOrders = filterOrdersByTab(orders, tabValue);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 8, sm: 12 } }}>
      {/* Header */}
      <Fade in timeout={600}>
        <Box sx={{ mb: 6 }}>
          <Button
            component={Link}
            to="/account"
            startIcon={<ArrowBack />}
            sx={{
              color: '#2d5a3d',
              mb: 3,
              '&:hover': { backgroundColor: 'rgba(45, 90, 61, 0.1)' }
            }}
          >
            Back to Account
          </Button>
          
          <Typography
            variant="h3"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 300,
              color: '#2d5a3d',
              mb: 2,
              textAlign: 'center'
            }}
          >
            Order History
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              color: '#666',
              fontStyle: 'italic',
              textAlign: 'center'
            }}
          >
            Your fragrance journey with Vinoir
          </Typography>
        </Box>
      </Fade>

      {/* Order Statistics */}
      <Fade in timeout={800}>
        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={6} sx={{ borderRadius: '16px', textAlign: 'center' }}>
              <CardContent sx={{ p: 3 }}>
                <Avatar
                  sx={{
                    mx: 'auto',
                    mb: 2,
                    width: 60,
                    height: 60,
                    background: 'linear-gradient(135deg, #2d5a3d 0%, #6a4c93 100%)'
                  }}
                >
                  <ShoppingBagOutlined fontSize="large" />
                </Avatar>
                <Typography variant="h4" sx={{ color: '#2d5a3d', fontWeight: 600 }}>
                  {orderStats.total}
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Total Orders
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={6} sx={{ borderRadius: '16px', textAlign: 'center' }}>
              <CardContent sx={{ p: 3 }}>
                <Avatar
                  sx={{
                    mx: 'auto',
                    mb: 2,
                    width: 60,
                    height: 60,
                    background: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)'
                  }}
                >
                  <TrackChangesOutlined fontSize="large" />
                </Avatar>
                <Typography variant="h4" sx={{ color: '#ff9800', fontWeight: 600 }}>
                  {orderStats.pending}
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Active Orders
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={6} sx={{ borderRadius: '16px', textAlign: 'center' }}>
              <CardContent sx={{ p: 3 }}>
                <Avatar
                  sx={{
                    mx: 'auto',
                    mb: 2,
                    width: 60,
                    height: 60,
                    background: 'linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)'
                  }}
                >
                  <CheckCircleOutlined fontSize="large" />
                </Avatar>
                <Typography variant="h4" sx={{ color: '#4caf50', fontWeight: 600 }}>
                  {orderStats.delivered}
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Delivered
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card elevation={6} sx={{ borderRadius: '16px', textAlign: 'center' }}>
              <CardContent sx={{ p: 3 }}>
                <Avatar
                  sx={{
                    mx: 'auto',
                    mb: 2,
                    width: 60,
                    height: 60,
                    background: 'linear-gradient(135deg, #6a4c93 0%, #9c27b0 100%)'
                  }}
                >
                  <ReceiptOutlined fontSize="large" />
                </Avatar>
                <Typography variant="h4" sx={{ color: '#6a4c93', fontWeight: 600 }}>
                  {formatPrice(orderStats.totalSpent)}
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Total Spent
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Fade>

      {/* Order Tabs */}
      <Fade in timeout={1000}>
        <Paper elevation={6} sx={{ borderRadius: '16px', mb: 4 }}>
          <Tabs
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            centered
            sx={{
              '& .MuiTab-root': {
                fontFamily: '"Playfair Display", serif',
                fontSize: '1.1rem',
                fontWeight: 500,
                color: '#666',
                '&.Mui-selected': {
                  color: '#2d5a3d'
                }
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#2d5a3d',
                height: 3,
                borderRadius: '3px'
              }
            }}
          >
            <Tab
              icon={<HistoryOutlined />}
              iconPosition="start"
              label="All Orders"
            />
            <Tab
              icon={<TrackChangesOutlined />}
              iconPosition="start"
              label="Active"
            />
            <Tab
              icon={<CheckCircleOutlined />}
              iconPosition="start"
              label="Delivered"
            />
          </Tabs>
        </Paper>
      </Fade>

      {/* Orders List */}
      <Fade in timeout={1200}>
        <Box>
          {filteredOrders.length === 0 ? (
            <Paper elevation={6} sx={{ borderRadius: '16px', p: 6, textAlign: 'center' }}>
              <ShoppingBagOutlined sx={{ fontSize: 64, color: '#ddd', mb: 2 }} />
              <Typography variant="h6" sx={{ color: '#666', mb: 1 }}>
                No orders found
              </Typography>
              <Typography variant="body2" sx={{ color: '#999' }}>
                {tabValue === 0 ? "You haven't placed any orders yet." : "No orders in this category."}
              </Typography>
              <Button
                component={Link}
                to="/shop"
                variant="contained"
                sx={{
                  mt: 3,
                  background: 'linear-gradient(135deg, #2d5a3d 0%, #6a4c93 100%)',
                  borderRadius: '12px',
                  px: 4
                }}
              >
                Start Shopping
              </Button>
            </Paper>
          ) : (
            filteredOrders.map((order, index) => (
              <Fade key={order.id} in timeout={1400 + index * 200}>
                <Paper elevation={6} sx={{ borderRadius: '16px', mb: 3, overflow: 'hidden' }}>
                  {/* Order Header */}
                  <Box
                    sx={{
                      p: 3,
                      background: 'linear-gradient(135deg, rgba(45, 90, 61, 0.05) 0%, rgba(106, 76, 147, 0.05) 100%)',
                      borderBottom: '1px solid rgba(0,0,0,0.1)',
                      cursor: 'pointer'
                    }}
                    onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                  >
                    <Grid container alignItems="center" spacing={2}>
                      <Grid item xs={12} sm={3}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontFamily: '"Playfair Display", serif',
                            color: '#2d5a3d',
                            fontWeight: 600
                          }}
                        >
                          {order.id}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#666' }}>
                          {new Date(order.date).toLocaleDateString('en-ZA', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </Typography>
                      </Grid>
                      
                      <Grid item xs={12} sm={3}>
                        <Chip
                          icon={getStatusIcon(order.status)}
                          label={order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          sx={{
                            backgroundColor: getStatusColor(order.status),
                            color: 'white',
                            fontWeight: 600,
                            textTransform: 'capitalize'
                          }}
                        />
                      </Grid>
                      
                      <Grid item xs={12} sm={3}>
                        <Typography variant="h6" sx={{ color: '#2d5a3d', fontWeight: 600 }}>
                          {formatPrice(order.total)}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#666' }}>
                          {order.items.length} item{order.items.length > 1 ? 's' : ''}
                        </Typography>
                      </Grid>
                      
                      <Grid item xs={12} sm={3} sx={{ textAlign: 'right' }}>
                        <IconButton>
                          {expandedOrder === order.id ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Box>

                  {/* Order Details */}
                  <Collapse in={expandedOrder === order.id}>
                    <Box sx={{ p: 3 }}>
                      <Grid container spacing={4}>
                        {/* Order Items */}
                        <Grid item xs={12} md={8}>
                          <Typography
                            variant="h6"
                            sx={{
                              fontFamily: '"Playfair Display", serif',
                              color: '#2d5a3d',
                              mb: 2
                            }}
                          >
                            Order Items
                          </Typography>
                          
                          <List>
                            {order.items.map((item, idx) => (
                              <React.Fragment key={item.id}>
                                <ListItem sx={{ px: 0 }}>
                                  <ListItemAvatar>
                                    <Avatar
                                      variant="rounded"
                                      src={item.image}
                                      sx={{ width: 60, height: 60 }}
                                    />
                                  </ListItemAvatar>
                                  <ListItemText
                                    primary={item.name}
                                    secondary={`Quantity: ${item.quantity}`}
                                    sx={{ ml: 2 }}
                                  />
                                  <Typography
                                    variant="h6"
                                    sx={{ color: '#2d5a3d', fontWeight: 600 }}
                                  >
                                    {formatPrice(item.price)}
                                  </Typography>
                                </ListItem>
                                {idx < order.items.length - 1 && <Divider />}
                              </React.Fragment>
                            ))}
                          </List>
                        </Grid>

                        {/* Shipping Info */}
                        <Grid item xs={12} md={4}>
                          <Typography
                            variant="h6"
                            sx={{
                              fontFamily: '"Playfair Display", serif',
                              color: '#2d5a3d',
                              mb: 2
                            }}
                          >
                            Shipping Details
                          </Typography>
                          
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#666' }}>
                              Delivery Address:
                            </Typography>
                            <Typography variant="body2">
                              {order.shipping.address}
                            </Typography>
                          </Box>
                          
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: '#666' }}>
                              Shipping Method:
                            </Typography>
                            <Typography variant="body2">
                              {order.shipping.method}
                            </Typography>
                          </Box>
                          
                          {order.shipping.tracking && (
                            <Box sx={{ mb: 2 }}>
                              <Typography variant="body2" sx={{ fontWeight: 600, color: '#666' }}>
                                Tracking Number:
                              </Typography>
                              <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                                {order.shipping.tracking}
                              </Typography>
                            </Box>
                          )}
                          
                          <Button
                            variant="outlined"
                            startIcon={<RefreshOutlined />}
                            fullWidth
                            sx={{
                              mt: 2,
                              borderColor: '#2d5a3d',
                              color: '#2d5a3d',
                              borderRadius: '12px',
                              '&:hover': {
                                backgroundColor: 'rgba(45, 90, 61, 0.05)'
                              }
                            }}
                          >
                            Reorder Items
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </Collapse>
                </Paper>
              </Fade>
            ))
          )}
        </Box>
      </Fade>
    </Container>
  );
}

export default OrderHistoryPage;