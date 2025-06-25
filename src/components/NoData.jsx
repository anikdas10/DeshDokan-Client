
import image from "../assets/noDataa.avif"

const NoData = () => {
    return (
      <div className="flex items-center justify-center mt-5 ">
        <img src={image} className="rounded-md" alt="" />
      </div>
    );
};

export default NoData;