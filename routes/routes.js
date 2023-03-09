const { getBooks, getBook, addBook, updateBook, deleteBook } = require("../controlllers/controllers");
const express = require('express');
const router = express.Router();

router.get("/", getBooks);
router.get("/:id", getBook);
router.post("/",addBook );
router.put("/:id", updateBook);
router.delete("/:id",deleteBook);

module.exports = router;
