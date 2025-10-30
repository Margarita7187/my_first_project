```markdown
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
   ```

2. **Установите зависимости:**
   ```bash
   npm install express sqlite3 knex
   npm install --save-dev nodemon
   ```

3. **Запустите миграции для создания структуры БД:**
   ```bash
   npx knex migrate:latest
   ```

4. **Заполните базу тестовыми данными:**
   ```bash
   npx knex seed:run
   ```

5. **Запустите приложение:**
   ```bash
   npm run dev
   ```

Приложение будет доступно по адресу: `http://localhost:3000`

## API Endpoints

### Книги (Books)

#### GET /books
Получить список всех книг с пагинацией.

**Параметры запроса:**
- `page` - номер страницы (по умолчанию: 1)
- `limit` - количество записей на странице (по умолчанию: 10)

**Пример ответа:**
```json
{
  "success": true,
  "data": {
    "books": [
      {
        "id": 1,
        "title": "Война и мир",
        "isbn": "978-5-389-00001-1",
        "publication_year": 1869,
        "author_id": 1,
        "category_id": 2,
        "description": "Роман-эпопея Льва Толстого",
        "author_name": "Лев Толстой",
        "category_name": "Роман"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 5,
      "totalPages": 1
    }
  }
}
```

#### GET /books/:id
Получить книгу по ID.

**Пример запроса:**
```bash
GET /books/1
```

#### POST /books
Создать новую книгу.

**Тело запроса:**
```json
{
  "title": "Название книги",
  "isbn": "978-5-389-00006-6",
  "publication_year": 2023,
  "author_id": 1,
  "category_id": 1,
  "description": "Описание книги"
}
```

#### PUT /books/:id
Обновить информацию о книге.

**Тело запроса:**
```json
{
  "title": "Обновленное название",
  "description": "Обновленное описание"
}
```

#### DELETE /books/:id
Удалить книгу.

**Пример запроса:**
```bash
DELETE /books/1
```

### Авторы (Authors)

#### GET /authors
Получить список всех авторов с пагинацией.

**Параметры запроса:**
- `page` - номер страницы (по умолчанию: 1)
- `limit` - количество записей на странице (по умолчанию: 10)

**Пример ответа:**
```json
{
  "success": true,
  "data": {
    "authors": [
      {
        "id": 1,
        "name": "Лев Толстой",
        "bio": "Русский писатель, философ",
        "created_at": "2023-11-20 10:00:00",
        "updated_at": "2023-11-20 10:00:00"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 4,
      "totalPages": 1
    }
  }
}
```

#### GET /authors/:id
Получить автора по ID вместе с его книгами.

**Пример запроса:**
```bash
GET /authors/1
```

**Пример ответа:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Лев Толстой",
    "bio": "Русский писатель, философ",
    "created_at": "2023-11-20 10:00:00",
    "updated_at": "2023-11-20 10:00:00",
    "books": [
      {
        "id": 1,
        "title": "Война и мир",
        "isbn": "978-5-389-00001-1",
        "publication_year": 1869,
        "author_id": 1,
        "category_id": 2,
        "description": "Роман-эпопея Льва Толстого",
        "category_name": "Роман"
      }
    ]
  }
}
```

#### POST /authors
Создать нового автора.

**Тело запроса:**
```json
{
  "name": "Новый автор",
  "bio": "Биография автора"
}
```

## Тестовые данные

После выполнения команды `npx knex seed:run` база будет заполнена тестовыми данными:

- **4 автора:** Лев Толстой, Федор Достоевский, Айзек Азимов, Джоэл Спольски
- **4 категории:** Фантастика, Роман, Детектив, Программирование
- **5 книг:** "Война и мир", "Преступление и наказание", "Я, робот", "Основание", "Джоэл о программировании"

## Структура проекта

```
database-practice/
├── models/
│   ├── Book.js
│   └── Author.js
├── migrations/
│   ├── XXXX_create_authors_table.js
│   ├── XXXX_create_categories_table.js
│   └── XXXX_create_books_table.js
├── seeds/
│   └── 01_sample_data.js
├── app.js
├── db.js
├── knexfile.js
└── package.json
```
