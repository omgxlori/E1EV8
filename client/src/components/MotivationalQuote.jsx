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

        // Set the quote and author correctly
        setQuote(quoteData.quote); // quoteData.quote should be the actual quote string
        setAuthor(quoteData.author || 'Just A Quick Thought'); // If no author is available, use fallback text
      } catch (error) {
        console.error('Error fetching the quote:', error);
        setQuote('Stay motivated!'); // Fallback quote
        setAuthor('Just A Quick Thought'); // Fallback author
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
