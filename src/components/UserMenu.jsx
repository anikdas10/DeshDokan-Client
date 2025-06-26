import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import Axios from "../utilities/axios";
import summaryApi from "../common/CommonApi";
import { logout } from "../store/userSlice";
import toast from "react-hot-toast";
import AxiosToastError from "../common/AxiosToastError";
import { FaExternalLinkAlt } from "react-icons/fa";
import { addItemCart } from "../store/cartProduct";

const UserMenu = () => {
    const user = useSelector((state)=>state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    // const { fetchCartItem } = useAuth();
    const handleLogOut = async () => {
        try {
            const response = await Axios({
                ...summaryApi.logout
            })

            if(response?.data?.success)
            {
                dispatch(logout())
                dispatch(addItemCart([]))
                localStorage.clear()
                toast.success(response?.data?.message)
                navigate("/")
            }
        } catch (error) {
            AxiosToastError(error)
        }
    };
    return (
      <div>
        <div className="font-semibold">My Account</div>
        <div className="">
          <Link to={"/dashboard/profile"} className="flex items-center gap-2">
            {user?.name || user?.mobile}
            {user?.role === "ADMIN" ? "(Admin)" : ""}
            <span className="hover:text-primary">
              <FaExternalLinkAlt size={12} />
            </span>
          </Link>
        </div>
        {/* divider */}
        <div className="p-[1px] bg-slate-700 my-2"></div>
        <div className="text-sm grid gap-2">
          <Link to={"/dashboard/myOrder"}>My Order</Link>
          <Link to={"/dashboard/address"}>Save Address</Link>
          <button
            onClick={handleLogOut}
            className=" bg-red-500 text-white p-1 rounded-md w-16 text-center cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    );
};

export default UserMenu;