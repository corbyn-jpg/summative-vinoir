import React from "react";
import { Box, Typography, Grid, Card, CardMedia, CardContent, Button } from "@mui/material";

class Product {
  constructor(id, name, price, image) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
  }

  get formattedPrice() {
    return `£${parseFloat(this.price).toFixed(2)}`;
  }
}

class ProductCatalog {
  constructor(products) {
    this.products = products.map(
      p => new Product(p.id, p.name, p.price, p.image)
    );
  }

  getFeaturedProducts() {
    return this.products.slice(0, 4); // Show first 4 as featured
  }
}

const ProductCard = ({ product }) => (
  <Card sx={{ 
    height: "100%", 
    display: "flex", 
    flexDirection: "column",
    transition: "transform 0.3s",
    "&:hover": {
      transform: "scale(1.03)",
      boxShadow: 3
    }
  }}>
    <CardMedia
      component="img"
      height="300"
      image={product.image}
      alt={product.name}
      sx={{ objectFit: "cover" }}
    />
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
        {product.name}
      </Typography>
      <Typography variant="h6" sx={{ color: "primary.main", mb: 2 }}>
        {product.formattedPrice}
      </Typography>
      <Button variant="contained" fullWidth>
        Add to Cart
      </Button>
    </CardContent>
  </Card>
);

function ShopSection() {
  const productData = [
    { id: 1, name: "Product 1", price: "100", image: "/path-to-product1.jpg" },
    { id: 2, name: "Product 2", price: "200", image: "/path-to-product2.jpg" },
    { id: 3, name: "Product 3", price: "300", image: "/path-to-product3.jpg" },
    { id: 4, name: "Product 4", price: "400", image: "/path-to-product4.jpg" },
    { id: 5, name: "Product 5", price: "500", image: "/path-to-product5.jpg" },
    { id: 6, name: "Product 6", price: "600", image: "/path-to-product6.jpg" },
    { id: 7, name: "Product 7", price: "700", image: "/path-to-product7.jpg" },
    { id: 8, name: "Product 8", price: "800", image: "/path-to-product8.jpg" },
  ];

  const catalog = new ProductCatalog(productData);
  const featuredProducts = catalog.getFeaturedProducts();

  return (
    <Box sx={{ 
      py: 8, 
      textAlign: "center",
      minHeight: "80vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }}>
      <Typography variant="h3" sx={{ mb: 6, fontWeight: "bold" }}>
        Our Products
      </Typography>
      
      <Grid container spacing={4} sx={{ 
        width: "90%", 
        margin: "0 auto",
        justifyContent: "center"
      }}>
        {featuredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      
      <Button variant="outlined" sx={{ 
        mt: 6, 
        px: 6, 
        py: 1.5,
        alignSelf: "center"
      }}>
        View All Products
      </Button>
    </Box>
  );
}

export default ShopSection;