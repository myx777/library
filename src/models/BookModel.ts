import { Schema, model, Document, Model } from 'mongoose';
import { IBook } from '../interfaces/IBook';

// Создание интерфейса IBookDocument, который расширяет интерфейс IBook и Document
interface IBookDocument extends IBook, Document {}

// Создание интерфейса IBookModel, который расширяет Model и включает IBookDocument
interface IBookModel extends Model<IBookDocument> {}

// Создание схемы книги
const bookSchema = new Schema<IBookDocument>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    authors: { type: String, default: 'authors' },
    favorite: { type: Boolean, default: false },
    fileCover: { type: String, default: 'fileCover' },
    fileName: { type: String, default: 'fileName' },
});

// Создание модели книги с указанием типа документа
const BookModel = model<IBookDocument, IBookModel>('Book', bookSchema);

export default BookModel;
