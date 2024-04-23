const BookClass = require('../book/BookClass');
const UserClass = require('../user/UserClass');

const bookTest = new BookClass('test', 'test', 'test', true, 'test', 'test');
const bookTest2 = new BookClass(
    'test2',
    'test2',
    'test2',
    true,
    'test2',
    'test2',
);
const userTest = new UserClass('test@test.com');
const store = {
    books: [bookTest, bookTest2],
    users: [userTest],
};

module.exports = store;
