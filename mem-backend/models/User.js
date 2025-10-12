const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Count Unicode code points to support emoji passwords
function countCodePoints(str) {
  try {
    return [...(str || '')].length;
  } catch {
    return (str || '').length;
  }
}

const AddressSchema = new mongoose.Schema(
  {
    street: { type: String, trim: true, default: '' },
    city: { type: String, trim: true, default: '' },
    province: { type: String, trim: true, default: '' },
    postalCode: { type: String, trim: true, default: '' },
    country: { type: String, trim: true, default: 'South Africa' }
  },
  { _id: false }
);

const PreferencesSchema = new mongoose.Schema(
  {
    newsletter: { type: Boolean, default: true },
    smsNotifications: { type: Boolean, default: false }
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
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
      select: false, // Exclude by default from queries
      validate: {
        validator: function (v) {
          // Emoji-aware validation: require at least 3 Unicode code points
          return countCodePoints(v) >= 3;
        },
        message: 'Password must contain at least 3 emojis/characters.'
      }
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
      index: true
    },
    phone: { type: String, trim: true, default: '' },
    birthday: { type: String, trim: true, default: '' }, // ISO date string
    address: { type: AddressSchema, default: () => ({}) },
    preferences: { type: PreferencesSchema, default: () => ({}) },
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        default: []
      }
    ]
  },
  {
    timestamps: true // Adds createdAt and updatedAt
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
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
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
