import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const ContactSuccess = () => {
  const location = useLocation();
  const formData = location.state;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Сообщение отправлено!</h1>
      <p>Спасибо за ваше сообщение, мы свяжемся с вами в ближайшее время.</p>
      
      {formData && (
        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          backgroundColor: '#f9f9f9', 
          border: '1px solid #ddd',
          borderRadius: '5px'
        }}>
          <h2>Данные вашего сообщения:</h2>
          <p><strong>Имя:</strong> {formData.name}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Сообщение:</strong> {formData.message}</p>
        </div>
      )}
      
      <div style={{ marginTop: '20px' }}>
        <Link to="/" style={{ color: '#007bff', textDecoration: 'none' }}>
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
};

export default ContactSuccess;