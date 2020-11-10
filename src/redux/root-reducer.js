//be the code that combine all the states together
import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
export default combineReducers({
  user: userReducer,
  cart: cartReducer,
});

//when we import our user-reducer we have to export a default value which gets returned from combined reducers
// passing in the object where the key goes to the actual reducer that we want

// our full state in redux is a big JSON object
