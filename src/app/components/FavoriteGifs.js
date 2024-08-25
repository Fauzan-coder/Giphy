import React from 'react';
import Image from 'next/image';

function FavoriteGifs({ favoriteGifs, onRemoveFavorite }) {
  return (
    <div>
      <h2>Favorite GIFs</h2>
      <ul style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '16px',
        padding: '0',
        listStyle: 'none'
      }}>
        {favoriteGifs.map((gif) => (
          <li key={gif.id} style={{ textAlign: 'center' }}>
            <Image 
              src={gif.images.downsized.url} 
              alt={gif.title || "GIF"} 
              width={200} 
              height={200} 
              style={{ borderRadius: '8px' }}
            />
            <button 
              onClick={() => onRemoveFavorite(gif)} 
              style={{ 
                display: 'block', 
                marginTop: '8px', 
                padding: '8px 16px', 
                border: 'none', 
                borderRadius: '4px', 
                backgroundColor: '#ff4d4d', 
                color: '#fff', 
                cursor: 'pointer'
              }}
              aria-label={`Remove ${gif.title} from favorites`}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FavoriteGifs;
