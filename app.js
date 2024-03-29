const express = require('express')
const cors = require("cors");

const app = express()

const transactionsController = require("./controllers/transactionsController.js")

// MIDDLEWARE PACKAGES
app.use(cors());
app.use(express.json());

//MIDDLEWARE FOR CONTROLLERS
app.use("/transactions", transactionsController);

// ROUTES
app.get("/", (req, res) => {
    res.send("Welcome")
})

// 404 PAGE
app.get("*", (req, res) => {
    res.json({ error: "Page not found" });
  });

module.exports = app;