const router = require("express").Router();

const { SignUp } = require("../controllers/AuthenticationCtrl");


router.post("/api/signup", SignUp);


module.exports = router;