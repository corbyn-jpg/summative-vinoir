// ...existing code...
import React, { useMemo } from 'react';
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
  const formatPrice = (amount) =>
    typeof amount === 'number' && !isNaN(amount)
      ? `R${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
      : '–';

  const featuredProducts = useMemo(() => {
    if (products.length > 0) return products.filter((p) => p.featured).slice(0, 5);
    return [
      { _id: '1', name: 'Élégance Noir', description: 'A mysterious oriental blend with notes of vanilla and amber', price: 120, images: [{ url: '/images/promo1.jpg' }], featured: true },
      { _id: '2', name: 'Lumière d\'Or', description: 'Golden citrus top notes with a warm woody base', price: 95, images: [{ url: '/images/promo2.jpg' }], featured: true },
      { _id: '3', name: 'Velvet Rose', description: 'Luxurious floral bouquet with hints of peony and musk', price: 110, images: [{ url: '/images/promo3.jpg' }], featured: true },
      { _id: '4', name: 'Oud Royal', description: 'Regal woody intensity with smoky undertones', price: 150, images: [{ url: '/images/promo4.jpg' }], featured: true },
      { _id: '5', name: 'Jardin Secret', description: 'Fresh green accords with citrus and herbal notes', price: 85, images: [{ url: '/images/promo5.jpg' }], featured: true },
    ];
  }, [products]);

  return (
    <Box className="promo-section">
      <Typography variant="h2" className="promo-title">FEATURED COLLECTION</Typography>
      <Typography variant="subtitle1" className="promo-subtitle">Discover our most coveted fragrances</Typography>

      <Box className="swiper-container">
        <Swiper
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView="auto"
          coverflowEffect={{ rotate: 0, stretch: 0, depth: 300, modifier: 2, slideShadows: true }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ clickable: true, dynamicBullets: true }}
          navigation
          modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
          className="promo-swiper"
          breakpoints={{ 0: { slidesPerView: 1 }, 640: { slidesPerView: 2 }, 900: { slidesPerView: 3 }, 1280: { slidesPerView: 4 } }}
        >
          {featuredProducts.map((product) => (
            <SwiperSlide key={product._id} className="promo-slide">
              <Link to={`/fragrance/${product._id}`} className="promo-card-link" aria-label={`View details of ${product.name}`}>
                <Box className="promo-card">
                  <Box className="promo-image-container">
                    <img
                      src={product.images?.[0]?.url || '/images/fallback.jpg'}
                      alt={product.name || 'Featured fragrance'}
                      className="promo-image"
                      onError={(e) => { e.target.onerror = null; e.target.src = '/images/fallback.jpg'; }}
                      loading="lazy"
                    />
                    <Box className="promo-overlay" aria-hidden="true">
                      <Button className="promo-shop-btn" tabIndex={-1}>View Details</Button>
                    </Box>
                  </Box>

                  <Box className="promo-content">
                    <Typography className="promo-product-title">{product.name}</Typography>
                    <Typography className="promo-product-price">{formatPrice(product.price)}</Typography>
                    <Typography className="promo-product-desc">
                      {product.description ? (product.description.length > 60 ? `${product.description.substring(0, 60)}...` : product.description) : 'No description'}
                    </Typography>
                  </Box>
                </Box>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      <Box sx={{ textAlign: 'center' }}>
        <Button component={Link} to="/shop" className="promo-view-all-btn">View All Products</Button>
      </Box>
    </Box>
  );
};

export default PromoSection;
// ...existing code...