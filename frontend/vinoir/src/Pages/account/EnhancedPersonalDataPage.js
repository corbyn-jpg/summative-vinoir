import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  TextField,
  Button,
  Avatar,
  Divider,
  Alert,
  Card,
  CardContent,
  InputAdornment,
  IconButton,
  Fade,
  MenuItem,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';
import {
  PersonOutline,
  EmailOutlined,
  PhoneOutlined,
  LocationOnOutlined,
  CakeOutlined,
  EditOutlined,
  SaveOutlined,
  ArrowBack,
  PhotoCameraOutlined
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { API_BASE } from '../../config/api';

function PersonalDataPage() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      province: '',
      postalCode: '',
      country: 'South Africa'
    },
    birthday: '',
    gender: '',
    preferences: {
      newsletter: true,
      smsNotifications: false
    }
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [editingSection, setEditingSection] = useState(null);
  
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const southAfricanProvinces = [
    'Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal',
    'Limpopo', 'Mpumalanga', 'Northern Cape', 'North West', 'Western Cape'
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }

    fetchUserData();
  }, [isAuthenticated, navigate]);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('vinoir_token');
      const response = await axios.get(`${API_BASE}/users/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Merge with default structure
      setUserData(prevData => ({
        ...prevData,
        ...response.data,
        address: {
          ...prevData.address,
          ...response.data.address
        },
        preferences: {
          ...prevData.preferences,
          ...response.data.preferences
        }
      }));
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (section) => {
    setSaving(true);
    setMessage('');
    setError('');

    try {
      const token = localStorage.getItem('vinoir_token');
      await axios.put(`${API_BASE}/users/profile`, userData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessage('✨ Profile updated successfully!');
      setEditingSection(null);
      
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setUserData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setUserData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ color: '#2d5a3d' }}>
          Loading your profile...
        </Typography>
      </Container>
    );
  }

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
            Personal Information
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
            Manage your profile and preferences
          </Typography>
        </Box>
      </Fade>

      {/* Status Messages */}
      {message && (
        <Fade in timeout={400}>
          <Alert 
            severity="success" 
            sx={{ mb: 3, borderRadius: '12px' }}
            onClose={() => setMessage('')}
          >
            {message}
          </Alert>
        </Fade>
      )}

      {error && (
        <Fade in timeout={400}>
          <Alert 
            severity="error" 
            sx={{ mb: 3, borderRadius: '12px' }}
            onClose={() => setError('')}
          >
            {error}
          </Alert>
        </Fade>
      )}

      <Grid container spacing={4}>
        {/* Profile Picture & Basic Info */}
        <Grid item xs={12} md={4}>
          <Fade in timeout={800}>
            <Card elevation={8} sx={{ borderRadius: '20px', overflow: 'hidden' }}>
              <Box
                sx={{
                  background: 'linear-gradient(135deg, #2d5a3d 0%, #6a4c93 100%)',
                  p: 4,
                  textAlign: 'center',
                  color: 'white',
                  position: 'relative'
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: 'radial-gradient(circle at 30% 70%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                    pointerEvents: 'none'
                  }}
                />
                
                <Box sx={{ position: 'relative' }}>
                  <Avatar
                    sx={{
                      width: 120,
                      height: 120,
                      mx: 'auto',
                      mb: 2,
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      fontSize: '3rem'
                    }}
                  >
                    👑
                  </Avatar>
                  
                  <IconButton
                    sx={{
                      position: 'absolute',
                      right: 'calc(50% - 70px)',
                      bottom: 40,
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      '&:hover': { backgroundColor: 'rgba(255,255,255,0.3)' }
                    }}
                  >
                    <PhotoCameraOutlined />
                  </IconButton>
                  
                  <Typography variant="h5" sx={{ fontFamily: '"Playfair Display", serif' }}>
                    {userData.name || 'Distinguished Guest'}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Vinoir Member since 2024
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Fade>
        </Grid>

        {/* Form Sections */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            {/* Basic Information */}
            <Grid item xs={12}>
              <Fade in timeout={1000}>
                <Paper elevation={8} sx={{ borderRadius: '16px', overflow: 'hidden' }}>
                  <Box
                    sx={{
                      p: 3,
                      background: 'linear-gradient(135deg, rgba(45, 90, 61, 0.05) 0%, rgba(106, 76, 147, 0.05) 100%)',
                      borderBottom: '1px solid rgba(45, 90, 61, 0.1)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: '"Playfair Display", serif',
                        color: '#2d5a3d'
                      }}
                    >
                      Basic Information
                    </Typography>
                    <IconButton
                      onClick={() => setEditingSection(editingSection === 'basic' ? null : 'basic')}
                      sx={{ color: '#2d5a3d' }}
                    >
                      <EditOutlined />
                    </IconButton>
                  </Box>
                  
                  <Box sx={{ p: 3 }}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Full Name"
                          value={userData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          disabled={editingSection !== 'basic'}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PersonOutline sx={{ color: '#2d5a3d' }} />
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '12px',
                              '&.Mui-focused fieldset': { borderColor: '#2d5a3d' }
                            }
                          }}
                        />
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Email Address"
                          type="email"
                          value={userData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          disabled={editingSection !== 'basic'}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <EmailOutlined sx={{ color: '#2d5a3d' }} />
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '12px',
                              '&.Mui-focused fieldset': { borderColor: '#2d5a3d' }
                            }
                          }}
                        />
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Phone Number"
                          value={userData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          disabled={editingSection !== 'basic'}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <PhoneOutlined sx={{ color: '#2d5a3d' }} />
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '12px',
                              '&.Mui-focused fieldset': { borderColor: '#2d5a3d' }
                            }
                          }}
                        />
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Birthday"
                          type="date"
                          value={userData.birthday}
                          onChange={(e) => handleInputChange('birthday', e.target.value)}
                          disabled={editingSection !== 'basic'}
                          InputLabelProps={{ shrink: true }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <CakeOutlined sx={{ color: '#2d5a3d' }} />
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '12px',
                              '&.Mui-focused fieldset': { borderColor: '#2d5a3d' }
                            }
                          }}
                        />
                      </Grid>
                    </Grid>
                    
                    {editingSection === 'basic' && (
                      <Box sx={{ mt: 3, textAlign: 'right' }}>
                        <Button
                          variant="contained"
                          startIcon={<SaveOutlined />}
                          onClick={() => handleSave('basic')}
                          disabled={saving}
                          sx={{
                            background: 'linear-gradient(135deg, #2d5a3d 0%, #6a4c93 100%)',
                            borderRadius: '12px',
                            px: 4
                          }}
                        >
                          {saving ? 'Saving...' : 'Save Changes'}
                        </Button>
                      </Box>
                    )}
                  </Box>
                </Paper>
              </Fade>
            </Grid>

            {/* Address Information */}
            <Grid item xs={12}>
              <Fade in timeout={1200}>
                <Paper elevation={8} sx={{ borderRadius: '16px', overflow: 'hidden' }}>
                  <Box
                    sx={{
                      p: 3,
                      background: 'linear-gradient(135deg, rgba(106, 76, 147, 0.05) 0%, rgba(45, 90, 61, 0.05) 100%)',
                      borderBottom: '1px solid rgba(106, 76, 147, 0.1)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: '"Playfair Display", serif',
                        color: '#6a4c93'
                      }}
                    >
                      Address Information
                    </Typography>
                    <IconButton
                      onClick={() => setEditingSection(editingSection === 'address' ? null : 'address')}
                      sx={{ color: '#6a4c93' }}
                    >
                      <EditOutlined />
                    </IconButton>
                  </Box>
                  
                  <Box sx={{ p: 3 }}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Street Address"
                          value={userData.address.street}
                          onChange={(e) => handleInputChange('address.street', e.target.value)}
                          disabled={editingSection !== 'address'}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LocationOnOutlined sx={{ color: '#6a4c93' }} />
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '12px',
                              '&.Mui-focused fieldset': { borderColor: '#6a4c93' }
                            }
                          }}
                        />
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="City"
                          value={userData.address.city}
                          onChange={(e) => handleInputChange('address.city', e.target.value)}
                          disabled={editingSection !== 'address'}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '12px',
                              '&.Mui-focused fieldset': { borderColor: '#6a4c93' }
                            }
                          }}
                        />
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth disabled={editingSection !== 'address'}>
                          <InputLabel>Province</InputLabel>
                          <Select
                            value={userData.address.province}
                            onChange={(e) => handleInputChange('address.province', e.target.value)}
                            label="Province"
                            sx={{
                              borderRadius: '12px',
                              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#6a4c93'
                              }
                            }}
                          >
                            {southAfricanProvinces.map((province) => (
                              <MenuItem key={province} value={province}>
                                {province}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Postal Code"
                          value={userData.address.postalCode}
                          onChange={(e) => handleInputChange('address.postalCode', e.target.value)}
                          disabled={editingSection !== 'address'}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '12px',
                              '&.Mui-focused fieldset': { borderColor: '#6a4c93' }
                            }
                          }}
                        />
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Country"
                          value={userData.address.country}
                          disabled
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '12px'
                            }
                          }}
                        />
                      </Grid>
                    </Grid>
                    
                    {editingSection === 'address' && (
                      <Box sx={{ mt: 3, textAlign: 'right' }}>
                        <Button
                          variant="contained"
                          startIcon={<SaveOutlined />}
                          onClick={() => handleSave('address')}
                          disabled={saving}
                          sx={{
                            background: 'linear-gradient(135deg, #6a4c93 0%, #2d5a3d 100%)',
                            borderRadius: '12px',
                            px: 4
                          }}
                        >
                          {saving ? 'Saving...' : 'Save Address'}
                        </Button>
                      </Box>
                    )}
                  </Box>
                </Paper>
              </Fade>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default PersonalDataPage;