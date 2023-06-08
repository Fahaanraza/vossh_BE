const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/user');


const secretKey = 'your-secret-key'; // Update with your secret key

module.exports.signUp = async (req, res) => {
  try {
    const { name, phoneNumber, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const User = mongoose.model('User'); // Replace 'User' with your actual user model

    const newUser = new User({
      name,
      phoneNumber,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', userId: newUser._id });
  } catch (err) {
    console.error('Error adding user:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports.signIn = async (req, res) => {
  try {
    const { phoneNumber, password, loginBy } = req.body;
    let user;


    if (loginBy === 'google') {
      // Authenticate with Google credentials
      // Use Firebase or any other library to authenticate with Google
      // Retrieve user details from the authenticated result
      // Example:
      // const googleUser = await firebaseAuth.signInWithGoogle(); // Update with your Google authentication code
      // user = googleUser.user;
    } else {
      // Authenticate with email and password
      user = await User.findOne({ phoneNumber });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    }

    const token = jwt.sign({ userId: user._id }, secretKey);
    res.json({ message: 'Login successful', token, userName: user.name });
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports.logout = async (req, res) => {
  try {
    res.clearCookie('token');

    res.json({ message: 'Logout successful' });
  } catch (err) {
    console.error('Error logging out:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
