import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import AxiosToastError from "../common/AxiosToastError";
import toast from "react-hot-toast";
import summaryApi from "../common/CommonApi";
import Axios from "../utilities/axios";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";


const ResetPassword = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [data,setData] = useState({
        email : "",
        newPassword : "",
        confirmPassword : ""
    })
    // console.log(location);
    useEffect(()=>{
        if(!location?.state?.data?.success)
        {
            navigate("/")
        }
        if(location?.state?.email)
        {
            setData((prev)=>{
                return {
                  ...prev,
                  email: location?.state?.email,
                };
            })
        }
    },[])

    const [showPassword,setShowPassword] = useState(false)
    const [showConfirmPassword,setShowConfirmPassword] = useState(false)

    const handleChange = (e) => {
      const { name, value } = e.target;
      setData((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    };
    const validValue = Object.values(data).every((el) => el);
    // console.log(validValue);
    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const response = await Axios({
          ...summaryApi.resetPassword,
          data: data,
        });
        if (response.data.error) {
          toast.error(response.data.message);
        }
        if (response.data.success) {
          toast.success(response.data.message);
          setData({
            email: "",
            newPassword: "",
            confirmPassword: "",
          });
          navigate("/login");
        }
        // console.log(response);
      } catch (error) {
        AxiosToastError(error);
      }

      // console.log(response);
    };
    // console.log(data);

    return (
      <section className=" w-full container mx-auto">
        <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
          <p className="text-center font-semibold text-lg md:text-xl lg:text-2xl text-green-800">
            Enter your new password
          </p>

          <form action="" className="" onSubmit={handleSubmit}>
            {/* name */}
           
            {/* Password */}
            <div className="grid gap-2 mt-5 relative focus-within:border-red-50">
              <label htmlFor="name">Password :</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                autoFocus
                name="newPassword"
                className="bg-blue-50 p-2 border-2  focus:border-primary outline-none rounded-md"
                value={data.newPassword}
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
            </div>
            {/* confirm Password*/}
            <div className="grid gap-2 mt-5 relative">
              <label htmlFor="name">Confirm Password :</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                autoFocus
                name="confirmPassword"
                className="bg-blue-50 p-2 border-2  focus:border-primary outline-none rounded-md"
                value={data.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
              />
              <div
                onClick={() => {
                  setShowConfirmPassword(!showConfirmPassword);
                }}
                className="absolute cursor-pointer right-3 top-11"
              >
                {/* <FaEye/> */}

                {showConfirmPassword ? <FaEye /> : <FaRegEyeSlash />}
              </div>
            </div>
            <button
              disabled={!validValue}
              className={`${
                validValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"
              } text-white w-full font-semibold py-2 rounded-md my-3`}
            >
              Change Password
            </button>
          </form>

          <p>
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="font-semibold text-green-600 hover:text-green-800"
            >
              Login
            </Link>
          </p>
        </div>
      </section>
    );
};

export default ResetPassword;