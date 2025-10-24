import React, { useReducer, useContext, useCallback, useMemo, useRef, useState } from 'react';

const ThemeContext = React.createContext();

const counterReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    default:
      return state;
  }
};

const AdvancedHooks = () => {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });
  const theme = useContext(ThemeContext);
  const inputRef = useRef(null);
  const renderCount = useRef(0);

  renderCount.current++;

  const handleIncrement = useCallback(() => {
    dispatch({ type: 'INCREMENT' });
  }, []);

  const handleDecrement = useCallback(() => {
    dispatch({ type: 'DECREMENT' });
  }, []);

  const focusInput = useCallback(() => {
    inputRef.current.focus();
  }, []);

  const expensiveValue = useMemo(() => {
    console.log('Calculating expensive value...');
    return state.count * 100;
  }, [state.count]);

  return (
    <div style={{ 
      padding: '20px', 
      border: '1px solid #ccc', 
      margin: '10px',
      backgroundColor: theme === 'dark' ? '#333' : '#fff',
      color: theme === 'dark' ? '#fff' : '#000'
    }}>
      <h2>Advanced Hooks</h2>
      
      <div>
        <h3>useReducer</h3>
        <p>Count: {state.count}</p>
        <button onClick={handleIncrement}>+</button>
        <button onClick={handleDecrement}>-</button>
      </div>

      <div>
        <h3>useRef</h3>
        <input ref={inputRef} type="text" placeholder="Focus me" />
        <button onClick={focusInput}>Focus Input</button>
        <p>Component rendered {renderCount.current} times</p>
      </div>

      <div>
        <h3>useMemo</h3>
        <p>Expensive calculation: {expensiveValue}</p>
      </div>
    </div>
  );
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  return (
    <ThemeContext.Provider value={theme}>
      <div>
        <button onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
        </button>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export default AdvancedHooks;