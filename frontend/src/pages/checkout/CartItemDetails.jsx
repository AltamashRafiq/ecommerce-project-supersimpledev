import { useState } from "react";
import { formatMoney } from "../../utils/money";

export function CartItemDetails({ cartItem }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const handleClick = () => {
    if (isUpdating) {
      setIsUpdating(false);
      return;
    }
    setIsUpdating(true);
  };
  return (
    <>
      <img className="product-image" src={cartItem.product.image} />
      <div className="cart-item-details">
        <div className="product-name">{cartItem.product.name}</div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity:{" "}
            {isUpdating ? <input type="text" style={{ width: "50px" }} /> : ""}
            <span className="quantity-label">{cartItem.quantity}</span>
          </span>
          <span
            className="update-quantity-link link-primary"
            onClick={handleClick}
          >
            Update
          </span>
          <span className="delete-quantity-link link-primary">Delete</span>
        </div>
      </div>
    </>
  );
}
