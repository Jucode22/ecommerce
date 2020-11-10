import firebase from "firebase/app";
//we dont need everything from firebase just authentification and the database
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAcRfLPwrYMCYt6SKrhxOToREQoBNhGxPY",
  authDomain: "ecommerce-website-7a551.firebaseapp.com",
  databaseURL: "https://ecommerce-website-7a551.firebaseio.com",
  projectId: "ecommerce-website-7a551",
  storageBucket: "ecommerce-website-7a551.appspot.com",
  messagingSenderId: "1068651270219",
  appId: "1:1068651270219:web:a21b07f575a56d8f1cbdce",
  measurementId: "G-28KC5YZVXE",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
//firestore.collection('users').doc('/users/xuIgSEYNzhwnlp1cFFob').collection('cartItems').doc('puDMlCh1eXi101qePqnb')
// OR
//firestone.doc('/users/xuIgSEYNzhwnlp1cFFob/cartItems/puDMlCh1eXi101qePqnb') for a specific document but if u want a collection
// firestore.collection('/users/xuIgSEYNzhwnlp1cFFob/cartItems')

//this method is supposed to get a user from the authentification libary and store it in our database
// userAuth is a user from the authentification library
export const createUserProfileDocument = async (userAuth, additionalData) => {
  // null = false so not null is a true
  if (!userAuth) return;
  // this is a document reference object
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  // by calling the .get() method on a reference object we are returned a snapshot object
  const snapShot = await userRef.get();

  //so if the user only exists in the auth library but not in the database lets add it in
  //remember we can only do CRUD methods on documentRef objects
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    //we also want to know when we made the document
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

// set up the Google authentication utility
const provider = new firebase.auth.GoogleAuthProvider();
// gibes us access to a new Google probider from the authentication libary

provider.setCustomParameters({ prompt: "select_account" });
// we want to always trigger the Google popup whenever we use the google auth provider for authentication and sign in

export const signInWithGoogle = () => auth.signInWithPopup(provider);
//sign in with popup takes the provider class that we made but it takes it from
//many different types of pop ups like twitter not just google

export default firebase;
