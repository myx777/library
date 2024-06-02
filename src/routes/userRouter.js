const express = require('express');
const router = express.Router();
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userSchema = require('../modules/userSchema');
const bcrypt = require('bcrypt');

router.use(express.json());

// верификация
const verify = async (fieldValue, password, done) => {
    try {
        // Создаем объект фильтрации с оператором $or из mongoose
        const filter = {
            $or: [
                { username: fieldValue },
                { email: fieldValue }
            ]
        };

        // Находим пользователя по имени пользователя
        const user = await userSchema.findOne(filter).select('-__v');
        if (!user) return done(null, false, { message: 'Incorrect username or email.' });

        // Сравниваем введенный пароль с хешированным паролем из базы данных
        const match = await bcrypt.compare(password, user.password);
        if(!match) return done(null, false, { message: 'Incorrect password' });

        return done(null, user);
    } catch (e) {
        return done(e);
    }
}

const options = {
    usernameField: 'user',
    passwordField: 'password',
}

passport.use('local', new LocalStrategy(options, verify));
passport.serializeUser((user, cb) => {
    cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
    try {
        const user = await userSchema.findById(id).select('-__v');
        if (!user) return done(null, false, { message: 'Incorrect id.' });
        cb(null, user);
    } catch (err) {
        cb(err);
    }
});

// страница для login
router.get('/user/login', (req, res) => {
    res.render('./user/login', {
        title: 'Books',
    });
});

/**
 * логит пользователя по email
 */
router.post('/user',
    passport.authenticate('local', {failureRedirect: '/login'}),
    async (req, res) => {
    close.log(req.user);
    res.redirect('/');
});

module.exports = router;
