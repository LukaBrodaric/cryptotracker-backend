const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: './assets/default-profile.jpg',
  },
});

// Hash the user's password before saving to the database
userSchema.pre('save', async function (next) {
  const user = this;

  // Only hash the password if it's been modified or is new
  if (!user.isModified('password')) return next();

  try {
    // Generate a salt to encrypt the password
    const salt = await bcrypt.genSalt(10);

    // Hash the password with the generated salt
    const hash = await bcrypt.hash(user.password, salt);

    // Replace the plain password with the hashed one
    user.password = hash;
    next();
  } catch (err) {
    return next(err);
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
