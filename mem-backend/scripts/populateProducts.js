const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config({ path: '../.env' });
console.log('MONGO_URI:', process.env.MONGO_URI);

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
    featured: true,
    images: [{
      url: 'https://res.cloudinary.com/dx8wt3el4/image/upload/v1750285070/dior1_s2qxso.jpg',
      altText: 'Noir Essence bottle'
    }]
  },
  {
    name: "Lumière d'Or",
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
    featured: true,
    images: [{
      url: 'https://res.cloudinary.com/dx8wt3el4/image/upload/v1750284849/dior2_g5aq9q.jpg',
      altText: 'Lumière d\'Or bottle'
    }]
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
    featured: false,
    images: [{
      url: 'https://res.cloudinary.com/dx8wt3el4/image/upload/v1750284849/dior4_jdxryd.jpg',
      altText: 'Velvet Rose bottle'
    }]
  },
  {
    name: 'Oud Royal',
    price: 2000,
    description: 'A regal woody intensity with a touch of mystery.',
    category: 'Eau de Parfum',
    fragranceNotes: {
      topNotes: ['Oud', 'Saffron'],
      middleNotes: ['Rose', 'Patchouli'],
      baseNotes: ['Amber', 'Cedarwood']
    },
    size: '100ml',
    stock: 10,
    featured: false,
    images: [{
      url: 'https://res.cloudinary.com/dx8wt3el4/image/upload/v1750338278/dior6_trw6e5.jpg',
      altText: 'Oud Royal bottle'
    }]
  },
  {
    name: 'Amber Mystique',
    price: 1600,
    description: 'Warm amber notes with a hint of oriental spices.',
    category: 'Eau de Parfum',
    fragranceNotes: {
      topNotes: ['Amber', 'Spice'],
      middleNotes: ['Patchouli', 'Rose'],
      baseNotes: ['Vanilla', 'Musk']
    },
    size: '100ml',
    stock: 8,
    featured: false,
    images: [{
      url: 'https://res.cloudinary.com/dx8wt3el4/image/upload/v1750442464/dior13_zxe3sn.jpg',
      altText: 'Amber Mystique bottle'
    }]
  },
  {
    name: 'Citrus Bloom',
    price: 1300,
    description: 'A refreshing burst of citrus and floral notes.',
    category: 'Eau de Toilette',
    fragranceNotes: {
      topNotes: ['Grapefruit', 'Orange Blossom'],
      middleNotes: ['Magnolia', 'Peony'],
      baseNotes: ['Cedar', 'Musk']
    },
    size: '100ml',
    stock: 18,
    featured: false,
    images: [{
      url: 'https://res.cloudinary.com/dx8wt3el4/image/upload/v1750442354/dior12_moclfw.jpg',
      altText: 'Citrus Bloom bottle'
    }]
  },
  {
    name: 'Sandalwood Whisper',
    price: 1700,
    description: 'Soft sandalwood with a touch of musk.',
    category: 'Eau de Parfum',
    fragranceNotes: {
      topNotes: ['Sandalwood'],
      middleNotes: ['Iris', 'Violet'],
      baseNotes: ['Musk', 'Tonka Bean']
    },
    size: '100ml',
    stock: 14,
    featured: false,
    images: [{
      url: 'https://res.cloudinary.com/dx8wt3el4/image/upload/v1750338252/dior8_vgcqgi.jpg',
      altText: 'Sandalwood Whisper bottle'
    }]
  },
  {
    name: 'Patchouli Dream',
    price: 1900,
    description: 'Earthy patchouli with a hint of sweetness.',
    category: 'Eau de Parfum',
    fragranceNotes: {
      topNotes: ['Patchouli'],
      middleNotes: ['Rose', 'Geranium'],
      baseNotes: ['Vanilla', 'Amber']
    },
    size: '100ml',
    stock: 9,
    featured: false,
    images: [{
      url: 'https://res.cloudinary.com/dx8wt3el4/image/upload/v1750441791/dior0_hs7dgd.jpg',
      altText: 'Patchouli Dream bottle'
    }]
  },
  {
    name: 'Vanilla Sky',
    price: 1100,
    description: 'Creamy vanilla with a touch of caramel.',
    category: 'Eau de Parfum',
    fragranceNotes: {
      topNotes: ['Vanilla'],
      middleNotes: ['Caramel', 'Jasmine'],
      baseNotes: ['Musk', 'Amber']
    },
    size: '100ml',
    stock: 16,
    featured: false,
    images: [{
      url: 'https://res.cloudinary.com/dx8wt3el4/image/upload/v1750338252/dior9_oqxucs.jpg',
      altText: 'Vanilla Sky bottle'
    }]
  },
  {
    name: 'Jardin Secret',
    price: 1400,
    description: 'Fresh green accords inspired by secret gardens.',
    category: 'Eau de Toilette',
    fragranceNotes: {
      topNotes: ['Green Leaves', 'Bergamot'],
      middleNotes: ['Lily', 'Freesia'],
      baseNotes: ['Moss', 'Cedar']
    },
    size: '100ml',
    stock: 13,
    featured: false,
    images: [{
      url: 'https://res.cloudinary.com/dx8wt3el4/image/upload/v1750338252/dior10_wclljh.jpg',
      altText: 'Jardin Secret bottle'
    }]
  }
];

async function populateProducts() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);

    console.log('Clearing existing products...');
    await Product.deleteMany();

    console.log('Inserting new products...');
    await Product.insertMany(products);

    console.log('✅ Products populated successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error populating products:', error.message);
    mongoose.connection.close();
  }
}

populateProducts();
