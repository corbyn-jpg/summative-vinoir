const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  category: String,
  images: [{ url: String }],
  fragranceNotes: {
    topNotes: [String],
    middleNotes: [String],
    baseNotes: [String]
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);