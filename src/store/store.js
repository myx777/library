const BookClass = require('../book/BookClass');
const UserClass = require('../user/UserClass');

const bookTest = new BookClass('test', 'test', 'test', true, 'test', 'test');
const userTest = new UserClass('test@test.com');
const store = {
    books: [bookTest],
    users: [userTest],
};

module.exports = store;
