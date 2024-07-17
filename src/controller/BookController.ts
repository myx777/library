import {inject, injectable} from "inversify";
import {TYPES} from "../inversify/TYPES";
import {Request, Response} from 'express';
import BookService from "../service/BookService";
import fetch from 'node-fetch';
import path from "path";
import {IBook} from "../interfaces/IBook";
import {config} from "../config";
import CounterData from "../interfaces/CounterData";

@injectable()
export default class BookController {
    constructor(@inject(TYPES.BookService) private bookService: BookService) {
    }

    createPage(req: Request, res: Response) {
        res.render('book/create', {
            title: 'Загрузка книги',
        });
    }

    async renderBook(req: Request, res: Response) {
        const {id} = req.params;
        try {
            const book = await this.bookService.getBook(id);
            // Инкремент счётчика для книги
            const url = `${config.counterUrl}/counter/${id}`;
            // инкремируем счетчик
            await fetch(`${url}/incr`, {method: 'POST'});
            // получаем количество просмотров
            const response = await fetch(`${url}`);

            if (!response.ok) {
                throw new Error('Failed to fetch counter data');
            }
            // Чтение данных счётчика как JSON
            const counterData = await response.json() as CounterData;
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
    }

    async renderAllBooks(req: Request, res: Response) {
        try {
            const books = await this.bookService.getBooks();

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
    }

    async updateBook(req: Request, res: Response) {
        const {id} = req.params;

        try {
            const book = await this.bookService.getBook(id);

            res.render('book/update', {
                title: 'book | update',
                book: book,
            });
        } catch (e) {
            console.error(e);
            res.status(404).redirect('/404');
        }
    }

    async editBook(req: Request, res: Response) {
        const {id} = req.params;
        try {
            const book = await this.bookService.getBook(id);

            if (!book) {
                return res.status(404).send('Book not found');
            }

            if (req.body.title) book.title = req.body.title;
            if (req.body.author) book.author = req.body.author;
            if (req.body.description) book.description = req.body.description;
            if (req.body.favorite !== undefined) book.favorite = req.body.favorite;
            if (req.body.fileCover) book.fileCover = req.body.fileCover;
            if (req.body.fileName) book.fileName = req.body.fileName;

            await this.bookService.updateBook(id, book);

            res.redirect(301, '/api/books');
        } catch (e) {
            console.error(e);
            res.status(500).send('Internal Server Error');
        }
    }

    async deleteBook(req: Request, res: Response) {
        const {id} = req.params;
        try {
            const book = await this.bookService.getBook(id);
            if (!book) {
                return res.status(404).redirect('/404');
            }

            // Удаляем файл книги с сервера
            // ToDo! запутался с путями
            // const filePath = path.join(__dirname, 'public/books', book.fileName); // Путь к файлу книги на сервере
            // fs.unlinkSync(filePath);

            await this.bookService.deleteBook(id);
            res.redirect(301, '/api/books');
        } catch (e) {
            console.error(e);
            res.status(404).redirect('/404');
        }
    }

    async addBook(req: Request, res: Response) {
        try {
            const bookId = req.bookId;

            const newBook: IBook = {
                bookId: bookId,
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                favorite: req.body.favorite,
                fileCover: req.body.fileCover,
                fileName: `${req.bookId}${path.extname(req.file.originalname)}`,
            };

            // Сохраняем новую книгу в базе данных
            await this.bookService.createBook(newBook);

        } catch
            (error)
            {
                console.error('Ошибка сервера при добавлении книги' + error);
                res.status(500);
            }
            res.redirect(301, '/api/books');

        }
    }
