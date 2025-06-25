import { useEffect, useState } from "react";
import {useParams} from "react-router";
import AxiosToastError from "../common/AxiosToastError"
import Axios from "../utilities/axios"
import summaryApi from "../common/CommonApi";
import Loading from "../components/Loading"
import { DisplayPrice } from "../utilities/DisplayPriceInTk";
import { PriceWithDiscount } from "../utilities/PriceWithDiscount";
const ProductDetails = () => {

    const [data,setData] = useState({
        name : "",
        image : []
    })
    const [image , setImage] = useState(0)
    const [loading , setLoading] = useState(false)
    const params = useParams();
    let ProductId = params.product.split("-")?.slice(-1)[0]

    const fetchProductDetails = async()=>{
        try {
            setLoading(true)
            const { data: responseData } = await Axios({
              ...summaryApi.getProductDetails,
              data: {
                productId: ProductId,
              },
            });
            console.log(responseData);
            if(responseData.success){
                setData(responseData.data)
            }
        } catch (error) {
          AxiosToastError(error)  
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchProductDetails()
    },[params])
    return (
      <section className="container mx-auto p-4 grid lg:grid-cols-5 gap-2">
        {loading && <Loading />}

        {/* Product Image */}
        <div className="lg:col-span-2 ">
          <div className="flex justify-center items-center">
            <img
              src={data.image?.[image]}
              alt={data.name}
              className="w-full max-w-xs md:max-w-sm object-contain rounded-xl "
            />
          </div>

          <div className="flex items-center justify-center gap-3 my-2">
            {data.image.map((img, index) => {
              console.log(typeof index);
              return (
                <div
                  key={index}
                  className={`bg-slate-200 w-5 h-5 rounded-full ${
                    index === image && "bg-slate-400"
                  }`}
                ></div>
              );
            })}
          </div>

          <div className=" grid">
            <div className=" flex items-center  gap-2 justify-center overflow-x-auto scrollbar-none">
              {data.image.map((img, index) => {
                console.log(typeof index);
                return (
                  <div
                    key={index}
                    className="w-20 h-20 shadow-md min-w-20 cursor-pointer scroll-smooth"
                  >
                    <img
                      src={img}
                      onClick={() => setImage(index)}
                      className="h-full w-full object-scale-down"
                      alt="min product"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* product info */}

        <div className="p-4 col-span-3 lg:pl-6 text-base lg:text-lg space-y-1">
          <p className="bg-green-300 w-fit px-2 rounded-3xl">10 min</p>
          <h2 className="text-lg font-semibold lg:text-xl">{data.name}</h2>
          <p>
            <span className="font-semibold">Description :</span>{" "}
            {data.description}
          </p>
          <p className="">
            <span className="font-semibold">Unit : </span>
            {data.unit}
          </p>
          

          <div className="border my-1 border-slate-300"></div>
          <div>
            <p>Price : </p>
            <div className="flex items-center gap-4">
              <div className="border border-green-600 px-4 py-2 rounded bg-green-100 w-fit">
                <p className="font-semibold text-lg lg:text-xl">
                  {DisplayPrice(PriceWithDiscount(data.price, data.discount))}
                </p>
              </div>
              {
                data.discount && (<p className="line-through">
                  {DisplayPrice(data.price)}
                </p>)
              }
              {data.discount && (
                <p className="font-semibold text-green-600 lg:text-2xl">
                  {data.discount}% <span className="text-base text-neutral-900">discount</span>
                </p>
              )}
            </div>
          </div>

          {data.stock === 0 ? (
            <p className="text-lg text-red-500 py-3">Out of Stock</p>
          ) : (
            <button className="my-4 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md text-white cursor-pointer ">
              Add
            </button>
          )}
        </div>

        {/* end */}
      </section>
    );
};

export default ProductDetails;