const express = require('express');
const bookUpload = require('../middleware/bookUpload');
const bookSchema = require('../modules/bookSchema');
const router = express.Router();
const {counterUrl} = require('../../config');
const {v4: uuidv4} = require('uuid');
const fs = require('fs');
const path = require('path'); // Импортируем модуль path



/**
 * все роуты связанные с книгами тут
 */

router.use(express.json());

// отрисовка страницы загрузки новой книги
router.get('/books/create', (req, res) => {
    res.render('book/create', {
        title: 'Загрузка книги',
    });
});

// отрисовка страницы просмотра книги
router.get('/books/view/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const book = await bookSchema.findById(id).select('-__v');
        // Инкремент счётчика для книги
        const url = `${counterUrl}/counter/${id}`;
        await fetch(`${url}/incr`, {method: 'POST'});
        let response = await fetch(`${url}`);
        // Чтение данных счётчика как JSON
        const counterData = await response.json();
        const counter = counterData.counter;

        res.render('book/view', {
            title: 'book | просмотр',
            book: book,
            counter: counter,
        });
    } catch (err) {
        console.error('Error updating counterService:', err);
        res.status(500).send('Error updating counterService');
    }
});

// роут всех книг
router.get('/books', async (req, res) => {
    try {
        const books = await bookSchema.find().select('-__v');

        if (books.length === 0) {
            console.error('No books found.');
        }

        res.render('book/index', {
            title: 'Books',
            books: books,
        });
    } catch (e) {
        console.error('Error reading books', e);
        res.status(500).send('Error retrieving books'); // Handle error appropriately
    }
});

// обновление книги
router.get('/books/update/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const book = await bookSchema.findById(id).select('-__v');

        res.render('book/update', {
            title: 'book | update',
            book: book,
        });
    } catch (e) {
        console.error(e);
        res.status(404).redirect('/404');
    }
});

// Исправление книги
router.post('/books/update/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const book = await bookSchema.findById(id).select('-__v');

        if (!book) {
            return res.status(404).send('Book not found');
        }

        if (req.body.title) book.title = req.body.title;
        if (req.body.author) book.author = req.body.author;
        if (req.body.description) book.description = req.body.description;
        if (req.body.favorite !== undefined) book.favorite = req.body.favorite;
        if (req.body.fileCover) book.fileCover = req.body.fileCover;
        if (req.body.fileName) book.fileName = req.body.fileName;

        await book.save();

        res.redirect(301, '/api/books');
    } catch (e) {
        console.error(e);
        res.status(500).send('Internal Server Error');
    }
});


// удаление книги
router.post('/books/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const book = await bookSchema.findById(id);
        if (!book) {
            return res.status(404).redirect('/404');
        }

        // Удаляем файл книги с сервера
        // ToDo! запутался с путями
        // const filePath = path.join(__dirname, 'public/books', book.fileName); // Путь к файлу книги на сервере
        // fs.unlinkSync(filePath);

        await bookSchema.findByIdAndDelete(id);
        res.redirect(301, '/api/books');
    } catch (e) {
        console.error(e);
        res.status(404).redirect('/404');
    }
});

// сначала генерирую _id и передаю ее в следующую функцию, а в ней сохраняю книгу
router.post('/books', async (req, res, next) => {
    try {
        const bookId = uuidv4();

        // Передаем _id книги в req для использования в multer
        req.bookId = bookId;

        next();
    } catch (error) {
        console.error("Ошибка сервера при добавлении книги" + error);
        res.status(500);
    }
}, bookUpload.single('book'), async (req, res) => {

    try {
        // Обновляем информацию о файле в записи книги
        const newBook = new bookSchema({
            _id: req.bookId,
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            favorite: req.body.favorite,
            fileCover: req.body.fileCover,
            fileName: `${req.bookId}${path.extname(req.file.originalname)}`,
        });

        // Сохраняем новую книгу в базе данных
        await newBook.save();

        res.redirect(301, '/api/books');
    } catch (error) {
        console.error("Ошибка сервера при добавлении книги" + error);
        res.status(500);
    }
});

module.exports = router;