import React from 'react';
import './App.css';
import ComponentTests from './components/ComponentTests';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Практическая работа №15: React компоненты</h1>
        <p>Создание функциональных и классовых компонентов</p>
      </header>
      <main>
        <ComponentTests />
      </main>
    </div>
  );
}

export default App;