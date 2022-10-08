const express=require("express")
const route=express.Router()

const auth_controller=require("../controllers/Auto-controller")


route.post('/login',auth_controller.login)
route.post('/refreshtoken',auth_controller.refreshtoken)
route.post('/logout',auth_controller.logout)


module.exports=route