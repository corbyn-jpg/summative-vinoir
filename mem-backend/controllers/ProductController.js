class ProductController {
  constructor(productModel) {
    this.Product = productModel;
  }

  async getAllProducts(req, res) {
    try {
      const products = await this.Product.getAllProducts();
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getProduct(req, res) {
    try {
      const product = await this.Product.getProductById(req.params.id);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      res.json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async createProduct(req, res) {
    try {
      const product = await this.Product.createProduct(req.body);
      res.status(201).json(product);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = ProductController;