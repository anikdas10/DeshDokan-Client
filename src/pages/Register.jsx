import React, { useState } from 'react';
import { FaEye, FaRegEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import Axios from '../utilities/axios';
import summaryApi from '../common/CommonApi';
import AxiosToastError from '../common/AxiosToastError';
import { Link, useNavigate } from 'react-router';
const Register = () => {

    const [data,setData] = useState({
        name :"",
        email:"",
        password: "",
        confirmPassword : ""
    })

    const [showPassword,setShowPassword] = useState(false)
    const [showConfirmPassword,setShowConfirmPassword] = useState(false)

    const navigate = useNavigate();


    const handleChange = (e)=>{
        const {name , value} = e.target;
        setData((prev)=>{
            return {
                ...prev,
                [name] : value 
            }
        })
    }

    // console.log(data);

    const validValue = Object.values(data).every(el=>el)
    // console.log(validValue);
    const handleSubmit = async(e)=>{
        e.preventDefault()

        if(data.password !== data.confirmPassword)
        {
            toast.error("Password and confirm password must be same")
        }

       
        try {
            const response = await Axios({
              ...summaryApi.register,
              data: data,
            })
            if(response.data.error)
            {
                toast.error(response.data.message)
            }
            if(response.data.success)
            {
                toast.success(response.data.message)
                setData({
                  name: "",
                  email: "",
                  password: "",
                  confirmPassword: ""
                });
                navigate("/login")
            }
            // console.log(response);
        } catch (error) {
            AxiosToastError(error)
        }
        
        // console.log(response);

    }

    return (
      <section className=" w-full container mx-auto">
        <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
          <p className='text-center font-semibold text-lg md:text-xl lg:text-2xl text-green-800'>Welcome to DeshDokan</p>

          <form action="" className='' onSubmit={handleSubmit}>
            {/* name */}
            <div className="grid gap-2 mt-5 ">
              <label htmlFor="name">Name :</label>
              <input
                type="text"
                id="name"
                autoFocus
                name="name"
                className="bg-blue-50 p-2 border-2  focus:border-primary outline-none rounded-md"
                value={data.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </div>
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
            </div>
            {/* confirm Password*/}
            <div className="grid gap-2 mt-5 relative">
              <label htmlFor="name">Confirm Password :</label>
              <input
                type={showPassword ? "text" : "password"}
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
            <button disabled={!validValue} className={`${validValue? "bg-green-800 hover:bg-green-700":"bg-gray-500"} text-white w-full font-semibold py-2 rounded-md my-3`}>
                Register
            </button>
          </form>

          <p>Already have an account? <Link to={"/login"} className='font-semibold text-green-600 hover:text-green-800'>Login</Link></p>
        </div>
      </section>
    );
};

export default Register;