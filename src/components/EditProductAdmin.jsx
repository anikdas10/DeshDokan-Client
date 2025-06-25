

import { useState } from "react";
import { IoMdClose, IoMdCloudUpload } from "react-icons/io";

import { MdOutlineDeleteOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import UploadImage from "../utilities/UploadImage";
import summaryApi from "../common/CommonApi";
import Axios from "../utilities/axios";
import AxiosToastError from "../common/AxiosToastError";
import ViewImage from "./ViewImage";
import AddFieldComponent from "./AddFieldComponent";
const EditProductAdmin = ({ editData, close, fetchProductData }) => {
  const [data, setEditData] = useState({
    _id: editData._id,
    name: editData?.name,
    image: editData?.image,
    category: editData?.category,
    subCategory: editData.subCategory,
    unit: editData?.unit,
    stock: editData?.stock,
    price: editData?.price,
    discount: editData?.discount,
    description: editData?.description,
    more_details: editData?.more_details || {},
  });
  const [imageLoading, setImageLoading] = useState(false);
  const [viewImage, setImageUrl] = useState("");
  const { allCategory, allSubCategory } = useSelector((state) => state.product);
  const [openField, setOpenField] = useState(false);
  const [fieldName, setFieldName] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleUploadProductImage = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    setImageLoading(true);
    const { data } = await UploadImage(file);
    const imageUrl = data?.data?.secure_url;
    setEditData((prev) => {
      return {
        ...prev,
        image: [...prev.image, imageUrl],
      };
    });
    setImageLoading(false);
  };

  const handleDeleteImage = (index) => {
    const updatedImages = data.image.filter((_, i) => i !== index);
    setEditData({ ...data, image: updatedImages });
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
  //   option handling
  const handleOptionSubCategoryChange = (e) => {
    const value = e.target.value;
    const categoryDetails = allSubCategory.find((el) => el._id == value);

    setEditData((prev) => {
      const alreadyExists = prev.subCategory.some((cat) => cat._id === value);
      if (alreadyExists) {
        toast.error("Category already added!");
        return prev;
      }

      return {
        ...prev,
        subCategory: [...prev.subCategory, categoryDetails],
      };
    });
  };
  const handleRemoveCategory = (id) => {
    const updatedCategory = data.category.filter((el) => el._id !== id);
    setEditData({ ...data, category: updatedCategory });
  };
  //   sub category
  const handleRemoveSubCategory = (id) => {
    const updatedSubCategory = data.subCategory.filter((el) => el._id !== id);
    setEditData({ ...data, subCategory: updatedSubCategory });
  };

  const handleAddField = () => {
    setEditData((prev) => {
      return {
        ...prev,
        more_details: {
          ...prev.more_details,
          [fieldName]: "",
        },
      };
    });
    setFieldName("");
    setOpenField(false);
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    try {
      const { data: productData } = await Axios({
        ...summaryApi.updateProductDetails,
        data: data,
      });
      if (productData?.success) {
        Swal.fire({
          title: "Product Updated successfully",
          icon: "success",
        });
        if(close)
        {
          close()
        }
        if(fetchProductData)
        {
          fetchProductData()
        }
        setEditData({
          name: "",
          image: [],
          category: [],
          subCategory: [],
          unit: "",
          stock: "",
          price: "",
          discount: "",
          description: "",
          more_details: {},
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <section className="fixed top-0 left-0 right-0 bottom-0 bg-black/70 z-50 ">
      <div className="bg-white w-full max-w-2xl mx-auto rounded p-4 my-5 overflow-y-auto h-full max-h-[95vh]">
        <div className="p-4  bg-white shadow-md flex items-center justify-between">
          <h2 className="font-semibold">Edit Product</h2>
          <button className="cursor-pointer" onClick={close}>
            <IoMdClose size={20} />
          </button>
        </div>

        <div className="mt-3">
          <form onSubmit={handleProductSubmit} action="">
            <div className="grid gap-2">
              <label htmlFor="name" className="font-medium">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Product name"
                value={data.name}
                onChange={handleChange}
                className="bg-blue-50 p-2 border-2  focus:border-primary outline-none rounded-md border-gray-200 w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            {/* description */}
            <div className="grid gap-2">
              <label htmlFor="description" className="font-medium">
                Description
              </label>
              <textarea
                type="text"
                name="description"
                id="name"
                placeholder="Enter Product description"
                value={data.description}
                onChange={handleChange}
                className="bg-blue-50 p-2 border-2  focus:border-primary outline-none rounded-md border-gray-200 w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                rows={3}
                required
              />
            </div>
            {/* image */}
            <div className="grid gap-2 mt-2">
              <p className="font-medium">Image</p>
              <div>
                <label
                  htmlFor="image"
                  className="bg-blue-50 h-24 border rounded-md border-gray-200 flex items-center justify-center"
                >
                  <div className="flex    items-center justify-center flex-col cursor-pointer">
                    {imageLoading ? (
                      <Loading />
                    ) : (
                      <>
                        <IoMdCloudUpload size={44} />
                        <p>Upload Image</p>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    className="hidden"
                    accept="image/*"
                    onChange={handleUploadProductImage}
                  />
                </label>

                {/* display image */}
                <div className="my-2 flex items-center gap-2">
                  {data.image.map((img, index) => {
                    return (
                      <div
                        key={index}
                        className="h-20 w-20 bg-blue-50 border relative"
                      >
                        <img
                          src={img}
                          alt={img}
                          className="w-full h-full object-scale-down cursor-pointer"
                          onClick={() => setImageUrl(img)}
                        />
                        <div
                          onClick={() => handleDeleteImage(index)}
                          className="absolute -bottom-2  -right-2 p-1 bg-red-200 hover:bg-red-300 text-red-500 rounded hover:text-white cursor-pointer"
                        >
                          <MdOutlineDeleteOutline />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* category */}
            <div className="grid gap-2 mt-2">
              <label htmlFor="category" className="font-medium">
                Select Category
              </label>
              <div className=" bg-blue-50 p-2 border-2 border-gray-300  focus:border-primary outline-none rounded-md w-full">
                {/* display category */}
                <div className="flex items-center flex-wrap gap-2">
                  {data.category.map((cat) => {
                    return (
                      <p
                        className="py-1 flex items-center gap-0.5"
                        key={cat._id}
                      >
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
                  <option disabled value="">
                    Select Category
                  </option>
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
            {/*sub category */}
            <div className="grid gap-2 mt-2">
              <label htmlFor="category" className="font-medium">
                Select Sub Category
              </label>
              <div className=" bg-blue-50 p-2 border-2 border-gray-300  focus:border-primary outline-none rounded-md w-full">
                {/* display category */}
                <div className="flex items-center flex-wrap gap-2">
                  {data.subCategory.map((subCat) => {
                    return (
                      <p
                        className="py-1 flex items-center gap-0.5"
                        key={subCat._id}
                      >
                        {subCat.name}{" "}
                        <button
                          onClick={() => handleRemoveSubCategory(subCat._id)}
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
                  onChange={handleOptionSubCategoryChange}
                >
                  <option disabled value="">
                    Select Sub Category
                  </option>
                  {allSubCategory.map((subCategory, index) => {
                    return (
                      <option key={index} value={subCategory._id}>
                        {subCategory.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            {/* unit */}
            <div className="grid gap-2 mt-2">
              <label htmlFor="unit" className="font-medium">
                Unit
              </label>
              <input
                type="text"
                name="unit"
                id="unit"
                placeholder="Enter Product Unit"
                value={data.unit}
                onChange={handleChange}
                className="bg-blue-50 p-2 border-2  focus:border-primary outline-none rounded-md border-gray-200 w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            {/* stock */}
            <div className="grid gap-2 mt-2">
              <label className="font-medium" htmlFor="stock">
                No. of Stock
              </label>
              <input
                type="number"
                name="stock"
                id="stock"
                placeholder="Enter Product stock"
                value={data.stock}
                onChange={handleChange}
                className="bg-blue-50 p-2 border-2  focus:border-primary outline-none rounded-md border-gray-200 w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            {/* price */}
            <div className="grid gap-2 mt-2">
              <label className="font-medium" htmlFor="price">
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                placeholder="Enter Product price"
                value={data.price}
                onChange={handleChange}
                className="bg-blue-50 p-2 border-2  focus:border-primary outline-none rounded-md border-gray-200 w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            {/* discount */}
            <div className="grid gap-2 mt-2">
              <label className="font-medium" htmlFor="discount">
                Discount
              </label>
              <input
                type="number"
                name="discount"
                id="discount"
                placeholder="Enter Product discount"
                value={data.discount}
                onChange={handleChange}
                className="bg-blue-50 p-2 border-2  focus:border-primary outline-none rounded-md border-gray-200 w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            {/* add more field */}
            <div>
              {Object.keys(data?.more_details)?.map((k, index) => {
                return (
                  <div key={index} className="grid gap-2 mt-2">
                    <label className="font-medium" htmlFor={k}>
                      {k}
                    </label>
                    <input
                      type="text"
                      name={k}
                      id={k}
                      placeholder={`Enter Product ${k}`}
                      value={data.more_details[k]}
                      onChange={(e) => {
                        const value = e.target.value;
                        setEditData((prev) => {
                          return {
                            ...prev,
                            more_details: {
                              ...prev.more_details,
                              [k]: value,
                            },
                          };
                        });
                      }}
                      className="bg-blue-50 p-2 border-2  focus:border-primary outline-none rounded-md border-gray-200 w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                );
              })}
            </div>
            <div
              onClick={() => setOpenField(true)}
              className="inline-block px-3 py-1 border border-primary hover:bg-primary hover:text-white font-semibold rounded mt-2 cursor-pointer"
            >
              Add More Field
            </div>
            <div className="grid mt-3">
              <button className="px-3 py-1 border border-primary bg-primary text-white hover:bg-white hover:text-black font-semibold rounded mt-2 cursor-pointer">
                Update Product
              </button>
            </div>
          </form>
        </div>

        {viewImage && (
          <ViewImage url={viewImage} close={() => setImageUrl("")} />
        )}
        {openField && (
          <AddFieldComponent
            value={fieldName}
            onChange={(e) => {
              setFieldName(e.target.value);
            }}
            submit={handleAddField}
            close={() => setOpenField(false)}
          />
        )}
      </div>
    </section>
  );
};

export default EditProductAdmin;
