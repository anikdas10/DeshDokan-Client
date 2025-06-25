import { useState } from "react";
import AxiosToastError from "../../common/AxiosToastError"
import summaryApi from "../../common/CommonApi";
import Axios from "../../utilities/axios";
import { useEffect } from "react";
import Loading from "../../components/Loading";
import ProductCardAdmin from "../../components/ProductCardAdmin";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
const ProductsPage = () => {
    const [productData,setProductData] = useState([]) 
    const [page , setPage] = useState(1);
    const [totalPage , setTotalPage] = useState(1);
    const [loading , setLoading] = useState(false)
    const [search,setSearch] = useState("")

    const fetchProductData = async()=>{
        try {
            setLoading(true)
            const {data : responseData} = await Axios({
                ...summaryApi.getProduct,
                data:{
                    page : page,
                    limit : 12,
                    search : search
                }
            })
            if(responseData.success)
            {
                setProductData(responseData.data)
                setTotalPage(responseData.totalPages);
            }
        } catch (error) {
            AxiosToastError(error)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
       fetchProductData()
    },[page])
    
    const handleNext = ()=>{
        if(page !== totalPage)
        {
            setPage((prev) => prev + 1);
        }
       
    }
    const handlePrevious = ()=>{
        if(page>1)
        {
            setPage((prev) => prev - 1);  
        }
    }
    const handleOnChange = (e)=>{
           const value = e.target.value;
           setSearch(value)
           setPage(1)     
    }

    useEffect(() => {
        let flag = true
        const interval = setTimeout(()=>{
            if(flag)
            {
                fetchProductData();
                flag = false;
            }  
        },300);
        return ()=>{
            clearTimeout(interval)
        }
    },[search]);
    return (
      <section className="bg-blue-50">
        <div className="p-4  bg-white shadow-md flex items-center justify-between gap-2">
          <h2 className="font-semibold ">Product</h2>
          <div className="flex items-center bg-blue-50 p-2 border-2 rounded-full border-gray-200 px-4 py-2 gap-2 focus-within:border-primary">
            <IoSearchSharp size={20} />
            <input onChange={handleOnChange}
              type="text"
              value={search}
              placeholder="Search Product Here"
              className="  w-full outline:none focus:outline-none"
            />
          </div>
          <div className="hidden lg:block"></div>
        </div>

        {loading && <Loading />}

        <div className="p-4 ">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {productData.map((product, index) => {
              return <ProductCardAdmin fetchProductData={fetchProductData} key={index} data={product} />;
            })}
          </div>
        </div>
        <div
          onClick={handlePrevious}
          className="m-4 pb-4 flex items-center justify-between"
        >
          <button
            disabled={page === 1}
            className={`${
              page === 1
                ? "bg-gray-300 text-gray-700"
                : "hover:bg-primary hover:text-white cursor-pointer"
            } px-3 py-1 rounded-md border border-primary font-medium  flex items-center gap-1`}
          >
            <FaArrowLeft /> Previous
          </button>
          <button className="w-full bg-slate-100">
            {page}/{totalPage}
          </button>
          <button
            disabled={page === totalPage}
            onClick={handleNext}
            className={`${
              page === totalPage
                ? "bg-gray-300 text-gray-700"
                : "hover:bg-primary hover:text-white cursor-pointer"
            } px-3 py-1 rounded-md border border-primary font-medium  flex items-center gap-1`}
          >
            Next <FaArrowRight />
          </button>
        </div>
      </section>
    );
};

export default ProductsPage;