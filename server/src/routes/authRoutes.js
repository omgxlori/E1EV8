import express from 'express';
import { signup, login } from '../controllers/authController.js';  // Ensure login is exported

const router = express.Router();

router.post('/signup', signup);  // Sign-up route
router.post('/login', login);    // Login route

export default router;
