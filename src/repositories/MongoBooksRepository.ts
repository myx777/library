import {BooksRepository} from "../inversify/BooksRepository";
import {IBook} from "../interfaces/IBook";
import BookModel from "../models/BookModel";

export default  class MongoBooksRepository extends BooksRepository{
    async createBook(book: IBook): Promise<IBook> {
        const newBook = await new BookModel(book);
        return await newBook.save();
    }
    async getBook(id: string): Promise<IBook | null> {
        return BookModel.findById(id).select('-__v');
    }
    async getBooks(): Promise<IBook[]> {
        return BookModel.find().select('-__v');
    }
    async updateBook(id: string, updatedBook: Partial<IBook>): Promise<IBook | null> {
        return await BookModel.findByIdAndUpdate(id, updatedBook, { new: true }).select('-__v');
    }
    async deleteBook(id: string): Promise<void> {
        return BookModel.findByIdAndDelete(id).then(() => {});
    }
}