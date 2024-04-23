const express = require('express');
const router = express.Router();

//роут главной страницы
router.get('/', (req, res) => {
    res.render('index', {
        title: 'Библиотека',
    });
});

module.exports = router;
