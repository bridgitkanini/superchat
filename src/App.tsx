import { useAuthState } from "react-firebase-hooks/auth";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { Landing } from "./Landing";
import { ChatRoomPage } from "./ChatRoomPage";
import "./App.css";

// Use environment variables if available, otherwise use the hardcoded values
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCv6QvaxzCw53Qu2egUPdMpAO2Nmb6MIpE",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "superchat-ea9dd.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "superchat-ea9dd",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "superchat-ea9dd.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "916381874487",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:916381874487:web:2a51f79b3cab96c25cc2b2",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-DGSN3K7ZH4",
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
