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
import { 
  ArrowUpward, 
  ArrowDownward, 
  Whatshot, 
  FilterList 
} from '@mui/icons-material';
import ProductCard from '../../Components/ProductCard';
import ProductService from '../../services/ProductService';
import { Link } from 'react-router-dom';
import './ShopPage.css';

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  
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

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    
    // Update active filters
    if (newCategory === 'all') {
      setActiveFilters(activeFilters.filter(f => f.type !== 'category'));
    } else {
      const existingFilterIndex = activeFilters.findIndex(f => f.type === 'category');
      if (existingFilterIndex >= 0) {
        const updatedFilters = [...activeFilters];
        updatedFilters[existingFilterIndex].value = newCategory;
        setActiveFilters(updatedFilters);
      } else {
        setActiveFilters([...activeFilters, { type: 'category', value: newCategory }]);
      }
    }
  };

  const handleSortChange = (sortValue) => {
    setSortBy(sortValue);
    
    // Update active filters
    if (!sortValue) {
      setActiveFilters(activeFilters.filter(f => f.type !== 'sort'));
    } else {
      const existingFilterIndex = activeFilters.findIndex(f => f.type === 'sort');
      if (existingFilterIndex >= 0) {
        const updatedFilters = [...activeFilters];
        updatedFilters[existingFilterIndex].value = sortValue;
        setActiveFilters(updatedFilters);
      } else {
        setActiveFilters([...activeFilters, { type: 'sort', value: sortValue }]);
      }
    }
  };

  const removeFilter = (filterToRemove) => {
    if (filterToRemove.type === 'category') {
      setCategory('all');
    } else if (filterToRemove.type === 'sort') {
      setSortBy('');
    }
    setActiveFilters(activeFilters.filter(f => 
      !(f.type === filterToRemove.type && f.value === filterToRemove.value)
    ));
  };

  const getFilteredProducts = () => {
    let filtered = products.filter((product) => {
      const matchesSearch = searchQuery === '' || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = category === 'all' || product.category === category;
      return matchesSearch && matchesCategory;
    });

    // Apply sorting
    if (sortBy === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'popularity') {
      // Assuming there's a popularity field in the product
      filtered.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    }

    return filtered;
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
                onDelete={() => removeFilter(filter)}
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
              onChange={handleCategoryChange}
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