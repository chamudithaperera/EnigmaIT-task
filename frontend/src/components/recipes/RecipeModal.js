import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchMeal } from '../../api/recipeApi';

function RecipeModal({ mealId, onClose }) {
  const [meal, setMeal] = useState(null);
  useEffect(() => {
    let mounted = true;
    async function load() {
      if (!mealId) return;
      const data = await fetchMeal(mealId);
      if (mounted) setMeal(data);
    }
    load();
    return () => { mounted = false; };
  }, [mealId]);

  return (
    <AnimatePresence>
      {mealId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{ background: '#fff', borderRadius: 16, width: 'min(720px, 95vw)', overflow: 'hidden' }}
            onClick={(e) => e.stopPropagation()}
          >
            {meal ? (
              <div>
                <img src={meal.strMealThumb} alt={meal.strMeal} style={{ width: '100%', height: 280, objectFit: 'cover' }} />
                <div style={{ padding: 16 }}>
                  <h3 style={{ marginBottom: 8 }}>{meal.strMeal}</h3>
                  <p style={{ color: '#475569', lineHeight: 1.6 }}>{meal.strInstructions?.slice(0, 400)}...</p>
                </div>
              </div>
            ) : (
              <div style={{ padding: 24 }}>Loading...</div>
            )}
            <div style={{ padding: 16, display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={onClose} style={{ padding: '10px 14px', borderRadius: 10, border: '1px solid #e5e7eb', background: '#f3f4f6' }}>Close</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default RecipeModal;


