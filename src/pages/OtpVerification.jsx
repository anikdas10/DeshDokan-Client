import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Axios from "../utilities/axios";
import summaryApi from "../common/CommonApi";
import AxiosToastError from "../common/AxiosToastError";
import { Link, useLocation, useNavigate } from "react-router";

const OtpVerification = () => {
  const [data, setData] = useState(["","","","","",""]);
  const inputRef = useRef([])
  const location = useLocation();
  // console.log(location?.state?.email);
  const navigate = useNavigate();

  useEffect(()=>{
    if(!location?.state?.email)
    {
      navigate("/forgot-password")
    }
  },[location])

  // console.log(data);

  const validValue = data.every((el) => el);
  // console.log(validValue);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...summaryApi.forgotPasswordOtpVerification,
        data:{
          email:location?.state?.email,
          otp : data.join("")
        },
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        setData(["","","","","",""]);
        navigate("/reset-password",{
          state : {
            data : response.data,
            email :location?.state?.email
          }
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
      <div className="bg-white my-4 w-full max-w-lg  mx-auto rounded p-7">
        <p className="text-center font-semibold text-lg md:text-xl lg:text-2xl text-green-800">
          Verify OTP
        </p>

        <form action="" className="" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="grid gap-2 mt-5">
            <label htmlFor="name">Enter your OTP:</label>
            <div className="flex gap-2 w-full">
                {
                    data.map((Element,index)=>{
                       return (
                         <input key={index}
                           type="text"
                           id="otp"
                           ref={(ref)=>{
                            inputRef.current[index] = ref
                            return ref
                           }}
                           value={data[index]}
                           onChange={(e)=>{
                            const value = e.target.value;
                            console.log(value);
                            const newData = [...data];
                            newData[index] = value
                            setData(newData);

                            if(value && index<5)
                            {
                              inputRef.current[index+1].focus()
                            }
                           }
                           }
                           maxLength={1}
                           autoFocus
                           className="bg-blue-50 p-2 w-full  border focus:border-primary outline-none rounded-md text-center font-bold"
                         />
                       );
                    })
                }
            </div>
           
          </div>
          <button
            disabled={!validValue}
            className={`${
              validValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"
            } text-white w-full font-semibold py-2 rounded-md my-3`}
          >
            Verify OTP
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

export default OtpVerification;
