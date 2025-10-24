import React, { Component } from 'react';
import './StatefulComponents.css';

// ЗАДАНИЕ 3
class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  decrement = () => {
    this.setState({ count: this.state.count - 1 });
  };

  render() {
    return (
      <div className="counter">
        <h3>Счетчик: {this.state.count}</h3>
        <button onClick={this.decrement}>-</button>
        <button onClick={this.increment}>+</button>
      </div>
    );
  }
}

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  validate = () => {
    const errors = {};
    if (!this.state.email) {
      errors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(this.state.email)) {
      errors.email = 'Некорректный email';
    }
    if (!this.state.password) {
      errors.password = 'Пароль обязателен';
    } else if (this.state.password.length < 6) {
      errors.password = 'Пароль должен быть не менее 6 символов';
    }
    return errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    if (Object.keys(errors).length === 0) {
      alert('Форма отправлена!');
      this.setState({ email: '', password: '', errors: {} });
    } else {
      this.setState({ errors });
    }
  };

  render() {
    return (
      <form className="login-form" onSubmit={this.handleSubmit}>
        <h3>Форма входа</h3>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          {this.state.errors.email && <span className="error">{this.state.errors.email}</span>}
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            value={this.state.password}
            onChange={this.handleChange}
          />
          {this.state.errors.password && <span className="error">{this.state.errors.password}</span>}
        </div>
        <button type="submit">Войти</button>
      </form>
    );
  }
}

class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedColor: null,
      colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']
    };
  }

  selectColor = (color) => {
    this.setState({ selectedColor: color });
  };

  render() {
    return (
      <div className="color-picker">
        <h3>Выбор цвета</h3>
        <div className="color-options">
          {this.state.colors.map((color, index) => (
            <div
              key={index}
              className={`color-option ${this.state.selectedColor === color ? 'selected' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => this.selectColor(color)}
            />
          ))}
        </div>
        {this.state.selectedColor && (
          <div className="selected-color">
            Выбранный цвет: <span style={{ color: this.state.selectedColor }}>■</span> {this.state.selectedColor}
          </div>
        )}
      </div>
    );
  }
}

// ЗАДАНИЕ 4
class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newTodo: ''
    };
  }

  handleInputChange = (e) => {
    this.setState({ newTodo: e.target.value });
  };

  addTodo = () => {
    if (this.state.newTodo.trim()) {
      this.setState(prevState => ({
        todos: [...prevState.todos, { 
          id: Date.now(), 
          text: prevState.newTodo, 
          completed: false 
        }],
        newTodo: ''
      }));
    }
  };

  toggleTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    }));
  };

  deleteTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id)
    }));
  };

  render() {
    return (
      <div className="todo-list">
        <h3>Список задач</h3>
        <div className="todo-input">
          <input
            type="text"
            value={this.state.newTodo}
            onChange={this.handleInputChange}
            placeholder="Новая задача"
          />
          <button onClick={this.addTodo}>Добавить</button>
        </div>
        <ul>
          {this.state.todos.map(todo => (
            <li key={todo.id} className={todo.completed ? 'completed' : ''}>
              <span onClick={() => this.toggleTodo(todo.id)}>{todo.text}</span>
              <button onClick={() => this.deleteTodo(todo.id)}>Удалить</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: []
    };
  }

  handleSearch = (e) => {
    const query = e.target.value;
    this.setState({ query });

    if (query.trim()) {
      const mockResults = [
        `Результат 1 для "${query}"`,
        `Результат 2 для "${query}"`,
        `Результат 3 для "${query}"`
      ];
      this.setState({ results: mockResults });
    } else {
      this.setState({ results: [] });
    }
  };

  clearSearch = () => {
    this.setState({ query: '', results: [] });
  };

  render() {
    return (
      <div className="search-box">
        <h3>Поиск</h3>
        <div className="search-input">
          <input
            type="text"
            value={this.state.query}
            onChange={this.handleSearch}
            placeholder="Введите запрос..."
          />
          <button onClick={this.clearSearch}>×</button>
        </div>
        {this.state.results.length > 0 && (
          <ul className="search-results">
            {this.state.results.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export { Counter, LoginForm, ColorPicker, TodoList, SearchBox };