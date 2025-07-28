import { useRef, useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { LogOut, Send, Loader2 } from "lucide-react";
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
  doc,
  setDoc,
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

  const [isSending, setIsSending] = useState(false);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser || !formValue.trim() || isSending) return;

    setIsSending(true);
    const { uid, photoURL } = auth.currentUser;

    try {
      // First, check for profanity using Netlify function
      const response = await fetch("/.netlify/functions/checkProfanity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: formValue,
          uid,
          id: `temp-${Date.now()}`, // Temporary ID for the message
        }),
      });

      const result = await response.json();

      // Add the message to Firestore
      const messageData = {
        text: result.moderated ? result.cleanedText : formValue,
        createdAt: serverTimestamp(),
        uid,
        photoURL,
      };

      await addDoc(messagesRef, messageData);

      // If the message was moderated, update the banned collection
      if (result.moderated) {
        await setDoc(doc(firestore, "banned", uid), {});
      }

      setFormValue("");

      // Scroll to bottom after message is sent
      setTimeout(() => {
        if (dummy.current) {
          dummy.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSending(false);
    }
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (dummy.current) {
      dummy.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="min-h-screen w-screen bg-[#f7f9fa] p-2 sm:p-4 lg:p-6">
      <div className="max-w-4xl mx-auto h-[calc(100vh-1rem)] sm:h-[calc(100vh-2rem)] lg:h-[calc(100vh-3rem)]">
        <Card className="h-full flex flex-col shadow-lg rounded-xl sm:rounded-2xl lg:rounded-3xl bg-white overflow-hidden">
          <Header auth={auth} />

          {/* Messages Container */}
          <main className="flex-1 overflow-y-auto px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 space-y-2 sm:space-y-3">
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

          {/* Message Input */}
          <form
            onSubmit={sendMessage}
            className="flex items-center gap-2 sm:gap-3 border-t px-3 sm:px-4 lg:px-6 py-3 sm:py-4 bg-[#f7f9fa] rounded-b-xl sm:rounded-b-2xl lg:rounded-b-3xl"
          >
            <Input
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
              placeholder="Type your message…"
              className="flex-1 bg-white text-black text-sm sm:text-base py-2 sm:py-3"
              maxLength={500}
            />
            <Button
              type="submit"
              size="sm"
              className="bg-gradient-to-br from-[#ccf49c] to-[#c8def0] text-green-900 font-bold shadow p-2 sm:p-3 rounded-lg min-w-[40px] sm:min-w-[48px]"
              disabled={!formValue.trim() || isSending}
            >
              {isSending ? (
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
              ) : (
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

function Header({ auth }: { auth: Auth }) {
  return (
    <header className="flex items-center justify-between px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b bg-white rounded-t-xl sm:rounded-t-2xl lg:rounded-t-3xl sm:gap-40 md:gap-60 lg:gap-96">
      <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 flex items-center gap-2">
        <span className="rounded-full bg-gradient-to-br from-[#ccf49c] to-[#c8def0] px-2 sm:px-3 py-1 text-green-900 shadow text-sm sm:text-base lg:text-lg">
          SuperChat
        </span>
      </h1>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
        onClick={() => auth.signOut()}
      >
        <LogOut className="w-3 h-3 sm:w-4 sm:h-4" />
        <span className="hidden sm:inline">Sign Out</span>
        <span className="sm:hidden">Sign Out</span>
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
          className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover border flex-shrink-0"
        />
      )}
      <div
        className={`px-3 sm:px-4 py-2 rounded-xl sm:rounded-2xl shadow-sm text-sm sm:text-base break-words ${
          isOwn
            ? "bg-gradient-to-br from-[#ccf49c] to-[#c8def0] text-green-900 max-w-[70%] sm:max-w-xs"
            : "bg-gray-100 text-gray-800 max-w-[70%] sm:max-w-xs"
        }`}
        style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
      >
        {message.text}
      </div>
      {isOwn && message.photoURL && (
        <img
          src={message.photoURL}
          alt="avatar"
          className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover border flex-shrink-0"
        />
      )}
    </div>
  );
}
