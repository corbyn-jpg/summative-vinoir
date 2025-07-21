import React, { useState, useEffect, useCallback } from "react";
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
  Tab,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ArrowUpward, ArrowDownward, Whatshot, FilterList } from "@mui/icons-material";
import { getProducts } from "../../services/ProductService"; // Ensure path and casing match your actual file

function ShopPage() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("none");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilters, setActiveFilters] = useState([]);
  const [tab, setTab] = useState(0);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = {};
      if (category !== "all") params.category = category;
      if (filter) params.name = filter; // adjust according to your backend expected filter param

      // You can add sorting params here if your backend supports them
      // e.g., params.sortBy = sortBy;

      const data = await getProducts(params);
      const productsList =
        data && Array.isArray(data.products) ? data.products : Array.isArray(data) ? data : [];

      const productsWithPopularity = productsList.map((product) => ({
        ...product,
        popularity:
          typeof product.popularity === "number"
            ? product.popularity
            : Math.floor(Math.random() * 100),
      }));

      setProducts(productsWithPopularity);
    } catch {
      setError("Failed to load products. Please try again later.");
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, [category, filter]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const searchQuery = searchParams.get("q") || "";
    setFilter(searchQuery);

    fetchProducts();

    const handleUrlChange = () => {
      const params = new URLSearchParams(window.location.search);
      const newQuery = params.get("q") || "";
      if (newQuery !== filter) setFilter(newQuery);
    };

    window.addEventListener("popstate", handleUrlChange);
    return () => window.removeEventListener("popstate", handleUrlChange);
  }, [fetchProducts, filter]);

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setCategory(newCategory);
    setActiveFilters((prev) => {
      const withoutOldCategory = prev.filter((f) => f.type !== "category");
      return newCategory === "all"
        ? withoutOldCategory
        : [...withoutOldCategory, { type: "category", value: newCategory }];
    });
  };

  const handleSortChange = (sortType) => {
    setSortBy(sortType);
    setActiveFilters((prev) => {
      const withoutOldSort = prev.filter((f) => f.type !== "sort");
      return sortType === "none"
        ? withoutOldSort
        : [...withoutOldSort, { type: "sort", value: sortType }];
    });
  };

  const removeFilter = (filterToRemove) => {
    if (filterToRemove.type === "category") setCategory("all");
    else if (filterToRemove.type === "sort") setSortBy("none");
    setActiveFilters((prev) =>
      prev.filter((f) => !(f.type === filterToRemove.type && f.value === filterToRemove.value))
    );
  };

  const formatRand = (num) => "R" + num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const getFilteredProducts = () => {
    let filtered = products.filter((product) => {
      const matchesSearch =
        !filter ||
        product.name.toLowerCase().includes(filter.toLowerCase()) ||
        product.description.toLowerCase().includes(filter.toLowerCase());
      const matchesCategory = category === "all" || product.category === category;
      return matchesSearch && matchesCategory;
    });

    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "popularity":
        filtered.sort((a, b) => b.popularity - a.popularity);
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();
  const recommendedProducts = products.slice(0, 4);

  if (isLoading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ ml: 2 }}>
          Loading fragrances...
        </Typography>
      </Box>
    );

  if (error) return <Alert severity="error" sx={{ m: 3 }}>{error}</Alert>;

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography variant="h3" fontWeight="bold" mb={2}>
          {filter ? `Search Results for "${filter}"` : "Our Luxury Fragrances"}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {filter ? "" : "Discover our exquisite collection of premium perfumes"}
        </Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs value={tab} onChange={(e, v) => setTab(v)} centered>
          <Tab label="All Products" />
          <Tab label="Recommended" />
        </Tabs>
      </Box>

      {tab === 0 && (
        <Box sx={{ mb: 4, display: "flex", flexDirection: "column", gap: 2 }}>
          {activeFilters.length > 0 && (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, alignItems: "center" }}>
              <FilterList color="action" />
              {activeFilters.map((f, i) => (
                <Chip
                  key={i}
                  label={
                    f.type === "category"
                      ? `Category: ${f.value}`
                      : f.type === "sort"
                      ? f.value === "price-asc"
                        ? "Price: Low to High"
                        : f.value === "price-desc"
                        ? "Price: High to Low"
                        : "Popularity"
                      : ""
                  }
                  onDelete={() => removeFilter(f)}
                  sx={{ mr: 1 }}
                />
              ))}
            </Box>
          )}

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
              <Select fullWidth value={category} onChange={handleCategoryChange} size="small">
                <MenuItem value="all">All Categories</MenuItem>
                <MenuItem value="Eau de Parfum">Eau de Parfum</MenuItem>
                <MenuItem value="Eau de Toilette">Eau de Toilette</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} md={6}>
              <ButtonGroup variant="outlined" fullWidth>
                <Button
                  startIcon={<ArrowUpward />}
                  onClick={() => handleSortChange("price-asc")}
                  color={sortBy === "price-asc" ? "primary" : "inherit"}
                >
                  Price (Low to High)
                </Button>
                <Button
                  startIcon={<ArrowDownward />}
                  onClick={() => handleSortChange("price-desc")}
                  color={sortBy === "price-desc" ? "primary" : "inherit"}
                >
                  Price (High to Low)
                </Button>
                <Button
                  startIcon={<Whatshot />}
                  onClick={() => handleSortChange("popularity")}
                  color={sortBy === "popularity" ? "primary" : "inherit"}
                >
                  Popularity
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Box>
      )}

      {(tab === 0 ? filteredProducts : recommendedProducts).length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: "center", my: 4 }}>
          {filter ? "No fragrances found matching your search" : "No fragrances available"}
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {(tab === 0 ? filteredProducts : recommendedProducts).map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
              <Link to={`/fragrance/${product._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <Box
                  sx={{
                    backgroundColor: "#f8f5f2",
                    borderRadius: 2,
                    overflow: "hidden",
                    height: 300,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                  }}
                >
                  <img
                    src={product.images?.[0]?.url || "/images/fallback.jpg"}
                    alt={product.name}
                    style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                  />
                </Box>
                <Box sx={{ p: 1.5 }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {product.name}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: "bold", color: "#000" }}>
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
