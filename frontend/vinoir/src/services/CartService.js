class CartService {
  constructor() {
    this.baseUrl = '/api/cart';
    this.cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  }

  // Add item to cart
  async addToCart(product, quantity = 1) {
    const existingItem = this.cartItems.find(item => item.product.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({ product, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    
    try {
      // Sync with backend if user is authenticated
      const token = localStorage.getItem('token');
      if (token) {
        await fetch(`${this.baseUrl}/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ productId: product.id, quantity })
        });
      }
    } catch (err) {
      console.error('Failed to sync cart:', err);
    }

    return this.cartItems;
  }

  // Remove item from cart
  async removeFromCart(productId) {
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));

    try {
      const token = localStorage.getItem('token');
      if (token) {
        await fetch(`${this.baseUrl}/remove/${productId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
    } catch (err) {
      console.error('Failed to sync cart removal:', err);
    }

    return this.cartItems;
  }

  // Get current cart
  async getCart() {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await fetch(this.baseUrl, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        this.cartItems = await response.json();
        localStorage.setItem('cart', JSON.stringify(this.cartItems));
      }
    } catch (err) {
      console.error('Failed to fetch cart:', err);
    }

    return this.cartItems;
  }

  // Clear cart
  async clearCart() {
    this.cartItems = [];
    localStorage.removeItem('cart');

    try {
      const token = localStorage.getItem('token');
      if (token) {
        await fetch(`${this.baseUrl}/clear`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
    } catch (err) {
      console.error('Failed to clear cart:', err);
    }
  }
}

export default new CartService();