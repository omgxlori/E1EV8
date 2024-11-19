import fetch from 'node-fetch';
import https from 'https';

export const fetchRandomQuote = async () => {
  try {
    // List of tags you want to include
    const tags = [
      'change', 'character', 'courage', 'creativity', 'future',
      'gratitude', 'honor', 'inspirational', 'knowledge', 'leadership',
      'life', 'motivational', 'opportunity', 'perseverance', 'power',
      'success'
    ];

    // Join tags into a comma-separated string
    const tagsString = tags.join(',');

    // Update the API URL to include the tags
    const response = await fetch(`https://api.quotable.io/random?tags=${tagsString}`);

    if (!response.ok) {
      console.error('HTTP error:', response.status, response.statusText);
      throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in fetchRandomQuote:', error.message);
    throw new Error('Failed to fetch quote');
  }
};

