const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Импорт роутеров
const usersRouter = require('./users');
const productsRouter = require('./products');

// Базовые middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware для логирования
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Middleware для CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    
    next();
});

// Базовые маршруты
app.get('/', (req, res) => {
    res.json({
        message: 'Добро пожаловать в Express.js приложение!',
        version: '1.0.0',
        endpoints: [
            '/api/users',
            '/api/products'
        ]
    });
});

app.get('/about', (req, res) => {
    res.json({
        name: 'Express Routing Practice',
        description: 'Учебное приложение для изучения маршрутизации в Express.js',
        author: 'Student',
        features: ['Модульные роутеры', 'CRUD операции', 'Middleware', 'Обработка ошибок']
    });
});

// Подключение модульных роутеров
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);

// Middleware для обработки несуществующих маршрутов (ИСПРАВЛЕННАЯ СТРОКА)
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Маршрут не найден',
        requestedUrl: req.originalUrl
    });
});

// Централизованная обработка ошибок
app.use((err, req, res, next) => {
    console.error('Ошибка:', err.stack);
    
    res.status(500).json({
        success: false,
        message: 'Внутренняя ошибка сервера',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Произошла ошибка'
    });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
    console.log(`Доступен по адресу: http://localhost:${PORT}`);
});