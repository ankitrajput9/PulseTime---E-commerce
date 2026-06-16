import dotenv from "dotenv"
dotenv.config()
import { userModel } from "../models/user.model.js"
import jwt from "jsonwebtoken"
import { CustomError } from "../utils/errorHandler.js"

export const authMiddleware = async(req,res,next)=>{
    try {
        const token = req.cookies.token

    if(!token){
        throw new CustomError("token not found",400)
    }

    const verify = jwt.verify(token,process.env.SECRET_JWT_KEY )
    if(!verify){
        throw new CustomError("unauthorized token ",401)
    }

    const user = await userModel.findById(verify.id).select("-password")
    req.user = user
    next()

        
    } catch (error) {
        console.log("error in Auth middleware ",error)
    }
} 