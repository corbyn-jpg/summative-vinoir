import React, { useState, useEffect, useCallback } from "react"; // Added useCallback
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Grid,
  Divider,
  CircularProgress,
  Alert,
  Chip,
  Stack,
} from "@mui/material";
import { useCart } from "../../context/CartContext";
import ProductService from "../../services/ProductService"; // Ensure this path is correct

function FragranceDetail() {
  const { id } = useParams(); // This 'id' must match the parameter name in your Route path
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  // Function to fetch product details (memoized with useCallback)
  const fetchProduct = useCallback(async () => {
    if (!id) { // Defensive check: if ID is null/undefined, don't attempt fetch
      setError("No product ID provided in the URL.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null); // Clear previous errors
    try {
      const fetchedProduct = await ProductService.getProductById(id);
      setProduct(fetchedProduct);
    } catch (err) {
      console.error("Error fetching product:", err);
      // Provide more specific error messages
      if (err.message && err.message.includes('404')) {
        setError("Product not found. The product may have been removed.");
      } else {
        setError("Failed to load product details. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [id]); // Re-create fetchProduct function only if 'id' changes

  // useEffect to call fetchProduct when the component mounts or 'id' changes
  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]); // Depend on fetchProduct (which depends on 'id')

  // Helper for price formatting
  const formatPrice = (p) => {
    return `R${Number(p).toFixed(2)}`; // Assuming ZAR currency
  };

  // --- Loading State ---
  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6, py: 10 }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  // --- Error State ---
  if (error) {
    return (
      <Alert severity="error" sx={{ m: 3, maxWidth: 600, mx: 'auto', py: 5 }}>
        {error}
        <Button sx={{ ml: 2 }} onClick={fetchProduct}>Retry</Button> {/* Added Retry button */}
      </Alert>
    );
  }

  // --- Product Not Found State (after loading and no error, but product is null) ---
  if (!product) {
    return (
      <Typography variant="h5" sx={{ textAlign: "center", mt: 6, py: 10 }}>
        Product not found
      </Typography>
    );
  }

  // Destructure product properties for easier use
  const {
    name,
    category,
    size,
    price,
    description,
    fragranceNotes,
    images,
    stock,
  } = product;

  // Graceful fallback for alt text and image URL
  const mainImage = images?.[0];
  // Assuming a public folder structure like /images/fallback.jpg
  const imageUrl = mainImage?.url || "/images/fallback.jpg";
  const imageAlt = mainImage?.altText || name || "Fragrance image";

  const isOutOfStock = stock === 0;

  return (
    <Box sx={{ maxWidth: 1200, margin: "4rem auto", padding: "2rem" }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <img
            src={imageUrl}
            alt={imageAlt}
            style={{
              width: "100%",
              borderRadius: "8px",
              maxHeight: "500px",
              objectFit: "contain",
            }}
            onError={(e) => { e.target.src = "/images/fallback.jpg"; }} // Fallback on image load error
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            {name}
          </Typography>

          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            {category} • {size}
          </Typography>

          <Typography variant="h5" sx={{ mb: 3, color: "#146e3a" }}>
            {formatPrice(price)} {/* Using formatPrice helper */}
          </Typography>

          <Typography variant="body1" sx={{ mb: 3 }}>
            {description}
          </Typography>

          <Divider sx={{ my: 3 }} />

          {fragranceNotes && (
            <>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Fragrance Notes:
              </Typography>
              <Stack direction="column" spacing={1} sx={{ mb: 3 }}>
                {/* Only show sections if notes present, else display None */}
                {["topNotes", "middleNotes", "baseNotes"].map((field) => (
                  <div key={field}>
                    <Typography variant="subtitle2">
                      {field === "topNotes"
                        ? "Top Notes"
                        : field === "middleNotes"
                        ? "Middle Notes"
                        : "Base Notes"}
                      :
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap' }}>
                      {(Array.isArray(fragranceNotes[field]) && fragranceNotes[field].length > 0) ? (
                        fragranceNotes[field].map((note, idx) => (
                          <Chip key={idx} label={note} size="small" />
                        ))
                      ) : (
                        <Typography variant="caption" color="text.secondary">
                          None
                        </Typography>
                      )}
                    </Stack>
                  </div>
                ))}
              </Stack>
            </>
          )}

          <Button
            variant="contained"
            size="large"
            disabled={isOutOfStock}
            onClick={() =>
              addToCart({
                ...product,
                id: product._id || product.id, // Ensure consistent ID for cart
              })
            }
            sx={{
              mt: 3,
              backgroundColor: "#146e3a",
              "&:hover": { backgroundColor: "#0d5a2c" },
            }}
          >
            {isOutOfStock ? "Out of Stock" : "Add to Cart"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FragranceDetail;
