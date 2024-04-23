const express = require('express');
const Book = require('../book/BookClass');
const store = require('../store/store');
const bookFile = require('../../middleware/bookFile');

const router = express.Router();
router.use(express.json());

// отрисовка страницы загрузки новой книги
router.get('/books/create', (req, res) => {
    res.render('book/create', {
        title: 'Загрузка книги',
    });
});

// отрисовка страницы просмотра книги
router.get('/books/view/:id', (req, res) => {
    const { id } = req.params;
    const { books } = store;
    const idx = books.findIndex((el) => el.id === id);

    if (idx !== -1) {
        res.render('book/view', {
            title: 'book | update',
            book: books[idx],
        });
    } else {
        res.status(404);
        res.json('404 | Книга не найдена');
    }
});

// запрос всех книг
router.get('/books', (req, res) => {
    const { books } = store;
    res.render('book/index', {
        title: 'Books',
        books: books,
    });
});

// запрос книги по id
router.get('/books/update/:id', (req, res) => {
    const { id } = req.params;
    const { books } = store;
    const idx = books.findIndex((el) => el.id === id);

    if (idx !== -1) {
        res.render('book/update', {
            title: 'book | update',
            book: books[idx],
        });
    } else {
        res.status(404);
        res.json('404 | Книга не найдена');
    }
});

// исправление книги
router.post('/books/update/:id', (req, res) => {
    const { books } = store;
    const { id } = req.params;
    const idx = books.findIndex((el) => el.id === id);
    console.log(req.body);
    console.log(req.body.title);

    if (idx !== -1) {
        const updatedBook = { ...books[idx] };

        // Проверяем каждый параметр и обновляем его, если он присутствует в req.body
        if (req.body.title) updatedBook.title = req.body.title;
        if (req.body.author) updatedBook.author = req.body.author;
        if (req.body.description)
            updatedBook.description = req.body.description;
        if (req.body.favorite !== undefined)
            updatedBook.favorite = req.body.favorite;
        if (req.body.fileCover) updatedBook.fileCover = req.body.fileCover;
        if (req.body.fileName) updatedBook.fileName = req.body.fileName;

        // Обновляем книгу в массиве
        books[idx] = updatedBook;
        res.redirect(301, '/api/books');
    } else {
        res.status(404).json('404 | Книга не найдена');
    }
});

// удаление книги
router.post('/books/:id', (req, res) => {
    const { books } = store;
    const { id } = req.params;
    const idx = books.findIndex((el) => el.id === id);

    if (idx !== -1) {
        books.splice(idx, 1);
        res.redirect(301, '/api/books');
    } else {
        res.status(404);
        res.json('404 | Книга не найдена');
    }
});

// добавление книги
router.post('/books', bookFile.single('book'), (req, res) => {
    if (req.file) {
        const { path, originalname } = req.file;

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
        res.status(400).json({ error: 'Не удалось загрузить книгу' });
    }
});

module.exports = router;
