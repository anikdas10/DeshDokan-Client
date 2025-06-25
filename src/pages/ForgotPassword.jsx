import { useState } from "react";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import Axios from "../utilities/axios";
import summaryApi from "../common/CommonApi";
import AxiosToastError from "../common/AxiosToastError";
import { Link, useNavigate } from "react-router";
const ForgotPassword = () => {
  const [data, setData] = useState({
    email: "",
  });

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
        ...summaryApi.forgotPassword,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        
        navigate("/otp-verification",{
            state :data
        });

        setData({
            email: "",
          });
      }
      // console.log(response);
    } catch (error) {
      AxiosToastError(error);
    }

    // console.log(response);
  };

  return (
    <section className=" w-full container mx-auto">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <p className="text-center font-semibold text-lg md:text-xl lg:text-2xl text-green-800">
          Forgot Password?
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
          <button
            disabled={!validValue}
            className={`${
              validValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"
            } text-white w-full font-semibold py-2 rounded-md my-3`}
          >
            Send Otp
          </button>
        </form>
            <p>Already have an account? <Link to={"/login"} className='font-semibold text-green-600 hover:text-green-800'>Login</Link></p>
      </div>
    </section>
  );
};

export default ForgotPassword;
