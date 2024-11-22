import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js'; // Import the middleware
import { getHabits, addHabit, updateHabit, deleteHabit } from '../controllers/habitController.js';

const router = express.Router();

router.get('/', verifyToken, getHabits); // Only allow access to habits if the user is authenticated
router.post('/', verifyToken, addHabit); // Add a habit (requires authentication)
router.put('/:id', verifyToken, updateHabit); // Update a habit (requires authentication)
router.delete('/:id', verifyToken, deleteHabit); // Delete a habit (requires authentication)

export default router;
