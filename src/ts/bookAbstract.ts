import { Book } from './book';

export abstract class BooksRepository {
    abstract createBook(book: Book): Promise<void>;
    abstract getBook(id: string): Promise<Book | null>;
    abstract getBooks(): Promise<Book[]>;
    abstract updateBook(id: string, updatedBook: Book): Promise<void>;
    abstract deleteBook(id: string): Promise<void>;
}
