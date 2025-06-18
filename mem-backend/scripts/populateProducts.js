const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config(); // Load .env file

const products = [
  {
    name: 'Noir Essence',
    price: 1200,
    description: 'A luxurious blend of dark woods and exotic spices.',
    category: 'Eau de Parfum',
    fragranceNotes: {
      topNotes: ['Bergamot', 'Clove'],
      middleNotes: ['Oud', 'Rose'],
      baseNotes: ['Sandalwood', 'Amber']
    },
    size: '100ml',
    stock: 15,
    images: [{ url: '/images/dior1.jpg', altText: 'Noir Essence bottle' }],
    featured: true
  },
  {
    name: 'Lumière d\'Or',
    price: 1500,
    description: 'A radiant fragrance with golden citrus top notes.',
    category: 'Eau de Toilette',
    fragranceNotes: {
      topNotes: ['Lemon', 'Mandarin'],
      middleNotes: ['Jasmine', 'Neroli'],
      baseNotes: ['Musk', 'White Amber']
    },
    size: '100ml',
    stock: 20,
    images: [{ url: '/images/dior2.jpg', altText: 'Lumière d\'Or bottle' }],
    featured: true
  },
  {
    name: 'Velvet Rose',
    price: 1800,
    description: 'A rich floral bouquet with hints of vanilla.',
    category: 'Eau de Parfum',
    fragranceNotes: {
      topNotes: ['Rose Petal'],
      middleNotes: ['Geranium', 'Ylang Ylang'],
      baseNotes: ['Vanilla', 'Musk']
    },
    size: '100ml',
    stock: 12,
    images: [{ url: '/images/dior3.jpg', altText: 'Velvet Rose bottle' }],
    featured: false
  },
  // 👉 Add the rest of your 15 products using this format if you like
];

async function populateProducts() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Clearing existing products...");
    await Product.deleteMany();

    console.log("Inserting new products...");
    await Product.insertMany(products);

    console.log('✅ Products populated successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error populating products:', error.message);
    mongoose.connection.close();
  }
}

populateProducts();
