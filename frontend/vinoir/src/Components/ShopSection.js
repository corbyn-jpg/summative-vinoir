import React, { useEffect, useState } from 'react';
import ProductService from '../services/ProductService';
import ProductCard from './ProductCard';

function ShopSection() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    ProductService.getAllProducts()
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="shop-section">
      <h1>Shop</h1>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ShopSection;