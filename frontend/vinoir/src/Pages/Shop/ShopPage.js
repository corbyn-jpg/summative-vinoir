import React, { Component } from 'react';
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

class ShopPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      filter: '',
      category: 'all',
      isLoading: true,
      error: null
    };
  }

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts = async () => {
    try {
      console.log('[ShopPage] Fetching products...');
      const products = await ProductService.getAllProducts();
      console.log('[ShopPage] Products received:', products);
      this.setState({ 
        products,
        isLoading: false,
        error: null
      });
    } catch (error) {
      console.error('[ShopPage] Error fetching products:', error);
      this.setState({ 
        isLoading: false,
        error: 'Failed to load products. Please try again later.'
      });
    }
  };

  handleFilterChange = (e) => {
    this.setState({ filter: e.target.value });
  };

  handleCategoryChange = (e) => {
    this.setState({ category: e.target.value });
  };

  getFilteredProducts() {
    const { products, filter, category } = this.state;
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(filter.toLowerCase()) ||
                           product.description.toLowerCase().includes(filter.toLowerCase());
      const matchesCategory = category === 'all' || product.category === category;
      return matchesSearch && matchesCategory;
    });
  }

  render() {
    const { filter, category, isLoading, error } = this.state;
    const filteredProducts = this.getFilteredProducts();

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
              onChange={this.handleFilterChange}
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Select
              fullWidth
              value={category}
              onChange={this.handleCategoryChange}
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
  }
}

export default ShopPage;