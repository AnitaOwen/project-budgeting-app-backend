const express = require("express")

function validateForm(req, res, next){
    const { itemName, amount, date, from, category, transactionType } = req.body

    if (
        !itemName ||
        amount == 0 ||
        !date ||
        !from ||
        !category ||
        !transactionType
    ) {
        return res.status(400).json({ message: "Invalid Inputs" })
    } else {
        next()
    }
}

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

transactions.post("/", validateForm, (req, res) => {
    const newId = transactionsArray[transactionsArray.length -1].id + 1
    req.body.id = newId
    if(req.body.transactionType === "withdrawal"){
        req.body.amount = +req.body.amount * -1
      }
    transactionsArray.push(req.body)
    res.json({ transactions: transactionsArray })
})

transactions.delete("/:id", (req, res) => {
    const { id } = req.params
    transactionsArray = transactionsArray.filter((transaction) => transaction.id !== +id)
    res.json({ transactions: transactionsArray })
})

transactions.put("/:id", (req, res) => {
    const { id } = req.params
    const transactionIndex = transactionsArray.findIndex((transaction) => transaction.id === +id)
    if(transactionIndex > -1){
        if(req.body.transactionType === "withdrawal"){
            req.body.amount = +req.body.amount * -1
          }
        transactionsArray[transactionIndex] = req.body
        res.json({ transactions: transactionsArray })
    } else {
        res.status(400).json({ message: "Transaction not found."})
    }
})


module.exports = transactions;