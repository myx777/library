const express = require('express');
const bookFile = require('../middleware/bookFile');
const Books = require('../modules/books');

const router = express.Router();

router.use(express.json());

const COUNTER_SERVICE_URL = 'http://counter:3001';

// ToDo!
// отрисовка страницы загрузки новой книги
router.get('/books/create', async (req, res) => {
    res.render('book/create', {
        title: 'Загрузка книги',
    });
});

// ToDo!
// отрисовка страницы просмотра книги
router.get('/books/view/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const book = Books.findById(id).select('-__v')
        const fetch = (await import('node-fetch')).default;

        // Инкремент счётчика для книги
        await fetch(`${COUNTER_SERVICE_URL}/counter/${id}/incr`, {method: 'POST'});
        let response = await fetch(`${COUNTER_SERVICE_URL}/counter/${id}`);

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

// запрос всех книг
router.get('/books', async (req, res) => {
    const books = await Books.find().select('-__v');
    res.render('book/index', {
        title: 'Books',
        books: books,
    });
});

// запрос книги по id
router.get('/books/update/:id', (req, res) => {
    const {id} = req.params;
    const {books} = store;
    const idx = books.findIndex((el) => el.id === id);

    if (idx !== -1) {
        res.render('book/update', {
            title: 'book | update',
            book: books[idx],
        });
    } else {
        res.status(404).redirect('/404');
    }
});

// исправление книги
router.post('/books/update/:id', (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const idx = books.findIndex((el) => el.id === id);

    if (idx !== -1) {
        const updatedBook = {...books[idx]};

        if (req.body.title) updatedBook.title = req.body.title;
        if (req.body.author) updatedBook.author = req.body.author;
        if (req.body.description) updatedBook.description = req.body.description;
        if (req.body.favorite !== undefined) updatedBook.favorite = req.body.favorite;
        if (req.body.fileCover) updatedBook.fileCover = req.body.fileCover;
        if (req.body.fileName) updatedBook.fileName = req.body.fileName;

        books[idx] = updatedBook;
        res.redirect(301, '/api/books');
    } else {
        res.status(404).redirect('/404');
    }
});

// удаление книги
router.post('/books/:id', (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const idx = books.findIndex((el) => el.id === id);

    if (idx !== -1) {
        books.splice(idx, 1);
        res.redirect(301, '/api/books');
    } else {
        res.status(404).redirect('/404');
    }
});

// добавление книги
router.post('/books', bookFile.single('book'), (req, res) => {
    if (req.file) {
        const {path, originalname} = req.file;

        const newBook = new Book(
            req.body.title,
            req.body.author,
            req.body.description,
            false,
            req.body.fileCover,
            originalname,
            path,
        );
        store.books.push(newBook);
        res.redirect(301, '/api/books');
    } else {
        res.status(404).redirect('/404');
    }
});

module.exports = router;
