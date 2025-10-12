import React, { lazy, Suspense, memo, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Context Providers
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

// Global Components
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

// Lazy-loaded Pages (improves initial bundle)
const Home = lazy(() => import("./Pages/Home"));
const CreateUser = lazy(() => import("./Pages/account/CreateUser"));
const Login = lazy(() => import("./Pages/account/Login"));
const AboutPage = lazy(() => import("./Pages/about/about"));
const ContactPage = lazy(() => import("./Pages/contact/ContactPage"));
const AccountPage = lazy(() => import("./Pages/account/AccountPage"));
const PersonalDataPage = lazy(() => import("./Pages/account/PersonalDataPage"));
const EnhancedPersonalDataPage = lazy(() => import("./Pages/account/EnhancedPersonalDataPage"));
const SecuritySettingsPage = lazy(() => import("./Pages/account/SecuritySettingsPage"));
const OrderHistoryPage = lazy(() => import("./Pages/account/OrderHistoryPage"));
const OrdersPage = lazy(() => import("./Pages/account/OrdersPage"));
const ProductsAdminPage = lazy(() => import("./Pages/admin/ProductsAdminPage"));
const WishlistPage = lazy(() => import("./Pages/Shop/WishlistPage"));
const ShopPage = lazy(() => import("./Pages/Shop/ShopPage"));
const SearchResults = lazy(() => import("./Pages/SearchResults"));
const FragranceDetail = lazy(() => import("./Pages/Fragrance/FragranceDetail"));
const CartPage = lazy(() => import("./Pages/cart/CartPage"));
const CheckoutPage = lazy(() => import("./Pages/Checkout/CheckoutPage"));
const OrderConfirmation = lazy(() => import("./Pages/Checkout/OrderConfirmation"));
const PrivacyPolicy = lazy(() => import("./Pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./Pages/TermsOfService"));

// Simple ErrorBoundary to show runtime errors instead of blank screen
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, info: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
    this.setState({ info });
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 24 }}>
          <h1>Something went wrong</h1>
          <pre style={{ whiteSpace: "pre-wrap" }}>
            {String(this.state.error)}
            {this.state.info?.componentStack ? `\n\n${this.state.info.componentStack}` : ""}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

// Memoized ScrollToTop (only re-renders when pathname changes)
const ScrollToTop = memo(function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);
  return null;
});

function AppInner() {
  return (
    <div className="App" style={{ 
      minHeight: "100vh", 
      display: "flex", 
      flexDirection: "column",
      margin: 0,
      padding: 0,
      boxSizing: "border-box",
      fontFamily: "Roboto, Arial, sans-serif"
    }}>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Navbar />
            <ScrollToTop />
            <main style={{ flexGrow: 1, backgroundColor: "#2a4936" }}>
              <Suspense fallback={<div style={{ padding: 24 }}>Loading...</div>}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/admin/products" element={<ProductsAdminPage />} />
                  <Route path="/register" element={<CreateUser />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/account" element={<AccountPage />} />
                  <Route path="/account/personal-data" element={<PersonalDataPage />} />
                  <Route path="/account/enhanced-profile" element={<EnhancedPersonalDataPage />} />
                  <Route path="/account/security" element={<SecuritySettingsPage />} />
                  <Route path="/account/order-history" element={<OrderHistoryPage />} />
                  <Route path="/account/orders" element={<OrdersPage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                  <Route path="/shop" element={<ShopPage />} />
                  <Route path="/search" element={<SearchResults />} />
                  <Route path="/fragrance/:id" element={<FragranceDetail />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/order-confirmation" element={<OrderConfirmation />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-of-service" element={<TermsOfService />} />
                  <Route
                    path="*"
                    element={
                      <div style={{ padding: "2rem", textAlign: "center", color: "#a5a9b4" }}>
                        <h1 style={{ fontSize: "2rem", color: "#a5a9b4" }}>
                          Page Not Found
                        </h1>
                      </div>
                    }
                  />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ErrorBoundary>
        <AppInner />
      </ErrorBoundary>
    </Router>
  );
}