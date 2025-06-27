import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './PromoSection.css';

const PromoSection = ({ products = [] }) => {
  // Get featured products or fallback to placeholder data
  const featuredProducts = products.length > 0 
    ? products.filter(p => p.featured).slice(0, 5)
    : [
        { 
          _id: '1', 
          name: "Élégance Noir", 
          description: "A mysterious oriental blend with notes of vanilla and amber", 
          price: 120,
          images: [{ url: "/images/promo1.jpg" }],
          featured: true
        },
        { 
          _id: '2', 
          name: "Lumière d'Or", 
          description: "Golden citrus top notes with a warm woody base", 
          price: 95,
          images: [{ url: "/images/promo2.jpg" }],
          featured: true
        },
        { 
          _id: '3', 
          name: "Velvet Rose", 
          description: "Luxurious floral bouquet with hints of peony and musk", 
          price: 110,
          images: [{ url: "/images/promo3.jpg" }],
          featured: true
        },
        { 
          _id: '4', 
          name: "Oud Royal", 
          description: "Regal woody intensity with smoky undertones", 
          price: 150,
          images: [{ url: "/images/promo4.jpg" }],
          featured: true
        },
        { 
          _id: '5', 
          name: "Jardin Secret", 
          description: "Fresh green accords with citrus and herbal notes", 
          price: 85,
          images: [{ url: "/images/promo5.jpg" }],
          featured: true
        }
      ];

  return (
    <Box className="promo-section" sx={{ py: 8 }}>
      <Typography 
        variant="h2" 
        className="promo-title"
        sx={{ 
          fontFamily: '"Playfair Display", serif',
          fontWeight: 700,
          mb: 2,
          textAlign: 'center'
        }}
      >
        FEATURED COLLECTION
      </Typography>
      <Typography 
        variant="subtitle1" 
        className="promo-subtitle"
        sx={{ 
          fontFamily: '"Playfair Display", serif',
          fontWeight: 400,
          mb: 6,
          textAlign: 'center',
          fontSize: '1.25rem'
        }}
      >
        Discover our most coveted fragrances
      </Typography>

      <Box className="swiper-container" sx={{ mb: 8 }}>
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 300,
            modifier: 2,
            slideShadows: true,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={true}
          modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
          className="promo-swiper"
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {featuredProducts.map((product) => (
            <SwiperSlide key={product._id} className="promo-slide">
              <Link to={`/products/${product._id}`} className="promo-card-link">
                <Box className="promo-card" sx={{ p: 2 }}>
                  <Box className="promo-image-container" sx={{ mb: 2 }}>
                    <img
                      src={product.images?.[0]?.url || '/images/fallback.jpg'}
                      alt={product.name}
                      className="promo-image"
                      onError={(e) => {
                        e.target.src = '/images/fallback.jpg';
                      }}
                    />
                    <Box className="promo-overlay">
                      <Button 
                        variant="contained" 
                        className="promo-shop-btn"
                        onClick={(e) => e.preventDefault()}
                        sx={{
                          fontFamily: '"Playfair Display", serif',
                          fontWeight: 500,
                          fontSize: '1rem',
                          py: 1.5,
                          px: 3
                        }}
                      >
                        View Details
                      </Button>
                    </Box>
                  </Box>
                  <Box className="promo-content" sx={{ textAlign: 'center' }}>
                    <Typography 
                      variant="h5" 
                      className="promo-product-title"
                      sx={{ 
                        fontFamily: '"Playfair Display", serif',
                        fontWeight: 600,
                        mb: 1
                      }}
                    >
                      {product.name}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      className="promo-product-price"
                      sx={{ 
                        fontFamily: '"Playfair Display", serif',
                        fontWeight: 500,
                        mb: 1.5,
                        fontSize: '1.25rem'
                      }}
                    >
                      ${product.price.toFixed(2)}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      className="promo-product-desc"
                      sx={{ 
                        fontFamily: '"Playfair Display", serif',
                        fontWeight: 400,
                        mb: 2
                      }}
                    >
                      {product.description.substring(0, 60)}...
                    </Typography>
                  </Box>
                </Box>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      <Box sx={{ textAlign: 'center' }}>
        <Button 
          variant="outlined" 
          color="primary" 
          component={Link} 
          to="/shop"
          className="promo-view-all-btn"
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 500,
            fontSize: '1rem',
            py: 1.5,
            px: 4,
            borderWidth: '2px',
            '&:hover': {
              borderWidth: '2px'
            }
          }}
        >
          View All Products
        </Button>
      </Box>
    </Box>
  );
};

export default PromoSection;