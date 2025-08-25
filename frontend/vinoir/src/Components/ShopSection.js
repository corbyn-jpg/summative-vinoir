// ...existing code...
import React, { useMemo } from "react";
import ProductCard from "./ProductCard";
import "./ShopSection.css";

function ShopSection({ products = [] }) {
  const displayProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];
    return products.slice(0, 4);
  }, [products]);

  return (
    <section className="shop-section" aria-labelledby="shop-heading">
      <div className="shop-container">
        <h2 id="shop-heading" className="shop-title">
          OUR SIGNATURE SCENTS
        </h2>

        <div className="shop-grid" role="list">
          {displayProducts.map((product) => (
            <div role="listitem" key={product._id || product.id} className="shop-item">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default React.memo(ShopSection);
// ...existing code...