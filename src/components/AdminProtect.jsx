import { useSelector } from "react-redux";
import isAdmin from "../utilities/isAdmin";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useEffect, useRef } from "react";
import Loading from "./Loading";


const AdminProtect = ({children}) => {
    const user = useSelector((state)=>state.user)
    const navigate = useNavigate()
    const hasRedirected = useRef(false)
    console.log(user.loading);
    
    useEffect(() => {
        if (user?.loading) {
          return
        }
        
        if (!isAdmin(user?.role)) {
          toast.error("You do not have permission", { id: "no-permission" });
          navigate("/");
          hasRedirected.current = true;
        }
      }, [user, navigate]);

      if (user?.loading) {
        return <Loading />;
      }

     if (!isAdmin(user?.role)) return null;
     
     return children;
};

export default AdminProtect;