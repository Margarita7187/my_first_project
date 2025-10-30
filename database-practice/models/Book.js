const db = require('../db');

class Book {
  static async findAll(page = 1, limit = 10) {
    try {
      const offset = (page - 1) * limit;
      
      const books = await db('books')
        .select(
          'books.*',
          'authors.name as author_name',
          'categories.name as category_name'
        )
        .leftJoin('authors', 'books.author_id', 'authors.id')
        .leftJoin('categories', 'books.category_id', 'categories.id')
        .limit(limit)
        .offset(offset)
        .orderBy('books.created_at', 'desc');

      const totalCount = await db('books').count('* as count').first();
      
      return {
        books,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: totalCount.count,
          totalPages: Math.ceil(totalCount.count / limit)
        }
      };
    } catch (error) {
      throw new Error(`Ошибка при получении книг: ${error.message}`);
    }
  }

  static async findById(id) {
    try {
      const book = await db('books')
        .select(
          'books.*',
          'authors.name as author_name',
          'categories.name as category_name'
        )
        .leftJoin('authors', 'books.author_id', 'authors.id')
        .leftJoin('categories', 'books.category_id', 'categories.id')
        .where('books.id', id)
        .first();

      if (!book) {
        throw new Error('Книга не найдена');
      }

      return book;
    } catch (error) {
      throw new Error(`Ошибка при поиске книги: ${error.message}`);
    }
  }

  static async create(bookData) {
    try {
      const [id] = await db('books').insert(bookData);
      return await this.findById(id);
    } catch (error) {
      throw new Error(`Ошибка при создании книги: ${error.message}`);
    }
  }

  static async update(id, bookData) {
    try {
      const updated = await db('books')
        .where('id', id)
        .update(bookData);

      if (!updated) {
        throw new Error('Книга не найдена');
      }

      return await this.findById(id);
    } catch (error) {
      throw new Error(`Ошибка при обновлении книги: ${error.message}`);
    }
  }

  static async delete(id) {
    try {
      const deleted = await db('books')
        .where('id', id)
        .del();

      if (!deleted) {
        throw new Error('Книга не найдена');
      }

      return { message: 'Книга успешно удалена' };
    } catch (error) {
      throw new Error(`Ошибка при удалении книги: ${error.message}`);
    }
  }
}

module.exports = Book;