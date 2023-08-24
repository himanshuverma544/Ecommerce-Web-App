// modules
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const morgan = require("morgan");
const path = require("path");

const authenticationRoute = require("./routes/AuthenticationRoute");
const productsRoute = require("./routes/ProductsRoute");


// app
const app = express();


// middleware
app.use(express.json());
app.use(cors({ origin: true, credentials: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan("dev"));


// routes
app.use("/", authenticationRoute);
app.use("/", productsRoute);


// listener
app.listen(process.env.PORT);