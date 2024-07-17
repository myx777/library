"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const TYPES_1 = require("../inversify/TYPES");
const BookService_1 = __importDefault(require("../service/BookService"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const path_1 = __importDefault(require("path"));
const config_1 = require("../config");
let BookController = class BookController {
    constructor(bookService) {
        this.bookService = bookService;
    }
    createPage(req, res) {
        res.render('book/create', {
            title: 'Загрузка книги',
        });
    }
    renderBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const book = yield this.bookService.getBook(id);
                // Инкремент счётчика для книги
                const url = `${config_1.config.counterUrl}/counter/${id}`;
                // инкремируем счетчик
                yield (0, node_fetch_1.default)(`${url}/incr`, { method: 'POST' });
                // получаем количество просмотров
                const response = yield (0, node_fetch_1.default)(`${url}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch counter data');
                }
                // Чтение данных счётчика как JSON
                const counterData = yield response.json();
                const counter = counterData.counter;
                res.render('book/view', {
                    title: 'book | просмотр',
                    book: book,
                    counter: counter,
                });
            }
            catch (err) {
                console.error('Error updating counterService:', err);
                res.status(500).send('Error updating counterService');
            }
        });
    }
    renderAllBooks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const books = yield this.bookService.getBooks();
                if (books.length === 0) {
                    console.error('No books found.');
                }
                res.render('book/index', {
                    title: 'Books',
                    books: books,
                });
            }
            catch (e) {
                console.error('Error reading books', e);
                res.status(500).send('Error retrieving books'); // Handle error appropriately
            }
        });
    }
    updateBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const book = yield this.bookService.getBook(id);
                res.render('book/update', {
                    title: 'book | update',
                    book: book,
                });
            }
            catch (e) {
                console.error(e);
                res.status(404).redirect('/404');
            }
        });
    }
    editBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const book = yield this.bookService.getBook(id);
                if (!book) {
                    return res.status(404).send('Book not found');
                }
                if (req.body.title)
                    book.title = req.body.title;
                if (req.body.author)
                    book.author = req.body.author;
                if (req.body.description)
                    book.description = req.body.description;
                if (req.body.favorite !== undefined)
                    book.favorite = req.body.favorite;
                if (req.body.fileCover)
                    book.fileCover = req.body.fileCover;
                if (req.body.fileName)
                    book.fileName = req.body.fileName;
                yield this.bookService.updateBook(id, book);
                res.redirect(301, '/api/books');
            }
            catch (e) {
                console.error(e);
                res.status(500).send('Internal Server Error');
            }
        });
    }
    deleteBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const book = yield this.bookService.getBook(id);
                if (!book) {
                    return res.status(404).redirect('/404');
                }
                // Удаляем файл книги с сервера
                // ToDo! запутался с путями
                // const filePath = path.join(__dirname, 'public/books', book.fileName); // Путь к файлу книги на сервере
                // fs.unlinkSync(filePath);
                yield this.bookService.deleteBook(id);
                res.redirect(301, '/api/books');
            }
            catch (e) {
                console.error(e);
                res.status(404).redirect('/404');
            }
        });
    }
    addBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bookId = req.bookId;
                const newBook = {
                    bookId: bookId,
                    title: req.body.title,
                    author: req.body.author,
                    description: req.body.description,
                    favorite: req.body.favorite,
                    fileCover: req.body.fileCover,
                    fileName: `${req.bookId}${path_1.default.extname(req.file.originalname)}`,
                };
                // Сохраняем новую книгу в базе данных
                yield this.bookService.createBook(newBook);
            }
            catch (error) {
                console.error('Ошибка сервера при добавлении книги' + error);
                res.status(500);
            }
            res.redirect(301, '/api/books');
        });
    }
};
BookController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(TYPES_1.TYPES.BookService)),
    __metadata("design:paramtypes", [BookService_1.default])
], BookController);
exports.default = BookController;
