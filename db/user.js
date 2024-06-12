const { default: mongoose } = require("mongoose");
require("dotenv").config()
const exchangeSchema = require("./exchangeSchema");

const DB_NAME = process.env.DB_NAME || "TransactionApp";
const URI = process.env.MONGO_URI || "mongodb+srv://temp1:temp1@cluster0.btm4xmc.mongodb.net";
const MONGO_URI = `${URI}/${DB_NAME}`;

mongoose.connect(MONGO_URI).then(() => console.log("Connected")).catch((err) => console.log(err))

const exchanges = mongoose.model('exchange', exchangeSchema,'exchanges')

module.exports = {exchanges}