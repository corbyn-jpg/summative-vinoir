const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

console.log('Loading environment variables...');
console.log('MONGO_URI defined:', !!process.env.MONGO_URI);

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
      url: 'https://res.cloudinary.com/dx8wt3el4/image/upload/v1759227227/dior1_yfz6h6.jpg',
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
      url: 'https://res.cloudinary.com/dx8wt3el4/image/upload/v1750441644/dior4_sejvq4.jpg',
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
  },
  {
    name: 'Éclat de Lune',
    price: 1750,
    description: 'A luminous blend of white florals and creamy woods, capturing the essence of moonlit elegance.',
    category: 'Eau de Parfum',
    fragranceNotes: {
      topNotes: ['Pear Blossom', 'Pink Pepper'],
      middleNotes: ['Tuberose', 'Gardenia'],
      baseNotes: ['Cashmere Wood', 'White Musk']
    },
    size: '100ml',
    stock: 11,
    featured: true,
    images: [{
      url: 'https://res.cloudinary.com/dx8wt3el4/image/upload/v1750456344/dior16_q0cggn.jpg',
      altText: 'Éclat de Lune bottle'
    }]
  },
  {
    name: 'Aqua Serein',
    price: 1350,
    description: 'A crisp aquatic fragrance with cool marine breezes and a zest of citrus.',
    category: 'Eau de Toilette',
    fragranceNotes: {
      topNotes: ['Sea Salt', 'Lime'],
      middleNotes: ['Driftwood', 'Ivy Leaf'],
      baseNotes: ['Ambergris', 'Vetiver']
    },
    size: '100ml',
    stock: 20,
    featured: false,
    images: [{
      url: 'https://res.cloudinary.com/dx8wt3el4/image/upload/v1750455925/dior15_cnsu0o.jpg',
      altText: 'Aqua Serein bottle'
    }]
  },
  {
    name: 'Crimson Noir',
    price: 1850,
    description: 'An intense, seductive blend of spice, leather, and smoky woods.',
    category: 'Eau de Parfum',
    fragranceNotes: {
      topNotes: ['Cinnamon', 'Black Pepper'],
      middleNotes: ['Leather', 'Incense'],
      baseNotes: ['Oud', 'Smoked Vanilla']
    },
    size: '100ml',
    stock: 7,
    featured: true,
    images: [{
      url: 'https://res.cloudinary.com/dx8wt3el4/image/upload/v1750455782/dior14_kyhrtm.jpg',
      altText: 'Crimson Noir bottle'
    }]
  },
  {
    name: 'Fleur Blanche',
    price: 1500,
    description: 'Delicate purple petals layered with soft musks and powdery iris.',
    category: 'Eau de Parfum',
    fragranceNotes: {
      topNotes: ['Aldehydes', 'Lily of the Valley'],
      middleNotes: ['White Rose', 'Iris'],
      baseNotes: ['Powder Musk', 'Benzoin']
    },
    size: '100ml',
    stock: 14,
    featured: false,
    images: [{
      url: 'https://res.cloudinary.com/dx8wt3el4/image/upload/v1750456775/dior17_srhldq.jpg',
      altText: 'Fleur Blanche bottle'
    }]
  },
  {
    name: 'Midnight Orchid',
    price: 1650,
    description: 'A mysterious blend of dark florals and exotic woods for evening elegance.',
    category: 'Eau de Parfum',
    fragranceNotes: {
      topNotes: ['Black Currant', 'Bergamot'],
      middleNotes: ['Black Orchid', 'Jasmine Sambac'],
      baseNotes: ['Leather', 'Dark Amber']
    },
    size: '100ml',
    stock: 12,
    featured: false,
    images: [{
      url: 'https://res.cloudinary.com/dx8wt3el4/image/upload/v1759227502/Firefly_An_empty_pefume_bottle_with_a_mysterious_blend_of_dark_florals_and_exotic_woods_for_evening_vonvw0.jpg',
      altText: 'Midnight Orchid bottle'
    }]
  },
  {
    name: 'Solar Flare',
    price: 1450,
    description: 'Radiant citrus and solar notes that capture the energy of sunlight.',
    category: 'Eau de Toilette',
    fragranceNotes: {
      topNotes: ['Blood Orange', 'Ginger'],
      middleNotes: ['Neroli', 'Orange Blossom'],
      baseNotes: ['Amberwood', 'White Musk']
    },
    size: '100ml',
    stock: 18,
    featured: true,
    images: [{
      url: 'https://res.cloudinary.com/dx8wt3el4/image/upload/v1759227805/Firefly_An_empty_pefume_bottle_with_a_Radiant_citrus_and_solar_notes_that_capture_the_energy_of_sunl_y3wua9.jpg',
      altText: 'Solar Flare bottle'
    }]
  },
  {
    name: 'Tobacco Vanille',
    price: 2200,
    description: 'Rich tobacco leaf with creamy vanilla and honeyed sweetness.',
    category: 'Eau de Parfum',
    fragranceNotes: {
      topNotes: ['Tobacco Leaf', 'Spices'],
      middleNotes: ['Tonka Bean', 'Vanilla'],
      baseNotes: ['Cocoa', 'Dried Fruits']
    },
    size: '100ml',
    stock: 8,
    featured: false,
    images: [{
      url: 'https://res.cloudinary.com/dx8wt3el4/image/upload/v1759227940/Firefly_An_empty_perfume_bottle_with_a_Rich_tobacco_leaf_with_creamy_vanilla_and_honeyed_sweetness._ndhhjn.jpg',
      altText: 'Tobacco Vanille bottle'
    }]
  },
  {
    name: 'Ocean Breeze',
    price: 1250,
    description: 'Fresh aquatic notes with marine accords and crisp sea salt.',
    category: 'Eau de Toilette',
    fragranceNotes: {
      topNotes: ['Sea Salt', 'Calone'],
      middleNotes: ['Water Lily', 'Marine Notes'],
      baseNotes: ['Driftwood', 'Musk']
    },
    size: '100ml',
    stock: 22,
    featured: false,
    images: [{
      url: 'https://res.cloudinary.com/dx8wt3el4/image/upload/v1759228051/Firefly_An_empty_perfume_bottle_with_a_Fresh_aquatic_notes_with_marine_accords_and_crisp_sea_salt._3_qum436.jpg',
      altText: 'Ocean Breeze bottle'
    }]
  },
  {
    name: 'Royal Oud',
    price: 2400,
    description: 'Luxurious oud wood with rose and saffron for a regal presence.',
    category: 'Eau de Parfum',
    fragranceNotes: {
      topNotes: ['Oud', 'Saffron'],
      middleNotes: ['Rose', 'Cardamom'],
      baseNotes: ['Sandalwood', 'Leather']
    },
    size: '100ml',
    stock: 6,
    featured: true,
    images: [{
      url: 'https://res.cloudinary.com/dx8wt3el4/image/upload/v1759228238/Firefly_An_empty_perfume_bottle_with_a_Luxurious_oud_wood_with_rose_and_saffron_for_a_regal_presence_w3xjmh.jpg',
      altText: 'Royal Oud bottle'
    }]
  },
  {
    name: 'Berry Noir',
    price: 1550,
    description: 'Dark berries and blackcurrant with a touch of patchouli mystery.',
    category: 'Eau de Parfum',
    fragranceNotes: {
      topNotes: ['Blackberry', 'Black Currant'],
      middleNotes: ['Violet', 'Jasmine'],
      baseNotes: ['Patchouli', 'Amber']
    },
    size: '100ml',
    stock: 14,
    featured: false,
    images: [{
      url: 'https://res.cloudinary.com/dx8wt3el4/image/upload/v1759228331/Firefly_An_empty_perfume_bottle_with_a_Dark_berries_and_blackcurrant_with_a_touch_of_patchouli_myste_kjgqeu.jpg',
      altText: 'Berry Noir bottle'
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
