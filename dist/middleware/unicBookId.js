"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unicBookId = void 0;
const uuid_1 = require("uuid");
const unicBookId = (req, res, next) => {
    try {
        const bookId = (0, uuid_1.v4)();
        // Передаем _id книги в req для использования в multer
        req.bookId = bookId;
        next();
    }
    catch (error) {
        console.error('Ошибка сервера при добавлении книги' + error);
        res.status(500).send('Ошибка сервера при добавлении книги');
    }
};
exports.unicBookId = unicBookId;
