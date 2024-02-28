const express = require("express")
const transactions = express.Router()
let transactionsArray = require("../models/transaction.model.js")

transactions.get("/", (req, res) => {
    res.json({ transactions: transactionsArray })
})

module.exports = transactions;