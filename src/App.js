import "./App.css";
import React from "react";
import Homepage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.components";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

import { setCurrentUser } from "./redux/user/user.actions";

import { connect } from "react-redux";
//we want to store the state of our users in our app
// so that we can pass it into components that need it
// thats why we convert App to a class component -> to have access to state
//header must be outside the switch because, when the pages change the header will always be present that way

class App extends React.Component {
  // constructor() {
  //   super();

  //   this.state = {
  //     currentUser: null,
  //   };
  // }

  //normally when we fetch data we fire a getch call to the back end but that happens only once
  // once the calls fetch it won't call fetch again until a componentDidMount lifecycle method gets called again
  // but we dont want to always remount our app, we just want to know when firebase realize the authentication state changed
  // without having to manually fetching it, luckily firebase provides us with that method
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        // if there is a user in the authentication libary and it doesn't exist in the database then store it in the db
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          // this.setState({
          //   currentUser: {
          //     id: snapShot.id,
          //     ...snapShot.data(),
          //   },
          // });
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }

      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/shop" component={ShopPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}
//we must update our app component so that its able to update the reducer value with the new action we made

//we're going to connect our app to the outcome of our initial connect call using the second argument called map
// our first argument was mapStatetoProps, but our App component doesnt need Currentuser anymore, so we set that first argument/connection to null
// because we dont need any state to props from our reducer
//the second argument will be the mapDispatchToProps

//the setCurrentUser will go to a function that gets the user object and then calls dispatch
// dispatch is a way for redux to know that you are passing in a action object that will be passed to every reducer

// our setCurrentUser is a function that takes in a user and returns an action object
// so we are invoking the setCurrentUser with a user, this returns an action object with currentUser and payload, which will be dispatched to all the reducers

//user is from the root reducer
const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
//the second argument allows us to have the setCurrentUser function, so we dont need the constructor
