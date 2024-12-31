const express = require("express");
const { MongoClient } = require("mongodb");
const app = require('./app.js')




const dbConnect = require("./db/dbConnection");
require("dotenv").config();

const port = process.env.PORT || 3000;
console.log(port);

dbConnect();
app.use(express.json());

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
