"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = void 0;
const notFoundHandler = (req, res) => {
    res.status(404).render('errors/404', {
        title: 'Такой страницы нет, код 404',
    });
};
exports.notFoundHandler = notFoundHandler;
