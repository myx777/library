"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Создание схемы книги
const bookSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, default: 'author' },
    favorite: { type: Boolean, default: false },
    fileCover: { type: String, default: 'fileCover' },
    fileName: { type: String, default: 'fileName' },
    bookId: { type: String, required: true },
});
// Создание модели книги с указанием типа документа
const BookModel = (0, mongoose_1.model)('Book', bookSchema);
exports.default = BookModel;
