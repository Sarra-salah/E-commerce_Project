const user_controller = require("../controllers/user-controller")
const express = require("express")
const upload = require("../middlware/uploadFiles")
const route = express.Router()


route.post("/register", user_controller.register)
route.get("/getall", user_controller.getall)
route.get("/stats",user_controller.stats)
route.get("/getbyid/:id", user_controller.getbyid)
route.get("/getbyname", user_controller.getbyname)
route.put("/update/:id", user_controller.update)
route.delete("/delete/:id", user_controller.delete)



module.exports = route