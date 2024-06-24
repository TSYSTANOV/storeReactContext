import { useCategory } from "../../context/CategoryContextApp";
import { Loader } from "../Loader/Loader";
import { ProductItem } from "./ProductItem";

function ProductsList() {
  const { data, loading } = useCategory();

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="products">
            {data.map((item) => {
              return <ProductItem key={item.id} {...item} />;
            })}
          </div>
        </>
      )}
    </>
  );
}
export { ProductsList };
