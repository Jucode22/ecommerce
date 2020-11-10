//a reducer is a function that takes the state object and it receives an action
// which is an object that has a type (which is a string value)
//when we fire the state for the first time there is going to be no state so we should set an initial state

import { UserActionTypes } from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
//every single reducer receives the action that was fired even if that reducer doesnt have the same type as it
// thats why we need default return state; because if no action type matches inside the switch statement then we want to return the state
//payload is a property that may change the state value
