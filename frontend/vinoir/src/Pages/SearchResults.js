import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  TextField,
  InputAdornment,
  Button,
  Chip,
  Paper,
} from '@mui/material';
import { Search, Clear, ArrowBack } from '@mui/icons-material';
import { getProducts } from '../services/ProductService';
import ProductCard from '../Components/ProductCard';

function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';

  const [searchInput, setSearchInput] = useState(query);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        const productList = Array.isArray(data?.products) ? data.products : Array.isArray(data) ? data : [];
        setProducts(productList);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again.');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search query
  useEffect(() => {
    if (!query.trim() || products.length === 0) {
      setFilteredProducts([]);
      return;
    }

    const searchTerm = query.toLowerCase().trim();
    const filtered = products.filter(product => {
      const matchesName = product.name?.toLowerCase().includes(searchTerm);
      const matchesDescription = product.description?.toLowerCase().includes(searchTerm);
      const matchesCategory = product.category?.toLowerCase().includes(searchTerm);
      
      // Search in fragrance notes
      const matchesTopNotes = product.fragranceNotes?.topNotes?.some(note => 
        note.toLowerCase().includes(searchTerm)
      );
      const matchesMiddleNotes = product.fragranceNotes?.middleNotes?.some(note => 
        note.toLowerCase().includes(searchTerm)
      );
      const matchesBaseNotes = product.fragranceNotes?.baseNotes?.some(note => 
        note.toLowerCase().includes(searchTerm)
      );

      return matchesName || matchesDescription || matchesCategory || 
             matchesTopNotes || matchesMiddleNotes || matchesBaseNotes;
    });

    setFilteredProducts(filtered);
  }, [query, products]);

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = searchInput.trim();
    if (trimmed) {
      setSearchParams({ q: trimmed });
    }
  };

  const clearSearch = () => {
    setSearchInput('');
    setSearchParams({});
    setFilteredProducts([]);
  };

  const goBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress size={60} sx={{ color: '#2d5a3d' }} />
        <Typography variant="h6" sx={{ mt: 2, color: '#2d5a3d' }}>
          Loading products...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
        <Button onClick={() => window.location.reload()} variant="contained" sx={{ backgroundColor: '#2d5a3d' }}>
          Retry
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 12, sm: 14 }, px: 2 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={goBack}
            sx={{ 
              color: '#2d5a3d',
              '&:hover': { backgroundColor: 'rgba(45, 90, 61, 0.1)' }
            }}
          >
            Back
          </Button>
        </Box>

        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ 
            fontFamily: '"Playfair Display", serif',
            fontWeight: 600,
            color: '#2d5a3d',
            mb: 2,
            textAlign: 'center'
          }}
        >
          Search Results
        </Typography>

        {query && (
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ color: '#666', mb: 1 }}>
              Showing results for:
            </Typography>
            <Chip 
              label={`"${query}"`} 
              variant="outlined" 
              size="medium"
              sx={{ 
                borderColor: '#2d5a3d',
                color: '#2d5a3d',
                fontSize: '1rem',
                fontWeight: 500
              }}
            />
          </Box>
        )}
      </Box>

      {/* Enhanced Search Bar */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 4,
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid rgba(45, 90, 61, 0.2)'
        }}
      >
        <form onSubmit={handleSearch}>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField
              fullWidth
              placeholder="Search fragrances by name, notes, or brand..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: '#2d5a3d' }} />
                  </InputAdornment>
                ),
                endAdornment: searchInput && (
                  <InputAdornment position="end">
                    <Button
                      onClick={clearSearch}
                      size="small"
                      sx={{ minWidth: 'auto', p: 0.5, color: '#666' }}
                    >
                      <Clear />
                    </Button>
                  </InputAdornment>
                )
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  '& fieldset': {
                    borderColor: 'rgba(45, 90, 61, 0.3)'
                  },
                  '&:hover fieldset': {
                    borderColor: '#2d5a3d'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#2d5a3d'
                  }
                }
              }}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={!searchInput.trim()}
              sx={{
                px: 4,
                py: 1.5,
                backgroundColor: '#2d5a3d',
                borderRadius: '12px',
                '&:hover': {
                  backgroundColor: '#1e3e29'
                },
                '&:disabled': {
                  backgroundColor: '#cccccc'
                }
              }}
            >
              Search
            </Button>
          </Box>
        </form>
      </Paper>

      {/* Results */}
      {!query.trim() ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h5" sx={{ color: '#666', mb: 2 }}>
            Enter a search term to find fragrances
          </Typography>
          <Typography variant="body1" sx={{ color: '#888' }}>
            Search by fragrance name, brand, category, or notes
          </Typography>
        </Box>
      ) : filteredProducts.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h5" sx={{ color: '#666', mb: 2 }}>
            No results found for "{query}"
          </Typography>
          <Typography variant="body1" sx={{ color: '#888', mb: 3 }}>
            Try adjusting your search terms or browse our full collection
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/shop')}
            sx={{
              backgroundColor: '#2d5a3d',
              px: 4,
              py: 1.5,
              '&:hover': {
                backgroundColor: '#1e3e29'
              }
            }}
          >
            Browse All Products
          </Button>
        </Box>
      ) : (
        <>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ color: '#2d5a3d' }}>
              Found {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''}
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product._id || product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
}

export default SearchResults;