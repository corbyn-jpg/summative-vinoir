import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Search,
  PersonOutline,
  ShoppingBagOutlined,
  FavoriteBorder,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// Components
import HamburgerMenu from "./HamburgerMenu";
import EmojiSelector from "./EmojiSelector";
import ShrinkingTitle from "./ShrinkingTitle";

// Context
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [drawer, setDrawer] = useState(null);
  const [email, setEmail] = useState("");
  const [emojiPassword, setEmojiPassword] = useState([]);
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const { isLoggedIn, login, logout } = useAuth();
  const {
    cart,
    removeFromCart,
  } = useCart();
  const { wishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    const token = localStorage.getItem("vinoir_token");
    if (token) login();
  }, [login]);

  const toggleDrawer = (type) => () => {
    setDrawer(type);
    setLoginError("");
    setEmojiPassword([]);
  };

  const closeDrawer = () => {
    setDrawer(null);
    setLoginError("");
    setEmojiPassword([]);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError("");
    try {
      const res = await axios.post("/api/users/login", {
        email: email.trim(),
        password: emojiPassword.join(""),
      });
      localStorage.setItem("vinoir_token", res.data.token);
      login();
      closeDrawer();
    } catch (err) {
      setLoginError(err.response?.data?.message || "Login failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    closeDrawer();
  };

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
          {location.pathname === "/" && <ShrinkingTitle />}
          <Stack direction="row" spacing={3} alignItems="center">
            <IconButton onClick={toggleDrawer("search")}>
              <Search />
            </IconButton>
            <IconButton onClick={toggleDrawer("account")}>
              <PersonOutline />
            </IconButton>
            <IconButton onClick={toggleDrawer("wishlist")}>
              <FavoriteBorder />
            </IconButton>
            <IconButton onClick={toggleDrawer("cart")}>
              <ShoppingBagOutlined />
              {cart.length > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: 5,
                    right: 5,
                    backgroundColor: "red",
                    borderRadius: "50%",
                    width: 18,
                    height: 18,
                    fontSize: 12,
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {cart.length}
                </span>
              )}
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
      {/* === Account Drawer === */}
      <Drawer anchor="right" open={drawer === "account"} onClose={closeDrawer}>
        <Box sx={{ p: 3, width: 350 }}>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            {isLoggedIn ? "My Account" : "Welcome Back"}
          </Typography>

          {isLoggedIn ? (
            <>
              <Typography sx={{ mb: 2 }}>You are logged in.</Typography>
              <Button variant="outlined" fullWidth onClick={handleLogout}>
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
                />
                <Typography variant="body2" sx={{ mb: 1, fontWeight: "bold" }}>
                  Select your emoji password:
                </Typography>
                <EmojiSelector
                  selectedEmojis={emojiPassword}
                  setSelectedEmojis={setEmojiPassword}
                  maxLength={5}
                />
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
              {/* ✅ Register Button */}
              <Button
                variant="outlined"
                fullWidth
                href="/register"
                sx={{
                  mt: 2,
                  color: "#146e3a",
                  borderColor: "#146e3a",
                  "&:hover": {
                    backgroundColor: "#146e3a",
                    color: "white",
                  },
                }}
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Drawer>
      {/* === Wishlist Drawer === */}
      <Drawer anchor="right" open={drawer === "wishlist"} onClose={closeDrawer}>
        <Box sx={{ p: 3, width: 350 }}>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Your Wishlist
          </Typography>
          {isLoggedIn ? (
            wishlist.length === 0 ? (
              <Typography>No items in wishlist</Typography>
            ) : (
              wishlist.map((item) => (
                <Box key={item.id} display="flex" alignItems="center" mb={2}>
                  <img
                    src={item.image}
                    width={60}
                    height={60}
                    alt={item.name}
                    style={{ objectFit: "cover" }}
                  />
                  <Box ml={2}>
                    <Typography>{item.name}</Typography>
                    <Button
                      size="small"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      Remove
                    </Button>
                  </Box>
                </Box>
              ))
            )
          ) : (
            <>
              <Typography sx={{ mb: 2 }}>
                Sign in to view your wishlist
              </Typography>
              <Button
                fullWidth
                variant="outlined"
                onClick={toggleDrawer("account")}
              >
                Sign In
              </Button>
            </>
          )}
        </Box>
      </Drawer>
      {/* === Cart Drawer === */}
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
        <Box sx={{ p: 3 }}>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Your Cart ({cart.length})
          </Typography>

          {cart.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 4 }}>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Your cart is empty
              </Typography>
              <Button
                variant="contained"
                onClick={closeDrawer}
                sx={{
                  backgroundColor: "#146e3a",
                  "&:hover": { backgroundColor: "#0d5a2c" },
                }}
              >
                Continue Shopping
              </Button>
            </Box>
          ) : (
            <>
              <Box sx={{ maxHeight: "60vh", overflowY: "auto", mb: 2 }}>
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
                    </Box>
                    <IconButton
                      onClick={() => removeFromCart(item._id)}
                      color="error"
                      sx={{ alignSelf: "flex-start" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))}
              </Box>

              <Box
                sx={{
                  backgroundColor: "white",
                  p: 2,
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography>Subtotal:</Typography>
                  <Typography fontWeight="bold">
                    R{" "}
                    {cart
                      .reduce(
                        (sum, item) => sum + item.price * item.quantity,
                        0
                      )
                      .toFixed(2)}
                  </Typography>
                </Box>
                <Button
                  fullWidth
                  variant="contained"
                  component={Link}
                  to="/cart"
                  onClick={closeDrawer}
                  sx={{
                    mt: 1,
                    backgroundColor: "#146e3a",
                    "&:hover": { backgroundColor: "#0d5a2c" },
                  }}
                >
                  View Full Cart
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Drawer>
      {/* === Search Drawer === */}
      <Drawer anchor="right" open={drawer === "search"} onClose={closeDrawer}>
  <Box sx={{ p: 3, width: 350 }}>
    <Typography variant="h5" fontWeight="bold" mb={2}>
      Search Fragrances
    </Typography>
    <form onSubmit={(e) => {
      e.preventDefault();
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      closeDrawer();
    }}>
      <TextField
        fullWidth
        placeholder="Search our collection..."
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 2 }}
        autoFocus
      />
      <Button
        fullWidth
        variant="contained"
        type="submit"
        sx={{ backgroundColor: "#146e3a" }}
      >
        Search
      </Button>
    </form>
  </Box>
</Drawer>
    </>
  );
}