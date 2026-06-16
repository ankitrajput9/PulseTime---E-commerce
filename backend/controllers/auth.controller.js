import { userModel } from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { cartModel } from "../models/cart.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { CustomError } from "../utils/errorHandler.js"

export const registerController = asyncHandler(async (req, res) => {


    let { userName, email, mobile, password, city, state, houseNo, pincode, lane } = req.body
    if (!userName || !email || !password || !mobile) {
        throw new CustomError("All field required", 400)
    }
    const newUser = await userModel.create({
        userName,
        email,
        mobile,
        password    ,
        address: {
            houseNo,
            lane,
            city,
            state,
            pincode

        }
    })

    const usercart = await cartModel.create({
        user_id: newUser._id

    })

    newUser.cart = usercart._id
    await newUser.save()

// now we generate tokon in schema 
const token = newUser.generateJWTtoken()
    // const token = jwt.sign({ id: newUser._id }, process.env.SECRET_JWT_KEY, { expiresIn: "1h" })
    res.cookie("token", token)

    return res.status(201).json({
        success: true,
        message: "user registered",
        newUser
    })


})

export const loginController = asyncHandler(async (req, res) => {


    let { email, password } = req.body
    if (!email || !password) {
        throw new CustomError("All field required", 400)
    }
   

    const existeduser = await userModel.findOne({ email })
    
    if (!existeduser) {
        throw new CustomError("user not exist", 401)
    }

    // const checkpass = await bcrypt.compare(password, existeduser.password)
    const checkpass = existeduser.checkPassword(password)
    
    if (!checkpass) {
        throw new CustomError("invalid password or email", 401)
    }

    // const token = jwt.sign({ id: existeduser._id }, process.env.SECRET_JWT_KEY, { expiresIn: "1d" })
    const token= existeduser.generateJWTtoken()
    res.cookie("token", token)

    return res.status(200).json({
        success: true,
        message: "user logedin",
    })


}
)

export const logoutController = asyncHandler(async (req, res) => {

    let { userId } = req.params
    if (!userId) {
        throw new CustomError("user not found", 404)
    }
    const logout = res.clearCookie("token")
    return res.status(200).json({
        message: "user logout",
        success: true
    })



})

export const currentLoginUserController = asyncHandler(async(req,res)=>{

    return res.status(200).json({
        success:true,
        message:"user fetched",
        user:req.user
    })
})

// Google Authenticate 
export const googleAuthController =asyncHandler(async(req,res)=>{

    console.log("callback user ----- >",req.user)
    
return res.status(200).json({
    success:true,
    message:"google user register",
})

})

// Forgot password 

const forgotPasswordController = asyncHandler(async(req,res)=>{
let {email}= req.body
if(!email)throw new CustomError("enter your email",400)

 const existedUser = await userModel.findOne({email})
if(!existedUser)throw new CustomError("Unauthorized user",401)

const rawToken = jwt.sign({id:existedUser._id},process.env.JWT_RAW_SECRET,{expiresIn:"2min"})

const resetLink = `/api/auth/reset-password/${rawToken}`





})