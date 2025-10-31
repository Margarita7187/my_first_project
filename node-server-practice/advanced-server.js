const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const querystring = require('querystring');

// Middleware для логирования
function logger(req, res, next) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url} - ${req.headers['user-agent']}`);
    next();
}

// Middleware для парсинга тела запроса
function bodyParser(req, res, next) {
    if (req.method === 'POST' || req.method === 'PUT') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                if (req.headers['content-type'] === 'application/json') {
                    req.body = JSON.parse(body);
                } else {
                    req.body = querystring.parse(body);
                }
            } catch (error) {
                req.body = {};
            }
            next();
        });
    } else {
        next();
    }
}

// Middleware для обслуживания статических файлов
function staticFiles(req, res, next) {
    if (req.method === 'GET' && req.url.startsWith('/static/')) {
        const filePath = path.join(__dirname, req.url);
        const extname = path.extname(filePath).toLowerCase();
        
        const mimeTypes = {
            '.html': 'text/html',
            '.js': 'text/javascript',
            '.css': 'text/css',
            '.json': 'application/json',
            '.png': 'image/png',
            '.jpg': 'image/jpg',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml'
        };

        const contentType = mimeTypes[extname] || 'application/octet-stream';

        fs.readFile(filePath, (error, content) => {
            if (error) {
                if (error.code === 'ENOENT') {
                    res.writeHead(404);
                    res.end('Файл не найден');
                } else {
                    res.writeHead(500);
                    res.end('Ошибка сервера');
                }
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    } else {
        next();
    }
}

// Основная функция обработки запросов
function requestHandler(req, res) {
    // Применяем middleware
    logger(req, res, () => {
        bodyParser(req, res, () => {
            staticFiles(req, res, () => {
                handleRoutes(req, res);
            });
        });
    });
}

// Обработка маршрутов
function handleRoutes(req, res) {
    const { method, url: reqUrl } = req;
    const parsedUrl = url.parse(reqUrl, true);
    const pathname = parsedUrl.pathname;
    
    // Установка заголовков CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json');

    // Обработка preflight запросов
    if (method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Маршруты API
    if (pathname === '/' && method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify({ 
            message: 'Усовершенствованный сервер Node.js с middleware!',
            features: ['Логирование', 'Парсинг тела запроса', 'Статические файлы', 'CORS'],
            status: 'success'
        }));
    }
    else if (pathname === '/api/users' && method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify({
            users: [
                { id: 1, name: 'Анна', email: 'anna@example.com', role: 'admin' },
                { id: 2, name: 'Сергей', email: 'sergey@example.com', role: 'user' },
                { id: 3, name: 'Ольга', email: 'olga@example.com', role: 'user' }
            ],
            total: 3
        }));
    }
    else if (pathname === '/api/users' && method === 'POST') {
        res.writeHead(201);
        res.end(JSON.stringify({
            message: 'Пользователь создан',
            user: {
                id: Date.now(),
                ...req.body
            }
        }));
    }
    else if (pathname.startsWith('/api/users/') && method === 'PUT') {
        const userId = pathname.split('/')[3];
        res.writeHead(200);
        res.end(JSON.stringify({
            message: 'Пользователь обновлен',
            user: {
                id: parseInt(userId),
                ...req.body
            }
        }));
    }
    else if (pathname.startsWith('/api/users/') && method === 'DELETE') {
        const userId = pathname.split('/')[3];
        res.writeHead(200);
        res.end(JSON.stringify({
            message: `Пользователь с ID ${userId} удален`,
            deletedId: parseInt(userId)
        }));
    }
    else if (pathname === '/api/logs' && method === 'GET') {
        // Эндпоинт для просмотра логов (в реальном приложении брать из файла)
        res.writeHead(200);
        res.end(JSON.stringify({
            logs: [
                'Запрос обработан через middleware',
                'Логирование активно',
                'Статические файлы доступны по /static/'
            ]
        }));
    }
    else {
        res.writeHead(404);
        res.end(JSON.stringify({ 
            error: 'Маршрут не найден',
            available_routes: ['/', '/api/users', '/api/logs', '/static/']
        }));
    }
}

// Создание и запуск сервера
const server = http.createServer(requestHandler);

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Усовершенствованный сервер запущен на порту ${PORT}`);
    console.log(`Доступен по адресу: http://localhost:${PORT}`);
    
    // Создаем папку для статических файлов
    const staticDir = path.join(__dirname, 'static');
    if (!fs.existsSync(staticDir)) {
        fs.mkdirSync(staticDir);
        console.log('Создана папка для статических файлов: /static');
    }
});