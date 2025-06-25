import {useSelector} from "react-redux"
import validURLConverter from "../utilities/validURLConverter";
import { useNavigate } from "react-router";
const ShopByCategory = () => {
    const {loading,allCategory,allSubCategory} = useSelector((state)=>state.product)
    const navigate = useNavigate();
    const handleRedirectProductListPage=(id,name)=>{
      console.log(name);
        const subCategory = allSubCategory?.find(sub=>{
            const filterData = sub.category.some(c=>{
                return c._id === id
            })
            return filterData ? true : null
        })
        const url = `/${validURLConverter(name)}-${id}/${validURLConverter(subCategory.name)}-${subCategory._id}`;
          navigate(url)
    }
    return (
      <div className="px-4 my-3">
        <h2 className="font-bold text-lg">Shop by Category</h2>

        <div className="grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 rounded-md gap-1 md:gap-2 ">
          {loading
            ? new Array(12).fill(null).map((c, index) => {
                return (
                  <div key={index} className="bg-white rounded p-4 min-h-36 grid gap-2 shadow-md animate-pulse">
                    <div className="bg-blue-100 min-h-24 rounded"></div>
                    <div className="bg-blue-100 h-8 rounded"></div>
                  </div>
                );
              })
            : allCategory?.map((cat, index) => {
                return (
                  <div key={index} className="w-full h-full cursor-pointer" onClick={()=>handleRedirectProductListPage(cat?._id,cat?.name)}>
                    <div>
                      <img src={cat.image} className="w-full h-full object-scale-down" alt="" />
                    </div>
                  </div>
                );
              })}

          {}
        </div>
      </div>
    );
};

export default ShopByCategory;