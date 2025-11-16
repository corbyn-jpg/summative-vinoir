const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Product = require('../models/Product');

/**
 * @route   GET /api/wishlist
 * @desc    Get the current user's populated wishlist
 * @access  Private
 */
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate('wishlist').lean();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.wishlist || []);
  } catch (err) {
    console.error('[Wishlist GET]', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   POST /api/wishlist
 * @desc    Add a product to the user's wishlist (avoiding duplicates)
 * @access  Private
 */
router.post('/', auth, async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required.' });
    }

    // Check product existence
    const productExists = await Product.exists({ _id: productId });
    if (!productExists)
      return res.status(404).json({ message: 'Product not found' });

    // Add product if not already present (atomic)
    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      { $addToSet: { wishlist: productId } },
      { new: true }
    )
      .populate('wishlist')
      .lean();

    if (!updatedUser)
      return res.status(404).json({ message: 'User not found' });

    res.json(updatedUser.wishlist);
  } catch (err) {
    console.error('[Wishlist ADD]', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   DELETE /api/wishlist/:productId
 * @desc    Remove a product from the user's wishlist (atomic)
 * @access  Private
 */
router.delete('/:productId', auth, async (req, res) => {
  try {
    const { productId } = req.params;

    // Optionally, verify that productId is a valid ObjectId

    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      { $pull: { wishlist: productId } },
      { new: true }
    )
      .populate('wishlist')
      .lean();

    if (!updatedUser)
      return res.status(404).json({ message: 'User not found' });

    res.json(updatedUser.wishlist);
  } catch (err) {
    console.error('[Wishlist REMOVE]', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   DELETE /api/wishlist
 * @desc    Clear the current user's wishlist
 * @access  Private
 */
router.delete('/', auth, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      { $set: { wishlist: [] } },
      { new: true }
    );
    if (!updatedUser)
      return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'Wishlist cleared' });
  } catch (err) {
    console.error('[Wishlist CLEAR]', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
