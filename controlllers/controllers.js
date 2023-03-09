const { v4: uuidv4 } = require("uuid");
const connection = require("../config/config");

const addBook = (req, res) => {
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
};
const getBooks = (req, res) => {
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
};

const getBook = (req, res) => {
  try {
    const id = req.params.id;
    const sql = `SELECT * FROM books WHERE id="${id}"`;
    connection.query(query, (error, book) => {
      if (error) {
        res.json(error);
        return;
      }
      res.json(book);
    });
  } catch (error) {
    res.json(error);
  }
};

const updateBook = (req, res) => {
  try {
    const id = req.params.id;
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
};

const deleteBook = (req, res) => {
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
};

module.exports = { addBook, getBook, getBooks, updateBook, deleteBook };
