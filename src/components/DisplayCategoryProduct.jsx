import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import AxiosToastError from "../common/AxiosToastError"
import Axios from "../utilities/axios";
import summaryApi from "../common/CommonApi";
import CardLoading from "./CardLoading";
import CardProduct from "./CardProduct";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const DisplayCategoryProduct = ({id,name}) => {

    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const containerRef = useRef();

    const fetchCategoryWiseData = async()=>{
        try {
            setLoading(true)
            const {data : responseData} = await Axios({
                ...summaryApi.getProductByCategory,
                data : {
                    id : id
                }
            })
            if(responseData.success)
            {
                setData(responseData.data)
            }
        } catch (error) {
          console.log(error);
        }finally{
            setLoading(false)
        }
    }


    const handleScrollRight = ()=>{
        containerRef.current.scrollLeft +=200
    }
    const handleScrollLeft = ()=>{
        containerRef.current.scrollLeft -=200
    }

    useEffect(()=>{
        fetchCategoryWiseData()
    },[])

    const loadingCardNumber = new Array(6).fill(null)
    return (
      <div className="container mx-auto">
        <div className="flex items-center justify-between p-4">
          <h3 className="font-semibold text-lg md:text-xl">{name}</h3>
          <Link className="text-green-600 hover:text-green-700">See All</Link>
        </div>

        <div
          className="flex items-center gap-2 overflow-x-scroll scrollbar-none lg:overflow-hidden mx-4 scroll-smooth "
          ref={containerRef}
        >
          {loading &&
            loadingCardNumber.map((el, index) => {
              return <CardLoading key={index} />;
            })}

          {data.map((p, index) => {
            return <CardProduct key={index} data={p} />;
          })}

          <div className="w-full absolute lg:flex justify-between hidden left-0 right-0 container mx-auto px-2">
            <button
              onClick={handleScrollLeft}
              className="z-10 relative shadow-lg bg-white hover:bg-gray-200 p-4  rounded-full cursor-pointer"
            >
              <FaAngleLeft size={20} />
            </button>
            <button
              onClick={handleScrollRight}
              className="z-10 relative shadow-md bg-white hover:bg-gray-200 p-4  rounded-full cursor-pointer"
            >
              <FaAngleRight size={20} />
            </button>
          </div>
        </div>
      </div>
    );
};

export default DisplayCategoryProduct;