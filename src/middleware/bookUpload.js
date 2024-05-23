const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/books'); // Указываем путь для сохранения файлов книг
    },
    filename: (req, file, cb) => {
        cb(null, `${req.bookId}${path.extname(file.originalname)}`); // Генерируем имя файла с использованием _id книги
    },
});

const bookUpload = multer({ storage });

module.exports = bookUpload;
