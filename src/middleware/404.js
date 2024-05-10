module.exports = (req, res) => {
    res.status(404).render('errors/404', {
        title: 'Такой страницы нет, код 404',
    });
};
