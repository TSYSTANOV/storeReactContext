import { useCart } from "../../context/CartContextApp";
import { useCompare } from "../../context/CompareContextApp";

function ProductItem(props) {
  const { addToCart, inCartCheck } = useCart();
  const { addToCompare, inCompareListCheck } = useCompare();
  return (
    <>
      <div className="item">
        <img className="product-image" src={props.image} />
        <h2 className="product-title">{props.title}</h2>
        <p className="product-price">{props.price} USD</p>
        <button
          className="Add-toCart"
          disabled={inCartCheck(props.id)}
          onClick={() => {
            addToCart({ ...props, count: 1 });
          }}
        >
          {inCartCheck(props.id) ? "In Cart" : "Add to Cart"}
        </button>
        <button
          className="compare-button"
          onClick={() => {
            addToCompare(props);
          }}
          disabled={inCompareListCheck(props.id)}
        >
          {inCompareListCheck(props.id) ? "In Compare List" : "Add to Compare"}
        </button>
      </div>
    </>
  );
}
export { ProductItem };
