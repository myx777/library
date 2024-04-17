const { v4: uuid } = require("uuid");

class BookClass {
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

module.exports = BookClass;
