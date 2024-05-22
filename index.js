const express = require('express');
const indexRouter = require('./src/routes/indexRouter');
const bookRouter = require('./src/routes/bookRouter');
const userRouter = require('./src/routes/userRouter');
const errorMiddleware = require('./src/middleware/404');
const mongoose = require('mongoose');

const app = express();

const PORT = process.env.PORT || 3000;
const URL_DB = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`;

// Указываем Express обслуживать статические файлы из папки "public"
// Это позволит серверу обслуживать файлы из папки "/src/style" без необходимости написания отдельных обработчиков маршрутов для каждого файла
app.use(express.static(__dirname + '/src/style'));

//миделлавр для разбора форм
app.use(express.urlencoded({ extended: true }));

async function start (URL_DB, PORT) {
    try {
        await mongoose.connect(URL_DB);
        console.log("Подключен к базе данных")
        app.listen(PORT)
        console.log(`Сервер на порту: ${PORT}`)
    } catch (e) {
        console.error("Ошибка:", e)
    }
}

//шаблонизатор ejs + смена пути со стандартного
app.set('view engine', 'ejs');
app.set('views', 'src/views');

//роут главной страницы
app.use('/', indexRouter);

//роуты книг (добавление, удаление и тд
app.use('/api', bookRouter);

//роуты юзера (логин)
app.use('/api', userRouter);

//загрузка книги
app.use('/api/books/:id/download', express.static(__dirname + '/public/books'));

// использование миделвара с ошибкой
app.use(errorMiddleware);

start(URL_DB, PORT)
    .catch((err) => {
        console.error(err);
    })
