const express = require('express');
const router = express.Router();

// In-memory storage (в реальном приложении используйте БД)
let items = [];
let currentId = 1;

// GET /api/items - Get all items
router.get('/', (req, res) => {
  try {
    res.json({
      success: true,
      data: items,
      count: items.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// GET /api/items/:id - Get single item
router.get('/:id', (req, res) => {
  try {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }
    res.json({
      success: true,
      data: item
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// POST /api/items - Create new item
router.post('/', (req, res) => {
  try {
    const { title, description } = req.body;
    
    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Title is required'
      });
    }

    const newItem = {
      id: currentId++,
      title,
      description: description || '',
      completed: false,
      createdAt: new Date().toISOString()
    };

    items.push(newItem);

    res.status(201).json({
      success: true,
      data: newItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// PUT /api/items/:id - Update item
router.put('/:id', (req, res) => {
  try {
    const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
    
    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    const { title, description, completed } = req.body;

    items[itemIndex] = {
      ...items[itemIndex],
      title: title || items[itemIndex].title,
      description: description !== undefined ? description : items[itemIndex].description,
      completed: completed !== undefined ? completed : items[itemIndex].completed
    };

    res.json({
      success: true,
      data: items[itemIndex]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// DELETE /api/items/:id - Delete item
router.delete('/:id', (req, res) => {
  try {
    const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
    
    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    items.splice(itemIndex, 1);

    res.json({
      success: true,
      message: 'Item deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;