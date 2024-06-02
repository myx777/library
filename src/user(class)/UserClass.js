const { v4: uuid } = require('uuid');

/**
 * формирует пользователя с уникальным id
 * @class
 */
class UserClass {
    constructor(mail) {
        this.id = uuid();
        this.mail = mail;
    }
}

module.exports = UserClass;
