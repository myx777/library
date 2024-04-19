const express = require('express');
const bookRouter = require('./src/book/routes/bookRouter');
const userRouter = require('./src/user/routes/userRouter');

const app = express();
//миделлавр для разбора форм
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

//роуты книг (добавление, удаление и тд
app.use('/api', bookRouter);

//роуты юзера (логин)
app.use('/api', userRouter);

//загрузка книги
app.use('/api/books/:id/download', express.static(__dirname + '/public/books'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running ${PORT}`);
});
