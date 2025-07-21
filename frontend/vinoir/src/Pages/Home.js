import React, { useState, useEffect } from "react";
import PromoSection from "../Components/PromoSection";
import ShopSection from "../Components/ShopSection";
import HeroSection from "../Components/HeroSection";
import { Box, CircularProgress } from "@mui/material";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();

        console.log("API products response:", data);

        // Adjust this logic based on your API response structure:
        if (data.products && Array.isArray(data.products)) {
          // If API returns { products: [...] }
          setProducts(data.products);
        } else if (Array.isArray(data)) {
          // If API returns [...]
          setProducts(data);
        } else {
          console.error('API did not return an array or expected structure:', data);
          setProducts([]);
        }
      } catch (err) {
        setError(err.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={4}>
        Error: {error}
      </Box>
    );
  }

  return (
    <Box
      component="main"
      sx={{
        pt: { xs: "130px", sm: "180px" },
        px: { xs: 2, sm: 3 },
        pb: 4,
      }}
    >
      {/* Hero Section */}
      <HeroSection
        title="Welcome to Vinoir"
        subtitle="An Invitation to Venture Away"
        buttonText="Discover"
        buttonLink={"/shop"}
        backgroundImage="/images/dummy-image.jpg"
      />

      {/* Promo Section */}
      <PromoSection products={products} />

      {/* Shop Section */}
      <ShopSection products={products} />
    </Box>
  );
}

export default Home;
