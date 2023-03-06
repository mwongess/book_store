const express = require("express");
const json = express.json
const connection = require("./config");
const {v4: uuidv4} = require('uuid')

const app = express();
app.use(json())

const PORT = 4000;

app.get("/books", (req, res) => {
  try {
    const query = "SELECT * FROM books;";
    connection.query(query, (error, results) => {
        if(error){
            res.json({ERROR: error})
            return
        }
        res.json({BOOKS: results})

    });
  } catch (error) {
    res.json({ERROR: error})
  }
});

app.post("/books",(req, res)=>{
    try {
        const id = uuidv4()
        const {name} = req.body
        const query = `INSERT INTO books VALUES ("${id}", "${name}")`

        connection.query(query, (error,info)=>{
            if(error){
                res.json({error})
                return
            }
            res.json({info})
        })
    } catch (error) {
        
    }
})
app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}`);
});
