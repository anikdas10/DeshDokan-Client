import  { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaUserCircle } from "react-icons/fa";
import UserProfileUpload from '../components/UserProfileUpload';
import { Link } from 'react-router';

const Profile = () => {
    const [openProfileEdit,setProfileEdit] = useState(false)
    const user = useSelector((state)=>state.user)
    const date = new Date(user?.createdAt);

    // Get full year
    const year = date.getFullYear();

    // Get month name
    const monthName = date.toLocaleString("default", { month: "long" });

    return (
      <div className=" max-w-4xl mx-auto rounded-md p-6 md:p-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row  gap-6">
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

            <button onClick={()=>setProfileEdit(true)}  className="bg-green-700 hover:bg-green-800 text-white px-3 py-1 rounded-md cursor-pointer ">
              Edit
            </button>
            {openProfileEdit && <UserProfileUpload close = {()=>setProfileEdit(false)} />}
          </div>

          <div className="text-center md:text-left space-y-1">
            <h2 className="text-2xl font-semibold ">{user?.name}</h2>
            <p className="text-gray-700 ">{user?.email}</p>
            <p className="text-sm text-gray-600">
              Member since {monthName} {year}
            </p>
          </div>

          <div className="mt-4 md:mt-0 md:ml-auto">
            <Link to={"/dashboard/editProfile"} className="inline-flex items-center px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition cursor-pointer">
              Edit Profile
            </Link>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 text-sm text-gray-700 dark:text-gray-300">
          <div>
            <p className="text-gray-900 mb-1">Phone</p>
            <p className="font-medium text-gray-700">{user?.mobile}</p>
          </div>
          <div>
            <p className="text-gray-800 mb-1">Address</p>
            <p className="font-medium text-gray-700">{user?.address}</p>
          </div>
          <div>
            <p className="text-gray-900 mb-1">Account Type</p>
            <p className="font-medium text-gray-700">{user?.role}</p>
          </div>
        </div>
      </div>
    );
};

export default Profile;