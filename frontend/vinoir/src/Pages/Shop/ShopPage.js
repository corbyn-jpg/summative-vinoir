import React, { useEffect, useState } from 'react'; 
import { Box, Typography, TextField, Select, MenuItem, CircularProgress, Tabs, Tab, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import ProductService from '../../services/ProductService';
import './ShopPage.css';

function ShopPage() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filter, setFilter] = useState('');
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState(0);

  // Format price as "R1,200.00"
  const formatRand = (num) =>
    'R' + num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

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
      const matchFilter =
        p.name.toLowerCase().includes(filter.toLowerCase()) ||
        p.description.toLowerCase().includes(filter.toLowerCase());
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
      <Box className="product-grid">
        {(tab === 0 ? filtered : products.slice(0, 4)).map((product) => (
          <Box key={product._id} className="product-item">
            <Link to={`/fragrance/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Box 
                sx={{ 
                  backgroundColor: '#f8f5f2',
                  borderRadius: 2,
                  overflow: 'hidden',
                  height: 300,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2
                }}
              >
                <img
                  src={product.images?.[0]?.url || '/images/fallback.jpg'}
                  alt={product.name}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    width: 'auto',
                    height: 'auto'
                  }}
                />
              </Box>
              <Box sx={{ p: 1.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {product.name}
                </Typography>
                <Typography variant="body1" sx={{ color: '#000000', fontWeight: 'bold' }}>
                  {formatRand(product.price)}
                </Typography>
              </Box>
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default ShopPage;
