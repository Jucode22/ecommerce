//utility functions allow us to keep our files clean and organize multiple files in one location
export const addItemToCart = (cartItems, cartItemToAdd) => {
  //find() will return u the first item found in our array based on the condition we put inside the method
  // our condition will be a function that check's the id of every cart item
  // if the id matches with the id of cartItemToAdd then we set the variable existingCartItem to be true, else it would be an undefined
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToAdd.id
  );

  if (existingCartItem) {
    // map() will return us a new array
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => (cartItem.id = cartItemToRemove.id)
  );

  if (existingCartItem.quantity == 1) {
    return cartItems.filter((cartItem) => cartItem.id != cartItemToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id == cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};
