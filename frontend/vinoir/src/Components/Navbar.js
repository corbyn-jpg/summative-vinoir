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

  // ───── Account Drawer ─────
  const renderAccountDrawer = useCallback(() => (
    <Box sx={{ width: 350, p: 3 }} role="presentation">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">
          My Account
        </Typography>
        <IconButton onClick={closeDrawer} aria-label="Close account drawer">
          <Close />
        </IconButton>
      </Box>

      {loginSuccess && (
        <Typography color="success.main" sx={{ mb: 2 }}>
          Registration complete! You may now log in.
        </Typography>
      )}

      {isAuthenticated ? (
        <>
          <Typography variant="h6" mb={2}>
            Hello, {user?.name || "User"}!
          </Typography>
          <Button
            fullWidth
            variant="contained"
            onClick={handleLogout}
            sx={{
              backgroundColor: "#146e3a",
              "&:hover": { backgroundColor: "#0d5a2c" },
            }}
          >
            Logout
          </Button>
        </>
      ) : (
        <>
          <form onSubmit={handleLogin}>
            <TextField
              label="Email Address"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            <Typography variant="body2" sx={{ mb: 1, fontWeight: "bold" }}>
              Select your emoji password:
            </Typography>
            <EmojiSelector selectedEmojis={emojiPassword} setSelectedEmojis={setEmojiPassword} maxLength={5} />
            {loginError && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {loginError}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isLoading || emojiPassword.length === 0}
              sx={{
                mt: 3,
                backgroundColor: "#146e3a",
                "&:hover": { backgroundColor: "#0d5a2c" },
              }}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
          <Divider sx={{ my: 3 }} />
          <Typography variant="body2" textAlign="center" mb={2}>
            Don't have an account?
          </Typography>
          <Button
            fullWidth
            variant="outlined"
            component={Link}
            to="/register"
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
            Create Account
          </Button>
        </>
      )}
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

  // ───── Search Drawer ─────
  const renderSearchDrawer = useCallback(() => (
    <Box sx={{ width: 350, p: 3 }} role="presentation">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">
          Search Fragrances
        </Typography>
        <IconButton onClick={closeDrawer} aria-label="Close search drawer">
          <Close />
        </IconButton>
      </Box>
      <form onSubmit={onSearchSubmit}>
        <TextField
          fullWidth
          placeholder="Search by name, notes, or brand..."
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ mb: 3 }}
          autoFocus
          aria-label="Search fragrance products"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={!searchQuery.trim()}
          sx={{
            backgroundColor: "#146e3a",
            "&:hover": { backgroundColor: "#0d5a2c" },
          }}
        >
          Search
        </Button>
      </form>
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
