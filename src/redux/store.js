//middleware is used to catch the action and display it, it is a function that receive actions and then do something with then and then pass them out into the root reducer
// it is between the action fired and the root reducer

import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
//logger is a middleware that helps us debug our redux code

//redux-persist ensures that when someone reloads the page, the cart won't refresh too, instead the cart will hold all of the cartitems that the customer is planning to buy
import { persistStore } from "redux-persist";

import rootReducer from "./root-reducer";

//the middleware that the store is expecting from redux is going to be an array

const middlewares = [logger];

//the ...middlewares take the individual components in its array
// right now there is just the logger middleware in the array but later on we can add more
export const store = createStore(rootReducer, applyMiddleware(...middlewares));
// the persistor is the persisted version of the store
export const persistor = persistStore(store);
