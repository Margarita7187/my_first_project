import React, { Component } from 'react';
import './LifecycleComponents.css';

// ЗАДАНИЕ 5: Методы жизненного цикла
class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 0,
      isRunning: false
    };
  }

  componentDidMount() {
    console.log('Timer mounted');
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  startTimer = () => {
    if (!this.state.isRunning) {
      this.interval = setInterval(() => {
        this.setState(prevState => ({ seconds: prevState.seconds + 1 }));
      }, 1000);
      this.setState({ isRunning: true });
    }
  };

  stopTimer = () => {
    if (this.state.isRunning) {
      clearInterval(this.interval);
      this.setState({ isRunning: false });
    }
  };

  resetTimer = () => {
    clearInterval(this.interval);
    this.setState({ seconds: 0, isRunning: false });
  };

  render() {
    return (
      <div className="timer">
        <h3>Секундомер: {this.state.seconds}с</h3>
        <div className="timer-controls">
          <button onClick={this.startTimer} disabled={this.state.isRunning}>
            Старт
          </button>
          <button onClick={this.stopTimer} disabled={!this.state.isRunning}>
            Стоп
          </button>
          <button onClick={this.resetTimer}>Сброс</button>
        </div>
      </div>
    );
  }
}

class WindowSizeTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };

  render() {
    return (
      <div className="window-size-tracker">
        <h3>Размер окна</h3>
        <p>Ширина: {this.state.width}px</p>
        <p>Высота: {this.state.height}px</p>
      </div>
    );
  }
}

class DataFetcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: false,
      error: null
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.url !== this.props.url) {
      this.fetchData();
    }
  }

  fetchData = async () => {
    this.setState({ loading: true, error: null });
    try {
      const response = await fetch(this.props.url);
      if (!response.ok) throw new Error('Ошибка загрузки');
      const data = await response.json();
      this.setState({ data, loading: false });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  };

  render() {
    const { data, loading, error } = this.state;

    return (
      <div className="data-fetcher">
        <h3>Загрузка данных</h3>
        {loading && <p>Загрузка...</p>}
        {error && <p className="error">Ошибка: {error}</p>}
        {data && (
          <pre>{JSON.stringify(data, null, 2)}</pre>
        )}
      </div>
    );
  }
}

export { Timer, WindowSizeTracker, DataFetcher };