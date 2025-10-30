const bcrypt = require('bcryptjs');
const knex = require('knex')(require('../knexfile').development);

class User {
  static async create(userData) {
    const { email, password, role = 'user' } = userData;
    
    // Хеширование пароля
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);
    
    const [user] = await knex('users')
      .insert({
        email,
        password_hash,
        role,
        created_at: new Date(),
        updated_at: new Date()
      })
      .returning(['id', 'email', 'role', 'created_at']);
    
    return user;
  }

  static async findByEmail(email) {
    return await knex('users')
      .where({ email })
      .first();
  }

  static async findById(id) {
    return await knex('users')
      .where({ id })
      .first();
  }

  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  static async update(id, updateData) {
    updateData.updated_at = new Date();
    
    const [user] = await knex('users')
      .where({ id })
      .update(updateData)
      .returning(['id', 'email', 'role', 'updated_at']);
    
    return user;
  }
}

module.exports = User;