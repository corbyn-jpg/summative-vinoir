import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Button,
  Alert,
  Fade,
  Switch,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip
} from '@mui/material';
import {
  SecurityOutlined,
  LockOutlined,
  ArrowBack,
  SaveOutlined,
  VisibilityOutlined,
  ShieldOutlined,
  // NotificationsOutlined,
  DevicesOutlined
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import EmojiSelector from '../../Components/EmojiSelector';
import axios from 'axios';
import { API_BASE } from '../../config/api';

function SecuritySettingsPage() {
  const [emojiPassword, setEmojiPassword] = useState([]);
  const [currentPassword, setCurrentPassword] = useState([]);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    loginNotifications: true,
    deviceTracking: true,
    sessionTimeout: 30
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [activeDevices] = useState([
    { id: 1, device: 'Chrome on Windows', lastActive: '2 minutes ago', current: true },
    { id: 2, device: 'Safari on iPhone', lastActive: '1 day ago', current: false },
    { id: 3, device: 'Firefox on MacBook', lastActive: '3 days ago', current: false }
  ]);
  
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }

    fetchSecurityData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Calculate password strength based on emoji diversity
    const uniqueEmojis = [...new Set(emojiPassword)];
    const length = emojiPassword.length;
    let strength = 0;

    if (length >= 3) strength += 25;
    if (length >= 5) strength += 25;
    if (uniqueEmojis.length === emojiPassword.length) strength += 25;
    if (uniqueEmojis.length >= 4) strength += 25;

    setPasswordStrength(strength);
  }, [emojiPassword]);

  const fetchSecurityData = async () => {
    try {
      const token = localStorage.getItem('vinoir_token');
      const response = await axios.get(`${API_BASE}/users/security`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Set current password for display
      if (response.data.password) {
        setCurrentPassword(response.data.password.split(''));
      }
      
      setSecuritySettings({
        ...securitySettings,
        ...response.data.settings
      });
    } catch (error) {
      console.error('Error fetching security data:', error);
      // Set a default current password for demo
      setCurrentPassword(['🌟', '🎭', '👑', '✨']);
    } finally {
      setLoading(false);
    }
  };

  const handleSavePassword = async () => {
    if (emojiPassword.length < 3) {
      setError('Password must contain at least 3 emojis');
      return;
    }

    setSaving(true);
    setMessage('');
    setError('');

    try {
      const token = localStorage.getItem('vinoir_token');
      await axios.patch(`${API_BASE}/users/update-password`, {
        password: emojiPassword.join('')
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setCurrentPassword(emojiPassword);
      setEmojiPassword([]);
      setMessage('✨ Your signature password has been updated successfully!');
      
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error updating password:', error);
      setError(error.response?.data?.message || 'Failed to update password');
    } finally {
      setSaving(false);
    }
  };

  const handleSecuritySettingChange = (setting, value) => {
    setSecuritySettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return '#f44336';
    if (passwordStrength < 50) return '#ff9800';
    if (passwordStrength < 75) return '#2196f3';
    return '#4caf50';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return 'Weak';
    if (passwordStrength < 50) return 'Fair';
    if (passwordStrength < 75) return 'Good';
    return 'Strong';
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ color: '#2d5a3d' }}>
          Loading security settings...
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
            Security Settings
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
            Protect your luxury fragrance profile
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
        {/* Current Password Display */}
        <Grid item xs={12} lg={6}>
          <Fade in timeout={800}>
            <Paper elevation={8} sx={{ borderRadius: '16px', overflow: 'hidden' }}>
              <Box
                sx={{
                  p: 3,
                  background: 'linear-gradient(135deg, #2d5a3d 0%, #6a4c93 100%)',
                  color: 'white'
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: '"Playfair Display", serif',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <LockOutlined /> Current Signature Password
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
                  Your unique emoji combination
                </Typography>
              </Box>
              
              <Box sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                    p: 3,
                    backgroundColor: 'rgba(45, 90, 61, 0.05)',
                    borderRadius: '12px',
                    border: '2px dashed rgba(45, 90, 61, 0.2)',
                    mb: 3
                  }}
                >
                  {showCurrentPassword ? (
                    currentPassword.map((emoji, index) => (
                      <Box
                        key={index}
                        sx={{
                          fontSize: '2rem',
                          p: 1,
                          backgroundColor: 'white',
                          borderRadius: '50%',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                          minWidth: 50,
                          textAlign: 'center'
                        }}
                      >
                        {emoji}
                      </Box>
                    ))
                  ) : (
                    currentPassword.map((_, index) => (
                      <Box
                        key={index}
                        sx={{
                          fontSize: '2rem',
                          p: 1,
                          backgroundColor: '#ddd',
                          borderRadius: '50%',
                          minWidth: 50,
                          textAlign: 'center'
                        }}
                      >
                        ●
                      </Box>
                    ))
                  )}
                </Box>
                
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<VisibilityOutlined />}
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  sx={{
                    borderColor: '#2d5a3d',
                    color: '#2d5a3d',
                    borderRadius: '12px',
                    '&:hover': {
                      backgroundColor: 'rgba(45, 90, 61, 0.05)'
                    }
                  }}
                >
                  {showCurrentPassword ? 'Hide Password' : 'Show Password'}
                </Button>
              </Box>
            </Paper>
          </Fade>
        </Grid>

        {/* Change Password */}
        <Grid item xs={12} lg={6}>
          <Fade in timeout={1000}>
            <Paper elevation={8} sx={{ borderRadius: '16px', overflow: 'hidden' }}>
              <Box
                sx={{
                  p: 3,
                  background: 'linear-gradient(135deg, #6a4c93 0%, #2d5a3d 100%)',
                  color: 'white'
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: '"Playfair Display", serif',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <SecurityOutlined /> Change Password
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
                  Create a new signature combination
                </Typography>
              </Box>
              
              <Box sx={{ p: 3 }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    mb: 2,
                    color: '#2d5a3d',
                    fontWeight: 600
                  }}
                >
                  🎭 Select your new emoji password:
                </Typography>
                
                <EmojiSelector
                  selectedEmojis={emojiPassword}
                  setSelectedEmojis={setEmojiPassword}
                  maxLength={5}
                />
                <Typography variant="caption" sx={{ display: 'block', mt: 1, color: '#2d5a3d' }}>
                  Minimum 3 emojis required
                </Typography>
                
                {/* Password Strength */}
                {emojiPassword.length > 0 && (
                  <Box sx={{ mt: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" sx={{ color: '#666' }}>
                        Password Strength
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: getPasswordStrengthColor(),
                          fontWeight: 600
                        }}
                      >
                        {getPasswordStrengthText()}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: '100%',
                        height: 6,
                        backgroundColor: '#f0f0f0',
                        borderRadius: '3px',
                        overflow: 'hidden'
                      }}
                    >
                      <Box
                        sx={{
                          width: `${passwordStrength}%`,
                          height: '100%',
                          backgroundColor: getPasswordStrengthColor(),
                          transition: 'all 0.3s ease'
                        }}
                      />
                    </Box>
                  </Box>
                )}
                
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<SaveOutlined />}
                  onClick={handleSavePassword}
                  disabled={saving || emojiPassword.length < 3}
                  sx={{
                    mt: 3,
                    background: 'linear-gradient(135deg, #6a4c93 0%, #2d5a3d 100%)',
                    borderRadius: '12px',
                    py: 1.5
                  }}
                >
                  {saving ? 'Updating...' : 'Update Password'}
                </Button>
              </Box>
            </Paper>
          </Fade>
        </Grid>

        {/* Security Preferences */}
        <Grid item xs={12} lg={8}>
          <Fade in timeout={1200}>
            <Paper elevation={8} sx={{ borderRadius: '16px', overflow: 'hidden' }}>
              <Box
                sx={{
                  p: 3,
                  background: 'linear-gradient(135deg, rgba(45, 90, 61, 0.05) 0%, rgba(106, 76, 147, 0.05) 100%)',
                  borderBottom: '1px solid rgba(45, 90, 61, 0.1)'
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: '"Playfair Display", serif',
                    color: '#2d5a3d',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <ShieldOutlined /> Security Preferences
                </Typography>
              </Box>
              
              <Box sx={{ p: 3 }}>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Login Notifications"
                      secondary="Get notified when someone signs into your account"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        checked={securitySettings.loginNotifications}
                        onChange={(e) => handleSecuritySettingChange('loginNotifications', e.target.checked)}
                        color="primary"
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  
                  <Divider />
                  
                  <ListItem>
                    <ListItemText
                      primary="Device Tracking"
                      secondary="Track devices that access your account"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        checked={securitySettings.deviceTracking}
                        onChange={(e) => handleSecuritySettingChange('deviceTracking', e.target.checked)}
                        color="primary"
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  
                  <Divider />
                  
                  <ListItem>
                    <ListItemText
                      primary="Two-Factor Authentication"
                      secondary="Add an extra layer of security (Coming Soon)"
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        checked={securitySettings.twoFactorEnabled}
                        disabled
                        color="primary"
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </Box>
            </Paper>
          </Fade>
        </Grid>

        {/* Active Devices */}
        <Grid item xs={12} lg={4}>
          <Fade in timeout={1400}>
            <Paper elevation={8} sx={{ borderRadius: '16px', overflow: 'hidden' }}>
              <Box
                sx={{
                  p: 3,
                  background: 'linear-gradient(135deg, rgba(106, 76, 147, 0.05) 0%, rgba(45, 90, 61, 0.05) 100%)',
                  borderBottom: '1px solid rgba(106, 76, 147, 0.1)'
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: '"Playfair Display", serif',
                    color: '#6a4c93',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <DevicesOutlined /> Active Devices
                </Typography>
              </Box>
              
              <Box sx={{ p: 3 }}>
                <List dense>
                  {activeDevices.map((device) => (
                    <ListItem key={device.id} sx={{ px: 0 }}>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {device.device}
                            {device.current && (
                              <Chip
                                label="Current"
                                size="small"
                                sx={{
                                  backgroundColor: '#2d5a3d',
                                  color: 'white',
                                  fontSize: '0.7rem'
                                }}
                              />
                            )}
                          </Box>
                        }
                        secondary={`Last active: ${device.lastActive}`}
                      />
                    </ListItem>
                  ))}
                </List>
                
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{
                    mt: 2,
                    borderColor: '#6a4c93',
                    color: '#6a4c93',
                    borderRadius: '12px',
                    '&:hover': {
                      backgroundColor: 'rgba(106, 76, 147, 0.05)'
                    }
                  }}
                >
                  Sign Out All Devices
                </Button>
              </Box>
            </Paper>
          </Fade>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SecuritySettingsPage;