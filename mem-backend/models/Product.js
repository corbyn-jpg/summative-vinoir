const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    trim: true
  },
  altText: {
    type: String,
    trim: true,
    default: ''
  }
}, { _id: false });

const NoteArray = {
  type: [String],
  default: [],
};

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true // text search
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    category: {
      type: String,
      required: true,
      trim: true,
      index: true
      // enum: ['perfume', 'cologne', ...] // Add if you have a fixed list
    },
    fragranceNotes: {
      topNotes: NoteArray,
      middleNotes: NoteArray,
      baseNotes: NoteArray,
    },
    size: {
      type: String,
      trim: true
      // enum: ['30ml', '50ml', '100ml'], // Add if size is always fixed
    },
    stock: {
      type: Number,
      default: 0,
      min: 0
    },
    images: {
      type: [ImageSchema],
      default: []
    },
    featured: {
      type: Boolean,
      default: false,
      index: true
    }
  },
  { timestamps: true } // Adds createdAt, updatedAt
);

module.exports = mongoose.model('Product', productSchema);
