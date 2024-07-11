import { Schema, model } from 'mongoose';
import { IBook } from '../interfaces/IBook';

// Create the book schema
const bookSchema = new Schema<IBook>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    authors: { type: String, default: 'authors' },
    favorite: { type: String, default: 'favorite' },
    fileCover: { type: String, default: 'fileCover' },
    fileName: { type: String, default: 'fileName' },
});

// Create the book model, explicitly specifying the type argument
const BookModel = model<IBook>('Book', bookSchema);

export default BookModel;
