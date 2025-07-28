import { useAuthState } from "react-firebase-hooks/auth";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { Landing } from "./Landing";
import { ChatRoomPage } from "./ChatRoomPage";
import "./App.css";

const firebaseConfig = {
  apiKey: "AIzaSyCv6QvaxzCw53Qu2egUPdMpAO2Nmb6MIpE",
  authDomain: "superchat-ea9dd.firebaseapp.com",
  projectId: "superchat-ea9dd",
  storageBucket: "superchat-ea9dd.firebasestorage.app",
  messagingSenderId: "916381874487",
  appId: "1:916381874487:web:2a51f79b3cab96c25cc2b2",
  measurementId: "G-DGSN3K7ZH4",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

function App() {
  const [user] = useAuthState(auth);

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  return user ? (
    <div className="min-h-screen w-full bg-[#f7f9fa]">
      <ChatRoomPage auth={auth} firestore={firestore} />
    </div>
  ) : (
    <div className="min-h-screen w-full bg-[#f7f9fa]">
      <Landing onSignIn={handleSignIn} />
    </div>
  );
}

export default App;
