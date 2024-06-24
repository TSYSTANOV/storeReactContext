import { useSearchParams } from "react-router-dom";

export const useSearchString = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const obj = Object.fromEntries(searchParams);
  const category = obj.category || null;
  const setCategory = (callback) => {
    const newValue = callback(obj);
    setSearchParams(newValue);
  };
  return { category, setCategory };
};
