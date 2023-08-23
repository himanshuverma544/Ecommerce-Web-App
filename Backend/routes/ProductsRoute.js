const router = require("express").Router();

const { GetProducts } = require("../controllers/ProductsCtrl");


router.get("/api/products", GetProducts);


module.exports = router;