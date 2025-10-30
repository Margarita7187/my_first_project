const db = require('../db');

class Author {
  static async findAll(page = 1, limit = 10) {
    try {
      const offset = (page - 1) * limit;
      
      const authors = await db('authors')
        .select('*')
        .limit(limit)
        .offset(offset)
        .orderBy('created_at', 'desc');

      const totalCount = await db('authors').count('* as count').first();
      
      return {
        authors,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: totalCount.count,
          totalPages: Math.ceil(totalCount.count / limit)
        }
      };
    } catch (error) {
      throw new Error(`Ошибка при получении авторов: ${error.message}`);
    }
  }

  static async findByIdWithBooks(id) {
    try {
      const author = await db('authors')
        .where('id', id)
        .first();

      if (!author) {
        throw new Error('Автор не найден');
      }

      const books = await db('books')
        .select('books.*', 'categories.name as category_name')
        .leftJoin('categories', 'books.category_id', 'categories.id')
        .where('books.author_id', id)
        .orderBy('books.created_at', 'desc');

      return {
        ...author,
        books
      };
    } catch (error) {
      throw new Error(`Ошибка при поиске автора: ${error.message}`);
    }
  }

  static async create(authorData) {
    try {
      const [id] = await db('authors').insert(authorData);
      return await db('authors').where('id', id).first();
    } catch (error) {
      throw new Error(`Ошибка при создании автора: ${error.message}`);
    }
  }
}

module.exports = Author;