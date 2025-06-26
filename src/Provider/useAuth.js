
import { useContext } from "react";
import {  CartContext } from "./AuthPorvider";

const useAuth = () => {
  const context = useContext(CartContext);
  return context;
};

export default useAuth;