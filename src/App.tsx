import { useRef, useState } from "react";
import "./App.css";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  collection,
  query,
  orderBy,
  limit,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import type { User } from "firebase/auth";

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

  return (
    <div className="app-bg">
      <div className="chat-container">
        <Header user={user ?? null} />
        <section className="main-section">
          {user ? <ChatRoom /> : <SignIn />}
        </section>
      </div>
    </div>
  );
}

function Header({ user }: { user: User | null }) {
  return (
    <header className="app-header">
      <h1>💬 SuperChat</h1>
      {user && <SignOut />}
    </header>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <div className="sign-in-container">
      <button className="sign-in-btn" onClick={signInWithGoogle}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
          alt="Google"
          className="google-icon"
        />
        Sign in with Google
      </button>
    </div>
  );
}

function SignOut() {
  return (
    auth.currentUser && (
      <button className="sign-out-btn" onClick={() => auth.signOut()}>
        Sign Out
      </button>
    )
  );
}

function ChatRoom() {
  const dummy = useRef<HTMLDivElement | null>(null);

  const messagesRef = collection(firestore, "messages");
  const messagesQuery = query(messagesRef, orderBy("createdAt"), limit(25));

  const [messages] = useCollectionData(messagesQuery);

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!auth.currentUser) return;
    const { uid, photoURL } = auth.currentUser;

    await addDoc(messagesRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue("");

    if (dummy.current) {
      dummy.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <main>
        {messages &&
          messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg as ChatMessageProps["message"]}
            />
          ))}
        <div ref={dummy}></div>
      </main>
      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button type="submit">📤</button>
      </form>
    </>
  );
}

type ChatMessageProps = {
  message: {
    id?: string;
    text: string;
    uid: string;
    photoURL?: string;
  };
};

function ChatMessage(props: ChatMessageProps) {
  const { text, uid, photoURL } = props.message;

  const messageClass =
    auth.currentUser && uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <div className={`message ${messageClass}`}>
      {photoURL && <img src={photoURL} alt="avatar" />}
      <p>{text}</p>
    </div>
  );
}

export default App;
