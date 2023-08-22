const router = require("express").Router();

const { GetProducts } = require("../controllers/Products");


router.get("/products", GetProducts);


module.exports = router;