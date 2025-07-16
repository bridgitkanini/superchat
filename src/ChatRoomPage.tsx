import { useRef, useState } from "react";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { LogOut } from "lucide-react";
import type { Auth } from "firebase/auth";
import type { Firestore } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  collection,
  query,
  orderBy,
  limit,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

export function ChatRoomPage({
  auth,
  firestore,
}: {
  auth: Auth;
  firestore: Firestore;
}) {
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
    if (dummy.current) dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4">
      <Card className="w-full max-w-xl h-[80vh] flex flex-col shadow-lg rounded-3xl bg-white">
        <Header auth={auth} />
        <main className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
          {messages &&
            messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={
                  msg as { text: string; uid: string; photoURL?: string }
                }
                isOwn={!!auth.currentUser && msg.uid === auth.currentUser.uid}
              />
            ))}
          <div ref={dummy}></div>
        </main>
        <form
          onSubmit={sendMessage}
          className="flex items-center gap-2 border-t px-4 py-3 bg-[#f7f9fa] rounded-b-3xl"
        >
          <Input
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder="Type your message…"
            className="flex-1 bg-white"
          />
          <Button
            type="submit"
            className="bg-gradient-to-br from-[#ccf49c] to-[#c8def0] text-green-900 font-bold shadow"
            disabled={!formValue.trim()}
          >
            <span role="img" aria-label="Send">
              📤
            </span>
          </Button>
        </form>
      </Card>
    </div>
  );
}

function Header({ auth }: { auth: Auth }) {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-white rounded-t-3xl">
      <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
        <span className="rounded-full bg-gradient-to-br from-[#ccf49c] to-[#c8def0] px-3 py-1 text-green-900 shadow">
          SuperChat
        </span>
      </h1>
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={() => auth.signOut()}
      >
        <LogOut className="w-4 h-4" />
        Sign Out
      </Button>
    </header>
  );
}

function ChatMessage({
  message,
  isOwn,
}: {
  message: { text: string; uid: string; photoURL?: string };
  isOwn: boolean;
}) {
  return (
    <div
      className={`flex items-end gap-2 ${
        isOwn ? "justify-end" : "justify-start"
      }`}
    >
      {!isOwn && message.photoURL && (
        <img
          src={message.photoURL}
          alt="avatar"
          className="w-8 h-8 rounded-full object-cover border"
        />
      )}
      <div
        className={`px-4 py-2 rounded-2xl shadow-sm text-base max-w-xs break-words ${
          isOwn
            ? "bg-gradient-to-br from-[#ccf49c] to-[#c8def0] text-green-900"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        {message.text}
      </div>
      {isOwn && message.photoURL && (
        <img
          src={message.photoURL}
          alt="avatar"
          className="w-8 h-8 rounded-full object-cover border"
        />
      )}
    </div>
  );
}
