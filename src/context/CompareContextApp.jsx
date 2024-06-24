import { useContext, useEffect, useMemo, useState } from "react";
import { createContext } from "react";
import { Bounce, toast } from "react-toastify";

const CompareList = createContext();

export function CompareContextApp({ children }) {
  const [compareList, setCompareList] = useState([]);
  const [openCompareList, setOpenCompareList] = useState(false);
  const [filterAndSortParams, setFilterAndSortParams] = useState({
    sort: {
      rate: false,
      price: false,
    },
    filter: {
      priceRange: { low: 0, high: null },
    },
  });
  const setSortParams = (name) => {
    setFilterAndSortParams((prev) => {
      return {
        ...prev,
        sort: {
          rate: false,
          price: false,
          [name]: true,
        },
      };
    });
  };
  const resetAllFilters = () => {
    setFilterAndSortParams({
      sort: {
        rate: false,
        price: false,
      },
      filter: {
        priceRange: { low: 0, high: null },
      },
    });
  };
  const setFilterParams = (name, value) => {
    setFilterAndSortParams((prev) => {
      return {
        ...prev,
        filter: {
          priceRange: {
            ...prev.filter.priceRange,
            [name]: value,
          },
        },
      };
    });
  };
  const FilterAndSort = () =>
    useMemo(() => {
      console.log(1);
      const filterArray =
        filterAndSortParams.filter.priceRange.low ||
        filterAndSortParams.filter.priceRange.high
          ? compareList.filter((item) => {
              const byLow =
                item.price >= filterAndSortParams.filter.priceRange.low;
              const byHigh =
                filterAndSortParams.filter.priceRange.high &&
                filterAndSortParams.filter.priceRange.high !== 0
                  ? item.price <= filterAndSortParams.filter.priceRange.high
                  : true;
              return byLow && byHigh;
            })
          : compareList;

      const activeSortParams = Object.keys(filterAndSortParams.sort).filter(
        (item) => filterAndSortParams.sort[item]
      );
      let sortedData = [];
      activeSortParams.forEach((param) => {
        let newArr = [...filterArray].sort((a, b) => {
          if (param === "rate") {
            return a.rating[param] > b.rating[param] ? 1 : -1;
          }
          return a[param] > b[param] ? -1 : 1;
        });
        sortedData = newArr;
      });
      return sortedData.length ? sortedData : filterArray;
    }, [filterAndSortParams, compareList]);

  const openCompare = (param) => {
    if (param) {
      if (compareList.length === 0) {
        toast.info("Compare List is empty", {
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
    setOpenCompareList(param);
  };
  const inCompareListCheck = (id) => {
    return compareList.some((item) => item.id === id);
  };
  const addToCompare = (item) => {
    setCompareList((prev) => {
      return [...prev, item];
    });
  };
  const deleteFromCompare = (id) => {
    setCompareList((prev) => {
      return prev.filter((item) => item.id !== id);
    });
  };
  return (
    <CompareList.Provider
      value={{
        compareList,
        addToCompare,
        deleteFromCompare,
        FilterAndSort,
        openCompare,
        openCompareList,
        inCompareListCheck,
        setFilterParams,
        setSortParams,
        resetAllFilters,
      }}
    >
      {children}
    </CompareList.Provider>
  );
}
export const useCompare = () => useContext(CompareList);
