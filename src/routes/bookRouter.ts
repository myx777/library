import {container} from "../inversify/container"
import express from "express";

import {config} from "../config";

import {unicBookId} from "../middleware/unicBookId";
import BookController from "../controller/BookController";
import {bookUpload} from "../middleware/bookUpload";

const bookController = container.get(BookController);


const router = express.Router();
/**
 * все роуты связанные с книгами тут
 */

router.use(express.json());

// отрисовка страницы загрузки новой книги
router.get('/books/create', bookController.createPage.bind(bookController)
);

// отрисовка страницы просмотра книги
router.get('/books/view/:id', bookController.renderBook.bind(bookController));

// роут всех книг
router.get('/books', bookController.renderAllBooks.bind(bookController));

// обновление книги
router.get('/books/update/:id', bookController.updateBook.bind(bookController));

// Исправление книги
router.post('/books/update/:id', bookController.editBook.bind(bookController));


// удаление книги
router.post('/books/:id',
    bookController.deleteBook.bind(bookController)
);

// создание книги
router.post('/books',
    unicBookId,
    bookUpload.single('book'),
    bookController.addBook.bind(bookController)
);


export default router;