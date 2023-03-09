const express = require("express");
const json = express.json;
const connection = require("./config/config");
const { v4: uuidv4 } = require("uuid");
const { query } = require("./config/config");

const app = express();
app.use(json()); //Making sure our app accepts json


// FETCH all books in the db
app.get("/books", (req, res) => {
  try {
    const query = "SELECT * FROM books;";
    connection.query(query, (error, results) => {
      if (error) {
        res.json(error);
        return;
      }
      res.json(results);
    });
  } catch (error) {
    res.json({ ERROR: error });
  }
});

// GET one book using unique id
app.get("/books/:id", (req, res) => {
  try {
    const id = req.params.id;
    const sql = `SELECT * FROM books WHERE id="${id}"`;
    connection.query(query, (error, book) => {
      if (error) {
        res.json(error)
        return
      }
      res.json(book)
    });
  } catch (error) {
    res.json(error)
  }
});

// ADD a new book
app.post("/books", (req, res) => {
  try {
    const id = uuidv4(); //Generates unique id
    const { name, author } = req.body; //We are spreading the request to access book name entered by user when sending the request
    const query = `INSERT INTO books VALUES ("${id}", "${name}", "${author}")`;

    connection.query(query, (error, info) => {
      if (error) {
        res.json({ error });
        return;
      }
      res.json({ info });
    });
  } catch (error) {}
});

// UPDATE an existing book
app.put("/books/:id", (req, res) => {
  try {
    const id = req.params.id
    const { name, author } = req.body;
    const sql = `UPDATE books SET name = "${name}", author = "${author}" WHERE id = "${id}"`;
    connection.query(sql, (error, info) => {
      if (error) {
        res.json(error);
        return;
      }
      res.json(info);
    });
  } catch (error) {
    res.json(error);
  }
});


// DELETE a book from the db
app.delete("/books/:id", (req, res) => {
  try {
    const id = req.params.id;
    const sql = `DELETE FROM books WHERE id = "${id}"`;
    connection.query(sql, (error, info) => {
      if (error) {
        res.json(error);
        return;
      }
      res.json(info);
    });
  } catch (error) {
    res.json(error);
  }
});

// START SERVER
const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
});
