import bcrypt from 'bcryptjs';
import User from '../models/User.js'; // Ensure correct path
import jwt from 'jsonwebtoken';

// Sign-up Controller
export const signup = async (req, res) => {
  const { firstName, lastName, email, password, timeZone, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      timeZone
    });

    return res.status(201).json({ message: 'User created successfully', user: { firstName: newUser.firstName, email: newUser.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// Login Controller
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: { firstName: user.firstName, email: user.email }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get User Info (Authenticated route)
export const getUser = async (req, res) => {
  try {
    // Assuming JWT has populated req.user with user data
    const user = await User.findByPk(req.user.userId); // Access user info from token
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Return user info (excluding password)
    res.json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      timeZone: user.timeZone
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get user information' });
  }
};

// Update User Info (Authenticated route)
export const updateUser = async (req, res) => {
  const { firstName, lastName, email, timeZone, password } = req.body;

  try {
    const user = await User.findByPk(req.user.userId); // Get the logged-in user using token data
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Optional: Hash password if it's provided
    let updatedPassword = user.password;
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    // Update user data
    const updatedUser = await user.update({
      firstName: firstName || user.firstName,
      lastName: lastName || user.lastName,
      email: email || user.email,
      timeZone: timeZone || user.timeZone,
      password: updatedPassword
    });

    res.json({
      message: 'User updated successfully',
      user: {
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        timeZone: updatedUser.timeZone
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update user information' });
  }
};

// Delete User (Authenticated route)
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId); // Get the logged-in user using token data
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Delete user from database
    await user.destroy();

    res.json({ message: 'User account deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete user account' });
  }
};
