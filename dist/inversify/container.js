"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const inversify_1 = require("inversify");
const BooksRepository_1 = require("./BooksRepository");
const BookService_1 = __importDefault(require("../service/BookService"));
const TYPES_1 = require("./TYPES");
const BookController_1 = __importDefault(require("../controller/BookController"));
const MongoBooksRepository_1 = __importDefault(require("../repositories/MongoBooksRepository"));
// Создаем контейнер
const container = new inversify_1.Container();
exports.container = container;
// Регистрируем BooksRepository в контейнере
container.bind(BooksRepository_1.BooksRepository).toSelf();
// и все остальные тоже
container.bind(TYPES_1.TYPES.BookService).to(BookService_1.default);
container.bind(TYPES_1.TYPES.BookController).to(BookController_1.default);
container.bind(TYPES_1.TYPES.BookRepository).to(MongoBooksRepository_1.default);
