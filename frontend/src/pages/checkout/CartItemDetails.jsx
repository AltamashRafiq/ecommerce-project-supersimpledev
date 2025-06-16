import axios from "axios";
import { useState } from "react";
import { formatMoney } from "../../utils/money";

export function CartItemDetails({ cartItem, loadCart }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [quantity, setQuantity] = useState(Number(cartItem.quantity));

  const updateCartItem = async () => {
    if (isUpdating) {
      await axios.put(`/api/cart-items/${cartItem.productId}`, { quantity });
      await loadCart();
      setIsUpdating(false);
      return;
    }
    setIsUpdating(true);
  };

  const updateQuantity = (event) => {
    setQuantity(Number(event.target.value));
  };

  const handleUpdateKeyDown = (event) => {
    if (event.key === "Enter") {
      updateCartItem();
    } else if (event.key === "Escape") {
      setQuantity(Number(cartItem.quantity));
      setIsUpdating(false);
    }
  };

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
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
            {isUpdating ? (
              <input
                type="text"
                style={{ width: "50px", "margin-right": "5px" }}
                value={quantity}
                onChange={updateQuantity}
                onKeyDown={handleUpdateKeyDown}
              />
            ) : (
              ""
            )}
            <span className="quantity-label">{cartItem.quantity}</span>
          </span>
          <span
            className="update-quantity-link link-primary"
            onClick={updateCartItem}
          >
            Update
          </span>
          <span
            className="delete-quantity-link link-primary"
            onClick={deleteCartItem}
          >
            Delete
          </span>
        </div>
      </div>
    </>
  );
}
