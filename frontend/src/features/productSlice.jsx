import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name:'products',
    initialState:{
        products:null
    },
reducers:{
   getproducts:(state,action)=>{
    state.products = action.payload
   }
}
})

export let {getproducts }= productSlice.actions;
export default productSlice.reducer;