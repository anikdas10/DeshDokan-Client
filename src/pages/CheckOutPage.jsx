import { useState  } from "react";
import useAuth from "../Provider/useAuth";
import {useNavigate} from "react-router";
import { DisplayPrice } from "../utilities/DisplayPriceInTk";
import AddAddress from "../components/AddAddress";
import { useSelector } from "react-redux";
import AxiosToastError from "../common/AxiosToastError";
import Axios from "../utilities/axios";
import summaryApi from "../common/CommonApi";
import toast from "react-hot-toast";
import {loadStripe} from "@stripe/stripe-js"

const CheckOutPage = () => {
    const { notDiscountPrice, totalPrice, totalQuantity, fetchCartItem } =
      useAuth();
    const [openAddress , setOpenAddress] = useState(false)
    const [selectAddress , setSelectAddress] = useState(0)
    const cartItemList = useSelector((state) => state.cartItem.cart);
    const addressList = useSelector(state=>state.addresses.addressList)
    
    const navigate = useNavigate();
    const handleCashOnDelivery = async()=>{

      try {
        const { data: responseData } = await Axios({
          ...summaryApi.cashOnDelivery,
          data: {
            list_items : cartItemList,
            totalAmt : totalPrice,
            addressId : addressList[selectAddress]?._id,
            subTotalAmt : totalPrice,
          },
        });

        if(responseData.success)
        {
          fetchCartItem()
          toast.success(responseData.message)
          navigate("/success", {
            state: {
              text: "Order",
            },
          });
        }
        
      } catch (error) {
        AxiosToastError(error)
      }
    }

    const handleOnlinePayment = async()=>{
      const stripePublicKey = import.meta.env.VITE_PUBLIC_KEY;
      console.log(stripePublicKey);
      const stripePromise = await loadStripe(stripePublicKey)
      try {
        const { data: responseData } = await Axios({
          ...summaryApi.payment_url,
          data: {
            list_items: cartItemList,
            addressId: addressList[selectAddress]?._id,
            subTotalAmt: totalPrice,
            totalAmt: totalPrice,
          },
        });
        console.log(responseData);
        stripePromise.redirectToCheckout({ sessionId: responseData.id });
      } catch (error) {
        AxiosToastError(error)
      }
    }

    return (
      <section className="bg-blue-50">
        <div className="container mx-auto p-4 flex flex-col lg:flex-row w-full gap-5 justify-between">
          <div className="bg-white p-2 grid gap-4 w-full">
            <h3 className="text-lg font-semibold">Choose your address</h3>
            {addressList?.map((address, index) => {
              return (
                <label
                  htmlFor={"address" + index}
                  className={!address.status && "hidden"}
                >
                  <div className="border rounded p-3 flex gap-3 hover:bg-blue-50">
                    <div>
                      <input
                        id={"address" + index}
                        type="radio"
                        value={index}
                        onChange={(e) => setSelectAddress(e.target.value)}
                        name="address"
                      />
                    </div>
                    <div>
                      <p>{address.address_line}</p>
                      <p>{address.division}</p>
                      <p>{address.zilla}</p>
                      <p>{address.upoZilla}</p>
                      <p>
                        {address.country} - {address.postcode}
                      </p>
                      <p>{address.mobile}</p>
                    </div>
                  </div>
                </label>
              );
            })}
            <div
              onClick={() => setOpenAddress(true)}
              className="h-16 bg-blue-50 border-2 border-dashed flex justify-center items-center cursor-pointer"
            >
              Add address
            </div>
          </div>

          <div className="w-full max-w-md bg-white py-4 px-2">
            {/**summary**/}
            <h3 className="text-lg font-semibold">Summary</h3>
            <div className="bg-white p-4">
              <h3 className="font-semibold">Bill details</h3>
              <div className="flex gap-4 justify-between ml-1">
                <p>Items total</p>
                <p className="flex items-center gap-2">
                  <span className="line-through text-neutral-400">
                    {DisplayPrice(notDiscountPrice)}
                  </span>
                  <span>{DisplayPrice(totalPrice)}</span>
                </p>
              </div>
              <div className="flex gap-4 justify-between ml-1">
                <p>Quntity total</p>
                <p className="flex items-center gap-2">{totalQuantity} item</p>
              </div>
              <div className="flex gap-4 justify-between ml-1">
                <p>Delivery Charge</p>
                <p className="flex items-center gap-2">Free</p>
              </div>
              <div className="font-semibold flex items-center justify-between gap-4">
                <p>Grand total</p>
                <p>{DisplayPrice(totalPrice)}</p>
              </div>
            </div>
            <div className="w-full flex flex-col gap-4">
              <button
                className="py-2 px-4 bg-green-600 hover:bg-green-700 rounded text-white font-semibold"
                onClick={handleOnlinePayment}
              >
                Online Payment
              </button>

              <button
                className="py-2 px-4 border-2 border-green-600 font-semibold text-green-600 hover:bg-green-600 hover:text-white"
                onClick={handleCashOnDelivery}
              >
                Cash on Delivery
              </button>
            </div>
          </div>
        </div>

        {openAddress && <AddAddress close={() => setOpenAddress(false)} />}
      </section>
    );
};

export default CheckOutPage;