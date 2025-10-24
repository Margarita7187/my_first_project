import React from 'react';
import './BasicComponents.css';

// ЗАДАНИЕ 1
const WelcomeMessage = ({ name, age }) => {
  return (
    <div className="welcome-message">
      <h2>Добро пожаловать, {name}!</h2>
      <p>Вам {age} лет.</p>
    </div>
  );
};

const UserCard = ({ user }) => {
  return (
    <div className={`user-card ${user.isOnline ? 'online' : 'offline'}`}>
      <img src={user.avatar} alt={user.name} className="avatar" />
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <span className="status">{user.isOnline ? 'Online' : 'Offline'}</span>
    </div>
  );
};

const Button = ({ variant = 'primary', size = 'medium', onClick, children }) => {
  return (
    <button 
      className={`btn btn-${variant} btn-${size}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// ЗАДАНИЕ 2
const Card = ({ title, children }) => {
  return (
    <div className="card">
      {title && <h3 className="card-title">{title}</h3>}
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

const Toggle = ({ children }) => {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <div className="toggle">
      <Button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? 'Скрыть' : 'Показать'}
      </Button>
      {isVisible && <div className="toggle-content">{children}</div>}
    </div>
  );
};

const ConditionalMessage = ({ status }) => {
  const getMessage = () => {
    switch (status) {
      case 'success':
        return { text: 'Операция выполнена успешно!', className: 'success' };
      case 'error':
        return { text: 'Произошла ошибка!', className: 'error' };
      case 'warning':
        return { text: 'Внимание! Требуется проверка.', className: 'warning' };
      default:
        return { text: 'Неизвестный статус', className: 'default' };
    }
  };

  const message = getMessage();

  return (
    <div className={`message ${message.className}`}>
      {message.text}
    </div>
  );
};

export { WelcomeMessage, UserCard, Button, Card, Toggle, ConditionalMessage };