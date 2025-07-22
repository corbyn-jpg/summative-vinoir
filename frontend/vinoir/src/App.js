import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { CssBaseline, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";

// Context Providers
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

// Global Components
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

// Pages
import Home from "./Pages/Home";
import CreateUser from "./Pages/account/CreateUser";
import Login from "./Pages/account/Login";
import AboutPage from "./Pages/about/about";
import ContactPage from "./Pages/contact/ContactPage";
import AccountPage from "./Pages/account/AccountPage";
import PersonalDataPage from "./Pages/account/PersonalDataPage";
import OrdersPage from "./Pages/account/OrdersPage";
import WishlistPage from "./Pages/Shop/WishlistPage";
import ShopPage from "./Pages/Shop/ShopPage";
import FragranceDetail from "./Pages/Fragrance/FragranceDetail";
import CartPage from "./Pages/cart/CartPage";
import CheckoutPage from "./Pages/Checkout/CheckoutPage";
import OrderConfirmation from "./Pages/Checkout/OrderConfirmation";

// ScrollToTop scrolls to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}

// Animation variants for page transitions
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const pageTransition = {
  duration: 0.8,
  ease: [0.4, 0, 0.2, 1],
};

// AnimatedPage wraps pages for smooth transitions
function AnimatedPage({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
      style={{ position: "relative", minHeight: "100vh", backgroundColor: "#2a4936" }}
    >
      {children}
    </motion.div>
  );
}

function AppInner() {
  const location = useLocation();

  return (
    <>
      <CssBaseline />
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <div className="App" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
              <Navbar />
              <ScrollToTop />
              <main style={{ flexGrow: 1, backgroundColor: "#2a4936" }}>
                <AnimatePresence mode="wait" initial={false}>
                  <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
                    <Route path="/register" element={<AnimatedPage><CreateUser /></AnimatedPage>} />
                    <Route path="/login" element={<AnimatedPage><Login /></AnimatedPage>} />
                    <Route path="/about" element={<AnimatedPage><AboutPage /></AnimatedPage>} />
                    <Route path="/contact" element={<AnimatedPage><ContactPage /></AnimatedPage>} />
                    <Route path="/account" element={<AnimatedPage><AccountPage /></AnimatedPage>} />
                    <Route path="/account/personal-data" element={<AnimatedPage><PersonalDataPage /></AnimatedPage>} />
                    <Route path="/account/orders" element={<AnimatedPage><OrdersPage /></AnimatedPage>} />
                    <Route path="/wishlist" element={<AnimatedPage><WishlistPage /></AnimatedPage>} />
                    <Route path="/shop" element={<AnimatedPage><ShopPage /></AnimatedPage>} />
                    <Route path="/fragrance/:id" element={<AnimatedPage><FragranceDetail /></AnimatedPage>} />
                    <Route path="/cart" element={<AnimatedPage><CartPage /></AnimatedPage>} />
                    <Route path="/checkout" element={<AnimatedPage><CheckoutPage /></AnimatedPage>} />
                    <Route path="/order-confirmation" element={<AnimatedPage><OrderConfirmation /></AnimatedPage>} />
                    {/* Fallback for unmatched routes */}
                    <Route
                      path="*"
                      element={
                        <AnimatedPage>
                          <div style={{ padding: "2rem", textAlign: "center", color: "#a5a9b4" }}>
                            <Typography variant="h4" color="text.secondary">
                              Page Not Found
                            </Typography>
                          </div>
                        </AnimatedPage>
                      }
                    />
                  </Routes>
                </AnimatePresence>
              </main>
              <Footer />
            </div>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppInner />
    </Router>
  );
}
