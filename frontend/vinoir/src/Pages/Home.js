import React, { useState, useEffect } from "react";
import { API_BASE } from '../config/api';
import { 
  Box, 
  Typography, 
  Button, 
  Container,
  Grid,
  Card,
  CardContent
} from "@mui/material";
import { 
  ArrowForward, 
  Spa, 
  LocalFlorist,
  PlayArrow
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay, Pagination } from 'swiper/modules';
import PromoSection from "../Components/PromoSection";
import ShopSection from "../Components/ShopSection";
import HeroSection from "../Components/HeroSection";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
  const response = await fetch(`${API_BASE}/products`);
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
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
        sx={{ 
          background: 'linear-gradient(135deg, #f8f5f2 0%, #ffffff 100%)' 
        }}
      >
        <Box textAlign="center">
          <Spa sx={{ fontSize: 60, color: '#6a4c93', mb: 2, animation: 'spin 2s linear infinite' }} />
          <Typography variant="h6" color="#2d5a3d">
            Crafting your luxury experience...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography color="error">Error: {error}</Typography>
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
        backgroundColor: "#2a4936"
      }}
    >
      
      {/* ===== ENHANCED HERO SECTION ===== */}
      <Box
        sx={{
          height: '100vh',
          background: `
            linear-gradient(
              rgba(45, 90, 61, 0.4),
              rgba(106, 76, 147, 0.4)
            ),
            url('/images/dior7.jpg') center/cover no-repeat
          `,
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Floating Elements */}
        <Box sx={{ 
          position: 'absolute', 
          top: '10%', 
          left: '5%',
          animation: 'float 6s ease-in-out infinite'
        }}>
          <Spa sx={{ fontSize: 100, color: 'rgba(255,255,255,0.1)' }} />
        </Box>
        <Box sx={{ 
          position: 'absolute', 
          bottom: '20%', 
          right: '10%',
          animation: 'float 8s ease-in-out infinite reverse'
        }}>
          <LocalFlorist sx={{ fontSize: 120, color: 'rgba(255,255,255,0.1)' }} />
        </Box>

        <Container maxWidth="xl">
          <Grid container alignItems="center" spacing={6}>
            <Grid item xs={12} md={7}>
              <Box color="white">
                <Typography 
                  variant="h1" 
                  sx={{
                    fontFamily: '"Playfair Display", serif',
                    fontSize: { xs: '3rem', md: '5rem', lg: '6rem' },
                    fontWeight: 300,
                    letterSpacing: '0.02em',
                    mb: 2,
                    lineHeight: 1.1
                  }}
                >
                  Vinoir
                </Typography>
                <Typography 
                  variant="h3" 
                  sx={{
                    fontFamily: '"Cormorant Garamond", serif',
                    fontStyle: 'italic',
                    opacity: 0.9,
                    mb: 4,
                    fontSize: { xs: '1.5rem', md: '2rem' }
                  }}
                >
                  Where Luxury Meets Artistry
                </Typography>
                <Typography 
                  variant="h6" 
                  sx={{
                    mb: 4,
                    opacity: 0.8,
                    maxWidth: '500px',
                    lineHeight: 1.6
                  }}
                >
                  Discover handcrafted fragrances that tell your unique story. 
                  Each scent is a journey through time, emotion, and memory.
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    component={Link}
                    to="/shop"
                    size="large"
                    endIcon={<ArrowForward />}
                    sx={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)',
                      color: 'white',
                      px: 4,
                      py: 2,
                      borderRadius: '50px',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      textTransform: 'none',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.2) 100%)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Explore Collection
                  </Button>
                  
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<PlayArrow />}
                    sx={{
                      borderColor: 'rgba(255,255,255,0.5)',
                      color: 'white',
                      px: 4,
                      py: 2,
                      borderRadius: '50px',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      textTransform: 'none',
                      '&:hover': {
                        borderColor: 'white',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Watch Story
                  </Button>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={5}>
              <Box sx={{ textAlign: 'center', position: 'relative' }}>
                {/* Floating Product Showcase */}
                <Box
                  sx={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                    borderRadius: '24px',
                    p: 4,
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    animation: 'float 4s ease-in-out infinite'
                  }}
                >
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: 'white', 
                      mb: 2,
                      fontFamily: '"Playfair Display", serif'
                    }}
                  >
                    Featured This Month
                  </Typography>
                  <Box
                    sx={{
                      width: 200,
                      height: 200,
                      mx: 'auto',
                      mb: 2,
                      borderRadius: '16px',
                      overflow: 'hidden',
                      background: 'rgba(255,255,255,0.1)'
                    }}
                  >
                    <img
                      src="/images/dior4.jpeg"
                      alt="Featured Fragrance"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </Box>
                  <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
                    Élégance Noir
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                    A mysterious blend of vanilla and amber
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ===== FEATURED COLLECTION SECTION ===== */}
      <Box sx={{ 
        py: { xs: 8, md: 12 }, 
        minHeight: '50vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: 'rgba(45, 90, 61, 0.02)' 
      }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
            <Typography 
              variant="h1" 
              sx={{
                fontFamily: '"Playfair Display", serif',
                color: '#2d5a3d',
                mb: 3,
                fontSize: { xs: '3rem', md: '5rem', lg: '6rem' },
                fontWeight: 300,
                letterSpacing: '0.02em',
                lineHeight: 1.1
              }}
            >
              FEATURED COLLECTION
            </Typography>
            <Typography 
              variant="h4" 
              sx={{
                color: '#666',
                fontStyle: 'italic',
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: { xs: '1.5rem', md: '2rem', lg: '2.5rem' },
                maxWidth: '800px',
                mx: 'auto'
              }}
            >
              Discover our most coveted fragrances
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* ===== EXISTING SECTIONS (Enhanced) ===== */}
      <PromoSection products={products} />
      <ShopSection products={products} />

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </Box>
  );
}

export default Home;
