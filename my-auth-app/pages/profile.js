import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { signOutUser } from '../auth';
import axios from 'axios';
import './profileStyles.css';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [gifs, setGifs] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!isUserAuthenticated()) {
          router.push('/login');
        }
      } catch (error) {
        console.error(error);
      }
    }

    checkAuth();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await signOutUser();
      router.push('/login');
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (searchTerm) {
      const timer = setTimeout(() => {
        fetchGifs();
      }, 500);

      return () => {
        clearTimeout(timer); 
      };
    }
  }, [searchTerm]);

  const fetchGifs = async () => {
    setLoading(true);

    try {
      const apiKey = 'GlVGYHkr3WSBnllca54iNt0yFbjz7L65';
      const response = await axios.get(`https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${apiKey}&limit=5`);
      setGifs(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const toggleFavorite = (gif) => {
    if (favorites.includes(gif)) {
      setFavorites(favorites.filter((item) => item !== gif));
    } else {
      setFavorites([...favorites, gif]);
    }
  }

  return (
    <div>
      <h2>Search for GIFs</h2>
      <div className="search-bar">
        <div className="search-icon">
          <div className="ellipse"></div>
          <div className="line"></div>
        </div>
        <input
          className="search-input"
          type="text"
          placeholder="Enter a keyword"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={fetchGifs} className="search-button">
          Search
        </button>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
      <h2>Search Results</h2>
      <div className="gif-container">
        {loading && <p>Loading...</p>}
        {gifs.map((gif) => (
          <div key={gif.id} className="gif-container-item">
            {loading ? (
              <div className="loading-animation"></div>
            ) : (
              <img src={gif.images.fixed_height.url} alt={gif.title} className="big-gif" />
            )}
            <button
              onClick={() => toggleFavorite(gif)}
              className={`favorite-button ${favorites.includes(gif) ? 'active' : ''}`}
            >
              {favorites.includes(gif) ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </div>
        ))}
      </div>
      <h2>Favorites</h2>
      <div className="gif-container">
        {favorites.map((gif) => (
          <div key={gif.id} className="gif-container-item">
            <img src={gif.images.fixed_height.url} alt={gif.title} className="big-gif" />
            <button
              onClick={() => toggleFavorite(gif)}
              className={`favorite-button ${favorites.includes(gif) ? 'active' : ''}`}
            >
              {favorites.includes(gif) ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
