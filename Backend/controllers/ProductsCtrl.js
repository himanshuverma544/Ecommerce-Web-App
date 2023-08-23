const db = require("../database");

module.exports.GetProducts = (_, res) => {

  const query = "SELECT * FROM products";

  db.query(query, (error, results) => {
    if (error)
      res.status(500).json({ error: "Error Fetching Products"});
    res.json(results);
  });
}