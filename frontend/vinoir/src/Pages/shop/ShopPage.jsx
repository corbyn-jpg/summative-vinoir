import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import ProductCard from '../../Components/ProductCard';
import './shop.css'; // Import the existing CSS file

class ShopPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    const { productService } = this.props;
    this.setState({
      products: productService.getFeaturedProducts()
    });
  }

  handleAddToCart = (product) => {
    const { cartService } = this.props;
    cartService.addItem(product);
    alert(`${product.name} added to cart!`);
  };

  render() {
    return (
      <Container maxWidth="xl" className="shop-container">
        <Typography variant="h3" className="shop-title">
          Luxury Fragrances
        </Typography>
        <Grid container spacing={4}>
          {this.state.products.map(product => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <ProductCard 
                product={product} 
                onAddToCart={this.handleAddToCart}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }
}

export default ShopPage;