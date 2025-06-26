import { createContext, useEffect, useState, useSyncExternalStore } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemCart, setCartLoading } from "../store/cartProduct";
import Axios from "../utilities/axios";
import summaryApi from "../common/CommonApi";
import AxiosToastError from "../common/AxiosToastError";
import toast from "react-hot-toast";
import { PriceWithDiscount } from "../utilities/PriceWithDiscount";
import { handleAddAddress } from "../store/addressSlice";


export const CartContext = createContext(null);

const AuthPorvider = ({ children }) => {
  const dispatch = useDispatch();
  const [totalPrice , setTotalPrice] = useState(0);
  const [notDiscountPrice, setNotDiscountPrice] = useState(0);
    const [totalQuantity , setTotalquantity] = useState(0);
    const { cart } = useSelector((state) => state?.cartItem);
    const user = useSelector(state=>state?.user)
  const fetchCartItem = async () => {
    try {
      dispatch(setCartLoading(true));
      const { data: responseData } = await Axios({...summaryApi.getToCart});
      if (responseData.success) {
        dispatch(addItemCart(responseData.data));
      }
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setCartLoading(false));
    }
  };

  const handleIncreaseQuantity = async (id, quantity) => {
    try {
      const { data : responseData } = await Axios({
        ...summaryApi.updateToCart,
        data: {
          _id: id,
          quantity: quantity,
        },
      });

      if(responseData.success)
      {
        // toast.success(responseData.message)
        fetchCartItem()
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const deleteCartQuantity = async(cartId)=>{
    try {

      const {data : responseData} = await Axios({
        ...summaryApi.deleteToCart,
        data : {
          _id : cartId
        }
      })

      if(responseData.success)
      {
        fetchCartItem();
        toast.success(responseData.message)
      }
      
    } catch (error) {
      AxiosToastError(error)
    }
  }
 
  const fetchAddress = async()=>{
    try {
      const {data : responseData} = await Axios({
        ...summaryApi.getAddress
      })

      if(responseData.success)
      {
        dispatch(handleAddAddress(responseData.data))
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  useEffect(() => {
    const quantity = cart?.reduce((prev, current) => {
      return prev + current.quantity;
    }, 0);
    setTotalquantity(quantity);
    const price = cart?.reduce((prev, current) => {
      return (
        prev + PriceWithDiscount(current?.productId?.price , current?.productId?.discount) * current?.quantity
      );
    }, 0);
    setTotalPrice(price);

    const notDiscountTotalPrice = cart?.reduce((prev, current) => {
      return (
        prev +
        (
          current?.productId?.price
        ) *
          current?.quantity
      );
    }, 0);
    setNotDiscountPrice(notDiscountTotalPrice)
  }, [cart]);

  useEffect(()=>{
    fetchCartItem()
    fetchAddress()
  },[user])

  return (
    <CartContext.Provider
      value={{
        fetchCartItem,
        handleIncreaseQuantity,
        deleteCartQuantity,
        totalPrice,
        totalQuantity,
        notDiscountPrice,
        fetchAddress
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default AuthPorvider;
