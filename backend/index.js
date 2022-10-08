const express = require("express")
const dotenv = require("dotenv").config() // pour bien exporter port de .env 
const database = require("./config/database")
const app = express()
const cors = require("cors")
app.use(express.json())
app.use(cors())


app.get("/getImage/:img", function(req, res) {
    res.sendFile(__dirname + "./././frontend/frontend/src/assets/img/storages" + req.params.img)
})



const product_route = require("./routers/product-route")
const category_route = require("./routers/category-route")
const user_route = require("./routers/user-router")
const Count_route=require("./routers/Count-route")
const auth_route=require("./routers/Autho-route")









app.use("/products", product_route)
app.use("/count",Count_route)
app.use("/categories", category_route)
app.use("/users", user_route)
app.use("/Auth",auth_route)






const PORT = process.env.PORT

app.listen(PORT, function() { //creation de serveur 
    console.log(`server working good on http: //localhost:${PORT}`)
})