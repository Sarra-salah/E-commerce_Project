const product_model = require("../models/product-model")
const category_model = require("../models/category-model")
const user_model = require("../models/user-model")


const data_count=async(req,res)=>{

    try {
        const count_data=[];
        const product_data=await product_model.find().count();
        const category_data=await category_model.find().count();
        const  user_data=await user_model.find({isAdmin:false}).count();


        count_data.push({
            product:product_data,
            user:user_data,
            category:category_data
        })
        res.status(200).send({success:true,msg:"counting data",data:count_data})


    }catch(error){
        res.status(400).send({success:false,msg:error.message})
    }
}
module.exports={
    data_count 
}