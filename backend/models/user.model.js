import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
      password:{
        type:String,
        default:"123456",
        required:true,
        minlength:6
    },
      email:{
        type:String,
        required:true,
        unique:true
    },
      mobile:{
        type:String,
        required:true,
        maxlength:10,
        minlength:10
    },
    address:{
        houseNo:{
            type:String,
        },
        lane:{
            type:String
        },
        city:{
            type:String
        },
        state:{
            type:String,
            enum: [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
]

        },
        pincode:{
            type:Number
        }
    },
    cart:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"cart"
    },
    google_id:{
        type:String
    },
    provider:{
        type:String,
        default:"Google"
    },
    products:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'products'
        }
    ]
},{timestamps:true})

userSchema.pre("save",async function (next){
    try {
        this.password= await bcrypt.hash(this.password,10)
        next()
        
    } catch (error) {
        console.log("error in user schema password hash")
    }
})

userSchema.methods.checkPassword =async function(enteredPassword){
    return await bcrypt.compare(this.password,enteredPassword)
}

userSchema.methods.generateJWTtoken= function(){
return jwt.sign({id:this._id},process.env.SECRET_JWT_KEY,{expiresIn:"2h"}) 
}

export const userModel = mongoose.model("user",userSchema)