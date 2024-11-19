import { useEffect, useState } from 'react';
import './MotivationalQuote.css';

const MotivationalQuote = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    const getQuote = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/quote'); // Fetch from your server API
        const quoteData = await response.json();
        setQuote(quoteData.content);
        setAuthor(quoteData.author);
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
