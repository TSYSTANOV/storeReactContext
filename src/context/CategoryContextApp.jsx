import { createContext, useContext, useEffect, useState } from "react";
import { getData } from "../api/constants";
import { useSearchString } from "../hooks/useSearchString";

const CategoryContext = createContext();
export const CaregoryContextApp = ({ children }) => {
  const { setCategory, category } = useSearchString();
  const [activeCategory, setActiveCategory] = useState(category || "All");
  const [categoryList, setCategoryList] = useState(["All"]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      let response = await getData();
      if (response) {
        setCategoryList((prev) => {
          return [...prev, ...response];
        });
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      setLoading(true);
      let response = await getData(
        activeCategory === "All" ? "" : `/category/${activeCategory}`
      );

      if (response) {
        setData(response);
      }
      setLoading(false);
    })();
    setCategory((prev) => {
      return { ...prev, category: activeCategory };
    });
  }, [activeCategory]);
  return (
    <CategoryContext.Provider
      value={{ activeCategory, setActiveCategory, data, loading, categoryList }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
export const useCategory = () => useContext(CategoryContext);
