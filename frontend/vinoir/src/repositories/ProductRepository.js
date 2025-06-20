// src/repositories/ProductRepository.js
import Product from '../models/Product';

class ProductRepository {
  constructor() {
    this.products = [
      new Product(
        1,
        "Noir Élégance",
        "A bold, mysterious blend of black truffle, oud wood, and vanilla bean",
        285,
        "/images/noir-elegance.jpg",
        "Eau de Parfum",
        "100ml",
        ["Black Truffle", "Oud Wood", "Vanilla Bean", "Amber"],
        4.8
      ),
      // More products...
    ];
  }

  getProducts() {
    return this.products;
  }
}

export default ProductRepository;