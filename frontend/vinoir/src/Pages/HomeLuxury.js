import React, { useState, useEffect } from "react";
import { 
  Box, 
  Typography, 
  Button, 
  Container,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  Divider,
  IconButton,
  Paper
} from "@mui/material";
import { 
  ArrowForward, 
  Star, 
  Spa, 
  LocalFlorist,
  Favorite,
  ShoppingBag,
  PlayArrow,
  TrendingUp,
  EmojiEvents,
  Schedule
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

const HomeLuxury = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();

        if (data.products && Array.isArray(data.products)) {
          setProducts(data.products);
        } else if (Array.isArray(data)) {
          setProducts(data);
        } else {
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

  // Luxury Brand Statistics
  const brandStats = [
    { icon: <EmojiEvents />, number: "50+", label: "Signature Scents" },
    { icon: <Star />, number: "10K+", label: "Satisfied Clients" },
    { icon: <LocalFlorist />, number: "25", label: "Countries Served" },
    { icon: <Schedule />, number: "5", label: "Years of Excellence" }
  ];

  // Customer Testimonials
  const testimonials = [
    {
      name: "Sophia Laurent",
      role: "Fashion Editor",
      avatar: "/images/avatar1.jpg",
      rating: 5,
      text: "Vinoir has become my signature scent. The quality and longevity are unmatched in luxury fragrances."
    },
    {
      name: "James Richardson",
      role: "Business Executive", 
      avatar: "/images/avatar2.jpg",
      rating: 5,
      text: "The custom blend service exceeded all expectations. Truly a personalized luxury experience."
    },
    {
      name: "Elena Rossi",
      role: "Interior Designer",
      avatar: "/images/avatar3.jpg", 
      rating: 5,
      text: "Each fragrance tells a story. Vinoir captures emotions in the most beautiful way."
    }
  ];

  // Fragrance Collections
  const collections = [
    {
      title: "Noir Collection",
      description: "Mysterious and intense fragrances for the bold",
      image: "/images/dior1.jpg",
      color: "#2d5a3d"
    },
    {
      title: "Lumière Collection", 
      description: "Light and ethereal scents for everyday elegance",
      image: "/images/dior2.jpg",
      color: "#6a4c93"
    },
    {
      title: "Royal Collection",
      description: "Opulent fragrances fit for royalty",
      image: "/images/dior3.jpeg",
      color: "#8b4513"
    }
  ];

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
      sx={{
        pt: { xs: "130px", sm: "180px" },
        background: 'linear-gradient(180deg, #f8f5f2 0%, #ffffff 50%, #f8f5f2 100%)',
        overflow: 'hidden'
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

      {/* ===== BRAND STATISTICS ===== */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {brandStats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Card
                elevation={0}
                sx={{
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,245,242,0.9) 100%)',
                  borderRadius: '20px',
                  border: '1px solid rgba(45, 90, 61, 0.1)',
                  boxShadow: '0 10px 30px rgba(45, 90, 61, 0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 20px 40px rgba(45, 90, 61, 0.15)'
                  }
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #2d5a3d 0%, #6a4c93 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2,
                      color: 'white'
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Typography 
                    variant="h3" 
                    sx={{
                      fontFamily: '"Playfair Display", serif',
                      fontWeight: 'bold',
                      color: '#2d5a3d',
                      mb: 1
                    }}
                  >
                    {stat.number}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {stat.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ===== COLLECTIONS SHOWCASE ===== */}
      <Box sx={{ py: 8, background: 'rgba(45, 90, 61, 0.02)' }}>
        <Container maxWidth="xl">
          <Typography 
            variant="h2" 
            sx={{
              textAlign: 'center',
              fontFamily: '"Playfair Display", serif',
              color: '#2d5a3d',
              mb: 2
            }}
          >
            Signature Collections
          </Typography>
          <Typography 
            variant="h6" 
            sx={{
              textAlign: 'center',
              color: '#666',
              mb: 6,
              fontStyle: 'italic'
            }}
          >
            Three distinct worlds of fragrance artistry
          </Typography>

          <Grid container spacing={4}>
            {collections.map((collection, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  elevation={0}
                  sx={{
                    height: 400,
                    borderRadius: '24px',
                    overflow: 'hidden',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                    }
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: `linear-gradient(
                        rgba(0,0,0,0.3),
                        rgba(0,0,0,0.7)
                      ), url('${collection.image}') center/cover no-repeat`
                    }}
                  />
                  <CardContent
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      color: 'white',
                      p: 4
                    }}
                  >
                    <Typography 
                      variant="h4" 
                      sx={{
                        fontFamily: '"Playfair Display", serif',
                        mb: 1,
                        fontWeight: 300
                      }}
                    >
                      {collection.title}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2, opacity: 0.9 }}>
                      {collection.description}
                    </Typography>
                    <Button
                      variant="outlined"
                      sx={{
                        borderColor: 'white',
                        color: 'white',
                        borderRadius: '50px',
                        '&:hover': {
                          backgroundColor: 'white',
                          color: collection.color
                        }
                      }}
                    >
                      Explore Collection
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ===== CUSTOMER TESTIMONIALS ===== */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Typography 
          variant="h2" 
          sx={{
            textAlign: 'center',
            fontFamily: '"Playfair Display", serif',
            color: '#2d5a3d',
            mb: 6
          }}
        >
          What Our Clients Say
        </Typography>

        <Swiper
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 300,
            modifier: 2,
            slideShadows: true,
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[EffectCoverflow, Autoplay, Pagination]}
          className="testimonials-swiper"
          style={{ paddingBottom: '50px' }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index} style={{ width: '400px' }}>
              <Card
                elevation={0}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,245,242,0.9) 100%)',
                  borderRadius: '24px',
                  border: '1px solid rgba(45, 90, 61, 0.1)',
                  boxShadow: '0 20px 40px rgba(45, 90, 61, 0.1)',
                  height: 320
                }}
              >
                <Avatar
                  src={testimonial.avatar}
                  sx={{
                    width: 80,
                    height: 80,
                    mx: 'auto',
                    mb: 2,
                    border: '3px solid #6a4c93'
                  }}
                />
                <Typography 
                  variant="h6" 
                  sx={{
                    fontFamily: '"Playfair Display", serif',
                    color: '#2d5a3d',
                    mb: 1
                  }}
                >
                  {testimonial.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {testimonial.role}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} sx={{ color: '#ffd700', fontSize: 20 }} />
                  ))}
                </Box>
                <Typography 
                  variant="body1" 
                  sx={{
                    fontStyle: 'italic',
                    lineHeight: 1.6,
                    color: '#555'
                  }}
                >
                  "{testimonial.text}"
                </Typography>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>

      {/* ===== EXISTING SECTIONS (Enhanced) ===== */}
      <PromoSection products={products} />
      <ShopSection products={products} />

      {/* ===== LUXURY NEWSLETTER SIGNUP ===== */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #2d5a3d 0%, #6a4c93 100%)',
          py: 8,
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <Spa sx={{ fontSize: 60, mb: 2, opacity: 0.8 }} />
          <Typography 
            variant="h3" 
            sx={{
              fontFamily: '"Playfair Display", serif',
              mb: 2,
              fontWeight: 300
            }}
          >
            Join the Vinoir Circle
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Be the first to discover new fragrances, exclusive offers, and luxury experiences
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'white',
                color: 'white',
                px: 4,
                py: 2,
                borderRadius: '50px',
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: 'white',
                  color: '#2d5a3d'
                }
              }}
            >
              Subscribe Now
            </Button>
          </Box>
        </Container>
        
        {/* Background Decoration */}
        <Box
          sx={{
            position: 'absolute',
            top: '-50%',
            right: '-20%',
            width: '40%',
            height: '200%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            transform: 'rotate(30deg)'
          }}
        />
      </Box>

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
};

export default HomeLuxury;