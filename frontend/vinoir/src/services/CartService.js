import CartItem from '../models/CartItem'; // Import the CartItem class

class CartService {
  constructor() {
    this.cartItems = [];
  }

  addItem(product, quantity = 1) {
    const existingItem = this.cartItems.find((item) => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const newItem = new CartItem(product, quantity);
      this.cartItems.push(newItem);
    }
  }

  removeItem(productId) {
    this.cartItems = this.cartItems.filter((item) => item.product.id !== productId);
  }

  updateItemQuantity(productId, quantity) {
    const item = this.cartItems.find((item) => item.product.id === productId);

    if (item) {
      item.quantity = quantity;
    }
  }

  getTotalPrice() {
    return this.cartItems.reduce((total, item) => total + item.getTotalPrice(), 0);
  }

  clearCart() {
    this.cartItems = [];
  }

  getCartItems() {
    return this.cartItems;
  }
}

export default CartService;