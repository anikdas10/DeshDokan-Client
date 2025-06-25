import { useEffect, useState ,  } from "react";
import AxiosToastError from "../common/AxiosToastError"
import Axios from "../utilities/axios"
import summaryApi from "../common/CommonApi";
import {Link, useParams} from "react-router"
import Loading from "../components/Loading"
import CardProduct from "../components/CardProduct";
import { useSelector } from "react-redux";
import validURLConverter from "../utilities/validURLConverter";
const ProductList = () => {
    const [data , setData ] = useState([])
    const [page , setPage] = useState(1)
    const [loading,setLoading] = useState(false)
    const [totalPage , setTotalPage] = useState(1)
    const [displaySub , setDisplaySub] = useState([]);

    const params = useParams()
    const subCategoryDetails = params.subCategory.split("-")
    const subCategoryName = subCategoryDetails.slice(0,subCategoryDetails.length -1).join(" ")

    const {allSubCategory} = useSelector((state)=>state.product)
    // console.log(allSubCategory);

    const categoryId = params.category.split("-").slice(-1)[0];
    const subCategoryId = params.subCategory.split("-").slice(-1)[0]; 

    console.log(categoryId , subCategoryId);
    const fetchProductData = async()=>{
        
        try {
            setLoading(true)
            const { data:responseData } = await Axios({
              ...summaryApi.getProductByCategoryAndSubCategory,
              data: {
                categoryId : categoryId,
                subCategoryId : subCategoryId,
                page:page,
                limit : 12,
              },
            });
            console.log(responseData);
            if(responseData?.success)
            {
                if(responseData.page ===1)
                {
                    setData(responseData.data);
                }
                else{
                    setData([...data , ...responseData.data])
                }
                setTotalPage(data.totalCount);
            }
        } catch (error) {
          AxiosToastError(error)  
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchProductData()
    },[params])

    useEffect(()=>{
        const sub = allSubCategory?.filter(s=>{
            const filterData = s.category.some(el=>{
                return el._id === categoryId
            })
            return filterData ? filterData : false
        })
        setDisplaySub(sub)
    },[params , allSubCategory])

    console.log(loading);
    return (
        <section className="container mx-auto" >
            <div className="grid grid-cols-20 gap-3 ">
                {/* subcategory */}
                <div className="col-span-4 md:col-span-5 grid gap-1 shadow-md h-[79vh] overflow-scroll lg:py-4">
                    {
                        displaySub?.map((s,index)=>{
                            
                            const link = `/${validURLConverter(
                              s?.category[0]?.name
                            )}-${s?.category[0]?._id}/${validURLConverter(s.name)}-${
                              s._id
                            }`;
                            return (
                              <Link to={link}
                                key={index}
                                className={`w-full lg:flex items-center lg:h-16 box-border lg:gap-4  p-2 hover:bg-green-100 ${
                                  subCategoryId === s._id
                                    ? "bg-green-200"
                                    : "bg-white "
                                }`}
                              >
                                {/* Image Box */}
                                <div className="w-fit max-w-28 mx-auto lg:mx-0 rounded">
                                  <img
                                    src={s.image}
                                    alt="subCategoryImage"
                                    className="w-14 h-14 object-contain mx-auto"
                                  />
                                </div>

                                {/* Name Text */}
                                <p className="text-xs text-center lg:text-left mt-2 lg:mt-0">
                                  {s.name}
                                </p>
                              </Link>
                            );

                        })
                    }
                </div>
                {/* product */}
                <div className="col-span-16 md:col-span-15">
                    <div className="bg-white shadow-md p-4">
                        <h3>{subCategoryName}</h3>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4">
                        {
                            data.map((p,index)=>{
                                return (
                                    <CardProduct data={p} key={index} />
                                )
                            })
                        }
                    </div>

                    <div>
                        {
                            loading  && <Loading/>
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductList;
