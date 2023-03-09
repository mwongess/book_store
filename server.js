const express = require("express");
const json = express.json;
const startServer = require("./lib/boot");
const { getBooks, getBook, addBook, updateBook, deleteBook } = require("./controlllers/controllers");

const app = express();
app.use(json()); 


app.get("/books", getBooks);
app.get("/books/:id", getBook);
app.post("/books",addBook );
app.put("/books/:id", updateBook);
app.delete("/books/:id",deleteBook);

startServer(app)