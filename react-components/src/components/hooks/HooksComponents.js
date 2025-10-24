import React, { useState, useEffect, useContext, createContext } from 'react';
import './HooksComponents.css';

// ЗАДАНИЕ 6
const CounterWithHooks = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="counter-hooks">
      <h3>Счетчик: {count}</h3>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(0)}>Сброс</button>
    </div>
  );
};

const UserProfile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    bio: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Профиль сохранен!');
  };

  return (
    <div className="user-profile">
      <h3>Редактирование профиля</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Имя:</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Биография:</label>
          <textarea
            name="bio"
            value={user.bio}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Сохранить</button>
      </form>
      <div className="profile-preview">
        <h4>Предпросмотр:</h4>
        <p><strong>Имя:</strong> {user.name || 'Не указано'}</p>
        <p><strong>Email:</strong> {user.email || 'Не указан'}</p>
        <p><strong>Биография:</strong> {user.bio || 'Не указана'}</p>
      </div>
    </div>
  );
};

const EffectDemo = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  useEffect(() => {
    console.log('Компонент смонтирован или обновлен');
  });

  useEffect(() => {
    console.log('Компонент смонтирован');
    
    return () => {
      console.log('Компонент будет размонтирован');
    };
  }, []);

  useEffect(() => {
    console.log(`Count изменился: ${count}`);
  }, [count]);

  useEffect(() => {
    console.log(`Name изменился: ${name}`);
  }, [name]);

  return (
    <div className="effect-demo">
      <h3>Демо useEffect</h3>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Увеличить count</button>
      
      <div>
        <input
          type="text"
          placeholder="Введите имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      
      <p>Откройте консоль для просмотра эффектов</p>
    </div>
  );
};

// ЗАДАНИЕ 7
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Ошибка чтения localStorage ключа "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Ошибка записи в localStorage ключа "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};

const LocalStorageDemo = () => {
  const [name, setName] = useLocalStorage('userName', '');

  return (
    <div className="local-storage-demo">
      <h3>Демо useLocalStorage</h3>
      <input
        type="text"
        placeholder="Введите имя для сохранения"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <p>Сохраненное имя: {name}</p>
      <button onClick={() => setName('')}>Очистить</button>
    </div>
  );
};

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) throw new Error('Ошибка загрузки');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

const FetchDemo = () => {
  const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/posts/1');

  return (
    <div className="fetch-demo">
      <h3>Демо useFetch</h3>
      {loading && <p>Загрузка...</p>}
      {error && <p className="error">Ошибка: {error}</p>}
      {data && (
        <div>
          <h4>{data.title}</h4>
          <p>{data.body}</p>
        </div>
      )}
    </div>
  );
};

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`theme-wrapper ${theme}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="theme-toggle">
      <h3>Текущая тема: {theme === 'light' ? 'Светлая' : 'Темная'}</h3>
      <button onClick={toggleTheme}>
        Переключить на {theme === 'light' ? 'темную' : 'светлую'} тему
      </button>
    </div>
  );
};

const ThemeDemo = () => {
  return (
    <ThemeProvider>
      <div className="theme-demo">
        <h3>Демо useContext с темой</h3>
        <ThemeToggle />
        <p>Этот текст меняет цвет в зависимости от темы</p>
      </div>
    </ThemeProvider>
  );
};

export { 
  CounterWithHooks, 
  UserProfile, 
  EffectDemo, 
  LocalStorageDemo, 
  FetchDemo, 
  ThemeDemo 
};