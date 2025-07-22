import React, { useState, useEffect, useCallback } from "react";
import {
  Typography,
  CircularProgress,
  Alert,
  Box,
  Tabs,
  Tab,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ButtonGroup,
  Button,
  Chip,
  Grid,
} from "@mui/material";
import {
  ArrowUpward,
  ArrowDownward,
  Whatshot,
  FilterList,
  Close as CloseIcon,
} from "@mui/icons-material";
import { getProducts } from "../../services/ProductService";
import ProductCard from "../../Components/ProductCard";
import "./ShopPage.css";

const COLORS = {
  green: "#146e3a",
  silver: "#bab9b9",
  darkText: "#2c3e50",
  offWhite: "#f8f5f2",
};

function ShopPage() {
  // Immediate input for search field
  const [filterInput, setFilterInput] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("none");
  const [activeFilters, setActiveFilters] = useState([]);
  const [tab, setTab] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  // Fetch products on category change ONLY (no search param)
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = {};
      if (category !== "all") params.category = category;

      const data = await getProducts(params);

      const productsList =
        data && Array.isArray(data.products) ? data.products : Array.isArray(data) ? data : [];

      const productsWithPopularity = productsList.map((p) => ({
        ...p,
        _id: p._id || p.id,
        popularity:
          typeof p.popularity === "number" ? p.popularity : Math.floor(Math.random() * 100),
      }));

      setProducts(productsWithPopularity);
    } catch {
      setError("Failed to load products. Please try again later.");
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleCategoryChange = (e) => {
    const newCat = e.target.value;
    setCategory(newCat);
    setActiveFilters((prev) => {
      const withoutCat = prev.filter((f) => f.type !== "category");
      return newCat === "all" ? withoutCat : [...withoutCat, { type: "category", value: newCat }];
    });
  };

  const handleSortChange = (sortType) => {
    setSortBy(sortType);
    setActiveFilters((prev) => {
      const withoutSort = prev.filter((f) => f.type !== "sort");
      return sortType === "none" ? withoutSort : [...withoutSort, { type: "sort", value: sortType }];
    });
  };

  const removeFilter = (filterToRemove) => {
    if (filterToRemove.type === "category") setCategory("all");
    else if (filterToRemove.type === "sort") setSortBy("none");
    setActiveFilters((prev) =>
      prev.filter((f) => !(f.type === filterToRemove.type && f.value === filterToRemove.value))
    );
  };

  // Filter client-side by immediate input, then category and sorting
  const getFilteredAndSortedProducts = () => {
    let current = [...products];
    if (tab === 0) {
      if (filterInput) {
        const normalizedFilter = filterInput.toLowerCase();
        current = current.filter(
          (p) =>
            (p.name && p.name.toLowerCase().includes(normalizedFilter)) ||
            (p.description && p.description.toLowerCase().includes(normalizedFilter))
        );
      }
      if (category !== "all") {
        current = current.filter((p) => p.category === category);
      }
      switch (sortBy) {
        case "price-asc":
          current.sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          current.sort((a, b) => b.price - a.price);
          break;
        case "popularity":
          current.sort((a, b) => b.popularity - a.popularity);
          break;
        default:
          break;
      }
    }
    return current;
  };

  const filteredAndSortedProducts = getFilteredAndSortedProducts();
  const recommendedProducts = products.filter((p) => p.featured).slice(0, 8);

  if (isLoading)
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
        py={5}
      >
        <CircularProgress size={60} sx={{ color: COLORS.green }} />
        <Typography variant="h6" sx={{ mt: 2, color: COLORS.darkText }}>
          Loading our exquisite collection...
        </Typography>
      </Box>
    );

  if (error)
    return (
      <Alert severity="error" sx={{ maxWidth: 600, mx: "auto", my: 4 }}>
        {error}
      </Alert>
    );

  return (
    <Box sx={{ p: { xs: 2, md: 5 }, maxWidth: 1600, mx: "auto", mt: 2, fontFamily: '"Cormorant Garamond", serif' }}>
      <Typography className="dior-shop-title">
        {filterInput ? `Search Results for "${filterInput}"` : "Our Luxury Fragrances"}
      </Typography>
      {!filterInput && (
        <Typography variant="h6" sx={{ color: COLORS.silver, fontWeight: 400, textAlign: "center", mb: 6 }}>
          Discover our exquisite collection of premium perfumes
        </Typography>
      )}

      <Box sx={{ borderBottom: 1, borderColor: COLORS.silver, mb: 4 }}>
        <Tabs
          value={tab}
          onChange={(e, v) => setTab(v)}
          centered
          textColor="primary"
          indicatorColor="primary"
          sx={{
            "& .MuiTab-root": {
              fontFamily: '"Playfair Display", serif',
              fontWeight: 600,
              fontSize: "1.1rem",
              textTransform: "uppercase",
              color: COLORS.silver,
              "&.Mui-selected": { color: COLORS.green },
            },
          }}
        >
          <Tab label="All Products" />
          <Tab label="Recommended" />
        </Tabs>
      </Box>

      {tab === 0 && (
        <>
          {activeFilters.length > 0 && (
            <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1, mb: 3 }}>
              <FilterList color="action" sx={{ color: COLORS.green }} />
              {activeFilters.map((f, i) => {
                let label = "";
                if (f.type === "category") label = `Category: ${f.value}`;
                else if (f.type === "sort") {
                  label =
                    f.value === "price-asc"
                      ? "Price: Low to High"
                      : f.value === "price-desc"
                      ? "Price: High to Low"
                      : "Popularity";
                }
                return (
                  <Chip
                    key={i}
                    label={label}
                    onDelete={() => removeFilter(f)}
                    color="primary"
                    variant="outlined"
                    sx={{
                      bgcolor: "rgba(20,110,58,0.08)",
                      borderColor: COLORS.green,
                      color: COLORS.green,
                      "& .MuiChip-deleteIcon": { color: COLORS.green },
                      fontFamily: '"Cormorant Garamond", serif',
                      fontWeight: 600,
                      letterSpacing: "0.03em",
                    }}
                    deleteIcon={<CloseIcon />}
                  />
                );
              })}
            </Box>
          )}

          <Box mb={5}>
            <Grid container spacing={2} alignItems="flex-end" mb={3}>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Search Products"
                  variant="outlined"
                  fullWidth
                  value={filterInput}
                  onChange={(e) => setFilterInput(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": { borderRadius: 3 },
                    "& .MuiInputLabel-root": { fontFamily: '"Cormorant Garamond", serif' },
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel sx={{ fontFamily: '"Cormorant Garamond", serif' }}>Category</InputLabel>
                  <Select
                    value={category}
                    onChange={handleCategoryChange}
                    label="Category"
                    sx={{ borderRadius: 3 }}
                  >
                    <MenuItem value="all">All Categories</MenuItem>
                    <MenuItem value="Eau de Parfum">Eau de Parfum</MenuItem>
                    <MenuItem value="Eau de Toilette">Eau de Toilette</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={5}>
                <ButtonGroup
                  variant="outlined"
                  fullWidth
                  sx={{
                    height: "56px",
                    "& .MuiButton-root": {
                      fontFamily: '"Cormorant Garamond", serif',
                      fontWeight: 600,
                      borderColor: COLORS.green,
                      color: COLORS.green,
                      "&:hover": {
                        bgcolor: "rgba(20, 110, 58, 0.07)",
                        borderColor: COLORS.green,
                      },
                      "&.Mui-selected, &.Mui-selected:hover": {
                        bgcolor: COLORS.green,
                        color: "#fff",
                        borderColor: COLORS.green,
                      },
                      textTransform: "none",
                      letterSpacing: "0.05em",
                    },
                  }}
                >
                  <Button
                    startIcon={<ArrowUpward />}
                    onClick={() => handleSortChange("price-asc")}
                    className={sortBy === "price-asc" ? "Mui-selected" : ""}
                    aria-pressed={sortBy === "price-asc"}
                  >
                    Price (Low)
                  </Button>
                  <Button
                    startIcon={<ArrowDownward />}
                    onClick={() => handleSortChange("price-desc")}
                    className={sortBy === "price-desc" ? "Mui-selected" : ""}
                    aria-pressed={sortBy === "price-desc"}
                  >
                    Price (High)
                  </Button>
                  <Button
                    startIcon={<Whatshot />}
                    onClick={() => handleSortChange("popularity")}
                    className={sortBy === "popularity" ? "Mui-selected" : ""}
                    aria-pressed={sortBy === "popularity"}
                  >
                    Popularity
                  </Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          </Box>
        </>
      )}

      {(tab === 0 ? filteredAndSortedProducts : recommendedProducts).length === 0 ? (
        <Box
          sx={{
            py: 6,
            textAlign: "center",
            bgcolor: COLORS.offWhite,
            borderRadius: 3,
            color: COLORS.darkText,
            fontFamily: '"Playfair Display", serif',
          }}
          role="alert"
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            {filterInput ? "No fragrances found matching your search." : "No fragrances available."}
          </Typography>
          {filterInput && (
            <Button
              variant="outlined"
              onClick={() => setFilterInput("")}
              sx={{
                borderColor: COLORS.green,
                color: COLORS.green,
                fontFamily: '"Cormorant Garamond", serif',
                fontWeight: 600,
                borderRadius: 3,
                px: 4,
              }}
            >
              Clear Search
            </Button>
          )}
        </Box>
      ) : (
        <Box className="dior-product-grid" mt={2}>
          {(tab === 0 ? filteredAndSortedProducts : recommendedProducts).map((product) => (
            <Box key={product._id} className="dior-product-item">
              <ProductCard product={product} />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default ShopPage;
