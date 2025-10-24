import React from 'react';
import { useParams, Link } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  
  const products = {
    1: { name: 'Смартфон', price: 29999, description: 'Современный смартфон с отличной камерой' },
    2: { name: 'Ноутбук', price: 59999, description: 'Мощный ноутбук для работы и игр' },
    3: { name: 'Наушники', price: 4999, description: 'Беспроводные наушники с шумоподавлением' },
    4: { name: 'Планшет', price: 24999, description: 'Универсальный планшет для всей семьи' }
  };

  const product = products[id];

  if (!product) {
    return (
      <div style={{ padding: '20px' }}>
        <h2>Товар не найден</h2>
        <Link to="/products" style={{ color: '#007bff', textDecoration: 'none' }}>
          Вернуться к списку товаров
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>{product.name}</h1>
      <p><strong>Цена:</strong> {product.price} руб.</p>
      <p><strong>Описание:</strong> {product.description}</p>
      <Link to="/products" style={{ color: '#007bff', textDecoration: 'none' }}>
        ← Назад к списку товаров
      </Link>
    </div>
  );
};

export default ProductDetail;