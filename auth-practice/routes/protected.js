const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const { authorize } = require('../middleware/roles');

const router = express.Router();

// Доступно только аутентифицированным пользователям
router.get('/profile', authenticateToken, (req, res) => {
  res.json({
    message: 'Доступ к профилю разрешен',
    user: {
      id: req.user.id,
      email: req.user.email,
      role: req.user.role
    }
  });
});

// Доступно только пользователям с ролью 'user'
router.get('/user-dashboard', authenticateToken, authorize('user'), (req, res) => {
  res.json({
    message: 'Добро пожаловать в панель пользователя',
    data: 'Конфиденциальные данные для пользователей'
  });
});

// Доступно только пользователям с ролью 'admin'
router.get('/admin-dashboard', authenticateToken, authorize('admin'), (req, res) => {
  res.json({
    message: 'Добро пожаловать в панель администратора',
    data: 'Секретные данные для администраторов'
  });
});

// Доступно пользователям с ролями 'admin' или 'moderator'
router.get('/moderator-panel', authenticateToken, authorize(['admin', 'moderator']), (req, res) => {
  res.json({
    message: 'Добро пожаловать в панель модератора',
    data: 'Данные для модерации'
  });
});

module.exports = router;