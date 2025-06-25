import banner2 from "../assets/ban.jpg" 
import bannerMobile from "../assets/bannerMobile.jpg" 
const Banner = () => {
    return (
      <div className=" container mx-auto my-4  px-4">
        <div
          className={`w-full h-44 lg:h-56 bg-green-100 rounded ${
            !banner2 && !bannerMobile && "animate-pulse"
          } relative`}
        >
          <img
            src={banner2}
            className="w-full object-cover h-full hidden lg:block rounded"
            alt="banner"
          />
          <img
            src={bannerMobile}
            className="w-full object-cover h-full block lg:hidden rounded"
            alt="banner"
          />
          <div className="absolute top-10 left-0 right-0 px-8 lg:text-center ">
            <h2 className="font-medium text-white text-lg md:text-xl lg:text-2xl">
              Welcome to <br />
              <span className="font-bold text-green-700 lg:text-4xl">DeshDokan!</span>
            </h2>
            <button className="px-3 py-1 bg-green-700 rounded-md text-white mt-3 cursor-pointer hover:bg-green-800">Shop Now</button>
          </div>
        </div>
      </div>
    );
};

export default Banner;