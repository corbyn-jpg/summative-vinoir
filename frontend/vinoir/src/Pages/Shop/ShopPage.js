import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Select, MenuItem, Grid, CircularProgress, Tabs, Tab } from '@mui/material';
import ProductCard from '../../Components/ProductCard';
import { Link } from 'react-router-dom';
import ProductService from '../../services/ProductService';

function ShopPage() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filter, setFilter] = useState('');
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    ProductService.getAllProducts()
      .then((data) => {
        setProducts(data);
        setFiltered(data);
      })
      .catch(() => {
        setFiltered([]);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const filteredProducts = products.filter((p) => {
      const matchCategory = category === 'all' || p.category === category;
      const matchFilter = p.name.toLowerCase().includes(filter.toLowerCase()) || p.description.toLowerCase().includes(filter.toLowerCase());
      return matchCategory && matchFilter;
    });
    setFiltered(filteredProducts);
  }, [filter, category, products]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ ml: 2 }}>Loading fragrances...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 6 } }}>
      {/* Header */}
      <Typography variant="h3" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 3 }}>
        Shop Luxury Fragrances
      </Typography>
      <Typography variant="subtitle1" sx={{ textAlign: 'center', color: 'gray', mb: 5 }}>
        Explore our signature scents
      </Typography>

      {/* Filters */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Search by name or description"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            fullWidth
          >
            <MenuItem value="all">All Categories</MenuItem>
            <MenuItem value="Eau de Parfum">Eau de Parfum</MenuItem>
            <MenuItem value="Eau de Toilette">Eau de Toilette</MenuItem>
          </Select>
        </Grid>
      </Grid>

      {/* Tabs Section */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tab} onChange={(e, v) => setTab(v)} centered>
          <Tab label="All Products" />
          <Tab label="Recommended" />
        </Tabs>
      </Box>

      {/* Product Grid */}
      <Grid container spacing={4}>
        {(tab === 0 ? filtered : products.slice(0, 4)).map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
            <Link to={`/fragrance/${product._id}`} style={{ textDecoration: 'none' }}>
              <ProductCard product={product} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ShopPage;
