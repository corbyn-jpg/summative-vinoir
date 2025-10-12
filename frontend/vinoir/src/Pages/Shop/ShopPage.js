// ...existing code...
import React, { useState, useEffect, useCallback, useMemo } from "react";
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
import { ArrowUpward, ArrowDownward, Whatshot, FilterList, Close as CloseIcon } from "@mui/icons-material";
import { getProducts } from "../../services/ProductService";
import ProductCard from "../../Components/ProductCard";
import "./ShopPage.css";

/**
 * Small debounce hook used for search input to reduce re-filtering frequency.
 */
function useDebounced(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

const COLORS = {
  green: "var(--green-accent, #146e3a)",
  silver: "var(--silver, #bab9b9)",
  darkText: "var(--dark-green, #16532f)",
  offWhite: "var(--off-white, #f8f5f2)",
};

function ShopPage() {
  const [search, setSearch] = useState("");
  const q = useDebounced(search, 300);

  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("none");
  const [activeFilters, setActiveFilters] = useState([]);
  const [tab, setTab] = useState(0);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getProducts();
      const list = Array.isArray(data?.products) ? data.products : Array.isArray(data) ? data : [];
      setProducts(
        list.map((p) => ({
          ...p,
          _id: p._id || p.id,
          popularity: typeof p.popularity === "number" ? p.popularity : Math.floor(Math.random() * 100),
        }))
      );
    } catch (e) {
      console.error(e);
      setError("Failed to load products. Please try again later.");
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleCategoryChange = (e) => {
    const newCat = e.target.value;
    setCategory(newCat);
    setActiveFilters((prev) => {
      const filtered = prev.filter((f) => f.type !== "category");
      return newCat === "all" ? filtered : [...filtered, { type: "category", value: newCat }];
    });
  };

  const handleSortChange = (sortType) => {
    setSortBy((prev) => (prev === sortType ? "none" : sortType));
    setActiveFilters((prev) => {
      const withoutSort = prev.filter((f) => f.type !== "sort");
      return sortType === "none" ? withoutSort : [...withoutSort, { type: "sort", value: sortType }];
    });
  };

  const removeFilter = (filterToRemove) => {
    if (filterToRemove.type === "category") setCategory("all");
    else if (filterToRemove.type === "sort") setSortBy("none");
    setActiveFilters((prev) => prev.filter((f) => !(f.type === filterToRemove.type && f.value === filterToRemove.value)));
  };

  const filteredAndSortedProducts = useMemo(() => {
    let list = [...products];
    const qLower = (q || "").trim().toLowerCase();
    if (qLower) {
      list = list.filter(
        (p) =>
          (p.name && p.name.toLowerCase().includes(qLower)) ||
          (p.description && p.description.toLowerCase().includes(qLower))
      );
    }
    if (category !== "all") {
      list = list.filter((p) => p.category === category);
    }
    if (sortBy === "price-asc") list.sort((a, b) => (a.price || 0) - (b.price || 0));
    else if (sortBy === "price-desc") list.sort((a, b) => (b.price || 0) - (a.price || 0));
    else if (sortBy === "popularity") list.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    return list;
  }, [products, q, category, sortBy]);

  const recommendedProducts = useMemo(() => products.filter((p) => p.featured).slice(0, 8), [products]);

  if (isLoading)
    return (
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="50vh" py={6}>
        <CircularProgress size={56} sx={{ color: COLORS.green }} />
        <Typography variant="h6" sx={{ mt: 2, color: COLORS.darkText }}>
          Loading our exquisite collection...
        </Typography>
      </Box>
    );

  if (error) return <Alert severity="error" sx={{ maxWidth: 700, mx: "auto", my: 4 }}>{error}</Alert>;

  const displayList = tab === 0 ? filteredAndSortedProducts : recommendedProducts;

  return (
    <Box className="shop-page" sx={{ p: { xs: 2, md: 5 }, maxWidth: 1600, mx: "auto", mt: 2, fontFamily: '"Cormorant Garamond", serif' }}>
      <Typography className="dior-shop-title" component="h1">
        {q ? `Search Results for "${q}"` : "Our Luxury Fragrances"}
      </Typography>

      {!q && <Typography variant="h6" className="dior-subtitle">Discover our exquisite collection of premium perfumes</Typography>}

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
              fontSize: "1.05rem",
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
              <FilterList sx={{ color: COLORS.green }} />
              {activeFilters.map((f, i) => {
                let label =
                  f.type === "category"
                    ? `Category: ${f.value}`
                    : f.value === "price-asc"
                    ? "Price: Low to High"
                    : f.value === "price-desc"
                    ? "Price: High to Low"
                    : "Popularity";
                return (
                  <Chip
                    key={`${f.type}-${f.value}-${i}`}
                    label={label}
                    onDelete={() => removeFilter(f)}
                    variant="outlined"
                    sx={{
                      bgcolor: "rgba(20,110,58,0.06)",
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
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": { borderRadius: 3 },
                    "& .MuiInputLabel-root": { fontFamily: '"Cormorant Garamond", serif' },
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select value={category} onChange={handleCategoryChange} label="Category" sx={{ borderRadius: 3 }}>
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
                      "&:hover": { bgcolor: "rgba(20, 110, 58, 0.07)", borderColor: COLORS.green },
                      textTransform: "none",
                      letterSpacing: "0.03em",
                    },
                  }}
                >
                  <Button startIcon={<ArrowUpward />} onClick={() => handleSortChange("price-asc")} aria-pressed={sortBy === "price-asc"}>
                    Price (Low)
                  </Button>
                  <Button startIcon={<ArrowDownward />} onClick={() => handleSortChange("price-desc")} aria-pressed={sortBy === "price-desc"}>
                    Price (High)
                  </Button>
                  <Button startIcon={<Whatshot />} onClick={() => handleSortChange("popularity")} aria-pressed={sortBy === "popularity"}>
                    Popularity
                  </Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          </Box>
        </>
      )}

      {displayList.length === 0 ? (
        <Box sx={{ py: 6, textAlign: "center", bgcolor: COLORS.offWhite, borderRadius: 3, color: COLORS.darkText, fontFamily: '"Playfair Display", serif' }} role="alert">
          <Typography variant="h6" sx={{ mb: 2 }}>
            {q ? "No fragrances found matching your search." : "No fragrances available."}
          </Typography>
          {q && (
            <Button variant="outlined" onClick={() => setSearch("")} sx={{ borderColor: COLORS.green, color: COLORS.green, fontFamily: '"Cormorant Garamond", serif', fontWeight: 600, borderRadius: 3, px: 4 }}>
              Clear Search
            </Button>
          )}
        </Box>
      ) : (
        <Box className="dior-product-grid" mt={2}>
          {displayList.map((product) => (
            <Box key={product._id} className="dior-product-item">
              <ProductCard product={product} />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default React.memo(ShopPage);
// ...existing code...