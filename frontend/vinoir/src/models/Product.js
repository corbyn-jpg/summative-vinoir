// src/models/Product.js
class Product {
  constructor(id, name, description, price, image, category, size, notes, rating) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.image = image;
    this.category = category;
    this.size = size;
    this.notes = notes;
    this.rating = rating;
  }

  getFormattedPrice() {
    return `$${this.price.toFixed(2)}`;
  }

  getMainNote() {
    return this.notes[0] || 'Unknown';
  }
}

export default Product;