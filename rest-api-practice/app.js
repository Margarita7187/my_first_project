const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware для парсинга JSON
app.use(express.json());

// Middleware для логирования
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Временное хранилище данных (в реальном приложении - база данных)
let books = [
    {
        id: 1,
        title: 'Война и мир',
        author: 'Лев Толстой',
        genre: 'Роман',
        year: 1869,
        isbn: '978-5-699-12014-7',
        pages: 1225
    },
    {
        id: 2,
        title: 'Преступление и наказание',
        author: 'Федор Достоевский',
        genre: 'Роман',
        year: 1866,
        isbn: '978-5-17-090675-9',
        pages: 608
    },
    {
        id: 3,
        title: 'Мастер и Маргарита',
        author: 'Михаил Булгаков',
        genre: 'Фантастика',
        year: 1967,
        isbn: '978-5-389-02613-5',
        pages: 480
    }
];

// Базовый маршрут
app.get('/', (req, res) => {
    res.json({
        message: 'REST API для управления книгами',
        version: '1.0.0',
        endpoints: {
            'GET /api/books': 'Получить все книги',
            'GET /api/books/:id': 'Получить книгу по ID',
            'POST /api/books': 'Создать новую книгу',
            'PUT /api/books/:id': 'Полное обновление книги',
            'PATCH /api/books/:id': 'Частичное обновление книги',
            'DELETE /api/books/:id': 'Удалить книгу'
        }
    });
});

// GET /api/books - возвращает все книги с поддержкой фильтрации и пагинации
app.get('/api/books', (req, res) => {
    try {
        let filteredBooks = [...books];
        
        // Фильтрация по автору
        if (req.query.author) {
            filteredBooks = filteredBooks.filter(book => 
                book.author.toLowerCase().includes(req.query.author.toLowerCase())
            );
        }
        
        // Фильтрация по жанру
        if (req.query.genre) {
            filteredBooks = filteredBooks.filter(book => 
                book.genre.toLowerCase().includes(req.query.genre.toLowerCase())
            );
        }
        
        // Фильтрация по году
        if (req.query.year) {
            filteredBooks = filteredBooks.filter(book => 
                book.year === parseInt(req.query.year)
            );
        }
        
        // Пагинация
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        
        const result = {
            success: true,
            data: filteredBooks.slice(startIndex, endIndex),
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(filteredBooks.length / limit),
                totalItems: filteredBooks.length,
                itemsPerPage: limit
            },
            filters: req.query
        };
        
        res.json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Ошибка при получении книг',
            error: error.message
        });
    }
});

// GET /api/books/:id - возвращает книгу по ID
app.get('/api/books/:id', (req, res) => {
    try {
        const bookId = parseInt(req.params.id);
        const book = books.find(b => b.id === bookId);
        
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Книга не найдена'
            });
        }
        
        res.json({
            success: true,
            data: book
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Ошибка при получении книги',
            error: error.message
        });
    }
});

// POST /api/books - создание новой книги
app.post('/api/books', (req, res) => {
    try {
        const { title, author, genre, year, isbn, pages } = req.body;
        
        // Валидация обязательных полей
        if (!title || !author) {
            return res.status(400).json({
                success: false,
                message: 'Название и автор обязательны'
            });
        }
        
        // Проверка уникальности ISBN
        if (isbn) {
            const existingBook = books.find(b => b.isbn === isbn);
            if (existingBook) {
                return res.status(400).json({
                    success: false,
                    message: 'Книга с таким ISBN уже существует'
                });
            }
        }
        
        // Создание новой книги
        const newBook = {
            id: books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1,
            title,
            author,
            genre: genre || 'Не указан',
            year: year || null,
            isbn: isbn || null,
            pages: pages || null
        };
        
        books.push(newBook);
        
        res.status(201).json({
            success: true,
            message: 'Книга успешно создана',
            data: newBook
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Ошибка при создании книги',
            error: error.message
        });
    }
});

// PUT /api/books/:id - полное обновление книги
app.put('/api/books/:id', (req, res) => {
    try {
        const bookId = parseInt(req.params.id);
        const bookIndex = books.findIndex(b => b.id === bookId);
        
        if (bookIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Книга не найдена'
            });
        }
        
        const { title, author, genre, year, isbn, pages } = req.body;
        
        // Валидация обязательных полей для полного обновления
        if (!title || !author) {
            return res.status(400).json({
                success: false,
                message: 'Название и автор обязательны для полного обновления'
            });
        }
        
        // Проверка уникальности ISBN (исключая текущую книгу)
        if (isbn) {
            const existingBook = books.find(b => b.isbn === isbn && b.id !== bookId);
            if (existingBook) {
                return res.status(400).json({
                    success: false,
                    message: 'Книга с таким ISBN уже существует'
                });
            }
        }
        
        // Полное обновление книги
        books[bookIndex] = {
            id: bookId,
            title,
            author,
            genre: genre || 'Не указан',
            year: year || null,
            isbn: isbn || null,
            pages: pages || null
        };
        
        res.json({
            success: true,
            message: 'Книга полностью обновлена',
            data: books[bookIndex]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Ошибка при обновлении книги',
            error: error.message
        });
    }
});

// PATCH /api/books/:id - частичное обновление книги
app.patch('/api/books/:id', (req, res) => {
    try {
        const bookId = parseInt(req.params.id);
        const bookIndex = books.findIndex(b => b.id === bookId);
        
        if (bookIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Книга не найдена'
            });
        }
        
        const { title, author, genre, year, isbn, pages } = req.body;
        
        // Проверка уникальности ISBN (исключая текущую книгу)
        if (isbn) {
            const existingBook = books.find(b => b.isbn === isbn && b.id !== bookId);
            if (existingBook) {
                return res.status(400).json({
                    success: false,
                    message: 'Книга с таким ISBN уже существует'
                });
            }
        }
        
        // Частичное обновление (только переданные поля)
        books[bookIndex] = {
            ...books[bookIndex],
            ...(title && { title }),
            ...(author && { author }),
            ...(genre && { genre }),
            ...(year && { year }),
            ...(isbn && { isbn }),
            ...(pages && { pages })
        };
        
        res.json({
            success: true,
            message: 'Книга частично обновлена',
            data: books[bookIndex]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Ошибка при обновлении книги',
            error: error.message
        });
    }
});

// DELETE /api/books/:id - удаление книги
app.delete('/api/books/:id', (req, res) => {
    try {
        const bookId = parseInt(req.params.id);
        const bookIndex = books.findIndex(b => b.id === bookId);
        
        if (bookIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Книга не найдена'
            });
        }
        
        const deletedBook = books.splice(bookIndex, 1)[0];
        
        res.json({
            success: true,
            message: 'Книга успешно удалена',
            data: deletedBook
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Ошибка при удалении книги',
            error: error.message
        });
    }
});

// Обработка несуществующих маршрутов
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Маршрут не найден',
        requestedUrl: req.originalUrl
    });
});

// Централизованная обработка ошибок
app.use((err, req, res, next) => {
    console.error('Ошибка сервера:', err.stack);
    
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