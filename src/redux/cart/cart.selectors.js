import { createSelector } from "reselect";

//input selector
// is a function that gets a whole state and only returns a slice of it, one layer deep
const selectCart = (state) => state.cart;
