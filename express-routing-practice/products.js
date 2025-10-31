const express = require('express');
const router = express.Router();

// Временное хранилище данных
let products = [
    { id: 1, name: 'Ноутбук', price: 50000, category: 'Электроника', inStock: true },
    { id: 2, name: 'Смартфон', price: 25000, category: 'Электроника', inStock: true },
    { id: 3, name: 'Наушники', price: 5000, category: 'Аксессуары', inStock: false }
];

// Middleware для обработки параметра ID
router.param('id', (req, res, next, id) => {
    const productId = parseInt(id);
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Товар не найден'
        });
    }
    
    req.product = product;
    next();
});

// Получить все товары с поддержкой query-параметров
router.get('/', (req, res) => {
    let filteredProducts = [...products];
    
    // Фильтрация по категории
    if (req.query.category) {
        filteredProducts = filteredProducts.filter(
            p => p.category.toLowerCase() === req.query.category.toLowerCase()
        );
    }
    
    // Фильтрация по наличию
    if (req.query.inStock) {
        const inStock = req.query.inStock === 'true';
        filteredProducts = filteredProducts.filter(p => p.inStock === inStock);
    }
    
    res.json({
        success: true,
        data: filteredProducts,
        total: filteredProducts.length,
        filters: req.query
    });
});

// Получить товар по ID (используется router.param)
router.get('/:id', (req, res) => {
    res.json({
        success: true,
        data: req.product
    });
});

// Создать новый товар
router.post('/', (req, res) => {
    const { name, price, category, inStock } = req.body;
    
    if (!name || !price || !category) {
        return res.status(400).json({
            success: false,
            message: 'Название, цена и категория обязательны'
        });
    }
    
    const newProduct = {
        id: products.length + 1,
        name,
        price: parseFloat(price),
        category,
        inStock: inStock !== undefined ? inStock : true
    };
    
    products.push(newProduct);
    
    res.status(201).json({
        success: true,
        message: 'Товар создан',
        data: newProduct
    });
});

// Обновить товар
router.put('/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === productId);
    
    if (productIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'Товар не найден'
        });
    }
    
    const { name, price, category, inStock } = req.body;
    products[productIndex] = {
        ...products[productIndex],
        ...(name && { name }),
        ...(price && { price: parseFloat(price) }),
        ...(category && { category }),
        ...(inStock !== undefined && { inStock })
    };
    
    res.json({
        success: true,
        message: 'Товар обновлен',
        data: products[productIndex]
    });
});

// Удалить товар
router.delete('/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === productId);
    
    if (productIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'Товар не найден'
        });
    }
    
    const deletedProduct = products.splice(productIndex, 1)[0];
    
    res.json({
        success: true,
        message: 'Товар удален',
        data: deletedProduct
    });
});

module.exports = router;