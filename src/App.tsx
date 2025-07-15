import "./App.css";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyCv6QvaxzCw53Qu2egUPdMpAO2Nmb6MIpE",
  authDomain: "superchat-ea9dd.firebaseapp.com",
  projectId: "superchat-ea9dd",
  storageBucket: "superchat-ea9dd.firebasestorage.app",
  messagingSenderId: "916381874487",
  appId: "1:916381874487:web:2a51f79b3cab96c25cc2b2",
  measurementId: "G-DGSN3K7ZH4",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

const [user] = useAuthState(auth);

function App() {
  return (
    <>
      <div>
        <section>{user ? <ChatRoom /> : <SignIn />}</section>
      </div>
    </>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.sighInWithPopup(provider);
  };

  return (
    <>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </>
  );
}

function SignOut() {
  return (
    auth.currentUser && (
      <>
        <button onClick={() => auth.signOut()}>Sign Out</button>
      </>
    )
  );
}

function ChatRoom() {
  return <></>;
}

export default App;
