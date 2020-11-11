import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import "./header.styles.scss";

import { createStructuredSelector } from "reselect";
import CartIcon from "../cart-icon/cart-icon.component";

import { auth } from "../../firebase/firebase.utils";
//connect is a higher order component that lets us modify our compenent to have access to things related to redux like our reducers
// higher order components are functions that take components as arguments and return a better version component
import { connect } from "react-redux";

import { selectCartHidden } from "../../redux/cart/cart.selectors";

import { selectCurrentUser } from "../../redux/user/user.selectors";
import CartDropDown from "../cart-dropdown/cart-dropdown.component";
const Header = ({ currentUser, hidden }) => (
  <div className="header">
    <Link className="logo-container" to="/">
      <Logo className="logo" />
    </Link>
    <div className="options">
      <Link className="option" to="/shop">
        SHOP
      </Link>
      <Link className="option" to="/shop">
        CONTACT
      </Link>
      {currentUser ? (
        <div className="option" onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      ) : (
        <Link className="option" to="/signin">
          SIGN IN
        </Link>
      )}
      <CartIcon />
    </div>
    {hidden ? null : <CartDropDown />}
  </div>
);

//the state parameter is the state from the top level reducer, the root reducer
//we want to pass the current user property and set a value of it.
// the value is the root reducer's user value, which is userReducer, which has a currentUser value, which is null

// now we are destructuring off a nested property
// so we are saying get me the user value from the root reducer and from there get the current User value from the user reducer

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});
//OR U CAN DO THIS:
// const mapStateToProps = (state) => ({
//   currentUser: selectCurrentUser(state),
//   hidden: selectCartHidden(state),
// });

// BELOW IS WHAT U COULD DO WITHOUT DESTRUCTURING
// const mapStateToProps = (state) => ({
//   currentUser: state.user.currentUser,
// });
export default connect(mapStateToProps)(Header);
// now header has access to the currentUser property from a user-reducer without needing our app component to pass it as a prop

//comment
