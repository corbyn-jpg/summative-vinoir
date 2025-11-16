import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Alert,
  Button,
  Grid,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  Stack,
  IconButton
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { getProducts, createProduct, updateProduct, deleteProduct, uploadImage } from '../../services/ProductService';
import { Add, Edit, Delete, CloudUpload } from '@mui/icons-material';

export default function ProductsAdminPage() {
  const { user, isAuthenticated } = useAuth();
  const isAdmin = isAuthenticated && user?.role === 'admin';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: '', description: '', price: '', category: '', size: '', stock: 0,
    fragranceNotes: { topNotes: [], middleNotes: [], baseNotes: [] }, images: []
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!isAdmin) return;
    (async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(Array.isArray(data) ? data : data.products || []);
      } catch (e) {
        setError(e.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    })();
  }, [isAdmin]);

  const resetForm = () => {
    setForm({
      name: '', description: '', price: '', category: '', size: '', stock: 0,
      fragranceNotes: { topNotes: [], middleNotes: [], baseNotes: [] }, images: []
    });
    setEditing(null);
  };

  const openCreate = () => { resetForm(); setOpen(true); };
  const openEdit = (p) => { setEditing(p); setForm({
    name: p.name || '',
    description: p.description || '',
    price: p.price ?? '',
    category: p.category || '',
    size: p.size || '',
    stock: p.stock ?? 0,
    fragranceNotes: {
      topNotes: p.fragranceNotes?.topNotes || [],
      middleNotes: p.fragranceNotes?.middleNotes || [],
      baseNotes: p.fragranceNotes?.baseNotes || []
    },
    images: p.images || []
  }); setOpen(true); };
  const closeDialog = () => { setOpen(false); };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [field]: field === 'price' || field === 'stock' ? Number(value) : value }));
  };

  const handleNotesChange = (key) => (e) => {
    const value = e.target.value;
    const arr = value.split(',').map((s) => s.trim()).filter(Boolean);
    setForm((prev) => ({ ...prev, fragranceNotes: { ...prev.fragranceNotes, [key]: arr } }));
  };

  const notesString = (arr) => (Array.isArray(arr) ? arr.join(', ') : '');

  const onUploadImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const result = await uploadImage(file);
      const image = { url: result.url, altText: form.name || '' };
      setForm((prev) => ({ ...prev, images: [...(prev.images || []), image] }));
      setSuccess('Image uploaded');
    } catch (err) {
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const saveProduct = async () => {
    try {
      setError('');
      const payload = { ...form };
      payload.price = Number(payload.price) || 0;
      payload.stock = Number(payload.stock) || 0;
      let saved;
      if (editing) {
        saved = await updateProduct(editing.id || editing._id, payload);
        setProducts((prev) => prev.map((p) => (p.id === saved.id || p._id === saved._id ? saved : p)));
        setSuccess('Product updated');
      } else {
        saved = await createProduct(payload);
        setProducts((prev) => [saved, ...prev]);
        setSuccess('Product created');
      }
      setOpen(false);
      resetForm();
    } catch (err) {
      setError(err.message || 'Save failed');
    }
  };

  const removeProduct = async (p) => {
    if (!window.confirm(`Delete ${p.name}?`)) return;
    try {
      await deleteProduct(p.id || p._id);
      setProducts((prev) => prev.filter((x) => (x.id || x._id) !== (p.id || p._id)));
      setSuccess('Product deleted');
    } catch (err) {
      setError(err.message || 'Delete failed');
    }
  };

  if (!isAdmin) {
    return (
      <Container maxWidth="md" sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontFamily: 'Playfair Display, serif', color: '#6a4c93', mb: 2 }}>
          403 — Admins Only
        </Typography>
        <Alert severity="warning" sx={{ borderRadius: 2, mb: 2 }}>
          You need admin privileges to access this page.
        </Alert>
        <Button component={Link} to="/" variant="outlined" sx={{ borderRadius: 2 }}>
          Go Home
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 10 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h3" sx={{ fontFamily: 'Playfair Display, serif', color: '#2d5a3d' }}>
          Products Admin
        </Typography>
        <Button startIcon={<Add />} variant="contained" onClick={openCreate} sx={{ borderRadius: 2 }}>
          New Product
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }} onClose={() => setSuccess('')}>
          {success}
        </Alert>
      )}

      <Grid container spacing={2}>
        {(loading ? Array.from({ length: 6 }) : products).map((p, idx) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={(p && (p.id || p._id)) || idx}>
            <Paper elevation={6} sx={{ borderRadius: 2, overflow: 'hidden' }}>
              <Box sx={{ height: 180, bgcolor: '#f6f6f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {p && p.images && p.images[0]?.url ? (
                  <img src={p.images[0].url} alt={p.images[0].altText || p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <Typography sx={{ color: '#aaa' }}>No Image</Typography>
                )}
              </Box>
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ color: '#2d5a3d' }}>{p?.name || '—'}</Typography>
                <Typography variant="body2" sx={{ color: '#6a4c93', fontWeight: 600 }}>R {p?.price?.toFixed ? p.price.toFixed(2) : Number(p?.price || 0).toFixed(2)}</Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap' }}>
                  {(p?.fragranceNotes?.topNotes || []).slice(0, 3).map((n, i) => (
                    <Chip key={i} size="small" label={n} />
                  ))}
                </Stack>
                <Stack direction="row" spacing={1} sx={{ mt: 2, justifyContent: 'flex-end' }}>
                  <Button size="small" variant="outlined" startIcon={<Edit />} onClick={() => openEdit(p)}>Edit</Button>
                  <Button size="small" color="error" variant="outlined" startIcon={<Delete />} onClick={() => removeProduct(p)}>Delete</Button>
                </Stack>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={closeDialog} maxWidth="md" fullWidth>
        <DialogTitle>{editing ? 'Edit Product' : 'Create Product'}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <TextField label="Name" value={form.name} onChange={handleChange('name')} fullWidth margin="dense" />
              <TextField label="Description" value={form.description} onChange={handleChange('description')} fullWidth margin="dense" multiline minRows={3} />
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 1 }}>
                <TextField type="number" label="Price" value={form.price} onChange={handleChange('price')} fullWidth />
                <TextField label="Category" value={form.category} onChange={handleChange('category')} fullWidth />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 1 }}>
                <TextField label="Size" value={form.size} onChange={handleChange('size')} fullWidth />
                <TextField type="number" label="Stock" value={form.stock} onChange={handleChange('stock')} fullWidth />
              </Stack>
              <TextField label="Top Notes (comma separated)" value={notesString(form.fragranceNotes.topNotes)} onChange={handleNotesChange('topNotes')} fullWidth margin="dense" />
              <TextField label="Middle Notes (comma separated)" value={notesString(form.fragranceNotes.middleNotes)} onChange={handleNotesChange('middleNotes')} fullWidth margin="dense" />
              <TextField label="Base Notes (comma separated)" value={notesString(form.fragranceNotes.baseNotes)} onChange={handleNotesChange('baseNotes')} fullWidth margin="dense" />
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button component="label" variant="outlined" startIcon={<CloudUpload />} disabled={uploading}>
                  {uploading ? 'Uploading…' : 'Upload Image'}
                  <input type="file" hidden accept="image/*" onChange={onUploadImage} />
                </Button>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, mt: 1 }}>
                  {(form.images || []).map((img, i) => (
                    <Box key={i} sx={{ position: 'relative', border: '1px solid #eee', borderRadius: 1, overflow: 'hidden' }}>
                      <img src={img.url} alt={img.altText || `image-${i}`} style={{ width: '100%', height: 100, objectFit: 'cover' }} />
                      <IconButton size="small" onClick={() => setForm((prev) => ({ ...prev, images: prev.images.filter((_, idx) => idx !== i) }))} sx={{ position: 'absolute', top: 2, right: 2, bgcolor: 'white' }}>✕</IconButton>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button variant="contained" onClick={saveProduct}>{editing ? 'Save Changes' : 'Create'}</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
