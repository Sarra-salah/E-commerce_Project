const category_model = require("../models/category-model")
const product_model = require("../models/product-model")
module.exports = {
    // CREATE WEB SERVICE
    create: (req, res) => {
        const category = new category_model(req.body)
        console.log(category.name)
        category_model.find({ name: category.name }, (err, items) => {
            if (items.length != 0) {
                res.status(201).json({ message: "already exist"})
            } else {
                category.save(req.body, function(err, item) {
                    if (err) {
                        res.status(406).json({ message: "fail", err })
                    } else {
                        product_model.findByIdAndUpdate(req.body.product, { $push: { categories: category } }, () => {
                            res.status(201).json({ message: "success", data: item })
                        })
                    }
                })
            }
        })
       
    },
    getall: (req, res) => {
        category_model.find({}).populate("product").exec(function(err, items) {
            if (err) {
                res.status(406).json({ message: "fail to get all categories" })
            } else {
                res.status(201).json({ message: "**all categories!  **", data: items })
            }

        })
    },
    stats:async(req,res)=>{
        const date=new Date()
        const lastYear=new Date(date.setFullYear(date.getFullYear()-1));
        try{
          const data=await category_model.aggregate([
              {$match:{createdAt:{$gte:lastYear}}},
              {
                  $project:{
                      month:{$month:"$createdAt"},
                  },
              },{
                  $group:{
                      _id:"$month",
                      total:{$sum:1},
                  },
              },
          
          ])
          res.status(200).json(data)
  
        }catch(err){
          res.status(500).json(err)
        }
  
      },
    getbyid: (req, res) => {
        category_model.findById(req.params.id, (err, item) => {
            if (err) {
                res.status(406).json({ message: "cannot get category with this id", err })
            } else {
                res.status(201).json({ message: "success!", data: item })
            }
        })
    },
    getbyname: (req, res) => {
        category_model.find({ name: req.query.name }, (err, items) => {
            if (err) {
                res.status(406).json({ message: "fail to get  category with this name", err })
            } else {
                res.status(201).json({ message: "**success!  **", data: items })
            }
        })
    },
    delete: function(req, res) {
        product_model.find({category:req.params.id},(err,item)=>{
            if(item.length!=0){
                res.status(201).json({message:"already exist"})
            }
            else {
            console.log(req.params.id)
                category_model.findOneAndRemove(req.params.id, (err) => {
                    if (err) {
                        res.status(406).json({ message: "fail" }, err)
                    } else {
        
                        res.status(201).json({ message: "success" })
                    }
        
                })
         }
        })
        

    },
    update: function(req, res) {
        category_model.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, items) => {
            if (err) {
                res.status(406).json({ message: "cannot update category" })
            } else {
                res.status(201).json({ message: "category updated ", data: items })

            }
        })
    }
}