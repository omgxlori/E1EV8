import express from 'express';
import { fetchRandomQuote } from '../services/quoteService.js'; // Use import and add the .js extension

const router = express.Router();

router.get('/api/quote', async (req, res) => {
  try {
    const quote = await fetchRandomQuote();
    res.json(quote);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quote' });
  }
});

export default router; // Use export default instead of module.exports
