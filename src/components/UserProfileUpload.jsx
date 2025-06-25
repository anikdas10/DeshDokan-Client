import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../utilities/axios";
import summaryApi from "../common/CommonApi";
import AxiosToastError from "../common/AxiosToastError";
import toast from "react-hot-toast";
import { updateProfileImage } from "../store/userSlice";
import { IoMdClose } from "react-icons/io";


const UserProfileUpload = ({close}) => {
    const user = useSelector((state)=>state.user)
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(false)

    const handleUploadImage = async(e)=>{
        const file = e.target.files[0];
        if(!file)
        {
            return
        }

        const formData = new FormData()
        formData.append("avatar",file)
         
       try {
        setLoading(true);
        const response = await Axios({
          ...summaryApi.upload_avatar,
          data: formData,
        });
        if(response?.data?.success)
        {
            dispatch(updateProfileImage(response?.data?.data.avatar))
            toast.success(response?.data?.message);
            close()
        }
       } catch (error) {
        AxiosToastError(error)
       }finally{
        setLoading(false)
       }

    }
    return (
      <section className="fixed top-0 left-0 right-0 bottom-0 bg-neutral-900 opacity-85 p-4 flex items-center justify-center">
        <div className="bg-white max-w-sm w-full rounded-md p-4 flex items-center flex-col ">
            <button onClick={close} className="ml-auto text-black text-2xl cursor-pointer"><IoMdClose/></button>
          <div className="flex items-center flex-col gap-2">
            {user?.avatar ? (
              <img
                src={user?.avatar}
                alt="User Avatar"
                className="w-24 h-24 rounded-full object-cover ring-2 ring-primary"
              />
            ) : (
              <FaUserCircle size={76} />
            )}
          </div>
          <form onSubmit={(e)=>e.preventDefault()} action="">
            <label htmlFor="uploadProfile">
              {" "}
              <div className="border border-primary hover:bg-primary px-4 py-1 rounded text-sm my-3 font-semibold hover:text-white cursor-pointer">
                {" "}
                {
                    loading?"Uploading":"Upload"
                }
              </div>
            </label>
            <input onChange={handleUploadImage} type="file" name="" id="uploadProfile" className="hidden" />
          </form>
        </div>
      </section>
    );
};

export default UserProfileUpload;