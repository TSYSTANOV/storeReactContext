function CompateItem({ image, rating, price, title, deleteFromCompare, id }) {
  return (
    <td className="table-td-compare">
      <button
        onClick={() => {
          deleteFromCompare(id);
        }}
      >
        X
      </button>
      <img className="compare-table" src={image} />
      <p className="border-table">Title: {title}</p>
      <p className="border-table specialChar">Rate: {rating.rate}</p>
      <p className="border-table specialChar">Price: {price} USD</p>
    </td>
  );
}
export { CompateItem };
