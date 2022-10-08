const express = require("express")
const route = express.Router()
const category_controller = require("../controllers/category-controller")




route.post("/create", category_controller.create)
route.get("/getall", category_controller.getall)
route.get("/stats", category_controller.stats)
route.get("/getbyid/:id", category_controller.getbyid)
route.get("/getbyname", category_controller.getbyname)
route.put("/update/:id", category_controller.update)
route.delete("/delete/:id", category_controller.delete)



module.exports = route