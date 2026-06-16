import { createSlice } from "@reduxjs/toolkit";

  
   const cartSlice = createSlice({
  name :"cart",
  initialState:{
    items:null
  },
  reducers:{

allCartItems:(state,action)=>{
    state.items = action.payload
},
removeFromCart:(state,action)=>{
    state.items = state.items.filter(item => item._id !== action.payload._id)
},
  }

   })

   export const {allCartItems,removeFromCart} = cartSlice.actions;
   export default cartSlice.reducer;  