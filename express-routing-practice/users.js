const express = require('express');
const router = express.Router();

// Временное хранилище данных (в реальном приложении - база данных)
let users = [
    { id: 1, name: 'Иван Иванов', email: 'ivan@example.com', age: 25 },
    { id: 2, name: 'Мария Петрова', email: 'maria@example.com', age: 30 },
    { id: 3, name: 'Петр Сидоров', email: 'petr@example.com', age: 28 }
];

// Middleware для конкретного роутера
router.use((req, res, next) => {
    console.log('Users router activated');
    next();
});

// Получить всех пользователей
router.get('/', (req, res) => {
    res.json({
        success: true,
        data: users,
        total: users.length
    });
});

// Получить пользователя по ID
router.get('/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);
    
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'Пользователь не найден'
        });
    }
    
    res.json({
        success: true,
        data: user
    });
});

// Создать нового пользователя
router.post('/', (req, res) => {
    const { name, email, age } = req.body;
    
    if (!name || !email) {
        return res.status(400).json({
            success: false,
            message: 'Имя и email обязательны'
        });
    }
    
    const newUser = {
        id: users.length + 1,
        name,
        email,
        age: age || null
    };
    
    users.push(newUser);
    
    res.status(201).json({
        success: true,
        message: 'Пользователь создан',
        data: newUser
    });
});

// Обновить пользователя
router.put('/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'Пользователь не найден'
        });
    }
    
    const { name, email, age } = req.body;
    users[userIndex] = {
        ...users[userIndex],
        ...(name && { name }),
        ...(email && { email }),
        ...(age && { age })
    };
    
    res.json({
        success: true,
        message: 'Пользователь обновлен',
        data: users[userIndex]
    });
});

// Удалить пользователя
router.delete('/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'Пользователь не найден'
        });
    }
    
    const deletedUser = users.splice(userIndex, 1)[0];
    
    res.json({
        success: true,
        message: 'Пользователь удален',
        data: deletedUser
    });
});

module.exports = router;