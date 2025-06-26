import AxiosToastError from "../common/AxiosToastError";
import { useEffect, useState } from "react";
import Axios from "../utilities/axios";
import summaryApi from "../common/CommonApi";
import toast from "react-hot-toast";
import useAuth from "../Provider/useAuth";
import { useSelector } from "react-redux";
import {FaMinus , FaPlus} from "react-icons/fa6"

const AddToCartButton = ({  data}) => {
    const [loading, setLoading] = useState(false);
    const { cart } = useSelector((state) => state.cartItem);
    const [isAvailableCart , setIsAvailableCart] = useState(false)
    const [qty , setQty] = useState(1);
    const [cartDetails , setCartDetails ] = useState({});
    const { fetchCartItem, handleIncreaseQuantity, deleteCartQuantity } =
      useAuth();

    const handleAddToCart = async (e) => {
      e.preventDefault();
      e.stopPropagation();

      try {
        setLoading(true);
        const { data: responseData } = await Axios({
          ...summaryApi.addToCart,
          data: {
            productId: data?._id,
          },
        });

        console.log(responseData);
        if (responseData.success) {
          toast.success(responseData.message);
          if (fetchCartItem) {
            fetchCartItem();
          }
        }
      } catch (error) {
        AxiosToastError(error);
      } finally {
        setLoading(false);
      }
    };

    useEffect(()=>{
        const checkItem = cart?.some(item=>item.productId._id === data?._id)
       setIsAvailableCart(checkItem)

       const qtyItem = cart?.find(item=>item.productId._id === data?._id)
       setCartDetails(qtyItem)
       setQty(qtyItem?.quantity)
    },[data , cart])


    const increaseQty = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        handleIncreaseQuantity(cartDetails?._id , qty+1)
    }
    const decreaseQty = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        if(qty === 1)
        {
          deleteCartQuantity(cartDetails?._id  );
        }
        else{
          handleIncreaseQuantity(cartDetails?._id, qty - 1);
        }
    }
    return (
      <div className="w-full max-w-[100px]">
        {isAvailableCart ? (
          <div className="flex items-center gap-1">
            <button onClick={decreaseQty}>
              <FaMinus className="bg-green-700 text-white p-1 rounded  flex-1 cursor-pointer" />
            </button>
            <p className="flex-1 w-full font-semibold px-1 flex items-center justify-center">{qty}</p>
            <button onClick={increaseQty}>
              <FaPlus className="bg-green-700 text-white p-1 rounded flex-1 cursor-pointer" />
            </button>
          </div>
        ) : (
          <button
            onClick={handleAddToCart}
            className="px-2 py-1 bg-green-600 text-white hover:bg-green-700 rounded-md cursor-pointer"
          >
            {loading ? "Adding" : "Add"}
          </button>
        )}
      </div>
    );
};

export default AddToCartButton;