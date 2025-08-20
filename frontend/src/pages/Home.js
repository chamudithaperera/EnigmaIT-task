import React, { useEffect, useMemo, useState } from 'react';
import { fetchCategories, fetchByCategory, searchMeals } from '../api/recipeApi';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/authSlice';
import CategoryFilter from '../components/recipes/CategoryFilter';
import RecipeGrid from '../components/recipes/RecipeGrid';
import RecipeModal from '../components/recipes/RecipeModal';

function Home() {
  const user = useSelector((s) => s.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState('Pasta');
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openId, setOpenId] = useState(null);

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
    if (!query.trim()) return;
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

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f7f7fb' }}>
      <header style={{ background: '#fff', padding: '16px 24px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, color: '#6c5ce7' }}>Recipe App</h1>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ color: '#6b7280' }}>Welcome, {user?.name}</span>
          <button 
            onClick={() => navigate('/favorites')}
            style={{ padding: '8px 16px', background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: 8 }}
          >
            Favorites
          </button>
          <button 
            onClick={handleLogout}
            style={{ padding: '8px 16px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: 8 }}
          >
            Logout
          </button>
        </div>
      </header>
      
      <div style={{ display: 'flex', flex: 1 }}>
        <CategoryFilter categories={filteredCategories} active={active} onSelect={setActive} />
        <main style={{ flex: 1, padding: 24 }}>
          <h2 style={{ marginBottom: 16 }}>Recipes</h2>
          <form onSubmit={onSearch} style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search recipes..."
              style={{ flex: 1, padding: '12px 14px', borderRadius: 10, border: '1px solid #e5e7eb' }}
            />
            <button type="submit" style={{ background: '#f97360', color: '#fff', border: 'none', padding: '12px 16px', borderRadius: 10 }}>
              Search
            </button>
          </form>

          {error && <div style={{ color: '#b91c1c', marginBottom: 12 }}>{error}</div>}
          {recipes.length === 0 && !loading && (
            <div style={{ textAlign: 'center', padding: 48, color: '#6b7280' }}>
              <h3>No recipes found</h3>
              <p>Try a different search term or category</p>
            </div>
          )}
          <RecipeGrid items={recipes} loading={loading} onSelect={(m) => setOpenId(m.idMeal)} />
          <RecipeModal mealId={openId} onClose={() => setOpenId(null)} />
        </main>
      </div>
    </div>
  );
}

export default Home;


