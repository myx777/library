const express = require('express');
const bookRouter = require('./src/book/routes/bookRouter');
const userRouter = require('./src/user/routes/userRouter');

const app = express();

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
