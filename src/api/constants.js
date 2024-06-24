import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ALL_PRODUCTS = "https://fakestoreapi.com/products";
export const PRODUCTS_BY_CATEGORY =
  "https://fakestoreapi.com/products/category/";

export const getData = async (
  categories = "/categories",
  activeCategory = ""
) => {
  try {
    const res = await fetch(ALL_PRODUCTS + categories + activeCategory).then(
      (res) => res.json()
    );
    return res;
  } catch (error) {
    toast.error(error.message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return false;
  }
};

const errorToast = (mess) => toast.error();
