// src/Pages/shop/WishlistPage.js
import React, { Component } from 'react';
import { Typography, Button } from '@mui/material';
import ProductCard from '../../Components/ProductCard';
import './ShopPage.css'; 

class WishlistPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wishlistItems: [
        // Mock data - in a real app, this would come from your backend
        {
          id: 1,
          name: "Noir Essence",
          price: 120,
          image: "/images/fragrance1.jpg"
        },
        {
          id: 2,
          name: "Lumière d'Or",
          price: 150,
          image: "/images/fragrance2.jpg"
        }
      ]
    };
  }

  handleRemoveFromWishlist = (productId) => {
    this.setState(prevState => ({
      wishlistItems: prevState.wishlistItems.filter(item => item.id !== productId)
    }));
  };

  render() {
    const { wishlistItems } = this.state;

    return (
      <div className="shop-container">
        <Typography variant="h3" component="h1" gutterBottom>
          My Wishlist
        </Typography>

        {wishlistItems.length === 0 ? (
          <Typography variant="body1">
            Your wishlist is empty
          </Typography>
        ) : (
          <div className="products-grid">
            {wishlistItems.map(product => (
              <div key={product.id} style={{ position: 'relative' }}>
                <ProductCard product={product} />
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => this.handleRemoveFromWishlist(product.id)}
                  style={{ 
                    position: 'absolute', 
                    top: 10, 
                    right: 10,
                    zIndex: 1
                  }}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default WishlistPage;