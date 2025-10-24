import React, { useState } from 'react';

const UserRegistrationFormWithValidation = () => {
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

  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Имя обязательно';
    if (!formData.email) newErrors.email = 'Email обязателен';
    else if (!validateEmail(formData.email)) newErrors.email = 'Некорректный формат email';
    if (!formData.password) newErrors.password = 'Пароль обязателен';
    else if (formData.password.length < 8) newErrors.password = 'Пароль должен содержать минимум 8 символов';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Подтверждение пароля обязательно';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Пароли не совпадают';
    if (!formData.gender) newErrors.gender = 'Выберите пол';
    if (!formData.age) newErrors.age = 'Выберите возраст';
    if (!formData.bio.trim()) newErrors.bio = 'Расскажите о себе';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Данные формы:', formData);
      alert('Форма успешно отправлена!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="registration-form">
      <h2>Регистрация пользователя с валидацией</h2>
      
      <div>
        <label>Имя:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div>
        <label>Пароль:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>

      <div>
        <label>Подтверждение пароля:</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
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
        {errors.gender && <span className="error">{errors.gender}</span>}
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
        <select name="age" value={formData.age} onChange={handleChange}>
          <option value="">Выберите возраст</option>
          <option value="18-25">18-25</option>
          <option value="26-35">26-35</option>
          <option value="36-45">36-45</option>
          <option value="46+">46+</option>
        </select>
        {errors.age && <span className="error">{errors.age}</span>}
      </div>

      <div>
        <label>О себе:</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
        />
        {errors.bio && <span className="error">{errors.bio}</span>}
      </div>

      <button type="submit">Зарегистрироваться</button>
    </form>
  );
};

export default UserRegistrationFormWithValidation;