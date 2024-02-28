const express = require("express")

const transactions = express.Router()
let transactionsArray = require("../models/transaction.model.js")

transactions.get("/", (req, res) => {
    res.json({ transactions: transactionsArray })
})

transactions.get("/:id", (req, res) => {
    const { id } = req.params
    const transaction = transactionsArray.find((transaction) => transaction.id === +id)
    res.json({ transaction })
})

module.exports = transactions;