# Vinoir: Luxury Perfume E-Commerce Platform

A sophisticated full-stack e-commerce application built with the MERN stack for a fictional luxury perfume brand. This group project demonstrates modern web development practices with a focus on user experience, component-driven frontend architecture, and a RESTful backend API.

**Project Type**: Group Project - MERN Stack E-commerce  
**GitHub Repository**: https://github.com/corbyn-jpg/summative-vinoir  
**Team Members**: Tristan Leech, Corbyn Robinson, Mario Ojo

---

## Table of Contents

- [About The Project](#about-the-project)
- [Built With](#built-with)
- [Getting Started](#getting-started)
- [Project Features](#project-features)
- [Development Process](#development-process)
- [Final Outcome](#final-outcome)
- [Conclusion](#conclusion)
- [License](#license)
- [Authors](#authors)
- [Acknowledgements](#acknowledgements)

---

## About The Project

Vinoir represents a collaborative effort to build a complete MERN stack e-commerce solution for a luxury perfume brand. The project addresses the challenge of creating an online shopping experience that balances a premium visual identity with solid engineering practices.

This application was developed as a summative group project to demonstrate full-stack development capabilities, including database design, API development, frontend architecture, and team collaboration.

**In 150 words or less**: Vinoir is a luxury perfume e-commerce platform built with the MERN stack that delivers a premium shopping experience. The application features a sophisticated product catalog with filtering, a persistent shopping cart, user authentication, and responsive frontend components designed for a high-end aesthetic.

---

## Built With

### Frontend Technologies
- **React** - Component-based UI framework with hooks
- **React Router** - Client-side routing and navigation
- **Material-UI (MUI)** - React component library for consistent UI
- **CSS3** - Custom styling and responsive design
- **Axios** - HTTP client for API communication

### Backend Technologies
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework for RESTful APIs
- **MongoDB** - NoSQL database for product and user data
- **Mongoose** - MongoDB object modeling for Node.js

### Additional Libraries
- **Swiper** - Touch-enabled carousel and slider components
- **React Lazy Load** - Performance optimization for images
- **EmailJS** - Email service integration for communications

---

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher) or yarn package manager
- MongoDB (local installation or cloud instance like MongoDB Atlas)
- Modern web browser with JavaScript enabled

### Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/corbyn-jpg/summative-vinoir.git
   cd summative-vinoir
   ```

2. **Backend Setup**:
   ```bash
   cd mem-backend
   npm install
   ```
   
   Configure environment variables:  
   Create `mem-backend/.env` file with:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```
   
   Start the backend server:
   ```bash
   npm start
   ```
   Expected output: Server running on port 5000 and MongoDB connected successfully

3. **Frontend Setup**:
   ```bash
   cd ../frontend/vinoir
   npm install
   ```
   
   Start the frontend development server:
   ```bash
   npm start
   ```

4. **Access the application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Project Structure
```
summative-vinoir/
├── mem-backend/                 # Backend API
│   ├── models/                 # MongoDB schemas
│   ├── routes/                 # API route handlers
│   ├── middleware/             # Authentication & validation
│   └── config/                 # Database configuration
└── frontend/vinoir/            # React frontend
    ├── src/
    │   ├── components/         # Reusable React components
    │   ├── pages/              # Main application views
    │   ├── services/           # API integration
    │   ├── styles/             # CSS and styling
    │   └── utils/              # Helper functions
```

---

## Project Features

### E-commerce Functionality
- **Product Catalog**: Comprehensive listing of perfume products with filtering options
- **Shopping Cart**: Persistent cart functionality with item management
- **Product Details**: Detailed product pages with descriptions and imagery
- **Category Navigation**: Organized browsing by fragrance types and collections

### User Authentication
- **User Registration & Login**: Traditional credential-based authentication
- **Innovative Security**: Unique emoji-based authentication system (noted in project documentation)
- **User Profiles**: Account management and order history
- **Session Management**: Secure user sessions across browsing

### User Experience
- **Responsive Design**: Optimized experience across desktop, tablet, and mobile devices
- **Visual Design**: Luxury aesthetic with custom color palette and typography
- **Intuitive Navigation**: Clear information architecture and user flows
- **Performance Optimization**: Lazy loading and efficient asset delivery

### Shopping Features
- **Product Search & Filtering**: Find products by name, category, or attributes
- **Shopping Cart Preview**: Quick access to cart contents without page navigation
- **Wishlist Functionality**: Save products for future consideration
- **Responsive Product Grid**: Adaptable layout for different screen sizes

---

## Development Process

### Team Collaboration & Version Control

**Contributions overview (as recorded in project files)**:
- Tristan Leech — Backend development, database architecture, API integration
- Corbyn Robinson — Project foundation, frontend architecture, visual design system, homepage and navigation, reusable component library
- Mario Ojo — Frontend development, component implementation, user interface features

**Team Workflow**:
- Clearly defined roles and responsibilities using project management tools
- Regular code reviews and collaborative problem-solving sessions
- Feature branching strategy with structured merge requests
- Comprehensive documentation for seamless knowledge transfer

### Technical Architecture

**Frontend Structure**:
```javascript
// Example component structure for product display
const ProductCard = ({ product = {} }) => {
  const { addToCart } = useCart();
  const { wishlist, addToWishList, removeFromWishList } = useWishList();
  
  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await addToCart({ ...product, quantity: 1 });
  };

  return (
    <Box component={Link} to={`/fragrance/${product.id}`}>
      {/* Product image, pricing, and interaction controls */}
    </Box>
  );
};
```

**Backend API Design**:
- RESTful API architecture with consistent endpoint patterns
- Middleware-based authentication and request validation
- MongoDB aggregation pipelines for complex product queries
- Error handling and appropriate HTTP status codes

### Design System Implementation

**Color Palette**:
- Primary: Deep luxury tones (#1261A4, #5C1A6B)
- Secondary: Complementary accents (#664878)
- Neutral: Clean backgrounds (#E8E8E8)

**Typography**:
- Headings: Playfair Display (elegance, sophistication)
- Body: Inter (clarity, readability, modern aesthetic)

**Component Consistency**:
- Standardized spacing and layout grids
- Reusable button and form control styles
- Consistent interaction patterns and animations

---

## Final Outcome

### Application Features
- **Fully Functional E-commerce Platform**: Complete shopping experience from browsing to checkout
- **Responsive Design**: Consistent experience across all device types
- **Database Integration**: MongoDB backend with product and user management
- **Team Delivery**: Successful collaborative development with clear role division

### Technical Achievements
- **Modular Component Architecture**: Reusable React components with clear interfaces
- **State Management**: Efficient handling of application state and user data
- **API Integration**: Seamless communication between frontend and backend
- **Performance Optimization**: Code splitting and asset optimization strategies

---

## Conclusion

### Project Highlights
- **Successful Team Collaboration**: Demonstrated effective group development practices with clear communication and role definition
- **Foundation Establishment**: Early work on repository structure and design system enabled efficient team progress and consistent output
- **Full-Stack Implementation**: Delivered a complete MERN stack application with database integration and responsive frontend
- **User-Centered Design**: Created an intuitive shopping experience that balances aesthetic appeal with functional requirements

### Technical Challenges & Solutions
- **Team Coordination**: Established clear coding standards and component interfaces to minimize integration conflicts
- **State Management**: Implemented React Context for shared state like cart and user authentication across components
- **Responsive Design**: Developed mobile-first CSS strategies that maintained luxury aesthetic across breakpoints
- **API Consistency**: Created standardized error handling and loading states for better user experience

### Personal Contribution & Learning
While the README records that some early contributions were foundational (project architecture, design system), the repository files indicate active frontend and backend development across the team.

- **Architectural Planning**: The initial project structure and component architecture provided a solid base for team development
- **Design System**: Established visual consistency that guided all subsequent frontend work
- **Team Enablement**: Early contributions allowed teammates to work efficiently in parallel with minimal conflicts

### Lessons Learned
- **Foundation Matters**: Well-planned project structure and design systems significantly accelerate team development
- **Communication is Critical**: Regular team check-ins and clear documentation prevent misalignment
- **Flexibility in Collaboration**: Adapting to team dynamics and individual circumstances is essential for project success
- **Code Quality Over Quantity**: Clean, well-documented code enables better collaboration than extensive but messy implementations

### Future Improvements
- **Enhanced User Authentication**: Two-factor authentication and social login options
- **Payment Integration**: Stripe or PayPal integration for complete checkout flow
- **Admin Dashboard**: Content management system for product and inventory management
- **Advanced Filtering**: More sophisticated product search and recommendation algorithms
- **Progressive Web App**: Offline functionality and mobile app-like experience

---

## License

This project is licensed under the MIT License. See LICENSE for details.

Copyright © 2025 Vinoir Development Team. All rights reserved.

---

## Authors

### Development Team

**Tristan Leech**
- GitHub: https://github.com/TristanLeech
- Role: Backend development, database architecture, API integration

**Corbyn Robinson**
- GitHub: https://github.com/corbyn-jpg
- Email: 241040@virtualwindow.co.za
- LinkedIn: https://www.linkedin.com/in/chloe-robinson-25b123351
- Role: Project foundation, frontend architecture, visual design system, homepage & navigation, reusable component library

**Mario Ojo**
- GitHub: https://github.com/MarioOjo
- Role: Frontend development, component implementation, user interface features

### Individual Contribution Statement

This project was developed collaboratively with each team member contributing according to their strengths and availability. Contributions listed above are consolidated from the repository documentation and reflect the primary areas of responsibility for each team member.

---

## Acknowledgements

This project was developed as part of the DV200 curriculum and benefited from numerous resources and support systems:

### Educational Framework
- **Open Window Institute** - DV200 course structure and learning objectives
- **Tsungai Katsuro** - Course instructor providing guidance and project oversight
- **MERN Stack Documentation** - Official documentation for all core technologies

### Technologies & Libraries
- **Material-UI (MUI)** - Comprehensive React component library that accelerated UI development
- **MongoDB** - Flexible NoSQL database for product and user data
- **Express.js** - Minimalist web framework for robust API development
- **React** - Component-based library for interactive user interfaces

### Development Tools
- **Git & GitHub** - Version control and collaborative development platform
- **VS Code** - Integrated development environment with React extensions
- **Chrome DevTools** - Debugging and performance optimization
- **Postman** - API testing and development

### Support & Collaboration
- **Development Team** - Collaborative problem-solving and knowledge sharing
- **Peer Reviewers** - Code feedback and quality assurance
- **Open Source Community** - Libraries and tools that enabled rapid development

### Special Thanks

To the entire development team for their dedication and collaboration in delivering a comprehensive e-commerce solution, and to the instructional team for providing the framework and support that made this project possible.

---
