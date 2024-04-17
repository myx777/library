const BookClass = require("../book/BookClass");

const bookTest = new BookClass("test", "test", "test", true, "test", "test");
const store = {
  books: [bookTest],
  users: [],
};

module.exports = store;
