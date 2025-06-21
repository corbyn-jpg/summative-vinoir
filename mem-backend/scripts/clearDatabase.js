const mongoose = require('mongoose');
const Product = require('../models/Product');
const User = require('../models/User');
require('dotenv').config();

async function clearDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Product.deleteMany();
    await User.deleteMany();

    console.log('Database cleared successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error clearing database:', error);
    mongoose.connection.close();
  }
}

clearDatabase();
