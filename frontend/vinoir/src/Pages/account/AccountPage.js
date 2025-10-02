// src/Pages/AccountPage/AccountPage.js
import React, { useState, useEffect } from "react";
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Grid, 
  Card, 
  CardContent,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Fade,
  IconButton
} from "@mui/material";
import { 
  PersonOutline, 
  EmailOutlined, 
  LocationOnOutlined,
  PhoneOutlined,
  LockOutlined,
  ShoppingBagOutlined,
  FavoriteOutlined,
  SettingsOutlined,
  EditOutlined,
  CakeOutlined,
  SecurityOutlined
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { API_BASE } from '../../config/api';

function AccountPage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentOrders, setRecentOrders] = useState([]);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Fetch comprehensive user data
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("vinoir_token");
        if (!token) {
          navigate('/login');
          return;
        }

        // Fetch user profile
        const userResponse = await axios.get(`${API_BASE}/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Fetch recent orders (mock data for now)
        const ordersResponse = await axios.get(`${API_BASE}/orders/recent`, {
          headers: { Authorization: `Bearer ${token}` },
        }).catch(() => ({ data: [] })); // Fallback if orders endpoint doesn't exist

        setUserData(userResponse.data);
        setRecentOrders(ordersResponse.data || []);
      } catch (error) {
        console.error("Error fetching user data:", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("vinoir_token");
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [isAuthenticated, navigate]);

  // Account menu items
  const accountMenuItems = [
    {
      title: 'Personal Information',
      description: 'Update your personal details and preferences',
      icon: <PersonOutline />,
      link: '/account/enhanced-profile',
      color: '#2d5a3d'
    },
    {
      title: 'Security Settings',
      description: 'Change your emoji password and security preferences',
      icon: <SecurityOutlined />,
      link: '/account/security',
      color: '#6a4c93'
    },
    {
      title: 'Order History',
      description: 'View your purchases and track orders',
      icon: <ShoppingBagOutlined />,
      link: '/account/order-history',
      color: '#2d5a3d'
    },
    {
      title: 'Wishlist',
      description: 'Manage your saved fragrances',
      icon: <FavoriteOutlined />,
      link: '/wishlist',
      color: '#6a4c93'
    }
  ];

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ color: '#2d5a3d' }}>
          Loading your account...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 8, sm: 12 } }}>
      {/* Hero Header */}
      <Fade in timeout={800}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 300,
              color: '#2d5a3d',
              mb: 2,
              letterSpacing: '0.02em'
            }}
          >
            My Account
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              color: '#666',
              fontStyle: 'italic'
            }}
          >
            Your luxury fragrance profile
          </Typography>
        </Box>
      </Fade>

      <Grid container spacing={4}>
        {/* User Profile Card */}
        <Grid item xs={12} lg={4}>
          <Fade in timeout={1000}>
            <Card
              elevation={12}
              sx={{
                borderRadius: '20px',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, #2d5a3d 0%, #6a4c93 100%)',
                color: 'white',
                position: 'relative'
              }}
            >
              {/* Background Pattern */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                  pointerEvents: 'none'
                }}
              />
              
              <CardContent sx={{ p: 4, position: 'relative' }}>
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      mx: 'auto',
                      mb: 2,
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      fontSize: '3rem'
                    }}
                  >
                    👑
                  </Avatar>
                  <Typography
                    variant="h4"
                    sx={{
                      fontFamily: '"Playfair Display", serif',
                      mb: 1
                    }}
                  >
                    {userData?.name || 'Distinguished Guest'}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ opacity: 0.9, fontStyle: 'italic' }}
                  >
                    {userData?.email}
                  </Typography>
                </Box>

                <Divider sx={{ borderColor: 'rgba(255,255,255,0.3)', my: 3 }} />

                {/* Quick Stats */}
                <Grid container spacing={2} sx={{ textAlign: 'center' }}>
                  <Grid item xs={6}>
                    <Typography variant="h3" sx={{ fontWeight: 300 }}>
                      {recentOrders.length || 0}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      Orders
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h3" sx={{ fontWeight: 300 }}>
                      {userData?.wishlistCount || 0}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      Wishlist
                    </Typography>
                  </Grid>
                </Grid>

                <Button
                  component={Link}
                  to="/account/personal-data"
                  fullWidth
                  variant="outlined"
                  sx={{
                    mt: 3,
                    borderColor: 'rgba(255,255,255,0.5)',
                    color: 'white',
                    borderRadius: '12px',
                    py: 1.5,
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </Fade>
        </Grid>

        {/* Account Management Grid */}
        <Grid item xs={12} lg={8}>
          <Grid container spacing={3}>
            {accountMenuItems.map((item, index) => (
              <Grid item xs={12} sm={6} key={item.title}>
                <Fade in timeout={1200 + index * 200}>
                  <Card
                    component={Link}
                    to={item.link}
                    elevation={8}
                    sx={{
                      borderRadius: '16px',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease-in-out',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 40px rgba(0,0,0,0.15)'
                      }
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                        <Box
                          sx={{
                            p: 1.5,
                            borderRadius: '12px',
                            backgroundColor: `${item.color}15`,
                            color: item.color,
                            mr: 2
                          }}
                        >
                          {item.icon}
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            variant="h6"
                            sx={{
                              fontFamily: '"Playfair Display", serif',
                              color: '#2d5a3d',
                              mb: 1
                            }}
                          >
                            {item.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: '#666', lineHeight: 1.4 }}
                          >
                            {item.description}
                          </Typography>
                        </Box>
                        <IconButton
                          size="small"
                          sx={{
                            color: item.color,
                            opacity: 0.7
                          }}
                        >
                          <EditOutlined fontSize="small" />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>

          {/* Recent Activity */}
          <Fade in timeout={1600}>
            <Paper
              elevation={8}
              sx={{
                mt: 4,
                borderRadius: '16px',
                overflow: 'hidden'
              }}
            >
              <Box
                sx={{
                  p: 3,
                  background: 'linear-gradient(135deg, rgba(45, 90, 61, 0.05) 0%, rgba(106, 76, 147, 0.05) 100%)',
                  borderBottom: '1px solid rgba(45, 90, 61, 0.1)'
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: '"Playfair Display", serif',
                    color: '#2d5a3d'
                  }}
                >
                  Recent Activity
                </Typography>
              </Box>
              <Box sx={{ p: 3 }}>
                {recentOrders.length > 0 ? (
                  <List>
                    {recentOrders.slice(0, 3).map((order, index) => (
                      <ListItem key={index} sx={{ px: 0 }}>
                        <ListItemIcon>
                          <ShoppingBagOutlined sx={{ color: '#2d5a3d' }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={`Order #${order.id || `VN${Date.now()}`}`}
                          secondary={`${order.items?.length || 1} item(s) - R${order.total || '0.00'}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <ShoppingBagOutlined
                      sx={{ fontSize: 48, color: '#ddd', mb: 2 }}
                    />
                    <Typography variant="body1" sx={{ color: '#666', mb: 2 }}>
                      No recent orders
                    </Typography>
                    <Button
                      component={Link}
                      to="/shop"
                      variant="contained"
                      sx={{
                        background: 'linear-gradient(135deg, #2d5a3d 0%, #6a4c93 100%)',
                        borderRadius: '12px',
                        px: 4
                      }}
                    >
                      Start Shopping
                    </Button>
                  </Box>
                )}
              </Box>
            </Paper>
          </Fade>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AccountPage;
