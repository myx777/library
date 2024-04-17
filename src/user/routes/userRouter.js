const express = require('express');
const router = express.Router();
const store = require('../../store/store');
const UserClass = require('../UserClass');

router.use(express.json());

/**
 * логит пользователя по email
 */
router.post('/user/login', (req, res) => {
    const { users } = store;
    const { mail } = req.body;

    const newUser = new UserClass(mail);
    users.push(newUser);

    res.status(201);
    res.json(newUser);
});

module.exports = router;
