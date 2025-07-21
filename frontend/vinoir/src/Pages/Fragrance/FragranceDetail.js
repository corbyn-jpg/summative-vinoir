import React, { useState, useEffect, useCallback } from "react";
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
import { getProductById } from "../../services/ProductService"; // Ensure file name and path casing matches exactly

function FragranceDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart } = useCart();

  // Fetch product details by id when component mounts or id changes
  const fetchProduct = useCallback(async () => {
    if (!id) {
      setError("No product ID provided in the URL.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log("Fetching product with ID:", id);
      const fetchedProduct = await getProductById(id);
      console.log("Product fetched:", fetchedProduct);
      setProduct(fetchedProduct);
    } catch (err) {
      console.error("Error fetching product:", err);
      if (err.message && err.message.toLowerCase().includes("404")) {
        setError("Product not found. The product may have been removed.");
      } else if (err.message && err.message.toLowerCase().includes("network")) {
        setError("Network error. Please check your connection.");
      } else {
        setError("Failed to load product details. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  // Format price helper
  const formatPrice = (price) =>
    price ? `R${Number(price).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` : "";

  // Show loading spinner
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={6}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  // Show error message with retry button
  if (error) {
    return (
      <Alert severity="error" sx={{ m: 3, maxWidth: 600, mx: "auto", py: 5 }}>
        {error}
        <Button sx={{ ml: 2 }} onClick={fetchProduct}>
          Retry
        </Button>
      </Alert>
    );
  }

  // If no product (shouldn't happen if no error)
  if (!product) {
    return (
      <Typography variant="h5" sx={{ textAlign: "center", mt: 6, py: 10 }}>
        Product not found
      </Typography>
    );
  }

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
  const mainImage = images?.[0];
  const imageUrl = mainImage?.url || "/images/fallback.jpg";
  const imageAlt = mainImage?.altText || name || "Product image";
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
            onError={(e) => {
              e.target.src = "/images/fallback.jpg";
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h3" sx={{ mb: 2, fontWeight: "bold" }}>
            {name || "Unnamed Product"}
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 1, color: "text.secondary" }}>
            {category || "Uncategorized"} &bull; {size || "Size not specified"}
          </Typography>
          <Typography variant="h5" sx={{ mb: 3, color: "#146e3a", fontWeight: "bold" }}>
            {formatPrice(price)}
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, whiteSpace: "pre-line" }}>
            {description || "No description available."}
          </Typography>
          <Divider sx={{ my: 3 }} />

          {fragranceNotes ? (
            <>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Fragrance Notes:
              </Typography>
              <Stack direction="column" spacing={1} sx={{ mb: 3 }}>
                {["topNotes", "middleNotes", "baseNotes"].map((field) => (
                  <div key={field}>
                    <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                      {field === "topNotes"
                        ? "Top Notes"
                        : field === "middleNotes"
                        ? "Middle Notes"
                        : "Base Notes"}
                      :
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: "wrap" }}>
                      {Array.isArray(fragranceNotes[field]) && fragranceNotes[field].length > 0 ? (
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
          ) : null}

          <Button
            variant="contained"
            size="large"
            disabled={isOutOfStock}
            onClick={() =>
              addToCart({
                ...product,
                id: product._id || product.id,
              })
            }
            sx={{
              mt: 3,
              backgroundColor: "#146e3a",
              fontWeight: "bold",
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
