# Документация API аутентификации и авторизации

## Описание проекта
REST API для аутентификации и авторизации с использованием JWT токенов, хеширования паролей и системы ролей.

## Быстрый старт

### Установка и запуск
```bash
# Клонирование и установка
mkdir auth-practice
cd auth-practice
npm init -y
npm install express bcryptjs jsonwebtoken knex sqlite3
npm install --save-dev nodemon

# Копирование файлов проекта (модели, роуты, middleware)

# Запуск миграций
npx knex migrate:latest

# Запуск приложения
npm run dev
```

Сервер запускается на http://localhost:3000

## API Endpoints

### Аутентификация

#### POST /api/auth/register
Регистрация нового пользователя.

**Тело запроса:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "role": "user"
}
```

**Ответ:**
```json
{
  "message": "Пользователь успешно зарегистрирован",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### POST /api/auth/login
Вход в систему.

**Тело запроса:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Ответ:**
```json
{
  "message": "Успешный вход в систему",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Защищенные endpoints

#### GET /api/protected/profile
Получить профиль пользователя (требуется аутентификация).

**Заголовок:**
```
Authorization: Bearer ваш_jwt_токен
```

**Ответ:**
```json
{
  "message": "Доступ к профилю разрешен",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "user"
  }
}
```

#### GET /api/protected/user-dashboard
Панель пользователя (требуется роль 'user').

#### GET /api/protected/admin-dashboard
Панель администратора (требуется роль 'admin').

#### GET /api/protected/moderator-panel
Панель модератора (требуется роль 'admin' или 'moderator').

## Тестирование API

### 1. С помощью curl

```bash
# Регистрация
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123", "role": "user"}'

# Логин (сохраните токен из ответа)
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'

# Защищенный endpoint
curl -X GET http://localhost:3000/api/protected/profile \
  -H "Authorization: Bearer ваш_токен"
```

### 2. С помощью Postman

1. **Регистрация:**
   - Method: POST
   - URL: `http://localhost:3000/api/auth/register`
   - Body (raw JSON):
     ```json
     {
       "email": "test@example.com",
       "password": "password123",
       "role": "user"
     }
     ```

2. **Логин:**
   - Method: POST
   - URL: `http://localhost:3000/api/auth/login`
   - Body (raw JSON):
     ```json
     {
       "email": "test@example.com",
       "password": "password123"
     }
     ```

3. **Защищенные endpoints:**
   - Method: GET
   - URL: `http://localhost:3000/api/protected/profile`
   - Headers:
     ```
     Authorization: Bearer ваш_jwt_токен
     ```

## Роли и разрешения

- **user**: базовые права доступа
- **admin**: полные права доступа
- **moderator**: права модерации

## Структура JWT токена

```json
{
  "userId": 1,
  "email": "user@example.com",
  "role": "user",
  "iat": 1700000000,
  "exp": 1700086400
}
```

## Обработка ошибок

- **400** - Неверные данные запроса
- **401** - Неавторизованный доступ (отсутствует/неверный токен)
- **403** - Доступ запрещен (недостаточно прав)
- **500** - Внутренняя ошибка сервера

## Безопасность

- Пароли хешируются с помощью bcrypt
- JWT токены имеют срок действия (24 часа)
- Middleware проверяет валидность токенов
- Система ролей ограничивает доступ к ресурсам

## Технические детали

- **База данных**: SQLite
- **Аутентификация**: JWT
- **Хеширование паролей**: bcryptjs
- **Фреймворк**: Express.js
- **Миграции**: Knex.js