import React, { useState } from 'react';

const UserRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    newsletter: false,
    age: '',
    bio: ''
  });

  const formStyle = {
    border: '1px solid #ddd',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9'
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box'
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px'
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Данные формы:', formData);
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2>Регистрация пользователя</h2>
      
      <div>
        <label>Имя:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          style={inputStyle}
          required
        />
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
          required
        />
      </div>

      <div>
        <label>Пароль:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          style={inputStyle}
          required
        />
      </div>

      <div>
        <label>Подтверждение пароля:</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          style={inputStyle}
          required
        />
      </div>

      <div>
        <label>Пол:</label>
        <label>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={formData.gender === 'male'}
            onChange={handleChange}
          />
          Мужской
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={formData.gender === 'female'}
            onChange={handleChange}
          />
          Женский
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="newsletter"
            checked={formData.newsletter}
            onChange={handleChange}
          />
          Подписка на рассылку
        </label>
      </div>

      <div>
        <label>Возраст:</label>
        <select 
          name="age" 
          value={formData.age} 
          onChange={handleChange} 
          style={inputStyle}
          required
        >
          <option value="">Выберите возраст</option>
          <option value="18-25">18-25</option>
          <option value="26-35">26-35</option>
          <option value="36-45">36-45</option>
          <option value="46+">46+</option>
        </select>
      </div>

      <div>
        <label>О себе:</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          style={inputStyle}
          required
        />
      </div>

      <button type="submit" style={buttonStyle}>Зарегистрироваться</button>
    </form>
  );
};

export default UserRegistrationForm;