import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoClose } from "react-icons/io5";
import AxiosToastError from '../common/AxiosToastError';
import Axios from '../utilities/axios';
import summaryApi from '../common/CommonApi';
import toast from 'react-hot-toast';
import axios from 'axios';
import useAuth from "../Provider/useAuth";
const AddAddress = ({close}) => {
    const [divisions, setDivisions] = useState([]);
    const [zillaList, setZillaList] = useState([]);
    const [upozillaList, setUpozillaList] = useState([]);
    const { fetchAddress } = useAuth();
    const { register, handleSubmit, reset } = useForm();
    
    const onSubmit = async (data) => {
        // console.log(data);
      const selectedDivision = divisions.find((d) => d.id === data.division);
      const selectedZilla = zillaList.find((z) => z.id === data.zilla);
      const selectedUpozilla = upozillaList.find((u) => u.id === data.upoZilla);
      try {
        const response = await Axios({
          ...summaryApi.addAddress,
          data: {
            address_line: data.addressline,
            division: selectedDivision?.name || "",
            zilla: selectedZilla?.name || "",
            upoZilla: selectedUpozilla?.name || "",
            country: data.country,
            postcode: data.postCode,
            mobile: data.mobile,
          },
        });

        const { data: responseData } = response;

        if (responseData.success) {
          toast.success(responseData.message);
          if (close) {
            close();
            reset();
            fetchAddress();
          }
        }
      } catch (error) {
        AxiosToastError(error);
      }
    };

    useEffect(() => {
        const loadDivisions = async()=>{
            const { data: response } = await axios.get(
              "https://bdapi.vercel.app/api/v.1/division"
            );
            if(response.success)
            {
                setDivisions(response.data);
            }
              
        }
        loadDivisions()
    }, []);

    const handleDivisionChange = async (e) => {
      const division = e.target.value;
      console.log(division);

      try {
        const {data} = await axios.get(
          `https://bdapi.vercel.app/api/v.1/district/${division}`
        );
        if(data.success)
        {
            setZillaList(data.data);
            setUpozillaList([]);
        }
        
      } catch (err) {
        console.error(err);
      }
    };
    const handleZillaChange = async (e) => {
      const zilla = e.target.value;

      try {
        const res = await axios.get(
          `https://bdapi.vercel.app/api/v.1/Upazilla/${zilla}`
        );
        setUpozillaList(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };
   
    // console.log(zillaList );
    return (
      <section className="bg-black/70 fixed top-0 left-0 right-0 bottom-0 z-50  h-screen overflow-auto">
        <div className="bg-white text-black p-4 w-full max-w-lg mt-8 mx-auto rounded">
          <div className="flex justify-between items-center gap-4">
            <h2 className="font-semibold">Add Address</h2>
            <button onClick={close} className="hover:text-red-500">
              <IoClose size={25} />
            </button>
          </div>

          <form className="mt-4 grid gap-4 " onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-1">
              <label htmlFor="addressline">Address Line :</label>
              <input
                type="text"
                id="addressline"
                className="border bg-blue-50 p-2 rounded"
                {...register("addressline", { required: true })}
              />
            </div>
            {/* Division */}
            <div className="grid gap-1 relative">
              <label htmlFor="division">Division :</label>
              <select
                id="division"
                className=" border  p-2 rounded w-full"
                {...register("division", { required: true })}
                onChange={handleDivisionChange}
              >
                <option value="">Select Division</option>
                {divisions.map((item, index) => (
                  <option
                    style={{ backgroundColor: "white", color: "black" }}
                    key={index}
                    value={item.id}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            {/* Zilla */}
            <div className="grid gap-1 relative">
              <label htmlFor="zilla">Zilla :</label>
              <select
                id="zilla"
                className=" border  p-2 rounded w-full"
                {...register("zilla", { required: true })}
                onChange={handleZillaChange}
              >
                <option value="">Select Zilla</option>
                {zillaList.map((item, index) => (
                  <option
                    style={{ backgroundColor: "white", color: "black" }}
                    key={index}
                    value={item.id}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            {/* Zilla */}
            <div className="grid gap-1 relative">
              <label htmlFor="upoZilla">UpaZilla :</label>
              <select
                id="upoZilla"
                className=" border  p-2 rounded w-full"
                {...register("upoZilla", { required: true })}
                
              >
                <option value="">Select UpaZilla</option>
                {upozillaList.map((item, index) => (
                  <option
                    style={{ backgroundColor: "white", color: "black" }}
                    key={index}
                    value={item.id}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="grid gap-1">
              <label htmlFor="postcode">PostCode :</label>
              <input
                type="text"
                id="postcode"
                className="border bg-blue-50 p-2 rounded"
                {...register("postCode", { required: true })}
              />
            </div>
            <div className="grid gap-1">
              <label htmlFor="country">Country :</label>
              <input
                type="text"
                id="country"
                className="border bg-blue-50 p-2 rounded"
                {...register("country", { required: true })}
              />
            </div>
            <div className="grid gap-1">
              <label htmlFor="mobile">Mobile No. :</label>
              <input
                type="text"
                id="mobile"
                className="border bg-blue-50 p-2 rounded"
                {...register("mobile", { required: true })}
              />
            </div>

            <button
              type="submit"
              className="bg-primary-200 w-full  py-2 font-semibold mt-4 hover:bg-primary-100 cursor-pointer"
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    );
};

export default AddAddress;