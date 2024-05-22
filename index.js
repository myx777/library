const express = require('express');
const indexRouter = require('./src/routes/indexRouter');
const bookRouter = require('./src/routes/bookRouter');
const userRouter = require('./src/routes/userRouter');
const errorMiddleware = require('./src/middleware/404');
const mongoose = require('mongoose');

const app = express();

const { dbUser, dbPassword, dbName, dbHost, port } = require('./config.js');

const DB_Url = `mongodb://${dbUser}:${dbPassword}@${dbHost}/${dbName}`;

// Указываем Express обслуживать статические файлы из папки "public"
// Это позволит серверу обслуживать файлы из папки "/src/style" без необходимости написания отдельных обработчиков маршрутов для каждого файла
app.use(express.static(__dirname + '/src/style'));

//миделлавр для разбора форм
app.use(express.urlencoded({extended: true}));

async function start(DB_Url, port) {
    try {
        await mongoose.connect(DB_Url);
        console.log("Подключен к базе данных")
        app.listen(port)
        console.log(`Сервер на порту: ${port}`)
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

start(DB_Url, port)
    .catch((err) => {
        console.error(err);
    })
