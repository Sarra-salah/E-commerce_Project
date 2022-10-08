const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const DB = process.env.URL




const database = mongoose.connect(DB, (err) => {
    if (err) {
        console.log("fail to connect database")
    } else {
        console.log("database connected successfully !")
    }
})

module.exports = database