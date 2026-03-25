ПРАКТИЧЕСКОЕ ЗАНЯТИЕ №1: CSS-ПРЕПРОЦЕССОРЫ (SASS/SCSS)
Задание: Реализовать карточку товара с использованием переменных, миксинов и вложенности селекторов.

Выполнено:

Созданы переменные для цветов и размеров:

$primary-color: #f39c12 (основной цвет магазина)

$danger-color: #e74c3c (цвет для низкого остатка)

$border-radius: 12px (скругление углов)

Созданы миксины:

Миксин для карточки товара (фон, тень, анимация)

Миксин для кнопок (стилизация и hover эффект)

Использована вложенность селекторов:

.product-card__image - стили картинки

.product-card__footer - стили для кнопок

.btn--edit, .btn--delete - наследование стилей

Результат: Создана стилизованная карточка товара с фото, названием, ценой, количеством и кнопками редактирования/удаления.

2. ПРАКТИЧЕСКОЕ ЗАНЯТИЕ №2: NODE.JS + EXPRESS
Задание: Создать REST API сервер для управления товарами.

Выполнено:

Созданы следующие эндпоинты:

Метод	URL	Описание
GET	/api/products	Получить все товары
GET	/api/products/:id	Получить товар по ID
POST	/api/products	Создать новый товар
PATCH	/api/products/:id	Обновить товар
DELETE	/api/products/:id	Удалить товар
GET	/api/products/search/:query	Поиск товаров
Пример запроса (POST /api/products):

json
{
  "name": "Коричная булочка",
  "category": "Булочки",
  "description": "Нежная булочка с корицей",
  "price": 120,
  "stock": 25,
  "image": "https://picsum.photos/id/1080/300/200"
}
Добавлены middleware:

Логирование всех запросов

CORS для связи с фронтендом

Парсинг JSON и URL-encoded данных

Обработка ошибок 404 и 500

Результат: Создан сервер на Express, реализованы все CRUD операции, сервер запускается на порту 3000.

3. ПРАКТИЧЕСКОЕ ЗАНЯТИЕ №3: JSON И ВНЕШНИЕ API
Задание: Протестировать API через Postman, изучить JSON, подключить внешнее API.

Выполнено:

Создана коллекция в Postman с запросами:

GET /api/products - получение всех товаров

GET /api/products/:id - получение одного товара

POST /api/products - создание товара

PATCH /api/products/:id - обновление товара

DELETE /api/products/:id - удаление товара

Структура JSON товара:

json
{
  "id": "abc12345",
  "name": "Коричная булочка",
  "category": "Булочки",
  "description": "Нежная булочка с корицей",
  "price": 120,
  "stock": 25,
  "rating": 4.9,
  "image": "https://picsum.photos/id/1080/300/200"
}
Интеграция с OpenWeatherMap API:

Получение текущей погоды в Москве

Вывод температуры, влажности, описания

Результат: Все эндпоинты протестированы, JSON структура изучена, внешнее API успешно подключено.

4. ПРАКТИЧЕСКОЕ ЗАНЯТИЕ №4: API + REACT
Задание: Связать React приложение с REST API, реализовать CRUD операции.

Выполнено:

Создан API клиент с использованием axios:

javascript
const api = {
  getProducts: () => axios.get('/api/products'),
  createProduct: (data) => axios.post('/api/products', data),
  updateProduct: (id, data) => axios.patch(`/api/products/${id}`, data),
  deleteProduct: (id) => axios.delete(`/api/products/${id}`)
};
Созданы React компоненты:

ProductCard - карточка товара с фото, названием, ценой, кнопками

ProductModal - модальное окно для добавления/редактирования

Реализованы функции:

Загрузка товаров при старте приложения

Добавление товара через модальное окно

Редактирование товара с предзаполнением формы

Удаление товара с подтверждением

Добавлены состояния:

loading - отображение загрузки

error - обработка ошибок

Результат: React приложение полностью интегрировано с API, реализован полный CRUD функционал, приложение работает на порту 3001.

5. ПРАКТИЧЕСКОЕ ЗАНЯТИЕ №5: SWAGGER
Задание: Добавить Swagger документацию для REST API.

Выполнено:

Установлены пакеты:

swagger-jsdoc

swagger-ui-express

Настроена конфигурация Swagger:

javascript
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sweet Bakery API',
      version: '1.0.0',
      description: 'API для интернет-магазина кондитерских изделий'
    }
  },
  apis: ['./server.js']
};
Документированы все эндпоинты с помощью JSDoc комментариев:

GET /api/products - получение всех товаров

GET /api/products/:id - получение товара по ID

POST /api/products - создание товара

PATCH /api/products/:id - обновление товара

DELETE /api/products/:id - удаление товара

Описана схема Product с полями:

id (string) - уникальный идентификатор

name (string) - название товара

category (string) - категория

description (string) - описание

price (number) - цена

stock (integer) - количество на складе

rating (number) - рейтинг

image (string) - ссылка на фото

Результат: Swagger UI доступен по адресу http://localhost:3000/api-docs. Документация интерактивная, можно тестировать API прямо в браузере.

О ПРОЕКТЕ SWEET BAKERY
Название проекта: Sweet Bakery - интернет-магазин кондитерских изделий

Ассортимент:

Булочки (коричная, творожная, ванильная)

Пряники (медовый, имбирный, сердечко)

Круассаны (шоколадный, миндальный)

Рулеты (маковый, сливочный)

Функциональность:

Просмотр товаров с фото

Добавление новых товаров

Редактирование существующих

Удаление товаров

Поиск по названию

ЗАПУСК ПРОЕКТА
1. Запуск бэкенда:

bash
cd backend
npm install
npm run dev
Сервер: http://localhost:3000

2. Запуск фронтенда:

bash
cd frontend
npm install
npm start
Приложение: http://localhost:3001

3. Swagger документация:
http://localhost:3000/api-docs

ИТОГОВАЯ ТАБЛИЦА
№	Занятие	Статус	Результат
1	CSS-препроцессоры	✅ Выполнено	Переменные, миксины, вложенность
2	Node.js + Express	✅ Выполнено	REST API, CRUD, middleware
3	JSON + Postman	✅ Выполнено	Тестирование, внешнее API
4	API + React	✅ Выполнено	Интеграция, компоненты
5	Swagger	✅ Выполнено	Документация API
ССЫЛКИ
GitHub репозиторий: https://github.com/[ваш-логин]/online-store

API документация: http://localhost:3000/api-docs

Фронтенд: http://localhost:3001
