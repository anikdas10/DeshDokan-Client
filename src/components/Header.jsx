
import { Link, useNavigate,  } from "react-router";
import logo from "../assets/logo.png"
import Search from "./Search";
import { FaRegUserCircle } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { useSelector } from "react-redux";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { useState } from "react";
import UserMenu from "./userMenu";

const Header = () => {
  const user = useSelector((state)=>state?.user)
  const [openUserMenu,setOpenUserMenu] = useState(false)

  const navigate = useNavigate();

  const handleMobileUser = ()=>{
      if(!user?._id)
      {
        navigate("/login")
        return
      }
      navigate("/user")

  }
 
    return (
      <header className="h-16 lg:h-20  shadow-md sticky top-0 z-50 bg-white font-primary">
        <div className="container mx-auto h-full px-4 flex items-center justify-between">
          {/*logo  */}
          <div className="h-full">
            <Link to={"/"}>
              <div className="w-full h-full flex items-center">
                <img src={logo} className="w-16 md:w-24 lg:w-28 " alt="logo" />
              </div>
            </Link>
          </div>

          {/* search */}
          <div className="">
            <Search />
          </div>

          {/* login and add to cart */}
          <div>
            {/* this is only for mobile */}
            <button onClick={handleMobileUser} className="text-neutral-600 lg:hidden">
              <FaRegUserCircle size={26} />
            </button>

            {/* this is only for the desktop verion */}
            <div className="hidden lg:flex items-center gap-4">
              {user?._id ? (
                <div
                  onClick={() => setOpenUserMenu(!openUserMenu)}
                  className="relative"
                >
                  <div className="flex select-none items-center gap-1 cursor-pointer">
                    <p>Account</p>
                    {openUserMenu ? (
                      <GoTriangleUp size={25} />
                    ) : (
                      <GoTriangleDown size={25} />
                    )}

                    {/*  */}
                  </div>
                  {openUserMenu && (
                    <div className="absolute right-0 top-12">
                      <div className="bg-white rounded p-4 min-w-52 lg:shadow-lg">
                        <UserMenu />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link to={"/login"} className="text-lg px-2 font-semibold">
                  Login
                </Link>
              )}

              <button className="flex items-center bg-primary px-3 py-3 rounded-md text-white gap-2">
                {/* add to cart icon */}
                <div className="animate-bounce">
                  <TiShoppingCart size={25} />
                </div>
                <div className="font-semibold">
                  <p>My Cart</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>
    );
};

export default Header;