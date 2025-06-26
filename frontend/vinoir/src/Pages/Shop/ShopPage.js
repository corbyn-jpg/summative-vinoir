import React, { useState, useEffect } from 'react';
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
  Chip,
  TextField,
  Tabs,
  Tab
} from '@mui/material';
import { Link } from 'react-router-dom';
import ProductService from '../../services/ProductService';
import './ShopPage.css';
import {
  ArrowUpward,
  ArrowDownward,
  Whatshot,
  FilterList
} from '@mui/icons-material';

function ShopPage() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('none');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilters, setActiveFilters] = useState([]);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const searchQuery = searchParams.get('q') || '';
    setFilter(searchQuery);

    const fetchProducts = async () => {
      try {
        const data = await ProductService.getAllProducts();
        // Add popularity field if not present
        const productsWithPopularity = data.map(product => ({
          ...product,
          popularity: product.popularity || Math.floor(Math.random() * 100)
        }));
        
        setProducts(productsWithPopularity);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchProducts();

    const handleUrlChange = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const newQuery = searchParams.get('q') || '';
      if (newQuery !== filter) {
        setFilter(newQuery);
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    setActiveFilters(newCategory !== 'all' ? 
      [...activeFilters.filter(f => f.type !== 'category'), { type: 'category', value: newCategory }] :
      activeFilters.filter(f => f.type !== 'category')
    );
  };

  const handleSortChange = (sortType) => {
    setSortBy(sortType);
    setActiveFilters(sortType !== 'none' ? 
      [...activeFilters.filter(f => f.type !== 'sort'), { type: 'sort', value: sortType }] :
      activeFilters.filter(f => f.type !== 'sort')
    );
  };

  const removeFilter = (filterToRemove) => {
    if (filterToRemove.type === 'category') {
      setCategory('all');
    } else if (filterToRemove.type === 'sort') {
      setSortBy('none');
    }
    
    setActiveFilters(prevFilters => prevFilters.filter(f => 
      !(f.type === filterToRemove.type && f.value === filterToRemove.value)
    ));
  };

  const getFilteredProducts = () => {
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
  };

  const filteredProducts = getFilteredProducts();
  const recommendedProducts = products.slice(0, 4); // Simple recommendation logic

  // Format price as "R1,200.00"
  const formatRand = (num) => 'R' + num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

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
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      {/* Header Section */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
          {filter ? `Search Results for "${filter}"` : 'Our Luxury Fragrances'}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {filter ? '' : 'Discover our exquisite collection of premium perfumes'}
        </Typography>
      </Box>

      {/* Tabs Section */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tab} onChange={(e, v) => setTab(v)} centered>
          <Tab label="All Products" />
          <Tab label="Recommended" />
        </Tabs>
      </Box>

      {/* Filters Section - Only show for All Products tab */}
      {tab === 0 && (
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
                  onDelete={() => removeFilter(filter)}
                  sx={{ mr: 1 }}
                />
              ))}
            </Box>
          )}

          {/* Filter Controls */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Search by name or description"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
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
            <Grid item xs={12} md={6}>
              <ButtonGroup variant="outlined" fullWidth>
                <Button
                  startIcon={<ArrowUpward />}
                  onClick={() => handleSortChange('price-asc')}
                  color={sortBy === 'price-asc' ? 'primary' : 'inherit'}
                >
                  Price (Low to High)
                </Button>
                <Button
                  startIcon={<ArrowDownward />}
                  onClick={() => handleSortChange('price-desc')}
                  color={sortBy === 'price-desc' ? 'primary' : 'inherit'}
                >
                  Price (High to Low)
                </Button>
                <Button
                  startIcon={<Whatshot />}
                  onClick={() => handleSortChange('popularity')}
                  color={sortBy === 'popularity' ? 'primary' : 'inherit'}
                >
                  Popularity
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Box>
      )}

      {/* Products Grid */}
      {(tab === 0 ? filteredProducts : recommendedProducts).length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: 'center', my: 4 }}>
          {filter ? 'No fragrances found matching your search' : 'No fragrances available'}
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {(tab === 0 ? filteredProducts : recommendedProducts).map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
              <Link
                to={`/fragrance/${product._id}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
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
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default ShopPage;