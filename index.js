const express = require('express');
const {v9: uuid} = require('uuid');

class Book {
    constructor(title, author, description, favorite, fileCover, fileName) {
        this.id = uuid();
        this.title = title;
        this.author = author;
        this.description = description;
        this.favorite = favorite;
        this.fileCover = fileCover;
        this.fileName = fileName;
    }
}

class User {
    constructor(mail) {
        this.id = uuid();
        this.mail = mail;
    }
}

const store = {
    books: [], users: []
};

const app = express();
app.use(express.json());

app.get('/api/books/', (req, res) => {
    const { books } = store;
    res.json(books);
});

app.get('/api/books/:id', (req, res) => {
    const { id } = req.params;
    const { books } = store;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        res.json(books[idx]);
    } else {
        res.status(404);
        res.json('404 | Книга не найдена');
    }
});

app.post('/api/user/login', (req, res) => {
    const { user } = store;
    const { id, mail } = req.body;

    const newUser = new User(id, mail);
    user.push(newUser);

    res.status(201);
    res.json(newUser);
});

app.put('/api/books/:id', (req, res) => {
    const { books } = store;
    const { id } = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        books[idx] = {
            ...books[idx],
            title,
            author,
            description,
            favorite,
            fileCover,
            fileName,
        }

        res.json(books[idx]);
    } else {
        res.status(404);
        res.json('404 | Книга не найдена')
    }
});

app.delete('/api/books/:id', (req, res) => {
    const { books } = store;
    const { id } = req.params;
    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1) {
        books.splice(idx, 1);
        res.json('ok');
    } else {
        res.status(404);
        res.json('404 | Книга не найдена');
    }

});

const port = process.env.PORT;
app.listen(port, () => {
    console.log('Server is running');
});