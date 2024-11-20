import fetch from 'node-fetch'; // Import fetch

export const fetchRandomQuote = async () => {
  try {
    // Fetch a random quote from ZenQuotes API
    const response = await fetch('https://zenquotes.io/api/random');
    
    if (!response.ok) {
      throw new Error('Error fetching quote');
    }

    // Parse the response as JSON and return the quote text
    const data = await response.json();
    return data[0].q; // Returning the quote text
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch quote');
  }
};
