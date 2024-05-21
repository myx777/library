const express = require('express');
const indexRouter = require('./src/routes/indexRouter');
const bookRouter = require('./src/routes/bookRouter');
const userRouter = require('./src/routes/userRouter');
const errorMiddleware = require('./src/middleware/404');
const mongoose = require('mongoose');
const mongoUrl = require('./config.js');

const app = express();

const PORT = process.env.PORT || 3000;

// Указываем Express обслуживать статические файлы из папки "public"
// Это позволит серверу обслуживать файлы из папки "/src/style" без необходимости написания отдельных обработчиков маршрутов для каждого файла
app.use(express.static(__dirname + '/src/style'));

//миделлавр для разбора форм
app.use(express.urlencoded({ extended: true }));

// подключаем mongoose
mongoose.connect(`${mongoUrl.mongoUrl}`)
    .then(() => {
        console.log('Подключено к базе данных')
    })
    .catch((error) => {
        console.error('Ошибка подключения к базе данных:', error)
    });


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

console.log(PORT)

app.listen(PORT)