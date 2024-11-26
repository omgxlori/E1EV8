import { useEffect, useState } from 'react';
import './MotivationalQuote.css';

const MotivationalQuote = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const getQuote = async () => {
      try {
        setLoading(true); // Start loading
        setError(false); // Reset error state

        const response = await fetch('/api/quote'); // Call your backend API
        if (!response.ok) throw new Error('Failed to fetch quote');

        const data = await response.json();

        if (!data.quote || !data.author) {
          throw new Error('Incomplete quote data');
        }

        setQuote(data.quote); // Set the quote text
        setAuthor(data.author); // Set the author
      } catch (error) {
        console.error('Error fetching the quote:', error);
        setError(true); // Set error state if something goes wrong
      } finally {
        setLoading(false); // End loading
      }
    };

    getQuote();
  }, []);

  if (loading) {
    return <div className="quote-container">Loading motivational quote...</div>;
  }

  if (error) {
    return (
      <div className="quote-container">
        <p>Error fetching quote. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="quote-container">
      <p className="quote">&quot;{quote}&quot;</p>
      <p className="author">- {author}</p>
    </div>
  );
};

export default MotivationalQuote;
