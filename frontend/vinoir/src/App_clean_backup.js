import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Context Providers  
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

// Clean Components (no Material-UI dependencies)
import CleanNavbar from "./Components/CleanNavbar";
import CleanFooter from "./Components/CleanFooter";

// Lazy-loaded Pages
const CleanHome = lazy(() => import("./Pages/CleanHome"));

// Create basic placeholder pages for now
const BasicPage = ({ title, content }) => (
  <div style={{ 
    minHeight: "80vh", 
    padding: "120px 20px 40px", 
    textAlign: "center",
    backgroundColor: "#f8f9fa"
  }}>
    <h1 style={{ 
      fontSize: "3rem", 
      color: "#2d5a3d", 
      marginBottom: "20px",
      fontFamily: '"Playfair Display", serif'
    }}>
      {title}
    </h1>
    <p style={{ fontSize: "1.2rem", color: "#666", maxWidth: "600px", margin: "0 auto" }}>
      {content}
    </p>
  </div>
);

const ShopPage = () => <BasicPage 
  title="Shop" 
  content="Our luxury fragrance collection will be available here soon. Discover premium scents from around the world." 
/>;

const AboutPage = () => <BasicPage 
  title="About Vinoir" 
  content="Vinoir is dedicated to bringing you the finest luxury fragrances. Our passion for perfection drives us to curate only the most exceptional scents." 
/>;

const ContactPage = () => <BasicPage 
  title="Contact Us" 
  content="Get in touch with our fragrance experts. We're here to help you find your perfect scent." 
/>;

const PrivacyPolicy = () => <BasicPage 
  title="Privacy Policy" 
  content="Your privacy is important to us. This page outlines how we collect, use, and protect your personal information." 
/>;

const TermsOfService = () => <BasicPage 
  title="Terms of Service" 
  content="Please read these terms carefully before using our services. By using Vinoir, you agree to these terms and conditions." 
/>;

// Simple ErrorBoundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  
  static getDerivedStateFromError(error) {
    return { error };
  }
  
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }
  
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: "40px", textAlign: "center" }}>
          <h1>Something went wrong</h1>
          <p>Please refresh the page and try again.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <div style={{ 
                minHeight: "100vh", 
                display: "flex", 
                flexDirection: "column",
                fontFamily: "Roboto, Arial, sans-serif"
              }}>
                <CleanNavbar />
                
                <main style={{ flexGrow: 1 }}>
                  <Suspense fallback={
                    <div style={{ 
                      padding: "120px 20px", 
                      textAlign: "center",
                      fontSize: "1.2rem",
                      color: "#666"
                    }}>
                      Loading...
                    </div>
                  }>
                    <Routes>
                      <Route path="/" element={<CleanHome />} />
                      <Route path="/shop" element={<ShopPage />} />
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                      <Route path="/terms-of-service" element={<TermsOfService />} />
                      <Route
                        path="*"
                        element={
                          <div style={{ 
                            padding: "120px 20px", 
                            textAlign: "center",
                            color: "#666"
                          }}>
                            <h1 style={{ fontSize: "2rem", color: "#2d5a3d" }}>
                              Page Not Found
                            </h1>
                            <p>The page you're looking for doesn't exist.</p>
                          </div>
                        }
                      />
                    </Routes>
                  </Suspense>
                </main>
                
                <CleanFooter />
              </div>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </ErrorBoundary>
    </Router>
  );
}

export default App;