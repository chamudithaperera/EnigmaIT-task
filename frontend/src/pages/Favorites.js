import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavorites, removeFromFavorites } from '../features/favoritesSlice';
import { useNavigate } from 'react-router-dom';

function Favorites() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: favorites, status } = useSelector((s) => s.favorites);
  const user = useSelector((s) => s.auth.user);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    dispatch(fetchFavorites());
  }, [dispatch, user, navigate]);

  const handleRemove = async (recipeId) => {
    await dispatch(removeFromFavorites(recipeId));
  };

  if (status === 'loading') {
    return (
      <div style={{ padding: 24, textAlign: 'center' }}>
        <h2>Loading favorites...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: 24, background: '#f7f7fb', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <button 
            onClick={() => navigate('/')}
            style={{ 
              padding: '8px 16px', 
              background: '#f97360', 
              border: '1px solid #e5e7eb', 
              borderRadius: 8,
              cursor: 'pointer'
            }}
          >
            Back
          </button>
          <h1 style={{ margin: 0 }}>My Favorites</h1>
        </div>
        
        {favorites.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 48 }}>
            <h3 style={{ color: '#6b7280', marginBottom: 16 }}>No favorites yet</h3>
            <p style={{ color: '#9ca3af' }}>Start exploring recipes and add them to your favorites!</p>
            <button 
              onClick={() => navigate('/')}
              style={{ 
                marginTop: 16, 
                padding: '12px 24px', 
                background: '#6c5ce7', 
                color: '#fff', 
                border: 'none', 
                borderRadius: 10 
              }}
            >
              Browse Recipes
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            {favorites.map((favorite) => (
              <div key={favorite.recipeId} style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', border: '1px solid #e5e7eb' }}>
                <img 
                  src={favorite.recipeImage} 
                  alt={favorite.recipeTitle} 
                  style={{ width: '100%', height: 200, objectFit: 'cover' }} 
                />
                <div style={{ padding: 16 }}>
                  <h3 style={{ marginBottom: 12 }}>{favorite.recipeTitle}</h3>
                  <button 
                    onClick={() => handleRemove(favorite.recipeId)}
                    style={{ 
                      padding: '8px 16px', 
                      background: '#ef4444', 
                      color: '#fff', 
                      border: 'none', 
                      borderRadius: 8,
                      cursor: 'pointer'
                    }}
                  >
                    Remove from Favorites
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
