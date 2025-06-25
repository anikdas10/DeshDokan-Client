import { useState } from "react";
import EditProductAdmin from "./EditProductAdmin";
import AxiosToastError from "../common/AxiosToastError.js"
import Axios from "../utilities/axios";
import summaryApi from "../common/CommonApi.js";
import Swal from "sweetalert2";
const ProductCardAdmin = ({ data, fetchProductData }) => {
  const [editOpen, setEditOpen] = useState(false);
  const {_id, name, image, unit } = data;

  const handleDeleteProduct =async (id)=>{
    console.log(id);
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
          ...summaryApi.deleteProduct,
          data: {
            productId: id,
          },
        });
        if (data?.success) {
          fetchProductData()
          await Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }
  return (
    <div className="bg-white p-2 rounded-md">
      <div>
        <img
          src={image[0]}
          className="w-full h-full object-scale-down"
          alt={name}
        />
      </div>
      <p className="text-ellipsis line-clamp-2 font-medium">{name}</p>
      <p className="text-ellipsis line-clamp-2 ">Unit : {unit}</p>

      <div className="grid grid-cols-2 gap-3 mt-2">
        <button
          onClick={() => setEditOpen(true)}
          className="border px-1 py-1 text-sm border-green-600 bg-green-300 rounded-md text-green-800 cursor-pointer"
        >
          Edit
        </button>
        <button onClick={()=>handleDeleteProduct(_id)} className="border px-1 py-1 text-sm rounded-md border-red-700 bg-red-400 text-red-800 cursor-pointer">
          Delete
        </button>
      </div>

      {editOpen && (
        <EditProductAdmin
          fetchProductData={fetchProductData}
          editData={data}
          close={() => setEditOpen(false)}
        />
      )}
    </div>
  );
};

export default ProductCardAdmin;