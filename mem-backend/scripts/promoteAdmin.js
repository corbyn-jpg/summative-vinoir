// Usage:
//   EMAIL="user@example.com" node scripts/promoteAdmin.js
// or
//   node scripts/promoteAdmin.js user@example.com

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const User = require('../models/User');

async function run() {
  const email = process.env.EMAIL || process.argv[2];
  if (!email) {
    console.error('Please provide an EMAIL env var or argv, e.g.: EMAIL="admin@example.com" node scripts/promoteAdmin.js');
    process.exit(1);
  }

  if (!process.env.MONGO_URI) {
    console.error('MONGO_URI not set in environment');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      console.error(`User not found for email: ${email}`);
      process.exit(1);
    }
    user.role = 'admin';
    await user.save();
    console.log(`✅ Promoted ${email} to admin.`);
    process.exit(0);
  } catch (err) {
    console.error('Error promoting admin:', err);
    process.exit(1);
  }
}

run();
