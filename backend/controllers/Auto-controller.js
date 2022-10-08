const user_model=require("../models/user-model")
const bcrypt=require("bcrypt")

const jwt=require("jsonwebtoken")
const JWT_SECRET=process.env.JWT_SECRET
const RT_SECRET=process.env.RT_SECRET

const generateAccessToken=(user)=>{
    return jwt.sign({ id: user._id, email:user.email},JWT_SECRET,{expiresIn:"1m"})
}

const generateRefreshToken=(user)=>{
    return jwt.sign({ id: user._id, email:user.email},RT_SECRET,{expiresIn:"2m"})
}
let refreshTokens=[]

module.exports={
    login:async(req,res)=>{
        const user =await user_model.findOne({email:req.body.email})
        if(!user){
            res.status(406).json({message:"email not found"})
        }else{
            const validPassword=await bcrypt.compare(req.body.password,user.password)
            if(!validPassword){
                res.status(403).json({message:"password invalid"})
            }else{

                const token=generateAccessToken(user)
                const refreshtoken=generateRefreshToken(user)
                refreshTokens.push(refreshtoken)
                res.status(200).json({message:"welcome",data:user,accesstoken:token,refreshtoken:refreshtoken})
            }
        }
    },
    refreshtoken:(req,res,next)=>{
        const refreshtoken=req.body.token
        if(!refreshtoken) return res.status(401).json({message:"you are not authenticated"})
        if(!refreshTokens.includes(refreshtoken)) return res.status(401).json({message:"refreshToken invalid"})

        jwt.verify(this.refreshtoken,RT_SECRET,(err,user)=>{
            err&& console.log(err)
            refreshTokens=refreshTokens.filter((token)=>token!==refreshtoken)
            const newToken=generateAccessToken(user)
            const newrefreshToken=generateRefreshToken(user)
            refreshTokens.push(newrefreshToken)
            res.status(200).json({accesstoken:newToken,refreshtoken:newrefreshToken})
        })
    },
    logout:(req,res)=>{
        const refreshToken=req.body.token
        refreshTokens=refreshTokens.filter((token)=>token!==refreshToken)
        res.status(200).json("log out")
    }
   
}