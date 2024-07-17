import 'reflect-metadata';

import express from 'express';
import indexRouter from './src/routes/indexRouter';
import bookRouter from './src/routes/bookRouter';
import userRouter from './src/routes/userRouter';
import errorMiddleware from './src/middleware/404';
import mongoose from 'mongoose';
import session from "express-session";
import passport from "passport";
import { dbUser, dbPassword, dbName, dbHost, port } from './src/config.ts';
import http from 'http';
import socketIO from 'socket.io';
import path from 'path';


const app = express();
const server = http.Server(app);
const io = socketIO(server);

const DB_Url = `mongodb://${dbUser}:${dbPassword}@${dbHost}/${dbName}`;

// Указываем Express обслуживать статические файлы из папки "public"
// Это позволит серверу обслуживать файлы из папки "/src/style" без необходимости написания отдельных обработчиков маршрутов для каждого файла
app.use(express.static(__dirname + '/src/style'));

//миделлавр для разбора форм
app.use(express.urlencoded({extended: true}));

// Миддлвары для регистрации входа и сессий
app.use(session({
    secret: 'mySecretKey', // Ключ для подписи идентификатора сессии в cookie
    resave: false, // Не сохранять сессию, если она не была изменена
    saveUninitialized: false // Не сохранять неинициализированные сессии
}));

app.use(passport.initialize());
app.use(passport.session());

async function start(DB_Url, port) {
    try {
        await mongoose.connect(DB_Url);
        console.log("Подключен к базе данных")
        server.listen(port)
        console.log(`Сервер на порту: ${port}`)
    } catch (e) {
        console.error("Ошибка:", e)
    }
}

//шаблонизатор ejs + смена пути со стандартного
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

//роут главной страницы
app.use('/', indexRouter);

//роуты книг (добавление, удаление и тд
app.use('/api', bookRouter);

//роуты юзера (логин)
app.use('/api', userRouter);

// использование миделвара с ошибкой
app.use(errorMiddleware);


start(DB_Url, port)
    .catch((err) => {
        console.error('Не удалось запустить сервер:', err);
    })

io.on('connection', (socket) => {
    const { id } = socket;
    console.log('connection' + id);

    const { roomName } = socket.handshake.query;
    console.log('комната:' + roomName);
    socket.join(roomName);

    socket.on('comment', (cmt) => {
        cmt.type = 'comment';
        // коммент для всей комнаты
        socket.to(roomName).emit('comment', cmt);
        // комм для себя
        socket.emit('comment', cmt);
    });

    socket.on('disconnect', () => {
        console.log('disconnect' + id);
    })
})