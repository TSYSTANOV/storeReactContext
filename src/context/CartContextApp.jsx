import { createContext, useContext, useState } from "react";
import { Bounce, toast } from "react-toastify";

const CartContext = createContext();

export function CartContextApp({ children }) {
  const [cart, setCart] = useState([]);
  const [isOpenCart, setOpenCart] = useState(false);
  const addToCart = (item) => {
    setCart([...cart, item]);
  };
  const setIsOpenCart = (param) => {
    if (param) {
      if (cart.length === 0) {
        toast.info("Cart is empty", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
        return;
      }
    }
    setOpenCart(param);
  };
  const sumTotalCartPrices = () => {
    const total = cart.reduce((acc, el) => {
      acc += el.price * el.count;
      return acc;
    }, 0);
    return total.toFixed(2);
  };
  const increaseCount = (id) => {
    const update = cart.map((item) => {
      if (item.id === id) {
        item.count += 1;
        return item;
      }
      return item;
    });
    setCart(update);
  };
  const decreaseCount = (id) => {
    const update = cart.map((item) => {
      if (item.id === id) {
        item.count -= 1;
        return item;
      }
      return item;
    });
    const newArr = update.filter((item) => item.count !== 0);
    setCart(newArr);
  };
  const inCartCheck = (id) => {
    return cart.some((item) => item.id === id);
  };

  return (
    <CartContext.Provider
      value={{
        addToCart,
        inCartCheck,
        isOpenCart,
        setIsOpenCart,
        cart,
        increaseCount,
        decreaseCount,
        sumTotalCartPrices,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
export const useCart = () => useContext(CartContext);
