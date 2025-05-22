import React from "react";
import { Box, Typography, Grid, Card, CardMedia, CardContent } from "@mui/material";

function ShopSection() {
  const products = [
    { id: 1, name: "Product 1", price: "£100", image: "/path-to-product1.jpg" },
    { id: 2, name: "Product 2", price: "£200", image: "/path-to-product2.jpg" },
    { id: 3, name: "Product 3", price: "£300", image: "/path-to-product3.jpg" },
    { id: 4, name: "Product 4", price: "£400", image: "/path-to-product4.jpg" },
  ];

  return (
    <Box sx={{ py: 5, textAlign: "center" }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Shop
      </Typography>
      <Grid container spacing={3} sx={{ maxWidth: "90%", margin: "0 auto" }}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card sx={{ maxWidth: 350, margin: "0 auto" }}>
              <CardMedia
                component="img"
                height="300"
                image={product.image}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {product.name}
                </Typography>
                <Typography variant="body1" sx={{ color: "gray" }}>
                  {product.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ShopSection;