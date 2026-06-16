import mongoose from "mongoose";


const cartSchema = new mongoose.Schema({
    user_id : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    items:[
        {
            product_id:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"products"
            },
            quantity:Number
        }
    ]
},{timestamps:true})


export const cartModel = mongoose.model("cart",cartSchema) 