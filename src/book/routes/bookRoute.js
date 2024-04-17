const express = require("express");
const store = require("../../store/store");
const router = express.Router();

router.get("/api/books", (req, res) => {
  const { books } = store;
  res.json(books);
});

module.exports = router;
