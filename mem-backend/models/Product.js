const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  fragranceNotes: {
    topNotes: [String],
    middleNotes: [String],
    baseNotes: [String],
  },
  size: String,
  stock: Number,
  images: [
    {
      url: String,
      altText: String,
    },
  ],
  featured: Boolean,
});

module.exports = mongoose.model('Product', productSchema);
