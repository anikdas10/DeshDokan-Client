import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router";
import { TypeAnimation } from "react-type-animation";

const Search = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [isSearchpage , setIsSearchPage ] = useState(false)

    useEffect(()=>{
        const isSearch = location.pathname === "/search";
        setIsSearchPage(isSearch)
    },[location])

    
    const redirectToSearchPage = ()=>{
        navigate("/search")
    }

    return (
      <div className="w-full  min-w-[200px] lg:min-w-[420px] h-10 rounded-full border overflow-hidden flex items-center text-gray-800 bg-slate-100 group focus-within:outline-primary">
        <button className="flex items-center justify-center h-full p-3 group-focus-within:text-primary">
          <FaSearch />
        </button>

        <div className="w-full h-full">
            {
                !isSearchpage?
                (<div className=" w-full h-full flex items-center" onClick={redirectToSearchPage}>
                    <TypeAnimation
                      sequence={[
                        // Same substring at the start will only be typed out once, initially
                        'Search "milk"',
                        1000, // wait 1s before replacing "Mice" with "Hamsters"
                        'Search "sugar"',
                        1000,
                        'Search "Bread"',
                        1000,
                        'Search "Rice"',
                        1000,
                        'Search "Egg"',
                        1000,
                        'Search "Chips"',
                        1000,
                        'Search "Coke"',
                        1000,
                        'Search "Biscuits"',
                        1000,
                      ]}
                      wrapper="span"
                      speed={50}
                      style={{ fontSize: "14px", display: "inline-block" }}
                      repeat={Infinity}
                    />
                  </div>):
                  (<div className="w-full h-full">
                    <input type="text" placeholder="Search for chal , dal and more." className="w-full h-full outline-none" autoFocus />
                  </div>)
            }
        </div>


        
      </div>
    );
};

export default Search;