import React from "react";
import { Box, Typography, Button, Grid, Card, CardMedia, CardContent } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

function PromoSection() {
  const promoItems = [
    { id: 1, title: "Promo 1", image: "/path-to-promo1.jpg" },
    { id: 2, title: "Promo 2", image: "/path-to-promo2.jpg" },
    { id: 3, title: "Promo 3", image: "/path-to-promo3.jpg" },
  ];

  return (
    <Box sx={{ py: 5, textAlign: "center" }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Product Promo
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Button>
          <ArrowBack />
        </Button>
        <Grid container spacing={3} sx={{ maxWidth: "90%", overflowX: "auto" }}>
          {promoItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card sx={{ maxWidth: 400, margin: "0 auto" }}>
                <CardMedia
                  component="img"
                  height="300"
                  image={item.image}
                  alt={item.title}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {item.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Button>
          <ArrowForward />
        </Button>
      </Box>
    </Box>
  );
}

export default PromoSection;