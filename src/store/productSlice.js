import { createSlice } from "@reduxjs/toolkit";


const initialValue = {
  allCategory: [],
  allSubCategory: [],
  product: [],
  categoryLoading: false,
  subCategoryLoading : false
};

const productSlice = createSlice({
  name: "product",
  initialState: initialValue,
  reducers: {
    setAllCategory: (state, action) => {
      state.allCategory = action.payload;
     
    },
    setAllSubCategory : (state,action)=>{
      state.allSubCategory = action.payload;
    },
    setLoadingCategory: (state, action) => {
      state.categoryLoading = action.payload;
    },
    setLoadingSubCategory: (state, action) => {
      state.subCategoryLoading = action.payload;
    },
   
  },
});


export const {setAllCategory,setLoadingCategory,setAllSubCategory,setLoadingSubCategory} = productSlice.actions

export default productSlice.reducer