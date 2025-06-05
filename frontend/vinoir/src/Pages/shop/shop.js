import React from 'react';
import shopCard from '../../Components/shopCard';
import './shop.css';

function ShopPage() {
  return (
    <div>
      <div className="shop-container">
      <h1>Shop</h1>
        <shopCard source="../../assets/leaf.jpeg"></shopCard>
      </div>
    </div>
  );
}

export default ShopPage;