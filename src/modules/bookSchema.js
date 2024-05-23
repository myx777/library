const {Schema, model} = require("mongoose");

const bookSchema = new Schema({
    _id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        default: "title",
    },
    description: {
        type: String,
        default: "description",
    },
    authors: {
        type: String,
        default: "authors",
    },
    favorite: {
        type: String,
        default: "favorite",
    },
    fileCover: {
        type: String,
        default: "fileCover",
    },
    fileName: {
        type: String,
        default: "fileName",
    },
});

module.exports = model("Books", bookSchema);