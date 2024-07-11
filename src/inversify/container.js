import { Container } from 'inversify';
import { BooksRepository } from './BooksRepository';

// Создаем контейнер
const container = new Container();

// Регистрируем BooksRepository в контейнере
container.bind(BooksRepository).toSelf();

export { container };
