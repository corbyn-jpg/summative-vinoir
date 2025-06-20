// src/models/CartItem.js
class CartItem {
  constructor(product, quantity = 1) {
    this.product = product;
    this.quantity = quantity;
  }

  increaseQuantity(amount = 1) {
    this.quantity += amount;
  }

  decreaseQuantity(amount = 1) {
    this.quantity = Math.max(0, this.quantity - amount);
  }

  getTotalPrice() {
    return this.product.price * this.quantity;
  }
}

export default CartItem;