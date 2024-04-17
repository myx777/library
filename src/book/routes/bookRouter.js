const express = require('express');
const store = require('../../store/store');

const router = express.Router();
router.use(express.json());

/**
 * запрос всех книг
 */
router.get('/books', (req, res) => {
    const { books } = store;
    res.json(books);
});

/**
 * запрос книги по id
 */
router.get('/books/:id', (req, res) => {
    const { id } = req.params;
    const { books } = store;
    const idx = books.findIndex((el) => el.id === id);

    if (idx !== -1) {
        res.json(books[idx]);
    } else {
        res.status(404);
        res.json('404 | Книга не найдена');
    }
});

/**
 * исправление книги
 */
router.put('/books/:id', (req, res) => {
    const { books } = store;
    const { id } = req.params;
    const idx = books.findIndex((el) => el.id === id);
    console.log(req.body);

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

        res.json(books[idx]);
    } else {
        res.status(404).json('404 | Книга не найдена');
    }
});

/**
 * удаление книги
 */
router.delete('/books/:id', (req, res) => {
    const { books } = store;
    const { id } = req.params;
    const idx = books.findIndex((el) => el.id === id);

    if (idx !== -1) {
        books.splice(idx, 1);
        res.json('ok');
    } else {
        res.status(404);
        res.json('404 | Книга не найдена');
    }
});

module.exports = router;
