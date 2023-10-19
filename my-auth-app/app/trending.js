import { useEffect, useState } from 'react';
import Link from 'next/link';

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f0f0f0',
  borderRadius: '15px',
  padding: '20px',
  maxWidth: '800px',
};

const buttonStyle = {
  backgroundColor: 'black',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
};

export default function TrendingGifsPage() {
  const [trendingGifs, setTrendingGifs] = useState([]);
  const [hotSearches, setHotSearches] = useState([]);
  
  useEffect(() => {
    const fetchTrendingGifs = async () => {
      try {
        const apiKey = 'GlVGYHkr3WSBnllca54iNt0yFbjz7L65';
        const response = await fetch(
          `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=10`
        );
        const data = await response.json();
        setTrendingGifs(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchHotSearches = async () => {
      try {
        const apiKey = 'GlVGYHkr3WSBnllca54iNt0yFbjz7L65';
        const response = await fetch(
          `https://api.giphy.com/v1/trending/searches?api_key=${apiKey}`
        );
        const data = await response.json();
        setHotSearches(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTrendingGifs();
    fetchHotSearches();
  }, []);

  return (
    <div style={containerStyle}>
      <h1>Trending GIFs</h1>
      <ul>
        {trendingGifs.map((gif) => (
          <li key={gif.id}>
            <img src={gif.images.fixed_height.url} alt={gif.title} />
          </li>
        ))}
      </ul>

      <h2>Hot Searches</h2>
      <ul>
        {hotSearches.map((search, index) => (
          <li key={index}>{search}</li>
        ))}
      </ul>

      <Link href="/signup">
        <button style={buttonStyle}>Sign Up</button>
      </Link>
    </div>
  );
}
