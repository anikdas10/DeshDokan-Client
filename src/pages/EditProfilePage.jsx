import {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AxiosToastError from "../common/AxiosToastError";
import Axios from "../utilities/axios";
import summaryApi from "../common/CommonApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import fetchUserDetails from "../utilities/fetchUserDetails";
import { setUserDetails } from "../store/userSlice";

const EditProfilePage = () => {
    const user = useSelector((state)=>state.user)
    const dispatch = useDispatch()
    const [loading,setLoading] = useState(false)
    const [showPassword,setShowPassword] = useState(false)
        const [showConfirmPassword,setShowConfirmPassword] = useState(false)
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: user?.name,
    email: user?.email,
    mobile: user?.mobile,
    password: "",
    newPassword: "",
  });

  useEffect(()=>{
    setFormData({
      name: user?.name,
      email: user?.email,
      mobile: user?.mobile,
    });
  },[user])
 
  const handleChange = (e) => {
    const {name,value} = e.target
    setFormData((prev) =>{
        return {
          ...prev,
          [name]: value,
        };
      
    });
  };
  console.log(formData);

  const handleSubmit = async(e) => {
    e.preventDefault();
    // console.log("Submitted data:", formData);
    try {
        setLoading(true)
        const {data} = await Axios({
            ...summaryApi.update_user,
           data: formData
        })
        if(data?.success)
        {
            toast.success(data?.message)
            const userData = await fetchUserDetails();
            dispatch(setUserDetails(userData?.data));
            navigate("/dashboard/profile")
        }
    } catch (error) {
        AxiosToastError(error)
    }finally{
        setLoading(false)
    }
    // You can send formData to your backend here
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium  mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="bg-blue-50 p-2 border-2  focus:border-primary outline-none rounded-md border-gray-200 w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium  mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="bg-blue-50 p-2 border-2  focus:border-primary outline-none rounded-md border-gray-200 w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 "
            placeholder="Enter your email"
          />
        </div>

        {/* Mobile */}
        <div>
          <label className="block text-sm font-medium  mb-1">
            Mobile Number
          </label>
          <input
            type="text"
            name="mobile"
            required
            value={formData.mobile}
            onChange={handleChange}
            className="bg-blue-50 p-2 border-2  focus:border-primary outline-none rounded-md border-gray-200 w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500  "
            placeholder="+8801XXXXXXXXX"
          />
        </div>

        {/* Current Password */}
        <div className="relative">
          <label className="block text-sm font-medium  mb-1 ">
            Current Password <span className="text-red-600">*</span>
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            autoFocus
            className="bg-blue-50 p-2 border-2  focus:border-primary outline-none rounded-md border-gray-200 w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500  "
            placeholder="Current password"
          />
          <div
            onClick={() => {
              setShowPassword(!showPassword);
            }}
            className="absolute cursor-pointer right-3 top-9"
          >
            {/* <FaEye/> */}

            {showPassword ? <FaEye /> : <FaRegEyeSlash />}
          </div>
        </div>

        {/* New Password */}
        <div className="relative">
          <label className="block text-sm font-medium  mb-1">
            New Password(optional)
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="bg-blue-50 p-2 border-2  focus:border-primary outline-none rounded-md border-gray-200 w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="New password"
          />
          <div
            onClick={() => {
              setShowConfirmPassword(!showConfirmPassword);
            }}
            className="absolute cursor-pointer right-3 top-9"
          >
            {/* <FaEye/> */}

            {showConfirmPassword ? <FaEye /> : <FaRegEyeSlash />}
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition"
          >
            {loading ? "Updating" : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfilePage;
