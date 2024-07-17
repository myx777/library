import { Container } from 'inversify';
import { BooksRepository } from './BooksRepository';
import BookService from "../service/BookService";
import {TYPES} from "./TYPES";
import BookController from "../controller/BookController";
import MongoBooksRepository from "../repositories/MongoBooksRepository";

// Создаем контейнер
const container = new Container();

// Регистрируем BooksRepository в контейнере
container.bind(BooksRepository).toSelf();

// и все остальные тоже
container.bind<BookService>(TYPES.BookService).to(BookService);
container.bind<BookController>(TYPES.BookController).to(BookController);
container.bind<BooksRepository>(TYPES.BookRepository).to(MongoBooksRepository);

export { container };
