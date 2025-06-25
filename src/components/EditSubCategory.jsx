import { IoMdClose } from "react-icons/io";
import UploadImage from "../utilities/UploadImage";
import { useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import AxiosToastError from "../common/AxiosToastError";
import Axios from "../utilities/axios";
import summaryApi from "../common/CommonApi";

const EditSubCategory = ({ data,close , fetchData }) => {
  const [editData, setEditData] = useState({
    _id: data._id, 
    name: data.name,
    image: data.image,
    category:data.category || [],
  });
  const allCategory = useSelector((state) => state.product.allCategory);
  const [loading, setLoading] = useState(false);

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  //   option handling
  const handleOptionChange = (e) => {
    const value = e.target.value;
    const categoryDetails = allCategory.find((el) => el._id == value);

   setEditData((prev) => {
      const alreadyExists = prev.category.some((cat) => cat._id === value);
      if (alreadyExists) {
        toast.error("Category already added!");
        return prev;
      }

      return {
        ...prev,
        category: [...prev.category, categoryDetails],
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data: responseData } = await Axios({
        ...summaryApi.updateSubCategory,
        data: editData,
      });
      if (responseData?.success) {
        toast.success(responseData.message);
        
        if(close)
        {
            close();
        }
        if(fetchData)
        {
            fetchData();
        }
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSubCategoryImage = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (!file) {
      return;
    }

    const { data } = await UploadImage(file);
    setEditData((prev) => {
      return {
        ...prev,
        image: data?.data?.secure_url,
      };
    });
  };

  const handleRemoveCategory = (id) => {
    const updatedCategory = data.category.filter((el) => el._id !== id);
    setEditData({ ...editData, category: updatedCategory });
  };

  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-800/60 flex items-center justify-center">
      <div className="bg-white container   lg:max-w-2xl w-full  p-4 rounded-md ">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">
            Edit Sub Category</h1>
          <button
            onClick={close}
            className="w-fit block ml-auto cursor-pointer"
          >
            <IoMdClose size={25} />
          </button>
        </div>

        <form className="my-3" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="subCategoryName">Sub Category Name</label>
            <input
              type="text"
              name="name"
              id="subCategoryName"
              value={editData.name}
              placeholder="Enter sub Category Name"
              onChange={handleOnchange}
              className="bg-blue-50 p-2 border-2 border-gray-300  focus:border-primary outline-none rounded-md"
            />
          </div>

          <div className="grid gap-2 mt-2">
            <p>Image</p>
            <div className="flex gap-4 flex-col lg:flex-row w-36 lg:w-full items-center">
              <div className="border bg-blue-50 h-36 w-36 flex items-center justify-center">
                {editData?.image ? (
                  <img
                    src={editData?.image}
                    alt="category"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <p className="text-sm">No Image</p>
                )}
              </div>
              <label htmlFor="uploadImage">
                <div
                  className={`${
                    !editData.name
                      ? "bg-gray-400"
                      : "hover:bg-primary hover:text-white border border-primary font-medium"
                  } px-3 py-1 rounded cursor-pointer`}
                >
                  Upload image
                </div>
              </label>
              <input
                disabled={!editData.name}
                onChange={handleUploadSubCategoryImage}
                type="file"
                name=""
                id="uploadImage"
                className="hidden"
              />
            </div>
          </div>

          {/* select category */}
          <div className="grid gap-2 mt-2">
            <label htmlFor="category">Select Category</label>
            <div className=" bg-blue-50 p-2 border-2 border-gray-300  focus:border-primary outline-none rounded-md w-full">
              {/* display category */}
              <div className="flex items-center flex-wrap gap-2">
                {editData.category.map((cat) => {
                  return (
                    <p className="py-1 flex items-center gap-0.5" key={cat._id}>
                      {cat.name}{" "}
                      <button
                        onClick={() => handleRemoveCategory(cat._id)}
                        className="cursor-pointer hover:text-red-600"
                      >
                        <IoMdClose size={20} />
                      </button>
                    </p>
                  );
                })}
              </div>
              {/* select category */}
              <select
                className="w-full border-1 border-gray-300  focus:border-primary outline-none rounded cursor-pointer"
                onChange={handleOptionChange}
              >
                <option value="">Select Category</option>
                {allCategory.map((Category, index) => {
                  return (
                    <option key={index} value={Category._id}>
                      {Category.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <button
            className={`${
              editData.name && editData.image && editData.category[0]
                ? "bg-primary text-white cursor-pointer"
                : "bg-slate-200 "
            } text-center w-full mt-3 py-2 rounded-md font-medium `}
          >
            {loading ? "Editing sub Category" : "Edit sub Category"}
          </button>
        </form>
      </div>
      {/* form */}
    </section>
  );
};

export default EditSubCategory;
