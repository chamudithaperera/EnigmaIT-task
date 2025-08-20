import React from 'react';

function CardSkeleton() {
  return (
    <div style={{ background: '#fff', border: '1px solid #eee', borderRadius: 12, overflow: 'hidden' }}>
      <div style={{ width: '100%', height: 140, background: '#f1f5f9' }} />
      <div style={{ padding: 12, height: 20, background: '#f8fafc' }} />
    </div>
  );
}

function RecipeGrid({ items, loading, onSelect }) {
  if (loading) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
      {(items || []).map((m) => (
        <button
          key={m.idMeal}
          onClick={() => onSelect?.(m)}
          style={{ background: '#fff', border: '1px solid #eee', borderRadius: 12, overflow: 'hidden', textAlign: 'left', padding: 0, cursor: 'pointer' }}
        >
          <img src={m.strMealThumb} alt={m.strMeal} style={{ width: '100%', height: 140, objectFit: 'cover' }} />
          <div style={{ padding: 12, fontWeight: 600 }}>{m.strMeal}</div>
        </button>
      ))}
    </div>
  );
}

export default RecipeGrid;


