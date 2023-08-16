// import modules
const express = require("express");
const mysql = require("mysql");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();


// app
const app = express();


// db
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password', 
  database: 'ecommerce',
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } 
  else {
    console.log('Connected to the database');
  }
});


// middleware
app.use(morgan("dev"));
app.use(cors({ origin: true, credentials: true}));

// routes



// port
const port = process.env.PORT;


// listener
const server = app.listen(port, () =>
  console.log(`Server is running on port ${port}`)
);