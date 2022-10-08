const user_model = require("../models/user-model")
module.exports = {
    register: (req, res) => {
        const user = new user_model(req.body)
        user.save(req.body, (err, item) => {
            if (err) {
                res.status(406).json({ message: "failed to save user" + err })
            } else {
                res.status(201).json({ message: "user saved successfully", data: item })
            }
        })
    },//get all users
    getall: (req, res) => {
        user_model.find({}, (err, items) => {
            if (err) {
                res.status(406).json({ message: "failed to get all users" + err })
            } else {
                res.status(201).json({ message: "list of our users", data: items })
            }
        })
    },//get users stats
    stats:async(req,res)=>{
      const date=new Date()
      const lastYear=new Date(date.setFullYear(date.getFullYear()-1));
      try{
        const data=await user_model.aggregate([
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
    },//get user by name
    getbyname: (req, res) => {
        user_model.find({ name: req.query.name }, (err, item) => {
            if (err) {
                res.status(406).json({ message: "cannot get user by this name" })


            } else {

                res.status(201).json({ message: " user", data: items })
            }
        })
    },//update user
    update: (req, res) => {
        user_model.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, item) => {
            if (err) {
                res.status(406).json({ message: "failed to update user" })


            } else {

                res.status(201).json({ message: " success of update", data: item })
            }
        })
    },//delete user
    delete: (req, res) => {
        user_model.findByIdAndRemove(req.params.id, (err, item) => {
            if (err) {
                res.status(406).json({ message: "failed to delete user" })


            } else {

                res.status(201).json({ message: " success of delete" })
            }
        })
    }


}