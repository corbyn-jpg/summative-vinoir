// src/Pages/Shop/ShopPage.js
import React, { Component } from 'react';
import { TextField, Select, MenuItem, Typography } from '@mui/material';
import ProductCard from '../../Components/ProductCard';
import ProductService from '../../services/ProductService';
import './ShopPage.css';
import { Link } from 'react-router-dom';

class ShopPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      filter: '',
      category: 'all',
    };
  }

  componentDidMount() {
    ProductService.getAllProducts()
      .then((data) => {
        console.log('Fetched products:', data); // ✅ Debug check
        this.setState({ products: data });
      })
      .catch((error) => console.error('Error fetching products:', error));
  }

  handleFilterChange = (e) => {
    this.setState({ filter: e.target.value });
  };

  handleCategoryChange = (e) => {
    this.setState({ category: e.target.value });
  };

  getFilteredProducts() {
    const { products, filter, category } = this.state;
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(filter.toLowerCase()) ||
        product.description.toLowerCase().includes(filter.toLowerCase());
      const matchesCategory = category === 'all' || product.category === category;
      return matchesSearch && matchesCategory;
    });
  }

  render() {
    const { filter, category } = this.state;
    const filteredProducts = this.getFilteredProducts();

    return (
      <div className="shop-container">
        <div className="shop-header">
          <Typography variant="h3" component="h1">
            Our Luxury Fragrances
          </Typography>
        </div>

        <div className="shop-filters">
          <TextField
            label="Search fragrances"
            variant="outlined"
            size="small"
            value={filter}
            onChange={this.handleFilterChange}
            sx={{ minWidth: 250 }}
          />
          <Select
            value={category}
            onChange={this.handleCategoryChange}
            size="small"
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="all">All Categories</MenuItem>
            <MenuItem value="Eau de Parfum">Eau de Parfum</MenuItem>
            <MenuItem value="Eau de Toilette">Eau de Toilette</MenuItem>
          </Select>
        </div>

        <div className="products-grid">
          {filteredProducts.map((product) => (
            <Link
              key={product._id}
              to={`/fragrance/${product._id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default ShopPage;
