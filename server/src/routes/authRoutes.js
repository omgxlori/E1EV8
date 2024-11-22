import express from 'express';
import { signup, login, getUser, updateUser, deleteUser } from '../controllers/authController.js';
import { verifyToken } from '../middleware/authMiddleware.js';  // Import the verifyToken middleware

const router = express.Router();

// Authentication Routes
router.post('/signup', signup);  // Sign-up route
router.post('/login', login);    // Login route

// User Management Routes (Protected by verifyToken middleware)
router.get('/user', verifyToken, getUser);      // Get user info (Authenticated)
router.put('/user', verifyToken, updateUser);   // Update user info (Authenticated)
router.delete('/user', verifyToken, deleteUser); // Delete user account (Authenticated)

export default router;
