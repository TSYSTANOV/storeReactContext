import "./App.css";
import { Cart } from "./components/Cart/Cart";
import { Header } from "./components/Header/Header";
import { ProductsList } from "./components/ProductsList/ProductsList";
import { CartContextApp } from "./context/CartContextApp";
import { CaregoryContextApp } from "./context/CategoryContextApp";
import { ToastContainer } from "react-toastify";
import { CompareContextApp } from "./context/CompareContextApp";
import { CompareList } from "./components/Compare/CompareList";

function App() {
  return (
    <>
      <div className="container">
        <CompareContextApp>
          <CartContextApp>
            <CaregoryContextApp>
              <Header />
              <ProductsList />
              <Cart />
              <CompareList />
            </CaregoryContextApp>
          </CartContextApp>
        </CompareContextApp>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
