import { useState } from 'react';
import { FaCross, FaExternalLinkAlt } from 'react-icons/fa';
import { IoMdMenu } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import Axios from '../utilities/axios';
import summaryApi from '../common/CommonApi';
import { logout } from '../store/userSlice';
import toast from 'react-hot-toast';
import AxiosToastError from '../common/AxiosToastError';
import { RxCross2 } from "react-icons/rx";
import isAdmin from '../utilities/isAdmin';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => setIsOpen(!isOpen);
    const user = useSelector((state)=>state?.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogOut = async () => {
      try {
        const response = await Axios({
          ...summaryApi.logout
        });

        if (response?.data?.success) {
          dispatch(logout());
          localStorage.clear();
          toast.success(response?.data?.message);
          navigate("/");
        }
      } catch (error) {
        AxiosToastError(error);
      }
    };
    return (
      <div className="flex border-r border-gray-300">
        {/* Mobile menu button */}
        <button className="lg:hidden cursor-pointer" onClick={toggleSidebar}>
          {!isOpen && <IoMdMenu size={24} />}
        </button>
        {/* Sidebar */}
        <div
          className={`
            absolute top-3 lg:top-0 left-0 p-4 w-64 bg-white shadow-2xl lg:shadow-none
            transition-transform duration-300 ease-in-out
            ${isOpen ? "translate-x-0" : "-translate-x-96"}
            lg:static lg:translate-x-0
          `}
        >
          <div className=" font-bold text-xl flex items-center justify-between">
            My Account
            <div
              onClick={toggleSidebar}
              className="cursor-pointer font-bold lg:hidden"
            >
              <RxCross2 size={24} />
            </div>
          </div>
          <div className="border-b pb-2">
            <Link to={"/dashboard/profile"} className="flex items-center gap-2">
              {user?.name || user?.mobile}{" "}
              {user?.role === "ADMIN" ? "(Admin)" : ""}
              <span className="hover:text-primary">
                <FaExternalLinkAlt size={12} />
              </span>
            </Link>
          </div>
          <nav className="flex flex-col  space-y-2">
            <Link
              onClick={toggleSidebar}
              to="/dashboard/profile"
              className="hover:bg-green-200 mt-2 pl-2  rounded"
            >
              Profile
            </Link>

            {isAdmin(user?.role) && (
              <Link
                onClick={toggleSidebar}
                to="/dashboard/products"
                className="hover:bg-green-200 pl-2  rounded"
              >
                products
              </Link>
            )}

            {isAdmin(user?.role) && (
              <Link
                onClick={toggleSidebar}
                to="/dashboard/category"
                className="hover:bg-green-200 pl-2  rounded"
              >
                Category
              </Link>
            )}
            {isAdmin(user?.role) && (
              <Link
                onClick={toggleSidebar}
                to="/dashboard/sub-category"
                className="hover:bg-green-200 pl-2  rounded"
              >
                Sub Category
              </Link>
            )}

            {isAdmin(user?.role) && (
              <Link
                onClick={toggleSidebar}
                to="/dashboard/upload-product"
                className="hover:bg-green-200 pl-2  rounded"
              >
                Upload Product
              </Link>
            )}

            <Link
              onClick={toggleSidebar}
              to="/dashboard/myOrder"
              className="hover:bg-green-200 pl-2  rounded"
            >
              My Orders
            </Link>
            <Link
              onClick={toggleSidebar}
              to="/dashboard/address"
              className="hover:bg-green-200  pl-2  rounded"
            >
              Save Address
            </Link>
            <button
              onClick={handleLogOut}
              className=" bg-red-500 text-white px-3 py-1 ml-1 rounded-md text-center cursor-pointer"
            >
              Logout
            </button>
          </nav>
        </div>
      </div>
    );
};

export default Sidebar;