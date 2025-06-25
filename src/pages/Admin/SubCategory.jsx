import { useEffect, useState } from "react";
import UploadSubCategoryModel from "../../components/UploadSubCategoryModel";
import AxiosToastError from "../../common/AxiosToastError";
import Axios from "../../utilities/axios";
import summaryApi from "../../common/CommonApi";
import Loading from "../../components/Loading";
import DisplayTable from "../../components/Displaytable";
import {createColumnHelper} from "@tanstack/react-table"
import { BsPencil } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import EditSubCategory from "../../components/EditSubCategory";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setAllSubCategory } from "../../store/productSlice";
const SubCategory = () => {
    const [openSubCategory , setOpenSubCategory] = useState(false)
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const columnHelper = createColumnHelper()
    const [openEdit,setOpenEdit] = useState(false)
    const [editData,setEditData] = useState({
      _id :""
    })

    const dispatch = useDispatch();
    const fetchSubcategory = async()=>{
        try {
            setLoading(true)
            const {data} = await Axios({
                ...summaryApi.getSubCategory
            })
            if(data?.success)
            {
                setData(data.data)
                dispatch(setAllSubCategory(data.data))

            }
        } catch (error) {
         AxiosToastError(error) 
        }finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
      fetchSubcategory()
    },[])

    const handleDeleteSubCategory = async(id)=>{
      // console.log(id);
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
          const { data } = await Axios({
            ...summaryApi.deleteSubCategory,
            data: {
              _id: id,
            },
          });
          if (data?.success) {
           fetchSubcategory()
            await Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
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

    const column = [
      columnHelper.accessor("name", {
        header: "name",
      }),
      columnHelper.accessor("image", {
        header: "image",
        cell: ({row}) => {
          return (
            <div className="flex items-center justify-center">
              <img src={row.original.image} alt="" className="w-12 h-14" />
            </div>
          );
        },
      }),
      columnHelper.accessor("category", {
        header: "Category",
        cell:({row})=>{
          return (
            <>
            {
              
              row.original.category.map((c,index)=>{
                return(
                 <p className="shadow-md px-1 inline-block" key={index}>{c.name},</p>)
              })
            }
            </>
          )
        }
      }),
      columnHelper.accessor("_id",{
        header : "Action",
        cell : ({row})=>{
          return (
            <div className="flex items-center justify-center gap-3">
              <button onClick={()=>{
                setOpenEdit(true)
                setEditData(row.original)
              }} className="cursor-pointer p-2 bg-green-100 rounded-full text-green-500 hover:text-green-600">
                <BsPencil size={20} />
              </button>
              <button onClick={()=>handleDeleteSubCategory(row.original._id)} className="cursor-pointer p-2 bg-red-100 rounded-full text-red-500 hover:text-red-600">
                <MdDeleteForever size={20} />
              </button>
            </div>
          );
        }
      })
    ];

    return (
      <section>
        {loading && <Loading />}
        <div className="p-4  bg-white shadow-md flex items-center justify-between">
          <h2 className="font-semibold"> Sub Category</h2>
          <button
            onClick={() => setOpenSubCategory(true)}
            className="text-sm border border-primary hover:bg-primary px-3 py-1 rounded-md hover:text-white cursor-pointer"
          >
            Add SubCategory
          </button>
        </div>

        <div className="overflow-auto w-full max-w-[95vw">
            <DisplayTable data={data} column={column} />
        </div>
        {openSubCategory && (
          <UploadSubCategoryModel close={() => setOpenSubCategory(false)} fetchData={fetchSubcategory} />
        )}

        {/* edit category */}
        {
          openEdit && <EditSubCategory data={editData} close={()=>setOpenEdit(false)} fetchData={fetchSubcategory} />
        }
      </section>
    );
};

export default SubCategory;