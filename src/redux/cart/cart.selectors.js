import { createSelector } from "reselect";

//input selector
// is a function that gets a whole state and only returns a slice of it, one layer deep
const selectCart = (state) => state.cart;

//cart is the object from the cart reducer

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity,
      0
    )
);
