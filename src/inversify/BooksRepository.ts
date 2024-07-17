import { IBook } from '../interfaces/IBook';

export abstract class BooksRepository {
    public abstract createBook(book: IBook): Promise<IBook>;
    public abstract getBook(id: string): Promise<IBook | null>;
    public abstract getBooks(): Promise<IBook[]>;
    public abstract updateBook(id: string, updatedBook: IBook): Promise<IBook | null>;
    public abstract deleteBook(id: string): Promise<void>;
}
