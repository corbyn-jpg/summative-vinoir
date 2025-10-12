const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: true,
    // Emoji-aware validation: require at least 3 Unicode code points
    validate: {
      validator: function (v) {
        if (typeof v !== 'string') return false;
        try {
          const codePoints = Array.from(v);
          return codePoints.length >= 3;
        } catch (e) {
          return false;
        }
      },
      message: 'Password must contain at least 3 emojis/characters.'
    },
    select: false // Exclude by default from queries
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
    index: true
  },
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    default: []
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // Adds updatedAt too
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Password comparison instance method
userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
