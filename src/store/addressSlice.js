import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    addressList : []

}

const addAddressSlice = createSlice({
    name : "address",
    initialState : initialValue,
    reducers :{
        handleAddAddress : (state , action)=>{
            state.addressList = [...action.payload]
        }
    }
})


export const {handleAddAddress} = addAddressSlice.actions;

export default addAddressSlice.reducer