import express from 'express';
import { fetchRandomQuote } from '../services/quoteService.js'; // Make sure this is importing the correct file

const router = express.Router();

router.get('/api/quote', async (req, res) => {
  try {
    // Call the function to fetch a random quote
    const quote = await fetchRandomQuote();
    res.json(quote); // Send the quote back in the response
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quote' });
  }
});

export default router;
