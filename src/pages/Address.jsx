import { useState } from "react";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import AddAddress from "../components/AddAddress";
import EditAddressDetails from "../components/EditAddressDetails";

const Address = () => {
    const addressList = useSelector((state) => state.addresses.addressList);
    const [openAddress, setOpenAddress] = useState(false);
    const [OpenEdit, setOpenEdit] = useState(false);
    const [editData, setEditData] = useState({});
    const handleDisableAddress = async (id) => {};
    return (
      <div className="">
        <div className="bg-white shadow-lg px-2 py-2 flex justify-between gap-4 items-center ">
          <h2 className="font-semibold text-ellipsis line-clamp-1">Address</h2>
          <button
            onClick={() => setOpenAddress(true)}
            className="border border-primary-200 text-primary-200 px-3 hover:bg-primary-200 cursor-pointer hover:text-black py-1 rounded-full"
          >
            Add Address
          </button>
        </div>
        <div className="bg-blue-50 p-2 grid gap-4">
          {addressList.map((address, index) => {
            return (
              <div
                className={`border rounded p-3 flex gap-3 bg-white ${
                  !address.status && "hidden"
                }`}
              >
                <div className="w-full">
                  <p>{address.address_line}</p>
                  <p>{address.city}</p>
                  <p>{address.state}</p>
                  <p>
                    {address.country} - {address.pincode}
                  </p>
                  <p>{address.mobile}</p>
                </div>
                <div className=" grid gap-10">
                  <button
                    onClick={() => {
                      setOpenEdit(true);
                      setEditData(address);
                    }}
                    className="bg-green-200 p-1 rounded  hover:text-white hover:bg-green-600 cursor-pointer"
                  >
                    <MdEdit />
                  </button>
                  <button
                    onClick={() => handleDisableAddress(address._id)}
                    className="bg-red-200 p-1 rounded hover:text-white hover:bg-red-600 cursor-pointer"
                  >
                    <MdDelete size={20} />
                  </button>
                </div>
              </div>
            );
          })}
          <div
            onClick={() => setOpenAddress(true)}
            className="h-16 bg-blue-50 border-2 border-dashed flex justify-center items-center cursor-pointer"
          >
            Add address
          </div>
        </div>

        {openAddress && <AddAddress close={() => setOpenAddress(false)} />}

        {OpenEdit && (
          <EditAddressDetails
            data={editData}
            close={() => setOpenEdit(false)}
          />
        )}
      </div>
    );
};

export default Address;