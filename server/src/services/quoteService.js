import fetch from 'node-fetch'; // Import fetch

export const fetchRandomQuote = async () => {
  try {
    // Fetch a random quote from ZenQuotes API
    const response = await fetch('https://zenquotes.io/api/random');
    
    if (!response.ok) {
      throw new Error('Error fetching quote');
    }

    // Parse the response as JSON
    const data = await response.json();
    
    // Return both the quote and the author
    return {
      quote: data[0]?.q || 'Stay motivated!', // Fallback quote
      author: data[0]?.a || 'Just A Quick Thought' // Fallback author
    };
  } catch (error) {
    console.error(error);
    // Return fallback values in case of error
    return {
      quote: 'Stay motivated!',
      author: 'Just A Quick Thought'
    };
  }
};
