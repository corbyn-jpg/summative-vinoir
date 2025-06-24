import React, { useState, useEffect } from 'react';
import { 
  TextField, 
  Select, 
  MenuItem, 
  Typography,
  CircularProgress,
  Alert,
  Grid,
  Box
} from '@mui/material';
import ProductCard from '../../Components/ProductCard';
import ProductService from '../../services/ProductService';
import { Link } from 'react-router-dom';
import './ShopPage.css';

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('');
  const [category, setCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        console.log('[ShopPage] Fetching products...');
        const fetchedProducts = await ProductService.getAllProducts();
        console.log('[ShopPage] Products received:', fetchedProducts);
        setProducts(fetchedProducts);
      } catch (err) {
        console.error('[ShopPage] Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const getFilteredProducts = () => {
    return products.filter((product) => {
      const matchesSearch = 
        product.name.toLowerCase().includes(filter.toLowerCase()) ||
        product.description.toLowerCase().includes(filter.toLowerCase());

      const matchesCategory = category === 'all' || product.category === category;

      return matchesSearch && matchesCategory;
    });
  };

  const filteredProducts = getFilteredProducts();

  if (isLoading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        height: '50vh'
      }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ ml: 2 }}>Loading fragrances...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 3 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
          Our Luxury Fragrances
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Discover our exquisite collection of premium perfumes
        </Typography>
      </Box>

      {/* Filter Controls */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Search fragrances"
            variant="outlined"
            value={filter}
            onChange={handleFilterChange}
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Select
            fullWidth
            value={category}
            onChange={handleCategoryChange}
            size="small"
          >
            <MenuItem value="all">All Categories</MenuItem>
            <MenuItem value="Eau de Parfum">Eau de Parfum</MenuItem>
            <MenuItem value="Eau de Toilette">Eau de Toilette</MenuItem>
          </Select>
        </Grid>
      </Grid>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: 'center', my: 4 }}>
          No fragrances found matching your criteria
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
              <Link
                to={`/fragrance/${product._id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <ProductCard 
                  product={product}
                  sx={{ height: '100%' }}
                />
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ShopPage;
