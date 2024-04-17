const { v9: uuid } = require("uuid");

class UserClass {
  constructor(mail) {
    this.id = uuid();
    this.mail = mail;
  }
}

module.exports = UserClass;
