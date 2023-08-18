// import modules
const express = require("express");
const path = require("path");
const mysql = require("mysql2");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();


// app
const app = express();


// db
const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, 
  database: process.env.DATABASE_NAME,
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } 
});


// middleware
app.use(express.json());
app.use(cors({ origin: true, credentials: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan("dev"));


// routes
app.get("/products", (req, res) => {
  const query = "SELECT * FROM products";
  db.query(query, (error, results) => {
    if (error)
      res.status(500).json({ error: "Error Fetching Products"});
    res.json(results);
  });
});


// listener
app.listen(process.env.PORT);