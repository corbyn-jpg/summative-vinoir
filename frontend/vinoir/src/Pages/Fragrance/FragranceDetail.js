import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress, Tabs, Tab, Grid } from '@mui/material';
import { useCart } from '../../context/CartContext';

function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!res.ok) throw new Error('Product not found');
        const prod = await res.json();
        setProduct(prod);

        const recRes = await fetch('http://localhost:5000/api/products');
        const all = await recRes.json();
        setRecommended(all.filter(p => p._id !== id).slice(0, 4));
      } catch (e) {
        setError(e.message);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const formatRand = (num) =>
    'R' + num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  if (loading) return <Box sx={{ textAlign: 'center', mt: 6 }}><CircularProgress /></Box>;
  if (error || !product) return (
    <Box sx={{ textAlign: 'center', mt: 6 }}>
      <Typography variant="h4" color="error">{error || 'Product not found'}</Typography>
    </Box>
  );

  return (
    <Box sx={{ width: '100%', px: { xs:2, md:6 }, pt: 4 }}>
      <Grid container spacing={6} sx={{ mx:0 }}>
        <Grid item xs={12} md={6}>
          <Box sx={{ bgcolor:'#f8f5f2', borderRadius:2, overflow:'hidden', height:{xs:350,md:500}, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <img src={product.images?.[0]?.url || '/images/fallback.jpg'} alt={product.name}
              style={{ maxWidth:'100%', maxHeight:'100%', objectFit:'contain' }} />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h4" sx={{ fontFamily:'Playfair Display, serif', fontWeight:'bold', mb:1, color:'#222' }}>
              {product.name}
            </Typography>
            <Typography variant="subtitle1" sx={{ color:'#222', mb:1 }}>
              {product.category} • {product.size || 'Standard'}
            </Typography>
            <Typography variant="h5" sx={{ mb:3, color:'#222' }}>
              {formatRand(product.price)}
            </Typography>
            <Button
              variant="contained" onClick={() => addToCart(product)}
              size="large"
              sx={{ bgcolor:'#146e3a', py:1.5, width:'100%', mb:3, '&:hover':{bgcolor:'#0d5a2c'}}}
            >
              Add to Bag
            </Button>
            <Tabs value={tabIndex} onChange={(e,v)=>setTabIndex(v)} centered sx={{mb:3}}>
              <Tab label="Description"/>
              <Tab label="Ingredients"/>
            </Tabs>
            <Box>
              {tabIndex===0 ? (
                <Typography sx={{ color:'#333', mb:3 }}>{product.description}</Typography>
              ) : (
                <Typography sx={{ color:'#333', mb:3 }}>
                  {[
                    ...(product.fragranceNotes?.topNotes||[]),
                    ...(product.fragranceNotes?.middleNotes||[]),
                    ...(product.fragranceNotes?.baseNotes||[])
                  ].join(', ')}
                </Typography>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ mt:8 }}>
        <Typography variant="h5" sx={{ mb:4, fontWeight:'bold', color:'#222', textAlign:'center' }}>
          You may also like
        </Typography>

        <Box sx={{
          display:'grid',
          gridTemplateColumns:{xs:'1fr', sm:'repeat(2,1fr)', md:'repeat(4,1fr)'},
          gap:4,
          px:{xs:2, md:0}
        }}>
          {recommended.map(rec => (
            <Link
              key={rec._id}
              to={`/fragrance/${rec._id}`}
              style={{ textDecoration:'none', color:'inherit' }}
            >
              <Box sx={{ textAlign:'center', transition:'transform 0.3s', '&:hover':{transform:'scale(1.03)'} }}>
                <Box sx={{
                  bgcolor:'#f8f5f2',
                  borderRadius:2,
                  overflow:'hidden',
                  height:300,
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'center',
                  mb:2
                }}>
                  <img src={rec.images?.[0]?.url || '/images/fallback.jpg'} alt={rec.name}
                    style={{ maxWidth:'100%', maxHeight:'100%', objectFit:'contain' }} />
                </Box>
                <Typography variant="body1" sx={{ fontWeight:'bold' }}>{rec.name}</Typography>
                <Typography variant="body2" sx={{ color:'text.secondary' }}>{rec.category}</Typography>
                <Typography variant="body2">{formatRand(rec.price)}</Typography>
              </Box>
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default ProductPage;
