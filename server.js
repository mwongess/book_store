const express = require("express");
const json = express.json
const connection = require("./config");
const {v4: uuidv4} = require('uuid')

const app = express();
app.use(json()) //Making sure our app accepts json

const PORT = 4000;

app.get("/books", (req, res) => {
  try {
    const query = "SELECT * FROM books;";
    connection.query(query, (error, results) => {
        if(error){
            res.json(error)
            return
        }
        res.json(results)

    });
  } catch (error) {
    res.json({ERROR: error})
  }
});

app.post("/books",(req, res)=>{
    try {
        const id = uuidv4() //Generates unique id
        const {name} = req.body //We are spreading the request to access book name entered by user when sending the request
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
