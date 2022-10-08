const jwt =require("jsonwebtoken")//package responsible for the verification
const JWT_SECRET=process.env.JWT_SECRET


const verifyToken=(req,res,next)=>{
    const token =req.headers.authorization
    if (token){
        jwt.verify(token,JWT_SECRET,(err,payload)=>{
            if(err){
                res.status(403).json({message:"token is invalid"})
            }else {
                req.user=payload
                next()
            }

        })
    }else {
        res.status(403).json({message:"authentication invalid  "})
    }
}
module.exports=verifyToken