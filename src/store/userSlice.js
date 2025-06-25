import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  _id: "",
  name: "",
  email: "",
  avatar: "",
  mobile: "",
  verify_email: "",
  status: "",
  last_login_date: "",
  address_details: [],
  shopping_cart: [],
  orderHistory: [],
  role: "",
  createdAt: "",
  loading: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialValue,
  reducers: {
    setUserDetails: (state, actions) => {
      state.name = actions.payload?.name;
      state.email = actions.payload?.email;
      state._id = actions.payload?._id;
      state.avatar = actions.payload?.avatar;
      state.mobile = actions.payload?.mobile;
      state.verify_email = actions.payload?.verify_email;
      state.status = actions.payload?.status;
      state.last_login_date = actions.payload?.last_login_date;
      state.address_details = actions.payload?.address_details;
      state.shopping_cart = actions.payload?.shopping_cart;
      state.orderHistory = actions.payload?.orderHistory;
      state.role = actions.payload?.role;
      state.createdAt = actions.payload?.createdAt;
    },
    updateProfileImage: (state, actions) => {
      state.avatar = actions.payload;
    },

    logout: (state, actions) => {
      state.name = actions.payload?.name;
      state.email = "";
      state._id = "";
      state.avatar = "";
      state.mobile = "";
      state.verify_email = actions.payload?.verify_email;
      state.status = "";
      state.last_login_date = "";
      state.address_details = [];
      state.shopping_cart = [];
      state.orderHistory = [];
      state.role = "";
      state.createdAt = "";
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});


export const {setUserDetails,logout,updateProfileImage,setLoading} = userSlice.actions

export default userSlice.reducer