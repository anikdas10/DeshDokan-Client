import { useEffect, useState } from "react";
import UploadCategoryModel from "../../components/UploadCategoryModel";
import AxiosToastError from "../../common/AxiosToastError";
import Loading from "../../components/Loading";
import NoData from "../../components/NoData";
import Axios from "../../utilities/axios";
import summaryApi from "../../common/CommonApi";
import EditCategory from "../../components/EditCategory";
import Swal from "sweetalert2"
import { useDispatch, useSelector } from "react-redux";
import fetchCategory from "../../utilities/fetchCategory";
import { setAllCategory } from "../../store/productSlice";


const Category = () => {
    const [openCategory,setOpenCategory] = useState(false)
    // const [loading,setLoading] = useState(false)
    const [categoryData,setCategoryData] = useState([])
    const [openEdit , setOpenEdit] = useState(false)
    const [editData,setEditData] = useState(
    {})
    const dispatch = useDispatch();

    const {allCategory,loading} = useSelector((state)=>state.product)

    useEffect(()=>{
      setCategoryData(allCategory)
    },[allCategory])

    const handleCategoryDelete = async(id)=>{
        try {
          const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#008000",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          });

          if (result.isConfirmed) {
                const {data} = await Axios({
                  ...summaryApi.deleteCategory,
                  data: {
                    _id : id
                  },
                });
                if(data?.success)
                {
                  const data = await fetchCategory();
                  dispatch(setAllCategory(data))
                    await Swal.fire({
                      title: "Deleted!",
                      text: "Your file has been deleted.",
                      icon: "success",
                    });
                }
            // ✅ Success Message
           

            // ✅ Optional: Refresh data or show toast
            // fetchCategory();
          }
        } catch (error) {
          console.error("Delete failed:", error);
          Swal.fire({
            title: "Error!",
            text: "Something went wrong while deleting.",
            icon: "error",
          });
        }
    }
    return (
      <section>
        <div className="p-4  bg-white shadow-md flex items-center justify-between">
          <h2 className="font-semibold">Category</h2>
          <button
            onClick={() => setOpenCategory(true)}
            className="text-sm border border-primary hover:bg-primary px-3 py-1 rounded-md hover:text-white"
          >
            Add Category
          </button>
        </div>
        {openCategory && (
          <UploadCategoryModel
            fetchCategory={fetchCategory}
            close={() => setOpenCategory(false)}
          />
        )}

        <div>{!categoryData[0] && !loading && <NoData />}</div>

        <div className="flex flex-wrap gap-3 ">
          {categoryData.map((category, index) => {
            return (
              <div
                key={index}
                className="w-36 object-scale-down overflow-hidden  mt-5 rounded shadow-md group"
              >
                <img
                  src={category?.image}
                  className="w-36 object-scale-down "
                  alt=""
                />
                <div className="hidden  gap-1 group-hover:flex group-hover:duration-300">
                  <button onClick={()=>handleCategoryDelete(category?._id)} className="flex-1 py-1 bg-red-200 rounded-md hover:bg-red-300 cursor-pointer text-red-500">
                    Delete
                  </button>
                  <button
                    onClick={() => 
                        {setOpenEdit(true)
                        setEditData(category)
                        }}
                    className="flex-1 bg-green-200 hover:bg-green-300 rounded-md cursor-pointer text-green-600"
                  >
                    Edit
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div>{loading && <Loading />}</div>
        {openEdit && (
          <EditCategory
            category={editData}
            fetchCategory={fetchCategory}
            close={() => setOpenEdit(false)}
          />
        )}
      </section>
    );
};

export default Category;