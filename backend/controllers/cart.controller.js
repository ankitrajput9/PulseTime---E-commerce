import { cartModel } from "../models/cart.model.js"
import { userModel } from "../models/user.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { CustomError } from "../utils/errorHandler.js"

export const addtoCartController = asyncHandler(async (req, res) => {

    let { productId } = req.params
    let userId =  req.user._id

    if (!productId || !userId) return res.status(400).json({
        message: "id not found"
    })

    let user = await userModel.findById(userId)
    let cart_id = user.cart
    let cartData = await cartModel.findById(cart_id)

    const exist = cartData.items.find((elem) => elem.product_id.toString() === productId)
    if (exist) return res.status(400).json({
        message: "product already exist"
    })

    const addProduct = await cartModel.findByIdAndUpdate(cart_id, {
        $push: {
            items: {
                product_id: productId,
                quantity: 1
            }

        }
    })

    return res.status(200).json({
        success: true,
        message: "product added to cart",
        cart: addProduct
    })
}
)


export const getcartProductcontroller = asyncHandler(async (req, res) => {

//    const user = req.user
    const cartId = req.user.cart
    if (!cartId) {
        throw new CustomError("id not found", 404)
    }

    const cartProducts = await cartModel.findById(cartId).populate("items.product_id")

    console.log(cartProducts)

    return res.status(200).json({
        success: true,
        message: "product fetched",
        cartProducts
    })

}) 

export const incrementProductController = asyncHandler(async()=>{

    const {productId,cartId}= req.params
    if(!productId||!cartId){
        throw CustomError("id not found",404)
    }

    let cart = await cartModel.findById(cartId)

await cartModel.findOneAndUpdate({_id:cartId,"items.product_id":productId},
    {$inc:{"items.$.quantity": +1}}
)


    // cartItems = cart.items.find((elem)=>elem.product_id.toString() === productId )
    // cartItems.quantity += 1
    // await cart.save()

    return res.status(200).json({
        success:true,
        message:"product quantity increased",
        cart,
    })
      
})

export const decrementProductController = asyncHandler(async()=>{

    const {productId,cartId}= req.params
    if(!productId||!cartId){
        throw CustomError("id not found",404)
    }

    let cart = await cartModel.findById(cartId)
   const  cartItems = cart.items.find((elem)=>elem.product_id.toString() === productId )   

   if(cartItems){
    if(cartItems.quantity === 0 ){
        throw CustomError("product quantity is 0",400)
    }
    await cartModel.findOneAndUpdate({
        _id:cartid,
        "items.product_id":productId
    },{
        $inc:{"items.$.quantity":-1}
    },{new:true})
   }


    // for decrement from lengthy process 

    // if(cartItems){
    //     if(cartItems.quantity === 0 ){
    //         throw CustomError("item quantity 0",400)
    //     }
    //         cartItems.quantity -= 1
    // }
    // await cart.save()

    return res.status(200).json({
        success:true,
        message:"product quantity increased",
        cart,
    })
      
})

export const  removeProductFromCartController = asyncHandler(async(req,res)=>{

     const {productId}= req.params
     const cartId = req.user.cart

    if(!productId||!cartId){
        throw CustomError("id not found",404)
    }

    let cart = await cartModel.findById(cartId)

    const updatedCart = cart.items.filter((elem)=> elem.product_id.toString() !== productId)
    cart.items = updatedCart
    await cart.save()

    return res.status(200).json({
        success:true,
        message:"product removed",
        cart
    })
  


})