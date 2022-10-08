const product_model = require("../models/product-model")
const category_model = require("../models/category-model")
module.exports = {
    create: (req, res) => {
        req.body["galleries"] = req.files.length <= 0 ? [] :
            req.files.map(function(file) {
                return { name: file.filename, description: "product" };
            });
        const product = new product_model(req.body)
        product.save(req.body, (err, item) => {
            if (err) {
                res.status(406).json({ message: "fail to add product" })
            } else {
                category_model.findByIdAndUpdate(req.body.category, { $push: { products: product } }, () => {
                    res.status(201).json({ message: "product added successfully", data: item })
                })
            }


        })

    },
    getall: (req, res) => {
        product_model.find({}).exec((err, items) => {
            if (err) {
                res.status(406).json({ message: "cannot get products" })


            } else {


                res.status(201).json({ message: "list of products", data: items }) // we can use (200) but it works with update more
            }

        })
    },
    stats:async(req,res)=>{
        const date=new Date()
        const lastYear=new Date(date.setFullYear(date.getFullYear()-1));
        try{
          const data=await product_model.aggregate([
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
       //get user by id
      getbyid: (req, res) => {
          user_model.findById(req.params.id, (err, item) => {
              if (err) {
                  res.status(406).json({ message: "cannot get user by this id" })
  
  
              } else {
  
                  res.status(201).json({ message: " user : ", data: item })
              }
          })
      },
    getone: (req, res) => {
        product_model.findById(req.params.id, (err, item) => {
            if (err) {
                res.status(406).json({ message: "failed to get product" })
            } else {
                res.status(201).json({ message: "success!!", data: item })
            }
        })

    },
    getbyname: (req, res) => {
        product_model.find({ name: req.query.name }, (err, item) => {
            if (err) {
                res.status(406).json({ message: "failed to get product with this name" })
            } else {
                res.status(201).json({ message: "success!!", data: item })
            }

        })
    },
    update: (req, res) => {
        product_model.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, item) => {
            if (err) {
                res.status(406).json({ message: "failed to update" })
            } else {
                res.status(200).json({ message: "success!!", data: item })
            }
        })
    },
    delete: (req, res) => {
        product_model.findByIdAndRemove(req.params.id, (err, item) => {
            if (err) {
                res.status(406).json({ message: "failed to delete product" })
            } else {
                res.status(201).json({ message: "success!!" })
            }
        })
    }




}