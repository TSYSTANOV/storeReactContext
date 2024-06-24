function CartItem({
  image,
  title,
  price,
  count,
  decreaseCount,
  increaseCount,
  id,
}) {
  return (
    <tr className="modal-cart-item">
      <td>
        <img className="modal-cart-item-image" src={image} />
      </td>
      <td className="modal-cart-item-title">{title}</td>
      <td className="modal-cart-item-price">{price} USD</td>
      <td className="modal-cart-btns">
        <span
          className="numbers"
          onClick={() => {
            decreaseCount(id);
          }}
        >
          -
        </span>
        <p className="modal-cart-item-count">{count}</p>
        <span
          className="numbers"
          onClick={() => {
            increaseCount(id);
          }}
        >
          +
        </span>
      </td>
      <td>
        Summary:<p>{count * price}</p>USD
      </td>
      `;
    </tr>
  );
}
export { CartItem };
