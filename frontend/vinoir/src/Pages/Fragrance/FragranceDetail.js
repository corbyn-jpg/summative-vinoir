import React, { useState, useEffect } from "react";
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
import ProductService from "../../services/ProductService";

function FragranceDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  // Optional: for retry button
  const fetchProduct = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const product = await ProductService.getProductById(id);
      setProduct(product);
    } catch (error) {
      setError(error.message || "Failed to load product details");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line
  }, [id]);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 3 }}>
        {error}
        {/* Uncomment below for a retry button */}
        {/* <Button sx={{ ml: 2 }} onClick={fetchProduct}>Retry</Button> */}
      </Alert>
    );
  }

  if (!product) {
    return (
      <Typography variant="h5" sx={{ textAlign: "center", mt: 4 }}>
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

  // Graceful fallback for alt text
  const mainImage = images?.[0];
  const imageUrl = mainImage?.url || "/placeholder-product.jpg";
  const imageAlt = mainImage?.altText || name || "Fragrance image";

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
            ${price?.toFixed(2)}
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
                    <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                      {(fragranceNotes[field] && fragranceNotes[field].length > 0) ? (
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
            disabled={stock === 0}
            onClick={() =>
              addToCart({
                ...product,
                id: product._id || product.id, // Ensure consistent ID
              })
            }
            sx={{
              mt: 3,
              backgroundColor: "#146e3a",
              "&:hover": { backgroundColor: "#0d5a2c" },
            }}
          >
            {stock === 0 ? "Out of Stock" : "Add to Cart"}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FragranceDetail;
