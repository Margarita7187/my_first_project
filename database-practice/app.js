const express = require('express');
const Book = require('./models/Book');
const Author = require('./models/Author');

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/books', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const result = await Book.findAll(page, limit);
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.json({
      success: true,
      data: book
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message
    });
  }
});

app.post('/books', async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json({
      success: true,
      data: book
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

app.put('/books/:id', async (req, res) => {
  try {
    const book = await Book.update(req.params.id, req.body);
    res.json({
      success: true,
      data: book
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

app.delete('/books/:id', async (req, res) => {
  try {
    const result = await Book.delete(req.params.id);
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message
    });
  }
});

app.get('/authors', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const result = await Author.findAll(page, limit);
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.get('/authors/:id', async (req, res) => {
  try {
    const author = await Author.findByIdWithBooks(req.params.id);
    res.json({
      success: true,
      data: author
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message
    });
  }
});

app.post('/authors', async (req, res) => {
  try {
    const author = await Author.create(req.body);
    res.status(201).json({
      success: true,
      data: author
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});