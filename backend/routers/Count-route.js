const express=require("express")
const count_controller=require("../controllers/Count-controller")
const route=express.Router()


route.get("/data_count",count_controller.data_count)

module.exports = route