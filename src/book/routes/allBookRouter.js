const express = require("express");
const store = require("../../store/store");
const router = express.Router();

router.get("/books", (req, res) => {
  const { books } = store;
  // console.log(store);
  res.json(books);
});

module.exports = router;
