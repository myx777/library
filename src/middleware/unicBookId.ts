import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";

export const unicBookId = (req: Request, res: Response, next: NextFunction) => {
    try {
        const bookId = uuidv4();

        // Передаем _id книги в req для использования в multer
        req.bookId = bookId;
        next();
    } catch (error) {
        console.error('Ошибка сервера при добавлении книги' + error);
        res.status(500).send('Ошибка сервера при добавлении книги');
    }
}
