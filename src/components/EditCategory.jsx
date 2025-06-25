
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import AxiosToastError from "../common/AxiosToastError";
import UploadImage from "../utilities/UploadImage";
import toast from "react-hot-toast";
import summaryApi from "../common/CommonApi";
import Axios from "../utilities/axios";


const EditCategory = ({ close,category, fetchCategory }) => {
  const [data, setData] = useState({
    _id: category._id,
    name: category.name,
    image: category.image,
  });
  const [loading, setLoading] = useState(false);

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  
  console.log(category);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await Axios({
        ...summaryApi.updateCategory,
        data: data,
      });
      console.log(response);

      if (response?.data?.success) {
        toast.success(response?.data?.message);
        close();
       await fetchCategory();
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadCategoryImage = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (!file) {
      return;
    }

    const { data } = await UploadImage(file);
    console.log(data?.data?.secure_url);
    setData((prev) => {
      return {
        ...prev,
        image: data?.data?.secure_url,
      };
    });
  };

  console.log(data);
  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-800/60 flex items-center justify-center">
      <div className="bg-white container max-w-xl w-full  p-4 rounded-md">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold"> Update Category</h1>
          <button
            onClick={close}
            className="w-fit block ml-auto cursor-pointer"
          >
            <IoMdClose size={25} />
          </button>
        </div>

        <form className="my-3" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="categoryName">Name</label>
            <input
              type="text"
              name="name"
              id="categoryName"
              value={data.name}
              placeholder="Enter Category Name"
              onChange={handleOnchange}
              className="bg-blue-50 p-2 border-2 border-gray-300  focus:border-primary outline-none rounded-md"
            />
          </div>

          <div className="grid gap-2 mt-2">
            <p>Image</p>
            <div className="flex gap-4 flex-col lg:flex-row w-36 lg:w-full items-center">
              <div className="border bg-blue-50 h-36 w-36 flex items-center justify-center">
                {data?.image ? (
                  <img
                    src={data?.image}
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
                    !data.name
                      ? "bg-gray-400"
                      : "hover:bg-primary hover:text-white border border-primary font-medium"
                  } px-3 py-1 rounded cursor-pointer`}
                >
                  {loading ? "Uploading image" : "Upload image"}
                </div>
              </label>
              <input
                disabled={!data.name}
                onChange={handleUploadCategoryImage}
                type="file"
                name=""
                id="uploadImage"
                className="hidden"
              />
            </div>
          </div>

          <button
            className={`${
              data.name && data.image
                ? "bg-primary text-white cursor-pointer"
                : "bg-slate-200 "
            } text-center w-full mt-3 py-2 rounded-md font-medium `}
          >
            {loading ? "updating Category" : "Update Category"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditCategory;