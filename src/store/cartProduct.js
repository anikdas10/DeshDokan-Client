import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    cart : [],
    cartLoading : true
}

const cartSlice = createSlice({
  name: "cartItem",
  initialState: initialValue,
  reducers : {
    addItemCart : (state , action)=>{
        state.cart = action.payload
    },
    setCartLoading : (state , action)=>{
        state.cartLoading  = action.payload
    }
  }

});

export const {addItemCart ,setCartLoading } = cartSlice.actions

export default cartSlice.reducer