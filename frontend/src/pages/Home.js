import React, { useEffect, useMemo, useState } from 'react';
import { fetchCategories, fetchByCategory, searchMeals } from '../api/recipeApi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CategoryFilter from '../components/recipes/CategoryFilter';
import RecipeGrid from '../components/recipes/RecipeGrid';
import RecipeModal from '../components/recipes/RecipeModal';

function Home() {
  const user = useSelector((s) => s.auth.user);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState('Pasta');
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState('Italian');
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
      <CategoryFilter categories={filteredCategories} active={active} onSelect={setActive} />
      <main style={{ flex: 1, padding: 24 }}>
        <h2 style={{ marginBottom: 16 }}>Recipes</h2>
        <form onSubmit={onSearch} style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ flex: 1, padding: '12px 14px', borderRadius: 10, border: '1px solid #e5e7eb' }}
          />
          <button type="submit" style={{ background: '#f97360', color: '#fff', border: 'none', padding: '12px 16px', borderRadius: 10 }}>
            Search
          </button>
        </form>

        {error && <div style={{ color: '#b91c1c', marginBottom: 12 }}>{error}</div>}
        <RecipeGrid items={recipes} loading={loading} onSelect={(m) => setOpenId(m.idMeal)} />
        <RecipeModal mealId={openId} onClose={() => setOpenId(null)} />
      </main>
    </div>
  );
}

export default Home;


