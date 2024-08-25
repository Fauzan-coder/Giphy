import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import FavoriteGifs from './FavoriteGifs'; // Import the FavoriteGifs component

const API_KEY = 'GlVGYHkr3WSBnllca54iNt0yFbjz7L65';

// Example hot searches; replace with your actual source or API
const HOT_SEARCHES = ['funny', 'cat', 'dog', 'meme', 'sports','meme','akshay','hello','friends'];

function GiphySearch() {
  const [gifs, setGifs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasSearched, setHasSearched] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = async (term) => {
    if (!term.trim()) return;

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const response = await axios.get(
        `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${term}&limit=9&offset=${(currentPage - 1) * 9}`
      );
      setGifs(response.data.data);
      setTotalResults(response.data.pagination.total_count);
    } catch (err) {
      setError('Failed to fetch GIFs');
      console.error('Search Error', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (gif) => {
    setFavorites((prevFavorites) =>
      prevFavorites.some((f) => f.id === gif.id)
        ? prevFavorites.filter((f) => f.id !== gif.id)
        : [...prevFavorites, gif]
    );
  };

  const handleRemoveFavorite = (gif) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((f) => f.id !== gif.id)
    );
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value) {
      // Filter hot searches based on input
      setSuggestions(
        HOT_SEARCHES.filter((term) =>
          term.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
    handleSearch(suggestion);
  };

  useEffect(() => {
    if (searchTerm) {
      handleSearch(searchTerm);
    }
  }, [currentPage, searchTerm, handleSearch]);

  return (
    <div className="min-h-screen bg-white items-center justify-center py-10">
      <div className="bg-white rounded-lg w-full top-0">
        <div className="relative">
          <div className="flex items-center mb-10 space-x-4">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-lg py-2 px-4 focus:ring focus:ring-gray-300 focus:outline-none"
              placeholder="Search for GIFs"
              value={searchTerm}
              onChange={handleInputChange}
            />
            <button
              onClick={() => handleSearch(searchTerm)}
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Search
            </button>
          </div>

          {suggestions.length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 mt-2 rounded-lg shadow-lg">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        {loading && (
          <div className="flex justify-center items-center">
            <div className="spinner"></div>
          </div>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}

        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          {gifs.map((gif) => (
            <li key={gif.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image
                src={gif.images.downsized.url}
                alt={gif.title || "GIF"}
                width={300}
                height={200}
                className="object-cover w-full h-48"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{gif.title || "GIF Title"}</h3>
                <p className="text-gray-500">@username</p>
                <button
                  onClick={() => toggleFavorite(gif)}
                  className={`px-4 py-2 rounded-lg ${favorites.some((f) => f.id === gif.id) ? 'bg-red-500 text-white' : 'bg-gray-300 hover:bg-gray-400'} transition`}
                >
                  {favorites.some((f) => f.id === gif.id) ? 'Unfavorite' : 'Favorite'}
                </button>
              </div>
            </li>
          ))}
        </ul>

        {hasSearched && totalResults > 0 && (
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className={`px-4 py-2 rounded-lg ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-300 hover:bg-gray-400'} transition`}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="font-semibold text-gray-700">{currentPage}</span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className={`bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg transition ${((currentPage * 9) >= totalResults) ? 'cursor-not-allowed bg-gray-200 text-gray-500' : ''}`}
              disabled={(currentPage * 9) >= totalResults}
            >
              Next
            </button>
          </div>
        )}
      </div>

      <FavoriteGifs favoriteGifs={favorites} onRemoveFavorite={handleRemoveFavorite} />

      <style jsx>{`
        .spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-radius: 50%;
          border-top: 4px solid #333;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default GiphySearch;
