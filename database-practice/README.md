# Library Database Application

Практическая работа №22: Работа с базой данных в Node.js

## Структура базы данных

### Таблицы

#### Таблица `authors` (Авторы)
- `id` (INTEGER, PRIMARY KEY, AUTOINCREMENT) - уникальный идентификатор
- `name` (TEXT, NOT NULL) - имя автора
- `bio` (TEXT) - биография автора
- `created_at` (DATETIME) - дата создания записи
- `updated_at` (DATETIME) - дата обновления записи

#### Таблица `categories` (Категории)
- `id` (INTEGER, PRIMARY KEY, AUTOINCREMENT) - уникальный идентификатор
- `name` (TEXT, NOT NULL, UNIQUE) - название категории
- `description` (TEXT) - описание категории
- `created_at` (DATETIME) - дата создания записи
- `updated_at` (DATETIME) - дата обновления записи

#### Таблица `books` (Книги)
- `id` (INTEGER, PRIMARY KEY, AUTOINCREMENT) - уникальный идентификатор
- `title` (TEXT, NOT NULL) - название книги
- `isbn` (TEXT, UNIQUE) - ISBN книги
- `publication_year` (INTEGER) - год публикации
- `author_id` (INTEGER, NOT NULL) - идентификатор автора (внешний ключ)
- `category_id` (INTEGER) - идентификатор категории (внешний ключ)
- `description` (TEXT) - описание книги
- `created_at` (DATETIME) - дата создания записи
- `updated_at` (DATETIME) - дата обновления записи

### Связи между таблицами

- **books.author_id** → **authors.id** (CASCADE DELETE) - каскадное удаление
- **books.category_id** → **categories.id** (SET NULL DELETE) - установка NULL при удалении

## Установка и запуск

### Предварительные требования

- Node.js (версия 14 или выше)
- npm

### Инструкции по установке

1. **Клонируйте или создайте папку проекта:**
   ```bash
   mkdir database-practice
   cd database-practice

2. **Установите зависимости:**
   ```bash
   npm install express sqlite3 knex
   npm install --save-dev nodemon

3. **Запустите миграции для создания структуры БД:**
   ```bash
   npx knex migrate:latest

4. **Заполните базу тестовыми данными:**
   ```bash
   npx knex seed:run

5. **Запустите приложение:**
   ```bash
   npm run dev