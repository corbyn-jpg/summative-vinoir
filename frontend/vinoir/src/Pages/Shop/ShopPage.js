import React, { Component } from 'react';
import { 
  Select, 
  MenuItem, 
  Typography,
  CircularProgress,
  Alert,
  Grid,
  Box,
  ButtonGroup,
  Button,
  Chip
} from '@mui/material';
import ProductCard from '../../Components/ProductCard';
import ProductService from '../../services/ProductService';
import { Link } from 'react-router-dom';
import './ShopPage.css';
import {
  ArrowUpward,  // For ascending
  ArrowDownward, // For descending
  Whatshot,     // For popularity
  FilterList    // For filter icon
} from '@mui/icons-material';

class ShopPage extends Component {
  constructor(props) {
    super(props);
    const searchParams = new URLSearchParams(window.location.search);
    const searchQuery = searchParams.get('q') || '';
    
    this.state = {
      products: [],
      filter: searchQuery,
      category: 'all',
      sortBy: 'none', // 'none', 'price-asc', 'price-desc', 'popularity'
      isLoading: true,
      error: null,
      activeFilters: []
    };
  }

  componentDidMount() {
    this.fetchProducts();
    window.addEventListener('popstate', this.handleUrlChange);
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.handleUrlChange);
  }

  handleUrlChange = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const newQuery = searchParams.get('q') || '';
    if (newQuery !== this.state.filter) {
      this.setState({ filter: newQuery });
    }
  };

  fetchProducts = async () => {
    try {
      const products = await ProductService.getAllProducts();
      // Add popularity field if not present (for demo purposes)
      const productsWithPopularity = products.map(product => ({
        ...product,
        popularity: product.popularity || Math.floor(Math.random() * 100) // Random popularity if not set
      }));
      
      this.setState({ 
        products: productsWithPopularity,
        isLoading: false,
        error: null
      });
    } catch (error) {
      this.setState({ 
        isLoading: false,
        error: 'Failed to load products. Please try again later.'
      });
    }
  };

  handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    this.setState({ 
      category: newCategory,
      activeFilters: newCategory !== 'all' ? 
        [...this.state.activeFilters.filter(f => f.type !== 'category'), { type: 'category', value: newCategory }] :
        this.state.activeFilters.filter(f => f.type !== 'category')
    });
  };

  handleSortChange = (sortType) => {
    this.setState({ 
      sortBy: sortType,
      activeFilters: sortType !== 'none' ? 
        [...this.state.activeFilters.filter(f => f.type !== 'sort'), { type: 'sort', value: sortType }] :
        this.state.activeFilters.filter(f => f.type !== 'sort')
    });
  };

  removeFilter = (filterToRemove) => {
    if (filterToRemove.type === 'category') {
      this.setState({ category: 'all' });
    } else if (filterToRemove.type === 'sort') {
      this.setState({ sortBy: 'none' });
    }
    
    this.setState(prevState => ({
      activeFilters: prevState.activeFilters.filter(f => 
        !(f.type === filterToRemove.type && f.value === filterToRemove.value)
      )
    }));
  };

  getFilteredProducts() {
    const { products, filter, category, sortBy } = this.state;
    
    let filtered = products.filter((product) => {
      const matchesSearch = filter === '' || 
                          product.name.toLowerCase().includes(filter.toLowerCase()) ||
                          product.description.toLowerCase().includes(filter.toLowerCase());
      const matchesCategory = category === 'all' || product.category === category;
      return matchesSearch && matchesCategory;
    });

    // Apply sorting
    switch(sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'popularity':
        filtered.sort((a, b) => b.popularity - a.popularity);
        break;
      default:
        // No sorting
        break;
    }

    return filtered;
  }

  render() {
    const { filter, category, sortBy, isLoading, error, activeFilters } = this.state;
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
            {filter ? `Search Results for "${filter}"` : 'Our Luxury Fragrances'}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {filter ? '' : 'Discover our exquisite collection of premium perfumes'}
          </Typography>
        </Box>

        {/* Filters Section */}
        <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Active Filters Chips */}
          {activeFilters.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
              <FilterList color="action" />
              {activeFilters.map((filter, index) => (
                <Chip
                  key={index}
                  label={
                    filter.type === 'category' ? 
                      `Category: ${filter.value}` :
                      filter.type === 'sort' ?
                        filter.value === 'price-asc' ? 'Price: Low to High' :
                        filter.value === 'price-desc' ? 'Price: High to Low' :
                        'Popularity'
                      : ''
                  }
                  onDelete={() => this.removeFilter(filter)}
                  sx={{ mr: 1 }}
                />
              ))}
            </Box>
          )}

          {/* Filter Controls */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
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
            <Grid item xs={12} sm={6} md={9}>
              <ButtonGroup variant="outlined" fullWidth>
                <Button
                  startIcon={<ArrowUpward />}
                  onClick={() => this.handleSortChange('price-asc')}
                  color={sortBy === 'price-asc' ? 'primary' : 'inherit'}
                >
                  Price (Low to High)
                </Button>
                <Button
                  startIcon={<ArrowDownward />}
                  onClick={() => this.handleSortChange('price-desc')}
                  color={sortBy === 'price-desc' ? 'primary' : 'inherit'}
                >
                  Price (High to Low)
                </Button>
                <Button
                  startIcon={<Whatshot />}
                  onClick={() => this.handleSortChange('popularity')}
                  color={sortBy === 'popularity' ? 'primary' : 'inherit'}
                >
                  Popularity
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Box>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <Typography variant="h6" sx={{ textAlign: 'center', my: 4 }}>
            {filter ? 'No fragrances found matching your search' : 'No fragrances available'}
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