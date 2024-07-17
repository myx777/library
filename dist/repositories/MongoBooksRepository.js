"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BooksRepository_1 = require("../inversify/BooksRepository");
const BookModel_1 = __importDefault(require("../models/BookModel"));
class MongoBooksRepository extends BooksRepository_1.BooksRepository {
    createBook(book) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBook = yield new BookModel_1.default(book);
            return yield newBook.save();
        });
    }
    getBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return BookModel_1.default.findById(id).select('-__v');
        });
    }
    getBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            return BookModel_1.default.find().select('-__v');
        });
    }
    updateBook(id, updatedBook) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield BookModel_1.default.findByIdAndUpdate(id, updatedBook, { new: true }).select('-__v');
        });
    }
    deleteBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return BookModel_1.default.findByIdAndDelete(id).then(() => { });
        });
    }
}
exports.default = MongoBooksRepository;
