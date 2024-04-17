const express = require("express");
const User = require("./src/user/UserClass");
const allBookRouter = require("./src/book/routes/allBookRouter");
require("dotenv").config();

const app = express();
app.use("/api", allBookRouter);

//
// app.use("/:id", (req, res) => {
//   const { id } = req.params;
//   const { books } = store;
//   const idx = books.findIndex((el) => el.id === id);
//
//   if (idx !== -1) {
//     res.json(books[idx]);
//   } else {
//     res.status(404);
//     res.json("404 | Книга не найдена");
//   }
// });
//
// app.post("/api/user/login", (req, res) => {
//   const { user } = store;
//   const { id, mail } = req.body;
//
//   const newUser = new User(id, mail);
//   user.push(newUser);
//
//   res.status(201);
//   res.json(newUser);
// });
//
// app.put("/api/books/:id", (req, res) => {
//   const { books } = store;
//   const { id } = req.params;
//   const idx = books.findIndex((el) => el.id === id);
//
//   if (idx !== -1) {
//     books[idx] = {
//       ...books[idx],
//       title,
//       author,
//       description,
//       favorite,
//       fileCover,
//       fileName,
//     };
//
//     res.json(books[idx]);
//   } else {
//     res.status(404);
//     res.json("404 | Книга не найдена");
//   }
// });
//
// app.delete("/api/books/:id", (req, res) => {
//   const { books } = store;
//   const { id } = req.params;
//   const idx = books.findIndex((el) => el.id === id);
//
//   if (idx !== -1) {
//     books.splice(idx, 1);
//     res.json("ok");
//   } else {
//     res.status(404);
//     res.json("404 | Книга не найдена");
//   }
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});
