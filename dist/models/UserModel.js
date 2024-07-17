"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Схема mongoose для User
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        unique: true,
        required: true,
    },
    secondName: {
        type: String,
        unique: true,
        required: true,
    },
});
// Создание модели пользователя с указанием типа документа и модели
const UserModel = (0, mongoose_1.model)('User', userSchema);
exports.default = UserModel;
