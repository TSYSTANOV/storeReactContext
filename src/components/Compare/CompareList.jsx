import { useState } from "react";
import { useCompare } from "../../context/CompareContextApp";
import { CompateItem } from "./CompareItem";

function CompareList() {
  const {
    openCompareList,
    openCompare,
    FilterAndSort,
    setFilterParams,
    setSortParams,
    resetAllFilters,
    deleteFromCompare,
    compareList,
  } = useCompare();

  const [selectValue, setSelectValue] = useState("");
  const [priceValue, setPriceValue] = useState({ low: "", high: "" });
  const filteredAndSortedArray = FilterAndSort();

  if (openCompareList) {
    return (
      <div className="modal-cart">
        <span
          className="modal-cart-close"
          onClick={() => {
            openCompare(false);
            setPriceValue({ low: "", high: "" });
            resetAllFilters();
          }}
        >
          X
        </span>
        {compareList.length !== 0 ? (
          <>
            <div>
              <div className="filterSort">
                <div className="filterSort_item">
                  <div>Filter by price</div>
                  <label>
                    <input
                      type="number"
                      name="low"
                      value={priceValue.low}
                      onChange={(e) => {
                        setPriceValue((prev) => {
                          return { ...prev, low: e.target.value };
                        });
                        setFilterParams(e.target.name, +e.target.value);
                      }}
                    />
                    low price
                  </label>
                  <label>
                    <input
                      type="number"
                      name="high"
                      value={priceValue.high}
                      onChange={(e) => {
                        setPriceValue((prev) => {
                          return { ...prev, high: e.target.value };
                        });
                        setFilterParams(e.target.name, +e.target.value);
                      }}
                    />
                    high price
                  </label>
                </div>
                <div className="filterSort_item">
                  <div>Sort</div>
                  <select
                    value={selectValue}
                    onChange={(e) => {
                      setSelectValue(e.target.value);
                      if (!e.target.value) return;
                      setSortParams(e.target.value);
                    }}
                  >
                    <option value=""></option>
                    <option value="price">By price</option>
                    <option value="rate">By rate</option>
                  </select>
                </div>
                <button
                  onClick={() => {
                    resetAllFilters();
                    setSelectValue("");
                    setPriceValue({ low: "", high: "" });
                  }}
                >
                  Reset Filters
                </button>
              </div>
            </div>
            <table className="tableCompare">
              <tbody>
                <tr>
                  {filteredAndSortedArray.map((item) => {
                    return (
                      <CompateItem
                        key={item.id}
                        {...item}
                        deleteFromCompare={deleteFromCompare}
                      />
                    );
                  })}
                </tr>
              </tbody>
            </table>
            {filteredAndSortedArray.length === 0 && (
              <h3>No goods by filter/sort</h3>
            )}
          </>
        ) : (
          <h3>Compare list is Empty</h3>
        )}
      </div>
    );
  }
}
export { CompareList };
