const express = require('express');
const { nanoid } = require('nanoid');
const cors = require('cors');
require('dotenv').config();

// Swagger для документации
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));

// Логирование запросов
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Online Store API',
      version: '1.0.0',
      description: 'API для интернет-магазина'
    },
    servers: [
      { url: `http://localhost:${PORT}`, description: 'Development server' }
    ]
  },
  apis: ['./server.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// База данных товаров
let products = [
  {
    id: nanoid(8),
    name: 'Ноутбук ASUS ROG',
    category: 'Ноутбуки',
    description: 'Игровой ноутбук с RTX 3060, 16GB RAM, 512GB SSD',
    price: 89990,
    stock: 5,
    rating: 4.8
  },
  {
    id: nanoid(8),
    name: 'Смартфон iPhone 15',
    category: 'Смартфоны',
    description: 'A16 Bionic, 128GB, OLED дисплей',
    price: 79990,
    stock: 8,
    rating: 4.9
  },
  {
    id: nanoid(8),
    name: 'Наушники Sony WH-1000XM5',
    category: 'Аксессуары',
    description: 'Беспроводные наушники с шумоподавлением',
    price: 24990,
    stock: 15,
    rating: 4.7
  },
  {
    id: nanoid(8),
    name: 'Планшет iPad Pro',
    category: 'Планшеты',
    description: 'M2 чип, 11 дюймов, 128GB',
    price: 69990,
    stock: 12,
    rating: 4.9
  },
  {
    id: nanoid(8),
    name: 'Умные часы Apple Watch',
    category: 'Аксессуары',
    description: 'GPS, 45mm, пульсометр',
    price: 35990,
    stock: 7,
    rating: 4.7
  }
];

// Получить все товары
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Получить товар по ID
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Товар не найден' });
  }
  res.json(product);
});

// Создать новый товар
app.post('/api/products', (req, res) => {
  const { name, category, description, price, stock, rating } = req.body;
  
  if (!name || !category || !description || !price || !stock) {
    return res.status(400).json({ error: 'Заполните обязательные поля' });
  }
  
  const newProduct = {
    id: nanoid(8),
    name: name.trim(),
    category: category.trim(),
    description: description.trim(),
    price: Number(price),
    stock: Number(stock),
    rating: rating ? Number(rating) : 0
  };
  
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Обновить товар
app.patch('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Товар не найден' });
  }
  
  const { name, category, description, price, stock, rating } = req.body;
  
  if (name) product.name = name.trim();
  if (category) product.category = category.trim();
  if (description) product.description = description.trim();
  if (price) product.price = Number(price);
  if (stock !== undefined) product.stock = Number(stock);
  if (rating) product.rating = Number(rating);
  
  res.json(product);
});

// Удалить товар
app.delete('/api/products/:id', (req, res) => {
  const exists = products.some(p => p.id === req.params.id);
  if (!exists) {
    return res.status(404).json({ error: 'Товар не найден' });
  }
  
  products = products.filter(p => p.id !== req.params.id);
  res.status(204).send();
});

// Поиск товаров
app.get('/api/products/search/:query', (req, res) => {
  const query = req.params.query.toLowerCase();
  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(query) || 
    p.description.toLowerCase().includes(query)
  );
  res.json(filtered);
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`✅ Сервер запущен: http://localhost:${PORT}`);
  console.log(`📚 Swagger документация: http://localhost:${PORT}/api-docs`);
  console.log(`🛍️  Товаров в базе: ${products.length}`);
});