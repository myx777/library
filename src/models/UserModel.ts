import { Schema, model, Document, Model } from 'mongoose';
import { IUser } from '../interfaces/IUser';

// Интерфейс, расширяющий IUser и Document
interface IUserDocument extends IUser, Document {}

// Интерфейс для модели, расширяющий Model<IUserDocument>
interface IUserModel extends Model<IUserDocument> {}

// Схема mongoose для User
const userSchema = new Schema<IUserDocument>({
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
const UserModel = model<IUserDocument, IUserModel>('User', userSchema);

export default UserModel;
