import React from 'react';
import { Link } from 'react-router-dom';

const Products = () => {
  const products = [
    { id: 1, name: 'Смартфон', price: 29999 },
    { id: 2, name: 'Ноутбук', price: 59999 },
    { id: 3, name: 'Наушники', price: 4999 },
    { id: 4, name: 'Планшет', price: 24999 }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1>Товары</h1>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
        gap: '20px', 
        marginTop: '20px' 
      }}>
        {products.map(product => (
          <div key={product.id} style={{ 
            border: '1px solid #ddd', 
            padding: '15px', 
            borderRadius: '5px', 
            backgroundColor: '#f9f9f9' 
          }}>
            <h3>{product.name}</h3>
            <p>Цена: {product.price} руб.</p>
            <Link 
              to={`/products/${product.id}`}
              style={{ color: '#007bff', textDecoration: 'none' }}
            >
              Подробнее
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;