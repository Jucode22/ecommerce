import "./cart-icon.styles.scss";
import { connect } from "react-redux";
import { selectCartItemsCount } from "../../redux/cart/cart.selectors";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

import { createStructuredSelector } from "reselect";

import React from "react";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

const CartIcon = ({ toggleCartHidden, itemCount }) => (
  <div className="cart-icon" onClick={toggleCartHidden}>
    <ShoppingIcon className="shopping-icon" />
    <span className="item-count">{itemCount}</span>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

//we created a selector
// because we wrote code that gets the entire state object and then pulls off a small portion or a slice of that state
// we're computing a new value based on the state
const mapStateToProps = createStructuredSelector({
  itemCount: selectCartItemsCount,
});

//whenever we return a new object, redux rebuilds the entire state object, so mapStatetoprops is always being called and
// that means it is always rerendering but we dont always want our app to rerender a new quantity all the time
// so we can actually store or cache the value of what our selector is using to compute its value using reselect
// RESELECT DEFINITION: Reselect is a library for building memoized selectors. We define selectors as the functions that retrieve snippets of the Redux state for our React components. Using memoization, we can prevent unnecessary rerenders and recalculations of derived data which in turn will speed up our application

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
