import multer from 'multer';
import path from 'path';

// multer для сохранения на диск сервера

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/books'); // Указываем путь для сохранения файлов книг
    },
    filename: (req, file, cb) => {
        cb(null, `${req.bookId}${path.extname(file.originalname)}`); // Генерируем имя файла с использованием _id книги
    },
});

export const bookUpload = multer({storage});

