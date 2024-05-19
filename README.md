библиотека

#### 1. Запрос(ы) для вставки данных минимум о двух книгах в коллекцию books

<details>
<summary>Задание 1</summary>

```
db.collection('books').insertMany(
    {
      title: "Война и мир",
      description: "книга о любви",
      authors: "Л. Толстой"
    },
    {
      title: "Колобок",
      description: "о выпендреже",
      authors: "Народ"
    },
);
```
</details>

#### 2. Запрос для поиска полей документов коллекции books по полю title

<details>
<summary>Задание 2</summary>

```
db.collection('books').find({ title: "Война и мир" });

```
</details>


#### 3. запрос для редактирования полей: description и authors коллекции books по _id записи.

<details>
<summary>Задание 3</summary>

```
db.books.updateOne(
    { id: 1 },
    { 
        $set: {
            description: "новое описание",
            authors: "новые авторы"
        }
    }
);

```
</details>