import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>404 - Страница не найдена</h1>
      <p>Извините, запрашиваемая страница не существует.</p>
      <Link to="/" style={{ color: '#007bff', textDecoration: 'none' }}>
        Вернуться на главную
      </Link>
    </div>
  );
};

export default NotFound;