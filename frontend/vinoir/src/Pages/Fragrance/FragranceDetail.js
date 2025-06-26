import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const productData = await ProductService.getProductById(id);
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
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
      <Box sx={{ maxWidth: 1200, margin: "4rem auto", padding: "2rem", textAlign: "center" }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
        <Button 
          variant="contained" 
          onClick={() => navigate('/shop')}
          sx={{ backgroundColor: "#146e3a" }}
        >
          Back to Shop
        </Button>
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ maxWidth: 1200, margin: "4rem auto", padding: "2rem", textAlign: "center" }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Product not found
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/shop')}
          sx={{ backgroundColor: "#146e3a" }}
        >
          Back to Shop
        </Button>
      </Box>
    );
  }


  return (
    <Box sx={{ maxWidth: 1200, margin: "4rem auto", padding: "2rem" }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <img
            src={product.images?.[0]?.url || "/placeholder-product.jpg"}
            alt={product.name}
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
            {product.name}
          </Typography>

          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            {product.category} • {product.size}
          </Typography>

          <Typography variant="h5" sx={{ mb: 3, color: "#146e3a" }}>
            ${product.price.toFixed(2)}
          </Typography>

          <Typography variant="body1" sx={{ mb: 3 }}>
            {product.description}
          </Typography>

          <Divider sx={{ my: 3 }} />

          {product.fragranceNotes && (
            <>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Fragrance Notes:
              </Typography>

              <Stack direction="column" spacing={1} sx={{ mb: 3 }}>
                <div>
                  <Typography variant="subtitle2">Top Notes:</Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                    {product.fragranceNotes.topNotes?.map((note, index) => (
                      <Chip key={index} label={note} size="small" />
                    ))}
                  </Stack>
                </div>

                <div>
                  <Typography variant="subtitle2">Middle Notes:</Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                    {product.fragranceNotes.middleNotes?.map((note, index) => (
                      <Chip key={index} label={note} size="small" />
                    ))}
                  </Stack>
                </div>

                <div>
                  <Typography variant="subtitle2">Base Notes:</Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                    {product.fragranceNotes.baseNotes?.map((note, index) => (
                      <Chip key={index} label={note} size="small" />
                    ))}
                  </Stack>
                </div>
              </Stack>
            </>
          )}

          <Button
            variant="contained"
            size="large"
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
            Add to Cart
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FragranceDetail;
