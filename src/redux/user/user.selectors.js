import { createSelector } from "reselect";

//input selector
// is a function that gets a whole state and only returns a slice of it, one layer deep
const selectUser = (state) => state.user;

//cart is the object from the cart reducer

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);
//
