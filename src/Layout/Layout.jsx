import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import  { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import fetchUserDetails from "../utilities/fetchUserDetails";
import { setLoading, setUserDetails } from "../store/userSlice";
import { useDispatch } from "react-redux";

import AxiosToastError from "../common/AxiosToastError";
import { setAllCategory, setAllSubCategory, setLoadingCategory, setLoadingSubCategory } from "../store/productSlice";
import fetchCategory from "../utilities/fetchCategory";
import fetchSubCategory from "../utilities/fetchSubCategory";
const Layout = () => {

  const dispatch = useDispatch();

  const fetchUser = async()=>{
    try {
      dispatch(setLoading(true));
      const userData = await fetchUserDetails();
      dispatch(setUserDetails(userData?.data));
    } catch (error) {
      console.log(error)
  }finally{
    dispatch(setLoading(false))
  }
}
const fetchCategoryData  = async () => {
  try {
    dispatch(setLoadingCategory(true));
    const  data  = await fetchCategory();
    dispatch(setAllCategory(data))
  } catch (error) {
    AxiosToastError(error);
    
  }finally{
    dispatch(setLoadingCategory(false));
  }
};

const fetchSubCategoryData  = async () => {
  try {
    dispatch(setLoadingSubCategory(true));
    const data = await fetchSubCategory();
    dispatch(setAllSubCategory(data))
  } catch (error) {
    AxiosToastError(error);
  }finally{
    dispatch(setLoadingSubCategory(false));
  }
};


  useEffect(()=>{
    fetchUser()
    fetchCategoryData()
    fetchSubCategoryData()
  },[])
    return (
      <>
      <Header/>
        <main className="min-h-[75vh] font-primary">
          <Outlet />
        </main>
        <Footer/>
        <Toaster/>
      </>
    );
};

export default Layout;