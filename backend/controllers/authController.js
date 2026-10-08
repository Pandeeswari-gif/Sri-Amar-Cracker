const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc Register a new user
// @route POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { name, username, email, phone, password, confirmPassword, address } = req.body;

    if (!name || !username || !email || !phone || !password) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    if (password !== confirmPassword && confirmPassword !== undefined) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    // Validate username rules: 3-50 chars, only letters, numbers, dots, underscores
    const usernameRegex = /^[a-zA-Z0-9._]{3,50}$/;
    if (!usernameRegex.test(username)) {
      return res.status(400).json({
        success: false,
        message: 'Username must be 3-50 characters and can only contain letters, numbers, dots, and underscores'
      });
    }

    const emailLower = email.toLowerCase().trim();
    const userExists = await User.findOne({
      $or: [{ email: emailLower }, { username: username.toLowerCase().trim() }]
    });

    if (userExists) {
      if (userExists.email === emailLower) {
        return res.status(400).json({ success: false, message: 'An account with this email already exists' });
      }
      return res.status(400).json({ success: false, message: 'This username is already taken' });
    }

    const initialAddresses = [];
    if (address && address.street) {
      initialAddresses.push({
        fullName: name,
        phone: phone,
        street: address.street,
        city: address.city || '',
        district: address.district || '',
        state: address.state || 'Tamil Nadu',
        pinCode: address.pinCode || '',
        isDefault: true
      });
    }

    const user = await User.create({
      name: name.trim(),
      username: username.toLowerCase().trim(),
      email: emailLower,
      phone: phone.trim(),
      password: password,
      role: 'customer',
      addresses: initialAddresses
    });

    res.status(201).json({
      success: true,
      message: 'Account created successfully! Welcome to Sri Amar Crackers.',
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role,
        addresses: user.addresses
      }
    });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ success: false, message: error.message || 'Server error during registration' });
  }
};

// @desc Login user
// @route POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { loginId, password } = req.body; // Can be email or username

    if (!loginId || !password) {
      return res.status(400).json({ success: false, message: 'Please enter your email/username and password' });
    }

    const query = loginId.includes('@')
      ? { email: loginId.toLowerCase().trim() }
      : { username: loginId.toLowerCase().trim() };

    const user = await User.findOne(query);

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials. Please check your email/username' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials. Incorrect password' });
    }

    res.json({
      success: true,
      message: `Welcome back, ${user.name}!`,
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role,
        addresses: user.addresses
      }
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
};

// @desc Get current logged-in user profile
// @route GET /api/auth/me
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Update user profile
// @route PUT /api/auth/profile
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (req.body.name) user.name = req.body.name.trim();
    if (req.body.phone) user.phone = req.body.phone.trim();
    if (req.body.password && req.body.password.length >= 6) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        username: updatedUser.username,
        email: updatedUser.email,
        phone: updatedUser.phone,
        role: updatedUser.role,
        addresses: updatedUser.addresses
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Add address
// @route POST /api/auth/address
exports.addAddress = async (req, res) => {
  try {
    const { fullName, phone, street, city, district, state, pinCode, isDefault } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    if (isDefault) {
      user.addresses.forEach(addr => (addr.isDefault = false));
    }

    user.addresses.push({
      fullName,
      phone,
      street,
      city,
      district,
      state: state || 'Tamil Nadu',
      pinCode,
      isDefault: isDefault || user.addresses.length === 0
    });

    await user.save();
    res.status(201).json({ success: true, message: 'Address saved', addresses: user.addresses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Delete address
// @route DELETE /api/auth/address/:addressId
exports.deleteAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    user.addresses = user.addresses.filter(addr => addr._id.toString() !== req.params.addressId);
    await user.save();

    res.json({ success: true, message: 'Address deleted', addresses: user.addresses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
