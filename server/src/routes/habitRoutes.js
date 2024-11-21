import express from 'express';
import { addHabit } from '../controllers/habitController.js';  // Create the habitController

const router = express.Router();

// POST route to add a new habit
router.post('/', addHabit);  // Change path from '/add-habit' to '/' so it matches /api/habits

export default router;
