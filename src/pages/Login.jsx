
import  { useState } from "react";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import Axios from "../utilities/axios";
import summaryApi from "../common/CommonApi";
import AxiosToastError from "../common/AxiosToastError";
import { Link, useNavigate } from "react-router";
import fetchUserDetails from "../utilities/fetchUserDetails";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";
import useAuth from "../Provider/useAuth";
const Login = () => {
  const dispatch = useDispatch();
  const { fetchCartItem } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // console.log(data);

  const validValue = Object.values(data).every((el) => el);
  // console.log(validValue);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...summaryApi.login,
        data: data,
      });
      console.log(response.data);
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        fetchCartItem()
        toast.success(response.data.message);
        localStorage.setItem("accessToken",response.data.data.accessToken)
        localStorage.setItem("refreshToken",response.data.data.refreshToken)


        // fetch userDetails
        const userDetails = await fetchUserDetails();
        dispatch(setUserDetails(userDetails?.data))
        setData({
          email: "",
          password: "",
        });
        navigate("/");
      }
      
    } catch (error) {
      AxiosToastError(error);
    }

    // console.log(response);
  };

  return (
    <section className=" w-full container mx-auto">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <p className="text-center font-semibold text-lg md:text-xl lg:text-2xl text-green-800">
          Welcome to DeshDokan
        </p>

        <form action="" className="" onSubmit={handleSubmit}>
         
          {/* Email */}
          <div className="grid gap-2 mt-5">
            <label htmlFor="name">Email :</label>
            <input
              type="email"
              id="email"
              autoFocus
              name="email"
              className="bg-blue-50 p-2 border-2  focus:border-primary outline-none rounded-md"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your Email"
            />
          </div>
          {/* Password */}
          <div className="grid gap-2 mt-5 relative focus-within:border-red-50">
            <label htmlFor="name">Password :</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              autoFocus
              name="password"
              className="bg-blue-50 p-2 border-2  focus:border-primary outline-none rounded-md"
              value={data.password}
              onChange={handleChange}
              placeholder="Enter your Password"
            />
            <div
              onClick={() => {
                setShowPassword(!showPassword);
              }}
              className="absolute cursor-pointer right-3 top-11"
            >
              {/* <FaEye/> */}

              {showPassword ? <FaEye /> : <FaRegEyeSlash />}
            </div>
            
                <Link to={"/forgot-password"} className="block ml-auto hover:text-primary">Forgot password?</Link>
            
          </div>
          <button
            disabled={!validValue}
            className={`${
              validValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"
            } text-white w-full font-semibold py-2 rounded-md my-3`}
          >
            Login
          </button>
        </form>

        <p>
          Don't have an account?{" "}
          <Link
            to={"/sign-up"}
            className="font-semibold text-green-600 hover:text-green-800"
          >
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;