import React from 'react';

function CategoryFilter({ categories, active, onSelect }) {
  return (
    <aside style={{ width: 260, padding: 24, background: '#fff', borderRight: '1px solid #eee' }}>
      <h2 style={{ marginBottom: 12 }}>Categories</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => onSelect(c)}
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
  );
}

export default CategoryFilter;


