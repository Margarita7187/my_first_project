const http = require('http');

// Создание HTTP-сервера
const server = http.createServer((req, res) => {
    const { method, url } = req;
    
    // Установка заголовков CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    
    // Обработка различных маршрутов
    if (url === '/' && method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify({ 
            message: 'Добро пожаловать на сервер Node.js!',
            status: 'success'
        }));
    }
    else if (url === '/api/users' && method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify({
            users: [
                { id: 1, name: 'Иван', email: 'ivan@example.com' },
                { id: 2, name: 'Мария', email: 'maria@example.com' },
                { id: 3, name: 'Петр', email: 'petr@example.com' }
            ]
        }));
    }
    else if (url === '/api/products' && method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify({
            products: [
                { id: 1, name: 'Ноутбук', price: 50000 },
                { id: 2, name: 'Смартфон', price: 25000 },
                { id: 3, name: 'Планшет', price: 15000 }
            ]
        }));
    }
    else if (url.startsWith('/api/user/') && method === 'GET') {
        const userId = url.split('/')[3];
        res.writeHead(200);
        res.end(JSON.stringify({
            id: parseInt(userId),
            name: `Пользователь ${userId}`,
            email: `user${userId}@example.com`
        }));
    }
    else if (url === '/api/data' && method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const data = JSON.parse(body);
            res.writeHead(201);
            res.end(JSON.stringify({
                message: 'Данные успешно получены',
                received: data,
                id: Math.floor(Math.random() * 1000)
            }));
        });
    }
    else {
        res.writeHead(404);
        res.end(JSON.stringify({ 
            error: 'Страница не найдена',
            status: 'error'
        }));
    }
});

// Запуск сервера
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
    console.log(`Доступен по адресу: http://localhost:${PORT}`);
});