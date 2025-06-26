
export const baseURL = import.meta.env.VITE_API_URL;

const summaryApi = {
   register: {
     url: "/api/user/register",
     method: "post",
   },
   login: {
     url: "/api/user/login",
     method: "post",
   },
   forgotPassword: {
     url: "/api/user/forgot-password",
     method: "put",
   },
   forgotPasswordOtpVerification: {
     url: "/api/user/verify-forgot-password-otp",
     method: "put",
   },
   resetPassword: {
     url: "/api/user/reset-password",
     method: "put",
   },
   refreshToken: {
     url: "/api/user/refresh-token",
     method: "post",
   },
   userDetails: {
     url: "/api/user/user-details",
     method: "get",
   },
   logout: {
     url: "/api/user/logout",
     method: "get",
   },
   upload_avatar: {
     url: "/api/user/upload-avatar",
     method: "put",
   },
   update_user: {
     url: "/api/user/update-user",
     method: "put",
   },
   addCategory: {
     url: "/api/category/add-category",
     method: "post",
   },
   uploadImage: {
     url: "/api/file/upload-image",
     method: "post",
   },
   getCategory: {
     url: "/api/category/get-category",
     method: "get",
   },
   updateCategory: {
     url: "/api/category/update-category",
     method: "put",
   },
   deleteCategory: {
     url: "/api/category/delete",
     method: "delete",
   },
   addSubCategory: {
     url: "/api/subcategory/create",
     method: "post",
   },
   getSubCategory: {
     url: "/api/subcategory/get",
     method: "post",
   },
   updateSubCategory: {
     url: "/api/subcategory/update",
     method: "put",
   },
   deleteSubCategory: {
     url: "/api/subcategory/delete",
     method: "delete",
   },
   addProduct: {
     url: "/api/product/add",
     method: "post",
   },
   getProduct: {
     url: "/api/product/get",
     method: "post",
   },
   getProductByCategory: {
     url: "/api/product/get-product-by-category",
     method: "post",
   },
   getProductByCategoryAndSubCategory: {
     url: "/api/product/get-product-by-category-and-subCategory",
     method: "post",
   },
   getProductDetails: {
     url: "/api/product/get-product-details",
     method: "post",
   },
   updateProductDetails: {
     url: "/api/product/update-product",
     method: "put",
   },
   deleteProduct: {
     url: "/api/product/delete-product",
     method: "delete",
   },
   searchProduct: {
     url: "/api/product/search-product",
     method: "post",
   },
   addToCart: {
     url: "/api/cart/create",
     method: "post",
   },
   getToCart: {
     url: "/api/cart/get-cart",
     method: "get",
   },
   updateToCart: {
     url: "/api/cart/update-quantity",
     method: "put",
   },
   deleteToCart: {
     url: "/api/cart/delete-cart-item",
     method: "delete",
   },
   addAddress: {
     url: "/api/address/add-address",
     method: "post",
   },
   getAddress: {
     url: "/api/address/get-address",
     method: "get",
   },
   cashOnDelivery: {
     url: "/api/order/cash-on-delivery",
     method: "post",
   },
   payment_url: {
     url: "/api/order/checkout",
     method: "post",
   },
 };

export default summaryApi