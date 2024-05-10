const express = require('express');
const indexRouter = require('./src/routes/indexRouter');
const bookRouter = require('./src/routes/bookRouter');
const userRouter = require('./src/routes/userRouter');
const errorMiddleware = require('./src/middleware/404');

const app = express();
// Указываем Express обслуживать статические файлы из папки "public"
// Это позволит серверу обслуживать файлы из папки "public" без необходимости написания отдельных обработчиков маршрутов для каждого файла
app.use(express.static(__dirname + '/src/style'));

//миделлавр для разбора форм
app.use(express.urlencoded({ extended: true }));

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

// const PORT = process.env.PORT || 3005;
const PORT = 3005;
app.listen(PORT, () => {
    console.log(`Server is running ${PORT}`);
});
