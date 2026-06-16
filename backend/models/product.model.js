import mongoose from "mongoose";



const productSchema = new mongoose.Schema({
    owner_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    productName:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    stock:{
        type:String,
        default:"0"
    },
    specifications: {
        caseMaterial: { type: String },
        caseDiameter: { type: String },
        waterResistance: { type: String },
    },
    price:{
        amount:{
            type:String,
            required:true
        },
        currency:{
            type:String,
            enum:["INR","USD","EUR","AUD"],
            default:"INR"
        },
    },
    category:{
            type:String,
            required:true,
            enum:[
            'Analog',       
            'Digital',      
            'Smart',        
            'Hybrid',       
            'Analog-Digital'] 
        },
    images:[
        {
            type:String,
        
        }
    ]
    
},{timestamps:true})
export const productModel = mongoose.model("products",productSchema)