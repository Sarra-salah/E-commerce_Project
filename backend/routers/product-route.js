const express = require("express")
const product_controller = require("../controllers/product-controller")
const route = express.Router()
const upload = require("../middlware/uploadFiles")


route.post("/create", upload.array("photos"), product_controller.create)
route.get("/getall", product_controller.getall)
route.get("/stats", product_controller.stats)
route.get("/getone/:id", product_controller.getone)
route.get("/getbyname", product_controller.getbyname)
route.put("/update/:id", product_controller.update)
route.delete("/delete/:id", product_controller.delete)

module.exports = route