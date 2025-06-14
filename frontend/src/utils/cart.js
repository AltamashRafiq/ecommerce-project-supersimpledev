export function calculateCartQuantity(cart) {
  let cartQuantity = 0;
  cart.map((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
}
