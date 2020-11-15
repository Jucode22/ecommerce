//be the code that combine all the states together
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
//this line below is saying I want to use localstorage as my storage type
import storage from "redux-persist/lib/storage";

import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
import shopReducer from "./shop/shop.reducer";
import directoryReducer from "./directory/directory.reducer";

const persistConfig = {
  // we want to start to storing at the root
  key: "root",
  // the storage key will go to whatever the storage object from redux persist we're trying to use
  storage,
  //the only reducer we want to persist is the cart reducer because the currentUser is always changing
  //the whitelist is an array of string values, 'cart' is sorta like a key letting redux-persist know we want to persist the cart reducer
  whitelist: ["cart"],
};
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer,
});

//when we import our user-reducer we have to export a default value which gets returned from combined reducers
// passing in the object where the key goes to the actual reducer that we want

// our full state in redux is a big JSON object

//we also have to wrap the root reducer in the persistReducer() function
// now we have a root reducer with the persistance capabilities
export default persistReducer(persistConfig, rootReducer);
//
