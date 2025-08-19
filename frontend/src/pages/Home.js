import React, { useEffect, useMemo, useState } from 'react';
import { fetchCategories, fetchByCategory, searchMeals } from '../api/recipeApi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Home() {
  const user = useSelector((s) => s.auth.user);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState('Pasta');
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState('Italian');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    let mounted = true;
    async function init() {
      try {
        setLoading(true);
        const cats = await fetchCategories();
        if (!mounted) return;
        setCategories(cats);
      } catch (e) {
        setError('Failed to load categories');
      } finally {
        setLoading(false);
      }
    }
    init();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        const items = await fetchByCategory(active);
        if (!mounted) return;
        setRecipes(items || []);
      } catch (e) {
        setError('Failed to load recipes');
      } finally {
        setLoading(false);
      }
    }
    if (active) load();
    return () => {
      mounted = false;
    };
  }, [active]);

  const filteredCategories = useMemo(
    () => categories.map((c) => c.strCategory),
    [categories]
  );

  const onSearch = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const items = await searchMeals(query);
      setRecipes(items || []);
    } catch (e) {
      setError('Search failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f7f7fb' }}>
      <aside style={{ width: 260, padding: 24, background: '#fff', borderRight: '1px solid #eee' }}>
        <h2 style={{ marginBottom: 12 }}>Categories</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filteredCategories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              style={{
                textAlign: 'left',
                padding: '10px 12px',
                borderRadius: 10,
                border: '1px solid #e5e7eb',
                background: active === c ? '#3f3f46' : '#f3f4f6',
                color: active === c ? '#fff' : '#111'
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </aside>
      <main style={{ flex: 1, padding: 24 }}>
        <h2 style={{ marginBottom: 16 }}>Recipes</h2>
        <form onSubmit={onSearch} style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Italian"
            style={{ flex: 1, padding: '12px 14px', borderRadius: 10, border: '1px solid #e5e7eb' }}
          />
          <button type="submit" style={{ background: '#f97360', color: '#fff', border: 'none', padding: '12px 16px', borderRadius: 10 }}>
            Search
          </button>
        </form>

        {error && <div style={{ color: '#b91c1c', marginBottom: 12 }}>{error}</div>}
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
            {(recipes || []).map((m) => (
              <div key={m.idMeal} style={{ background: '#fff', border: '1px solid #eee', borderRadius: 12, overflow: 'hidden' }}>
                <img src={m.strMealThumb} alt={m.strMeal} style={{ width: '100%', height: 140, objectFit: 'cover' }} />
                <div style={{ padding: 12, fontWeight: 600 }}>{m.strMeal}</div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;


