"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const container_1 = require("../inversify/container");
const express_1 = __importDefault(require("express"));
const unicBookId_1 = require("../middleware/unicBookId");
const BookController_1 = __importDefault(require("../controller/BookController"));
const bookUpload_1 = require("../middleware/bookUpload");
const bookController = container_1.container.get(BookController_1.default);
const router = express_1.default.Router();
/**
 * все роуты связанные с книгами тут
 */
router.use(express_1.default.json());
// отрисовка страницы загрузки новой книги
router.get('/books/create', bookController.createPage.bind(bookController));
// отрисовка страницы просмотра книги
router.get('/books/view/:id', bookController.renderBook.bind(bookController));
// роут всех книг
router.get('/books', bookController.renderAllBooks.bind(bookController));
// обновление книги
router.get('/books/update/:id', bookController.updateBook.bind(bookController));
// Исправление книги
router.post('/books/update/:id', bookController.editBook.bind(bookController));
// удаление книги
router.post('/books/:id', bookController.deleteBook.bind(bookController));
// создание книги
router.post('/books', unicBookId_1.unicBookId, bookUpload_1.bookUpload.single('book'), bookController.addBook.bind(bookController));
exports.default = router;
