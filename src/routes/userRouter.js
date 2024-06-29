const express = require('express');
const router = express.Router();
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userSchema = require('../modules/userSchema');
const bcrypt = require('bcrypt');

// Функция верификации
const verify = async (fieldValue, password, done) => {
    try {
        const filter = {
            $or: [
                { username: fieldValue },
                { email: fieldValue }
            ]
        };

        const user = await userSchema.findOne(filter).select('-__v');
        if (!user) return done(null, false, { message: 'Некорректное имя пользователя или email.' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return done(null, false, { message: 'Некорректный пароль' });

        return done(null, user);
    } catch (e) {
        return done(e);
    }
}

const options = {
    usernameField: 'user',
    passwordField: 'password',
};

passport.use('local', new LocalStrategy(options, verify));
passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
    try {
        const user = await userSchema.findById(id).select('-__v');
        if (!user) return cb(null, false, { message: 'Некорректный id.' });
        cb(null, user);
    } catch (err) {
        cb(err);
    }
});

// Маршруты
router.get('/user/login', (req, res) => {
    res.render('./user/login', {
        title: 'Вход',
    });
});

router.post('/user',
    passport.authenticate('local', { failureRedirect: '/api/user/registration' }),
    async (req, res) => {
        console.log(req.user);
        res.redirect('/api/user/profile');
    });

router.get('/user/registration', (req, res) => {
    res.render('./user/registration', {
        title: 'Регистрация',
    });
});

router.post('/user/registration', async (req, res) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        const newUser = new userSchema({
            firstName: req.body.firstName,
            secondName: req.body.secondName,
            email: req.body.email,
            password: hashedPassword,
            username: req.body.username,
        });

        await newUser.save();
        res.redirect('/api/user/login');
    } catch (e) {
        console.error(e);
        res.status(500).send('Ошибка сервера');
    }
});

router.get('/user/logout', (req, res) => {
    req.logout(err => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

router.get('/user/profile',
    (req, res, next) => {
        if (!req.isAuthenticated()) {
            return res.redirect('/api/user/login');
        }
        next();
    },
    (req, res) => {
        res.render('./user/profile', {
            title: 'Профиль',
            user: req.user,
        });
    });

module.exports = router;
