import { useEffect, useState } from 'react';
import './MotivationalQuote.css';

const MotivationalQuote = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState(''); // Author might not be available from ZenQuotes

  useEffect(() => {
    const getQuote = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/quote'); // Fetch from your server API
        const quoteData = await response.json();
        setQuote(quoteData); // ZenQuotes only sends the quote string, not an object
        setAuthor('Unknown'); // Author is not provided, so we set it to 'Unknown'
      } catch (error) {
        console.error('Error fetching the quote:', error);
        setQuote('Stay motivated!'); // Fallback quote
        setAuthor('Unknown');
      }
    };
    getQuote();
  }, []);

  return (
    <div className="quote-container">
      <p className="quote">&quot;{quote}&quot;</p> {/* Use &quot; for double quotes */}
      <p className="author">- {author}</p>
    </div>
  );
};

export default MotivationalQuote;
