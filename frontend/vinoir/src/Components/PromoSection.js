import React from 'react';
import { Grid, Box, Typography, Card, CardMedia, CardContent } from '@mui/material';

const PromoSection = () => {
  return (
    <Box sx={{ padding: '2rem', backgroundColor: '#f9f9f9' }}>
      <Typography
        variant="h4"
        sx={{
          fontFamily: 'Playfair Display, serif',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '2rem',
          color: '#222',
        }}
      >
        Explore Our Promotions
      </Typography>
      <Grid container spacing={3}>
        {/* Promo 1 */}
        <Grid xs={12} sm={6} md={4}>
          <Card
            sx={{
              borderRadius: '12px',
              boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            <CardMedia
              component="img"
              height="200"
              image="https://via.placeholder.com/300"
              alt="Promo 1"
            />
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                Exclusive Fragrance
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Discover our exclusive fragrance collection at a special price.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Promo 2 */}
        <Grid xs={12} sm={6} md={4}>
          <Card
            sx={{
              borderRadius: '12px',
              boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            <CardMedia
              component="img"
              height="200"
              image="https://via.placeholder.com/300"
              alt="Promo 2"
            />
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                Limited Edition
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Get your hands on our limited-edition fragrances before they sell out.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Promo 3 */}
        <Grid xs={12} sm={6} md={4}>
          <Card
            sx={{
              borderRadius: '12px',
              boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            <CardMedia
              component="img"
              height="200"
              image="https://via.placeholder.com/300"
              alt="Promo 3"
            />
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                Seasonal Sale
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Enjoy up to 50% off on selected fragrances this season.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PromoSection;