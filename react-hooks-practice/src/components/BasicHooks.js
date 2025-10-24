import React, { useState, useEffect } from 'react';

const BasicHooks = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    document.title = `Count: ${count}`;
    return () => {
      document.title = 'React App';
    };
  }, [count]);

  useEffect(() => {
    console.log('Component mounted');
    return () => {
      console.log('Component will unmount');
    };
  }, []);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h2>Basic Hooks</h2>
      
      <div>
        <h3>useState</h3>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>+</button>
        <button onClick={() => setCount(count - 1)}>-</button>
        
        <div>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Enter your name"
          />
          <p>Hello, {name || 'stranger'}!</p>
        </div>
        
        <button onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? 'Hide' : 'Show'} Message
        </button>
        {isVisible && <p>This message is visible!</p>}
      </div>
    </div>
  );
};

export default BasicHooks;