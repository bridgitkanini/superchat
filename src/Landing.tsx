import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { ArrowRight, Info } from "lucide-react";

export function Landing({ onSignIn }: { onSignIn: () => void }) {
  return (
    <div className="min-h-screen w-full bg-[#f7f9fa] flex flex-col">
      <nav className="w-full flex justify-between items-center px-8 py-4">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-gradient-to-br from-[#ccf49c] to-[#c8def0] px-3 py-1 font-bold text-lg text-green-900 shadow">
            SuperChat
          </span>
          <Button variant="ghost" className="ml-4">
            Contact Us
          </Button>
        </div>
        <div className="flex gap-4">
          <Button variant="ghost">About</Button>
          <Button variant="ghost">Benefits</Button>
          <Button variant="ghost">App</Button>
          <Button variant="ghost">Features</Button>
          <Button variant="ghost">Reviews</Button>
          <Button variant="ghost">Plans</Button>
        </div>
        <Button variant="outline" className=" ml-4bg-gradient-to-br from-[#ccf49c] to-[#c8def0] text-green-900 font-bold shadow"
              onClick={onSignIn}>
          Try Out <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </nav>
      <main className="flex-1 flex flex-col md:flex-row items-center justify-center w-full mx-16 px-8 py-16 gap-12">
        <section className="flex-1 flex flex-col gap-6">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight text-gray-900">
            Empower Connections
            <br />
            with SuperChat
          </h1>
          <p className="text-lg text-gray-600">
            Instant,{" "}
            <span className="font-semibold text-green-600">real-time</span>{" "}
            communication, providing both visual connection and immediate
            answers to customers inquiries.
          </p>
          <div className="flex gap-4 mt-4">
            <Button
              className="bg-gradient-to-br from-[#ccf49c] to-[#c8def0] text-green-900 font-bold shadow"
              onClick={onSignIn}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                alt="Google"
                className="w-6 h-6 mr-2"
              />
              Sign in with Google
            </Button>
            <Button variant="outline">
              Learn More <Info className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-2 mt-8">
            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
              High-performance
            </span>
            <span className="rounded-full bg-gradient-to-br from-[#ccf49c] to-[#c8def0] px-3 py-1 text-sm text-green-900">
              Revolutionary
            </span>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
              Progressive
            </span>
          </div>
        </section>
        <section className="flex-1 flex flex-col gap-4">
          <div className="flex gap-4">
            <Card
              className="w-56 h-56 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80')",
              }}
            />
            <Card
              className="w-72 h-56 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80')",
              }}
            />
          </div>
          <div className="flex gap-4">
            <Card
              className="w-72 h-56 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80')",
              }}
            />
            <Card
              className="w-56 h-56 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80')",
              }}
            />
          </div>
        </section>
      </main>
      <footer className="w-full flex justify-between items-center px-8 py-4 text-gray-400 text-sm">
        <span>superchat.com</span>
        <span>© {new Date().getFullYear()} SuperChat</span>
      </footer>
    </div>
  );
}
