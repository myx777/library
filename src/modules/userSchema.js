const {Schema, model} = require('mongoose');
const mongoose = require('mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
    },
    username: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        unique: true,
    },
    secondName: {
        type: String,
        unique: true,
    },
});

module.exports = model('User', UserSchema);