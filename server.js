const express = require("express");
const json = express.json;
const startServer = require("./lib/boot");
const router = require("./routes/routes");

const app = express();

app.use('/books', router)
app.use(json()); 

startServer(app)