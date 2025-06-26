import React, { useState, useEffect } from 'react';
import { 
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
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './ShopPage.css';

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    parseQueryParams();
    fetchProducts();
  }, [location.search]);

  const parseQueryParams = () => {
    const searchParams = new URLSearchParams(location.search);
    setSearchQuery(searchParams.get('search') || '');
  };

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      console.log('[ShopPage] Fetching products...');
      const products = await ProductService.getAllProducts();
      console.log('[ShopPage] Products received:', products);
      setProducts(products);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      console.error('[ShopPage] Error fetching products:', error);
      setIsLoading(false);
      setError('Failed to load products. Please try again later.');
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const getFilteredProducts = () => {
    return products.filter((product) => {
      const matchesSearch = searchQuery === '' || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
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
          {searchQuery ? `Results for "${searchQuery}"` : 'Our Luxury Fragrances'}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Discover our exquisite collection of premium perfumes
        </Typography>
      </Box>

      {/* Category Filter */}
      <Box sx={{ mb: 4 }}>
        <Select
          value={category}
          onChange={handleCategoryChange}
          size="small"
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="all">All Categories</MenuItem>
          <MenuItem value="Eau de Parfum">Eau de Parfum</MenuItem>
          <MenuItem value="Eau de Toilette">Eau de Toilette</MenuItem>
        </Select>
      </Box>

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