"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require('express');
const router = express.Router();
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userSchema = require('../models/UserModel');
const bcrypt = require('bcrypt');
// Функция верификации
const verify = (fieldValue, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = {
            $or: [
                { username: fieldValue },
                { email: fieldValue }
            ]
        };
        const user = yield userSchema.findOne(filter).select('-__v');
        if (!user)
            return done(null, false, { message: 'Некорректное имя пользователя или email.' });
        const match = yield bcrypt.compare(password, user.password);
        if (!match)
            return done(null, false, { message: 'Некорректный пароль' });
        return done(null, user);
    }
    catch (e) {
        return done(e);
    }
});
const options = {
    usernameField: 'user',
    passwordField: 'password',
};
passport.use('local', new LocalStrategy(options, verify));
passport.serializeUser((user, cb) => {
    cb(null, user.id);
});
passport.deserializeUser((id, cb) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userSchema.findById(id).select('-__v');
        if (!user)
            return cb(null, false, { message: 'Некорректный id.' });
        cb(null, user);
    }
    catch (err) {
        cb(err);
    }
}));
// Маршруты
router.get('/user/login', (req, res) => {
    res.render('./user/login', {
        title: 'Вход',
    });
});
router.post('/user', passport.authenticate('local', { failureRedirect: '/api/user/registration' }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.user);
    res.redirect('/api/user/profile');
}));
router.get('/user/registration', (req, res) => {
    res.render('./user/registration', {
        title: 'Регистрация',
    });
});
router.post('/user/registration', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const saltRounds = 10;
        const hashedPassword = yield bcrypt.hash(req.body.password, saltRounds);
        const newUser = new userSchema({
            firstName: req.body.firstName,
            secondName: req.body.secondName,
            email: req.body.email,
            password: hashedPassword,
            username: req.body.username,
        });
        yield newUser.save();
        res.redirect('/api/user/login');
    }
    catch (e) {
        console.error(e);
        res.status(500).send('Ошибка сервера');
    }
}));
router.get('/user/logout', (req, res) => {
    req.logout(err => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});
router.get('/user/profile', (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/api/user/login');
    }
    next();
}, (req, res) => {
    res.render('./user/profile', {
        title: 'Профиль',
        user: req.user,
    });
});
module.exports = router;
