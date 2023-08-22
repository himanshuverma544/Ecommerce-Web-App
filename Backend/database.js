const mysql = require("mysql2");

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

module.exports = db;