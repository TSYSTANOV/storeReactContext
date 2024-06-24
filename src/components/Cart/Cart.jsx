import { useCart } from "../../context/CartContextApp";
import { CartItem } from "./CartItem";

export function Cart() {
  const {
    cart,
    isOpenCart,
    setIsOpenCart,
    increaseCount,
    decreaseCount,
    sumTotalCartPrices,
  } = useCart();
  if (isOpenCart) {
    return (
      <div className="modal-cart">
        <span
          className="modal-cart-close"
          onClick={() => {
            setIsOpenCart(false);
          }}
        >
          X
        </span>
        <table className="table">
          <tbody>
            {cart.length > 0 ? (
              cart.map((item) => {
                return (
                  <CartItem
                    key={item.id}
                    {...item}
                    increaseCount={increaseCount}
                    decreaseCount={decreaseCount}
                  />
                );
              })
            ) : (
              <tr>
                <td>
                  {" "}
                  <h3>Cart is Empty</h3>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <p className="total-price">Total: {sumTotalCartPrices()}</p>
      </div>
    );
  }
}
