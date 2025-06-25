import { IoMdClose } from "react-icons/io";

const ViewImage = ({url , close}) => {
    return (
      <div className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-800/60 flex items-center justify-center ">
        <div className="bg-white container max-w-lg w-full  p-4 rounded-md">
          <div className="">
            <button
              onClick={close}
              className="w-fit block ml-auto cursor-pointer"
            >
              <IoMdClose size={25} />
            </button>
            <img src={url} className="max-w-lg h-72 flex items-center justify-center mx-auto"   alt="" />
          </div>
        </div>
      </div>
    );
};

export default ViewImage;