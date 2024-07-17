"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// multer для сохранения на диск сервера
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/books'); // Указываем путь для сохранения файлов книг
    },
    filename: (req, file, cb) => {
        cb(null, `${req.bookId}${path_1.default.extname(file.originalname)}`); // Генерируем имя файла с использованием _id книги
    },
});
exports.bookUpload = (0, multer_1.default)({ storage });
