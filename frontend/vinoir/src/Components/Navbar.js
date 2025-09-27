import React, { useState, useEffect, useCallback } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Stack,
  Drawer,
  Box,
  Typography,
  Button,
  TextField,
  Divider,
  Badge,
  InputAdornment,
} from "@mui/material";
import {
  Search,
  PersonOutline,
  ShoppingBagOutlined,
  FavoriteBorder,
  Close,
  ArrowForward,
  Remove as RemoveIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Components
import HamburgerMenu from "./HamburgerMenu";
import EmojiSelector from "./EmojiSelector";
import ShrinkingTitle from "./ShrinkingTitle";

// Context
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  // Drawer state
  const [drawer, setDrawer] = useState(null);

  // Login form states
  const [email, setEmail] = useState("");
  const [emojiPassword, setEmojiPassword] = useState([]);
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { user, isAuthenticated, login, logout } = useAuth();
  const { cart, addToCart, removeFromCart, updateCartItem, cartCount } = useCart();
  const { wishlist, removeFromWishlist, wishlistCount } = useWishlist();

  // Show success message if redirected from registration
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("registered") === "true") {
      setLoginSuccess(true);
      setDrawer("account");
    }
  }, [location]);

  // Drawer toggling
  const toggleDrawer = useCallback(
    (type) => (event) => {
      if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) return;
      setDrawer(type);
      setLoginError("");
      setEmojiPassword([]);
      setLoginSuccess(false);
    },
    []
  );

  const closeDrawer = useCallback(() => {
    setDrawer(null);
  }, []);

  // Login form submit handler
  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setLoginError("");
      try {
        const res = await axios.post("/api/users/login", {
          email: email.trim(),
          password: emojiPassword.join(""),
        });

        localStorage.setItem("vinoir_token", res.data.token);
        await login(res.data.token);
        setLoginSuccess(true);

        setTimeout(() => {
          closeDrawer();
        }, 2000);
      } catch (err) {
        setLoginError(err.response?.data?.message || "Login failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [email, emojiPassword, closeDrawer, login]
  );

  // Logout handler
  const handleLogout = useCallback(() => {
    logout();
    closeDrawer();
    navigate("/");
  }, [logout, closeDrawer, navigate]);

  // Search form handler (used in form onSubmit)
  const onSearchSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const trimmed = searchQuery.trim();
      if (trimmed) {
        navigate(`/search?q=${encodeURIComponent(trimmed)}`);
        closeDrawer();
      }
    },
    [searchQuery, navigate, closeDrawer]
  );

  // ───── Luxury Account Drawer (DIOR-inspired) ─────
  const renderAccountDrawer = useCallback(() => (
    <Box sx={{ width: 450, p: 0 }} role="presentation">
      {/* Elegant Header */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #2d5a3d 0%, #6a4c93 100%)',
          p: 4,
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
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
        
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} position="relative">
          <Typography 
            variant="h4" 
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 300,
              letterSpacing: '0.02em'
            }}
          >
            My Account
          </Typography>
          <IconButton 
            onClick={closeDrawer} 
            aria-label="Close account drawer"
            sx={{
              color: 'white',
              backgroundColor: 'rgba(255,255,255,0.1)',
              '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.2)',
                transform: 'rotate(90deg)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            <Close />
          </IconButton>
        </Box>
        
        <Typography 
          variant="body1" 
          sx={{ 
            opacity: 0.9,
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: '1.1rem',
            fontStyle: 'italic'
          }}
        >
          {isAuthenticated ? `Welcome back, luxury awaits` : 'Enter the world of luxury fragrances'}
        </Typography>
      </Box>

      {/* Content Area */}
      <Box sx={{ p: 4 }}>
        {/* Success Animation */}
        {loginSuccess && (
          <Box
            sx={{
              mb: 3,
              p: 3,
              backgroundColor: 'rgba(45, 90, 61, 0.05)',
              borderRadius: '12px',
              border: '1px solid rgba(45, 90, 61, 0.2)',
              textAlign: 'center',
              animation: 'luxuryFadeIn 0.8s ease-out',
              '@keyframes luxuryFadeIn': {
                '0%': { opacity: 0, transform: 'translateY(20px)' },
                '100%': { opacity: 1, transform: 'translateY(0)' }
              }
            }}
          >
            <Typography 
              sx={{ 
                color: '#2d5a3d',
                fontWeight: 600,
                fontSize: '1.1rem',
                mb: 1
              }}
            >
              ✨ Welcome to Vinoir ✨
            </Typography>
            <Typography variant="body2" sx={{ color: '#666' }}>
              Registration complete! You may now sign in to your luxury experience.
            </Typography>
          </Box>
        )}

        {isAuthenticated ? (
          /* Authenticated User Experience */
          <Box sx={{ textAlign: 'center' }}>
            {/* Welcome Message with Avatar */}
            <Box
              sx={{
                mb: 4,
                p: 3,
                background: 'linear-gradient(135deg, rgba(45, 90, 61, 0.05) 0%, rgba(106, 76, 147, 0.05) 100%)',
                borderRadius: '16px',
                border: '1px solid rgba(45, 90, 61, 0.1)'
              }}
            >
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #2d5a3d 0%, #6a4c93 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  fontSize: '2rem'
                }}
              >
                👑
              </Box>
              <Typography 
                variant="h5" 
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  color: '#2d5a3d',
                  mb: 1
                }}
              >
                Hello, {user?.name || "Distinguished Guest"}
              </Typography>
              <Typography variant="body2" sx={{ color: '#666', fontStyle: 'italic' }}>
                Your personal fragrance journey continues
              </Typography>
            </Box>

            {/* Account Actions */}
            <Stack spacing={2}>
              <Button
                fullWidth
                variant="outlined"
                component={Link}
                to="/account"
                onClick={closeDrawer}
                sx={{
                  py: 1.5,
                  borderColor: '#2d5a3d',
                  color: '#2d5a3d',
                  borderRadius: '12px',
                  fontWeight: 600,
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'rgba(45, 90, 61, 0.05)',
                    borderColor: '#2d5a3d'
                  }
                }}
              >
                Manage Account
              </Button>
              
              <Button
                fullWidth
                variant="outlined"
                component={Link}
                to="/account/orders"
                onClick={closeDrawer}
                sx={{
                  py: 1.5,
                  borderColor: '#6a4c93',
                  color: '#6a4c93',
                  borderRadius: '12px',
                  fontWeight: 600,
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'rgba(106, 76, 147, 0.05)',
                    borderColor: '#6a4c93'
                  }
                }}
              >
                Order History
              </Button>

              <Button
                fullWidth
                variant="contained"
                onClick={handleLogout}
                sx={{
                  py: 1.5,
                  background: 'linear-gradient(135deg, #2d5a3d 0%, #6a4c93 100%)',
                  borderRadius: '12px',
                  fontWeight: 600,
                  textTransform: 'none',
                  "&:hover": { 
                    background: 'linear-gradient(135deg, #1e3e29 0%, #4a3269 100%)',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(45, 90, 61, 0.3)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Sign Out
              </Button>
            </Stack>
          </Box>
        ) : (
          /* Login Experience */
          <Box>
            <form onSubmit={handleLogin}>
              {/* Email Field */}
              <TextField
                label="Email Address"
                type="email"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutline sx={{ color: '#2d5a3d' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    backgroundColor: 'rgba(45, 90, 61, 0.02)',
                    '& fieldset': {
                      borderColor: 'rgba(45, 90, 61, 0.3)'
                    },
                    '&:hover fieldset': {
                      borderColor: '#2d5a3d'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#2d5a3d',
                      borderWidth: '2px'
                    }
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(45, 90, 61, 0.7)',
                    '&.Mui-focused': { color: '#2d5a3d' }
                  }
                }}
              />

              {/* Emoji Password Section */}
              <Box
                sx={{
                  mb: 3,
                  p: 3,
                  backgroundColor: 'rgba(45, 90, 61, 0.02)',
                  borderRadius: '12px',
                  border: '1px solid rgba(45, 90, 61, 0.1)'
                }}
              >
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    mb: 2, 
                    fontWeight: 600,
                    color: '#2d5a3d',
                    fontFamily: '"Playfair Display", serif'
                  }}
                >
                  🎭 Your Signature Emoji Password
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, color: '#666', fontStyle: 'italic' }}>
                  Select your unique emoji combination (up to 5 emojis)
                </Typography>
                <EmojiSelector selectedEmojis={emojiPassword} setSelectedEmojis={setEmojiPassword} maxLength={5} />
              </Box>

              {/* Error Message */}
              {loginError && (
                <Box
                  sx={{
                    mb: 3,
                    p: 2,
                    backgroundColor: 'rgba(211, 47, 47, 0.05)',
                    borderRadius: '8px',
                    border: '1px solid rgba(211, 47, 47, 0.2)'
                  }}
                >
                  <Typography color="error" variant="body2">
                    {loginError}
                  </Typography>
                </Box>
              )}

              {/* Login Button */}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isLoading || emojiPassword.length === 0}
                sx={{
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  borderRadius: '12px',
                  textTransform: 'none',
                  letterSpacing: '0.5px',
                  background: 'linear-gradient(135deg, #2d5a3d 0%, #6a4c93 100%)',
                  "&:hover": { 
                    background: 'linear-gradient(135deg, #1e3e29 0%, #4a3269 100%)',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(45, 90, 61, 0.3)'
                  },
                  "&:disabled": {
                    backgroundColor: '#cccccc',
                    color: '#888'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                {isLoading ? "Signing In..." : "Enter Vinoir ✨"}
              </Button>
            </form>

            {/* Divider */}
            <Box sx={{ my: 4, position: 'relative', textAlign: 'center' }}>
              <Divider sx={{ borderColor: 'rgba(45, 90, 61, 0.2)' }} />
              <Typography 
                variant="body2" 
                sx={{ 
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: 'white',
                  px: 2,
                  color: '#666',
                  fontStyle: 'italic'
                }}
              >
                New to luxury?
              </Typography>
            </Box>

            {/* Create Account Section */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" sx={{ mb: 2, color: '#666' }}>
                Join the exclusive world of premium fragrances
              </Typography>
              <Button
                fullWidth
                variant="outlined"
                component={Link}
                to="/register"
                onClick={closeDrawer}
                sx={{
                  py: 1.5,
                  borderColor: '#2d5a3d',
                  color: '#2d5a3d',
                  borderRadius: '12px',
                  fontWeight: 600,
                  textTransform: 'none',
                  "&:hover": {
                    backgroundColor: 'rgba(45, 90, 61, 0.05)',
                    borderColor: '#2d5a3d',
                    transform: 'translateY(-1px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Create Your Account 🌟
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  ), [
    isAuthenticated,
    user,
    handleLogout,
    email,
    emojiPassword,
    loginError,
    isLoading,
    handleLogin,
    closeDrawer,
    loginSuccess,
  ]);

  // ───── Wishlist Drawer ─────
  const renderWishlistDrawer = useCallback(() => (
    <Box sx={{ width: 350, p: 3 }} role="presentation">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">
          Your Wishlist ({wishlistCount})
        </Typography>
        <IconButton onClick={closeDrawer} aria-label="Close wishlist drawer">
          <Close />
        </IconButton>
      </Box>

      {!isAuthenticated ? (
        <>
          <Typography variant="body1" mb={3}>
            Sign in to view and manage your wishlist
          </Typography>
          <Button
            fullWidth
            variant="contained"
            onClick={toggleDrawer("account")}
            sx={{
              backgroundColor: "#146e3a",
              "&:hover": { backgroundColor: "#0d5a2c" },
            }}
          >
            Sign In
          </Button>
        </>
      ) : wishlist.length === 0 ? (
        <>
          <Typography variant="body1" mb={3}>
            Your wishlist is empty
          </Typography>
          <Button
            fullWidth
            variant="outlined"
            onClick={closeDrawer}
            sx={{
              color: "#146e3a",
              borderColor: "#146e3a",
              "&:hover": {
                backgroundColor: "#146e3a",
                color: "white",
              },
            }}
          >
            Continue Shopping
          </Button>
        </>
      ) : (
        <Box sx={{ maxHeight: "60vh", overflowY: "auto" }}>
          {wishlist.map((item) => (
            <Box
              key={item._id}
              sx={{
                display: "flex",
                mb: 2,
                p: 2,
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={item.images?.[0]?.url || "/images/fallback.jpg"}
                alt={item.name}
                style={{
                  width: 80,
                  height: 80,
                  objectFit: "cover",
                  borderRadius: "4px",
                }}
              />
              <Box sx={{ ml: 2, flexGrow: 1 }}>
                <Typography variant="subtitle1">{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  R {item.price.toFixed(2)}
                </Typography>
              </Box>
              <Stack direction="column" spacing={1}>
                <IconButton
                  onClick={() => addToCart({ ...item, quantity: 1 })}
                  size="small"
                  color="primary"
                  aria-label={`Add ${item.name} to cart`}
                >
                  <ShoppingBagOutlined fontSize="small" />
                </IconButton>
                <IconButton
                  onClick={() => removeFromWishlist(item._id)}
                  size="small"
                  color="error"
                  aria-label={`Remove ${item.name} from wishlist`}
                >
                  <Close fontSize="small" />
                </IconButton>
              </Stack>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  ), [
    wishlistCount,
    isAuthenticated,
    wishlist,
    closeDrawer,
    toggleDrawer,
    removeFromWishlist,
    addToCart,
  ]);

  // ───── Cart Drawer ─────
  const renderCartDrawer = useCallback(() => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

    return (
      <Box sx={{ width: { xs: "100%", sm: 400 }, p: 3 }} role="presentation">
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5" fontWeight="bold">
            Your Cart ({cartCount})
          </Typography>
          <IconButton onClick={closeDrawer} aria-label="Close cart drawer">
            <Close />
          </IconButton>
        </Box>

        {cart.length === 0 ? (
          <>
            <Typography variant="body1" mb={3} textAlign="center">
              Your cart is empty
            </Typography>
            <Button
              fullWidth
              variant="outlined"
              onClick={closeDrawer}
              sx={{
                color: "#146e3a",
                borderColor: "#146e3a",
                "&:hover": {
                  backgroundColor: "#146e3a",
                  color: "white",
                },
              }}
            >
              Continue Shopping
            </Button>
          </>
        ) : (
          <>
            <Box sx={{ maxHeight: "60vh", overflowY: "auto", mb: 3 }}>
              {cart.map((item) => (
                <Box
                  key={item._id}
                  sx={{
                    display: "flex",
                    mb: 2,
                    p: 2,
                    backgroundColor: "white",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  <img
                    src={item.images?.[0]?.url || "/images/fallback.jpg"}
                    alt={item.name}
                    style={{
                      width: 80,
                      height: 80,
                      objectFit: "cover",
                      borderRadius: "4px",
                    }}
                  />
                  <Box sx={{ ml: 2, flexGrow: 1 }}>
                    <Typography variant="subtitle1">{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      R {item.price.toFixed(2)} × {item.quantity}
                    </Typography>
                    <Stack direction="row" spacing={1} mt={1}>
                      <IconButton
                        size="small"
                        onClick={() => updateCartItem(item._id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography variant="body1">{item.quantity}</Typography>
                      <IconButton
                        size="small"
                        onClick={() => updateCartItem(item._id, item.quantity + 1)}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </Box>
                  <IconButton
                    onClick={() => removeFromCart(item._id)}
                    color="error"
                    sx={{ alignSelf: "flex-start" }}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
            </Box>

            <Box
              sx={{
                backgroundColor: "white",
                p: 3,
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography variant="subtitle1">Subtotal:</Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                  R {subtotal}
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                component={Link}
                to="/checkout"
                onClick={closeDrawer}
                endIcon={<ArrowForward />}
                sx={{
                  backgroundColor: "#146e3a",
                  "&:hover": { backgroundColor: "#0d5a2c" },
                }}
              >
                Proceed to Checkout
              </Button>
            </Box>
          </>
        )}
      </Box>
    );
  }, [cart, cartCount, closeDrawer, updateCartItem, removeFromCart]);

  // ───── Enhanced Search Drawer ─────
  const renderSearchDrawer = useCallback(() => (
    <Box sx={{ width: 400, p: 3 }} role="presentation">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography 
          variant="h5" 
          fontWeight="bold"
          sx={{ 
            fontFamily: '"Playfair Display", serif',
            color: '#2d5a3d'
          }}
        >
          Search Fragrances
        </Typography>
        <IconButton 
          onClick={closeDrawer} 
          aria-label="Close search drawer"
          sx={{
            color: '#2d5a3d',
            '&:hover': {
              backgroundColor: 'rgba(45, 90, 61, 0.1)'
            }
          }}
        >
          <Close />
        </IconButton>
      </Box>

      <Typography 
        variant="body2" 
        sx={{ 
          mb: 3, 
          color: '#666',
          fontStyle: 'italic'
        }}
      >
        Discover your perfect scent by searching for fragrances, brands, or fragrance notes
      </Typography>

      <form onSubmit={onSearchSubmit}>
        <TextField
          fullWidth
          placeholder="Search by name, notes, or brand..."
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: '#2d5a3d' }} />
              </InputAdornment>
            ),
          }}
          sx={{ 
            mb: 3,
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              backgroundColor: 'rgba(45, 90, 61, 0.02)',
              '& fieldset': {
                borderColor: 'rgba(45, 90, 61, 0.3)'
              },
              '&:hover fieldset': {
                borderColor: '#2d5a3d'
              },
              '&.Mui-focused fieldset': {
                borderColor: '#2d5a3d',
                borderWidth: '2px'
              }
            },
            '& .MuiInputBase-input': {
              fontSize: '1rem',
              '&::placeholder': {
                color: 'rgba(45, 90, 61, 0.6)',
                opacity: 1
              }
            }
          }}
          autoFocus
          aria-label="Search fragrance products"
        />
        
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={!searchQuery.trim()}
          sx={{
            backgroundColor: "#2d5a3d",
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 600,
            borderRadius: '12px',
            textTransform: 'none',
            letterSpacing: '0.5px',
            "&:hover": { 
              backgroundColor: "#1e3e29",
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 12px rgba(45, 90, 61, 0.3)'
            },
            "&:disabled": {
              backgroundColor: '#cccccc',
              color: '#888'
            },
            transition: 'all 0.3s ease'
          }}
        >
          Search Fragrances
        </Button>
      </form>

      {/* Search Tips */}
      <Box sx={{ mt: 4, p: 2, backgroundColor: 'rgba(45, 90, 61, 0.05)', borderRadius: '8px' }}>
        <Typography variant="subtitle2" sx={{ color: '#2d5a3d', mb: 1, fontWeight: 600 }}>
          Search Tips:
        </Typography>
        <Typography variant="body2" sx={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.4 }}>
          • Try searching for specific notes like "vanilla", "rose", or "sandalwood"
          <br />
          • Search by fragrance type: "Eau de Parfum" or "Eau de Toilette"  
          <br />
          • Look for your favorite brands or designer names
        </Typography>
      </Box>
    </Box>
  ), [searchQuery, onSearchSubmit, closeDrawer]);

  // Show Shrinking Title only on homepage
  const showShrinkingTitle = location.pathname === "/";

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#146e3a",
          boxShadow: "none",
          zIndex: 1200,
          height: "80px",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", px: 3 }}>
          <HamburgerMenu />
          {showShrinkingTitle && <ShrinkingTitle />}
          <Stack direction="row" spacing={3} alignItems="center">
            <IconButton onClick={toggleDrawer("search")} color="inherit" aria-label="Open search drawer">
              <Search />
            </IconButton>
            <IconButton onClick={toggleDrawer("account")} color="inherit" aria-label="Open account drawer">
              <PersonOutline />
            </IconButton>
            <IconButton onClick={toggleDrawer("wishlist")} color="inherit" aria-label="Open wishlist drawer">
              <Badge badgeContent={wishlistCount} color="error">
                <FavoriteBorder />
              </Badge>
            </IconButton>
            <IconButton onClick={toggleDrawer("cart")} color="inherit" aria-label="Open cart drawer">
              <Badge badgeContent={cartCount} color="error">
                <ShoppingBagOutlined />
              </Badge>
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Drawers */}
      <Drawer anchor="right" open={drawer === "account"} onClose={closeDrawer}>
        {renderAccountDrawer()}
      </Drawer>

      <Drawer anchor="right" open={drawer === "wishlist"} onClose={closeDrawer}>
        {renderWishlistDrawer()}
      </Drawer>

      <Drawer
        anchor="right"
        open={drawer === "cart"}
        onClose={closeDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            width: { xs: "100%", sm: 400 },
            backgroundColor: "#f9f9f9",
          },
        }}
      >
        {renderCartDrawer()}
      </Drawer>

      <Drawer anchor="right" open={drawer === "search"} onClose={closeDrawer}>
        {renderSearchDrawer()}
      </Drawer>
    </>
  );
}
