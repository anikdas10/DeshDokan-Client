import { useEffect, useState } from "react";

import CardLoading from "../components/CardLoading";
import AxiosToastError from "../common/AxiosToastError";
import Axios from "../utilities/axios"
import summaryApi from "../common/CommonApi";
import CardProduct from "../components/CardProduct";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useLocation } from "react-router";
import noDataImage from "../assets/noDataa.avif"
const SearchPage = () => {
    const [data , setData] = useState([])
    const [loading , setLoading] = useState(true)
    const [page , setPage] = useState(1)
    const [totalPage , setTotalPage] = useState(1)
    const params = useLocation();
    const searchText = params?.search?.slice(3);
    console.log(searchText);
    const loadingCard = new Array(10).fill(null);
    const fetchSearchProduct = async()=>{
        try {
            setLoading(true)
            const {data : responseData} = await Axios({
                ...summaryApi.searchProduct,
                data : {
                    search : searchText,
                    page: page
                }
            })
            console.log(responseData);
            if(responseData.success)
            {
                if(responseData.page == 1)
                {
                    setData(responseData.data);
                }
                else{
                   setData((prev)=>{
                    return [...prev ,...responseData.data ]
                   }) 
                }

                setTotalPage(responseData.totalPage);
                
            }
        } catch (error) {
          AxiosToastError(error)  
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchSearchProduct();
    },[page , searchText])

    const handleFetchMore = ()=>{
        if(totalPage>page)
        {
            setPage((prev)=>prev+1)
        }
    }
    // console.log(totalPage , page);
    console.log(data);
    return (
      <section className="container mx-auto p-4">
        <div>
          <p className=" font-semibold">Search Result : {data.length} </p>
          <InfiniteScroll
            dataLength={data.length}
            next={handleFetchMore}
            hasMore={true}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {data.map((p, index) => {
                return <CardProduct data={p} key={index} />;
              })}

              {
                // no data
                !data[0] && !loading && (
                    <div className="flex items-center justify-center  col-span-2 md:col-span-4 lg:col-span-5">
                        <img src={noDataImage} alt="" className="w-full h-full max-w-sm max-h-sm" />
                    </div>
                )
              }

              {/* loading data */}
              {loading &&
                loadingCard.map((_, index) => {
                  return <CardLoading key={index} />;
                })}
            </div>
          </InfiniteScroll>
        </div>
      </section>
    );
};

export default SearchPage;