import {inject, injectable} from "inversify";
import {IBook} from "../interfaces/IBook";
import {BooksRepository} from "../inversify/BooksRepository";
import {TYPES} from "../inversify/TYPES";
import path from "path";

@injectable()
export default class BookService {
    constructor(@inject(TYPES.BookRepository) private booksRepository: BooksRepository) {
    }

    async getBook(id: string): Promise<IBook | null> {
        return await this.booksRepository.getBook(id);
    }

    async getBooks(): Promise<IBook[] | null> {
        return await this.booksRepository.getBooks();
    }

    async updateBook(id: string, updatedBook: IBook): Promise<IBook | null> {
        return await this.booksRepository.updateBook(id, updatedBook);
    }

    async deleteBook(id: string): Promise<void> {
        return await this.booksRepository.deleteBook(id);
    }

    async createBook(book: IBook): Promise<IBook> {
        return await this.booksRepository.createBook(book);
    }
}