import React, { useState, useEffect, useCallback } from 'react';

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setStoredValue = useCallback((newValue) => {
    try {
      setValue(newValue);
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key]);

  return [value, setStoredValue];
};

const useToggle = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);
  
  const toggle = useCallback(() => {
    setValue(prev => !prev);
  }, []);

  return [value, toggle];
};

const CustomHooks = () => {
  const [name, setName] = useLocalStorage('userName', '');
  const [isOn, toggleIsOn] = useToggle(false);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h2>Custom Hooks</h2>
      
      <div>
        <h3>useLocalStorage</h3>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name (saved in localStorage)"
        />
        <p>Hello, {name || 'stranger'}! (This will persist after refresh)</p>
      </div>

      <div>
        <h3>useToggle</h3>
        <button onClick={toggleIsOn}>
          {isOn ? 'Turn Off' : 'Turn On'}
        </button>
        <p>Status: {isOn ? 'ON' : 'OFF'}</p>
      </div>
    </div>
  );
};

export default CustomHooks;