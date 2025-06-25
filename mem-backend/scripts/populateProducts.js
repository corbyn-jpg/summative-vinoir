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
      url: 'https://res.cloudinary.com/dx8wt3el4/image/upload/v1750284849/dior1_wwhfkp.jpg',
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
  name: 'Obsidian Nuit',
  price: 2100,
  description: 'A dark, sensual elixir with smoky undertones and midnight florals.',
  category: 'Eau de Parfum',
  fragranceNotes: {
    topNotes: ['Incense', 'Blackcurrant'],
    middleNotes: ['Black Orchid', 'Myrrh'],
    baseNotes: ['Smoked Wood', 'Vetiver']
  },
  size: '100ml',
  stock: 10,
  featured: true,
  images: [{
    url: 'https://res.cloudinary.com/dx8wt3el4/image/upload/v1750858463/dior0000_sblb1l.jpg',
    altText: 'Obsidian Nuit bottle'
  }]
},
{
  name: 'Rose Élixir',
  price: 1450,
  description: 'A romantic infusion of Bulgarian rose and golden saffron.',
  category: 'Eau de Parfum',
  fragranceNotes: {
    topNotes: ['Saffron', 'Mandarin'],
    middleNotes: ['Rose', 'Peach'],
    baseNotes: ['Ambergris', 'Musk']
  },
  size: '100ml',
  stock: 18,
  featured: false,
  images: [{
    url: 'https://res.cloudinary.com/dx8wt3el4/image/upload/v1750858951/dior000000_zlcmo2.jpg',
    altText: 'Rose Élixir bottle'
  }]
},
{
  name: 'Bois Blanc',
  price: 1650,
  description: 'A creamy blend of white woods and sandalwood wrapped in powder.',
  category: 'Eau de Parfum',
  fragranceNotes: {
    topNotes: ['White Tea', 'Iris'],
    middleNotes: ['Sandalwood', 'Heliotrope'],
    baseNotes: ['Cashmere', 'Musk']
  },
  size: '100ml',
  stock: 12,
  featured: false,
  images: [{
    url: 'https://res.cloudinary.com/dx8wt3el4/image/upload/v1750858707/dior00000_fggwc5.jpg',
    altText: 'Bois Blanc bottle'
  }]
},
{
  name: 'Verde Silken',
  price: 1400,
  description: 'A breezy green tea scent with herbal notes and dew-kissed petals.',
  category: 'Eau de Toilette',
  fragranceNotes: {
    topNotes: ['Green Tea', 'Mint'],
    middleNotes: ['Bamboo', 'Peony'],
    baseNotes: ['White Cedar', 'Musk']
  },
  size: '100ml',
  stock: 20,
  featured: false,
  images: [{
    url: 'https://res.cloudinary.com/dx8wt3el4/image/upload/v1750858269/dior000_gb9vfb.jpg',
    altText: 'Verde Silken bottle'
  }]
},
{
  name: 'Soleil Ardent',
  price: 1550,
  description: 'Sun-drenched mandarin and neroli wrapped in golden amber.',
  category: 'Eau de Parfum',
  fragranceNotes: {
    topNotes: ['Mandarin', 'Petitgrain'],
    middleNotes: ['Neroli', 'Ylang Ylang'],
    baseNotes: ['Amber', 'Musk']
  },
  size: '100ml',
  stock: 15,
  featured: false,
  images: [{
    url: 'https://res.cloudinary.com/dx8wt3el4/image/upload/v1750858112/dior00_cogvxx.jpg',
    altText: 'Soleil Ardent bottle'
  }]
},
{
  name: 'Cuir Vanillé',
  price: 1750,
  description: 'Smooth leather and creamy vanilla create a timeless, bold signature.',
  category: 'Eau de Parfum',
  fragranceNotes: {
    topNotes: ['Cardamom', 'Leather'],
    middleNotes: ['Tonka Bean', 'Cinnamon'],
    baseNotes: ['Vanilla', 'Balsam']
  },
  size: '100ml',
  stock: 11,
  featured: false,
  images: [{
    url: 'https://res.cloudinary.com/dx8wt3el4/image/upload/v1750859536/dior0000000_znnbo5.jpg',
    altText: 'Cuir Vanillé bottle'
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
