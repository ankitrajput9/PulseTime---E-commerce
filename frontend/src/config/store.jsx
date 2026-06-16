import { configureStore } from "@reduxjs/toolkit";
import Authreducer from "../features/authSlice"
import Productreduser from "../features/productSlice"
import Cartreduser from "../features/cartSlice"

export const store = configureStore({
    reducer:{
        auth:Authreducer,
        products:Productreduser,
        cart:Cartreduser
    }
})