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
  // Helper: format price with comma separators and R prefix
  const formatPrice = (amount) =>
    typeof amount === 'number' && !isNaN(amount)
      ? `R${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
      : '–';

  // Use featured products if provided; otherwise use fallback sample data
  const featuredProducts =
    products.length > 0
      ? products.filter((p) => p.featured).slice(0, 5)
      : [
          {
            _id: '1',
            name: "Élégance Noir",
            description: "A mysterious oriental blend with notes of vanilla and amber",
            price: 120,
            images: [{ url: '/images/promo1.jpg' }],
            featured: true,
          },
          {
            _id: '2',
            name: "Lumière d'Or",
            description: "Golden citrus top notes with a warm woody base",
            price: 95,
            images: [{ url: '/images/promo2.jpg' }],
            featured: true,
          },
          {
            _id: '3',
            name: 'Velvet Rose',
            description: 'Luxurious floral bouquet with hints of peony and musk',
            price: 110,
            images: [{ url: '/images/promo3.jpg' }],
            featured: true,
          },
          {
            _id: '4',
            name: 'Oud Royal',
            description: 'Regal woody intensity with smoky undertones',
            price: 150,
            images: [{ url: '/images/promo4.jpg' }],
            featured: true,
          },
          {
            _id: '5',
            name: 'Jardin Secret',
            description: 'Fresh green accords with citrus and herbal notes',
            price: 85,
            images: [{ url: '/images/promo5.jpg' }],
            featured: true,
          },
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
          textAlign: 'center',
          letterSpacing: '0.05em',
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
          fontSize: '1.25rem',
          maxWidth: 600,
          mx: 'auto',
        }}
      >
        Discover our most coveted fragrances
      </Typography>

      <Box className="swiper-container" sx={{ mb: 8 }}>
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
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ clickable: true, dynamicBullets: true }}
          navigation
          modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
          className="promo-swiper"
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            900: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {featuredProducts.map((product) => (
            <SwiperSlide key={product._id} className="promo-slide">
              <Link
                to={`/fragrance/${product._id}`}
                className="promo-card-link"
                aria-label={`View details of ${product.name}`}
                tabIndex={0}
              >
                <Box
                  className="promo-card"
                  sx={{ p: 2, borderRadius: 3, boxShadow: 2, bgcolor: 'background.paper', height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <Box
                    className="promo-image-container"
                    sx={{ mb: 2, position: 'relative', borderRadius: 3, overflow: 'hidden', flexShrink: 0 }}
                  >
                    <img
                      src={product.images?.[0]?.url || '/images/fallback.jpg'}
                      alt={product.name || 'Featured fragrance'}
                      className="promo-image"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/fallback.jpg';
                      }}
                      style={{ width: '100%', height: 260, objectFit: 'cover', display: 'block' }}
                      loading="lazy"
                    />
                    <Box
                      className="promo-overlay"
                      sx={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0,
                        transition: 'opacity 0.3s',
                        bgcolor: 'rgba(0,0,0,0.15)',
                        '&:hover, &:focus-within': { opacity: 1 },
                        borderRadius: 3,
                      }}
                    >
                      <Button
                        variant="contained"
                        className="promo-shop-btn"
                        sx={{
                          fontFamily: '"Playfair Display", serif',
                          fontWeight: 500,
                          fontSize: '1rem',
                          py: 1.25,
                          px: 3,
                          bgcolor: 'rgba(20, 110, 58, 0.95)',
                          color: '#fff',
                          borderRadius: 2,
                          textTransform: 'capitalize',
                          boxShadow: 2,
                        }}
                        tabIndex={-1}
                        aria-label="View Details"
                      >
                        View Details
                      </Button>
                    </Box>
                  </Box>
                  <Box className="promo-content" sx={{ textAlign: 'center', pt: 1, flexGrow: 1 }}>
                    <Typography
                      variant="h5"
                      className="promo-product-title"
                      sx={{
                        fontFamily: '"Playfair Display", serif',
                        fontWeight: 600,
                        mb: 1,
                        color: 'text.primary',
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
                        fontSize: '1.15rem',
                        color: '#146e3a',
                      }}
                    >
                      {formatPrice(product.price)}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="promo-product-desc"
                      sx={{
                        fontFamily: '"Playfair Display", serif',
                        fontWeight: 400,
                        mb: 2,
                        color: '#555',
                      }}
                    >
                      {product.description
                        ? product.description.length > 60
                          ? `${product.description.substring(0, 60)}...`
                          : product.description
                        : 'No description'}
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
            fontSize: '1.05rem',
            py: 1.5,
            px: 4,
            borderWidth: '2px',
            borderColor: '#146e3a',
            color: '#146e3a',
            '&:hover': {
              borderWidth: '2px',
              borderColor: '#146e3a',
              bgcolor: '#e8f5e9',
            },
          }}
        >
          View All Products
        </Button>
      </Box>
    </Box>
  );
};

export default PromoSection;
