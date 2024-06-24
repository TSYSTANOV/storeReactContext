import { useCart } from "../../context/CartContextApp";
import { useCategory } from "../../context/CategoryContextApp";
import { useCompare } from "../../context/CompareContextApp";

function Header() {
  const { categoryList, activeCategory, setActiveCategory } = useCategory();
  const { setIsOpenCart, cart } = useCart();
  const { openCompare, compareList } = useCompare();
  return (
    <>
      <div className="categories">
        {categoryList.map((category) => {
          return (
            <button
              className={`category-btn ${
                activeCategory === category ? "activeBtn" : ""
              }`}
              data-cat-name={category}
              key={category}
              onClick={() => {
                setActiveCategory(category);
              }}
            >
              {category}
            </button>
          );
        })}
        <button
          className="category-btn Btncart"
          data-cat-name="cart"
          data-products-length={cart.length}
          onClick={setIsOpenCart}
        >
          🛒 Cart
        </button>
        <button
          className="category-btn btnToCompare"
          data-cat-name="compare"
          data-products-length={compareList.length}
          onClick={() => openCompare(true)}
        >
          Compare
        </button>
      </div>
    </>
  );
}
export { Header };
