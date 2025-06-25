import { IoMdClose } from "react-icons/io";


const AddFieldComponent = ({close , value , onChange,submit}) => {
    return (
      <div className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-800/60 flex items-center justify-center px-4">
        <div className="bg-white  max-w-md w-full  p-4 rounded-md">
          <div className="flex items-center justify-between">
            <h1 className="font-semibold"> More Field</h1>
            <button
              onClick={close}
              className="w-fit block ml-auto cursor-pointer"
            >
              <IoMdClose size={25} />
            </button>
          </div>
          <input
            className="bg-blue-50 p-2 border-2 border-gray-300  focus:border-primary outline-none rounded-md w-full mt-3"
            value={value}
            onChange={onChange}
            placeholder="Enter Field name"
          />
          <button onClick={submit} className=" px-3 py-1 border border-primary hover:bg-primary hover:text-white font-semibold rounded mt-2 cursor-pointer  mx-auto w-fit block"> Add Field</button>
        </div>
      </div>
    );
};

export default AddFieldComponent;