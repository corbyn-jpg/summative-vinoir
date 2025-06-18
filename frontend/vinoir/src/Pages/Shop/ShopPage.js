import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')  // replace URL if different
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch products');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Our Products</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {products.length === 0 ? (
          <p>No products available</p>
        ) : (
          products.map(product => (
            <div key={product._id} style={{ border: '1px solid #ccc', padding: '1rem', width: '200px' }}>
              <h3>{product.name}</h3>
              <p>Price: ${product.price}</p>
              {/* Example: show image if you have one */}
              {product.image && <img src={product.image} alt={product.name} style={{ width: '100%' }} />}
              <p>{product.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ShopPage;
