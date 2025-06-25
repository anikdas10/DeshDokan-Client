import { BrowserRouter, Route, Routes } from "react-router"
import Layout from "./Layout/Layout"
import HomePage from "./pages/HomePage"
import { RouteCategory, RouteForgotPassword, RouteIndex, RouteOtpVerification, RouteProductDetails, RouteProducts, RouteResetPassword, RouteSearch, RouteSignIn, RouteSignUp, RouteSubCategory, RouteUploadProducts, RouteUserDashboard, RouteUserDashboardAddress, RouteUserDashboardEditProfile, RouteUserDashboardOrder, RouteUserDashboardProfile, RouteUserMenuMobile } from "./helpers/RouteName"
import SearchPage from "./pages/SearchPage"
import Login from "./pages/Login"
import Register from "./pages/Register"

import "./App.css"
import ForgotPassword from "./pages/ForgotPassword"
import OtpVerification from "./pages/OtpVerification"
import ResetPassword from "./pages/ResetPassword"
import UserMenuMobilePage from "./pages/UserMenuMobilePage"
import Dashboard from "./Layout/Dashboard"
import Profile from "./pages/Profile"
import MyOrder from "./pages/MyOrder"
import Address from "./pages/Address"
import EditProfilePage from "./pages/EditProfilePage"
import Category from "./pages/Admin/Category"
import SubCategory from "./pages/Admin/SubCategory"
import ProductsPage from "./pages/Admin/ProductsPage"
import UploadProduct from "./pages/Admin/UploadProduct"
import AdminProtect from "./components/AdminProtect"
import ProductList from "./pages/ProductList"
import ProductDetails from "./pages/ProductDetails"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteIndex} element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path={RouteSearch} element={<SearchPage />} />
          <Route path={RouteSignIn} element={<Login />} />
          <Route path={RouteSignUp} element={<Register />} />
          <Route path={RouteForgotPassword} element={<ForgotPassword />} />
          <Route path={RouteOtpVerification} element={<OtpVerification />} />
          <Route path={RouteResetPassword} element={<ResetPassword />} />
          <Route path={RouteUserMenuMobile} element={<UserMenuMobilePage />} />
          <Route path={RouteProductDetails} element={<ProductDetails />} />
          <Route path={RouteUserDashboard} element={<Dashboard />}>
            <Route path={RouteUserDashboardProfile} element={<Profile />} />
            <Route path={RouteUserDashboardOrder} element={<MyOrder />} />
            <Route path={RouteUserDashboardAddress} element={<Address />} />
            <Route
              path={RouteUserDashboardEditProfile}
              element={<EditProfilePage />}
            />

            {/* admin */}
            <Route
              path={RouteCategory}
              element={
                <AdminProtect>
                  <Category />
                </AdminProtect>
              }
            />
            <Route
              path={RouteSubCategory}
              element={
                <AdminProtect>
                  <SubCategory />
                </AdminProtect>
              }
            />
            <Route
              path={RouteProducts}
              element={
                <AdminProtect>
                  <ProductsPage />
                </AdminProtect>
              }
            />
            <Route
              path={RouteUploadProducts}
              element={
                <AdminProtect>
                  <UploadProduct />
                </AdminProtect>
              }
            />
          </Route>

          <Route path="/:category">
            <Route path=":subCategory" element={<ProductList />} />
          </Route>

          {/* product details */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
