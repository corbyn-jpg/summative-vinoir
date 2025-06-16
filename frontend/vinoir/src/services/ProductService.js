// src/services/ProductService.js
class ProductService {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  getFeaturedProducts() {
    return this.productRepository.getProducts().filter(p => p.featured);
  }

  getProductById(id) {
    return this.productRepository.getProducts().find(p => p.id === id);
  }

  getProductsByCategory(category) {
    if (category === 'all') return this.productRepository.getProducts();
    return this.productRepository.getProducts().filter(p => p.category === category);
  }
}

export default ProductService;