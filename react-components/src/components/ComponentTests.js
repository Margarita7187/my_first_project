import React from 'react';
import { WelcomeMessage, UserCard, Button, Card, Toggle, ConditionalMessage } from './basic/BasicComponents';
import { Counter, LoginForm, ColorPicker, TodoList, SearchBox } from './stateful/StatefulComponents';
import { Timer, WindowSizeTracker, DataFetcher } from './lifecycle/LifecycleComponents';
import { CounterWithHooks, UserProfile, EffectDemo, LocalStorageDemo, FetchDemo, ThemeDemo } from './hooks/HooksComponents';

const ComponentTests = () => {
  const mockUser = {
    name: 'Иван Иванов',
    email: 'ivan@example.com',
    avatar: 'https://via.placeholder.com/80',
    isOnline: true
  };

  return (
    <div className="component-tests">
      <h1>Тестирование React компонентов</h1>
      
      <section>
        <h2>Базовые компоненты</h2>
        
        <WelcomeMessage name="Анна" age={25} />
        
        <UserCard user={mockUser} />
        
        <div>
          <Button variant="primary" size="large">Основная кнопка</Button>
          <Button variant="secondary" size="small">Вторичная кнопка</Button>
          <Button onClick={() => alert('Клик!')}>Кнопка с обработчиком</Button>
        </div>
        
        <Card title="Заголовок карточки">
          <p>Это содержимое карточки. Можно добавить любой контент.</p>
        </Card>
        
        <Toggle>
          <p>Это скрываемый контент. Он появляется/исчезает по клику на кнопку.</p>
        </Toggle>
        
        <div>
          <ConditionalMessage status="success" />
          <ConditionalMessage status="error" />
          <ConditionalMessage status="warning" />
        </div>
      </section>

      <section>
        <h2>Компоненты с состоянием</h2>
        
        <Counter />
        <LoginForm />
        <ColorPicker />
        <TodoList />
        <SearchBox />
      </section>

      <section>
        <h2>Жизненный цикл</h2>
        
        <Timer />
        <WindowSizeTracker />
        <DataFetcher url="https://jsonplaceholder.typicode.com/posts/1" />
      </section>

      <section>
        <h2>Хуки</h2>
        
        <CounterWithHooks />
        <UserProfile />
        <EffectDemo />
        <LocalStorageDemo />
        <FetchDemo />
        <ThemeDemo />
      </section>
    </div>
  );
};

export default ComponentTests;