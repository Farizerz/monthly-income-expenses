const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db.js");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//listen
app.listen(5000, () => {
    console.log("PORT 5000 Started!");
});