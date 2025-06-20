import React, { useState, useEffect } from 'react';
import './PromoSection.css';

const PromoSection = ({ products = [] }) => {
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (featuredProducts.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % featuredProducts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredProducts.length]);

  if (featuredProducts.length === 0) return null;

  return (
    <section className="promo-container">
      <h2>FEATURED FRAGRANCES</h2>
      <div className="promo-slider">
        {featuredProducts.map((product, index) => (
          <div 
            key={product._id}
            className={`slide ${index === activeIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${product.images?.[0]?.url})` }}
          >
            <div className="slide-content">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PromoSection;