import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { ArrowRight, Info, Menu, X } from "lucide-react";
import { useState } from "react";
import { chatImage1, chatImage2, chatImage3, chatImage4 } from "./assets";

export function Landing({ onSignIn }: { onSignIn: () => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#f7f9fa] flex flex-col sm:mx-16">
      {/* Navigation */}
      <nav className="w-full flex justify-between items-center px-4 sm:px-6 lg:px-8 py-4 relative">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-gradient-to-br from-[#ccf49c] to-[#c8def0] px-3 py-1 font-bold text-lg text-green-900 shadow">
            SuperChat
          </span>
          {/* <Button variant="ghost" className="hidden sm:flex ml-4">
            Contact Us
          </Button> */}
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-4">
          <Button variant="ghost">About</Button>
          <Button variant="ghost">Benefits</Button>
          <Button variant="ghost">App</Button>
          <Button variant="ghost">Features</Button>
          <Button variant="ghost">Reviews</Button>
          <Button variant="ghost">Plans</Button>
        </div>

        {/* Desktop CTA */}
        <Button
          variant="outline"
          className="hidden sm:flex bg-gradient-to-br from-[#ccf49c] to-[#c8def0] text-green-900 font-bold shadow"
          onClick={onSignIn}
        >
          Try Out <ArrowRight className="ml-1 h-4 w-4" />
        </Button>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t lg:hidden z-50">
            <div className="flex flex-col p-4 space-y-2">
              <Button variant="ghost" className="justify-start">
                About
              </Button>
              <Button variant="ghost" className="justify-start">
                Benefits
              </Button>
              <Button variant="ghost" className="justify-start">
                App
              </Button>
              <Button variant="ghost" className="justify-start">
                Features
              </Button>
              <Button variant="ghost" className="justify-start">
                Reviews
              </Button>
              <Button variant="ghost" className="justify-start">
                Plans
              </Button>
              <Button variant="ghost" className="justify-start sm:hidden">
                Contact Us
              </Button>
              <Button
                className="bg-gradient-to-br from-[#ccf49c] to-[#c8def0] text-green-900 font-bold shadow mt-4"
                onClick={onSignIn}
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                  alt="Google"
                  className="w-4 h-4 mr-2"
                />
                Sign in with Google
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row items-center justify-center w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 gap-8">
        {/* Text Section */}
        <section className="flex-1 flex flex-col gap-4 sm:gap-6 text-center lg:text-left max-w-2xl xl:max-w-none">
          <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold leading-tight text-gray-900">
            Empower Connections
            <br />
            with SuperChat
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-lg mx-auto xl:mx-0">
            Instant,{" "}
            <span className="font-semibold text-green-600">real-time</span>{" "}
            communication, providing both visual connection and immediate
            answers to customers inquiries.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4 items-center lg:items-start">
            <Button
              className="bg-gradient-to-br from-[#ccf49c] to-[#c8def0] text-green-900 font-bold shadow w-full sm:w-auto"
              onClick={onSignIn}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Sign in with Google
            </Button>
            <Button variant="outline" className="w-full sm:w-auto">
              Learn More <Info className="ml-1 h-4 w-4" />
            </Button>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-6 sm:mt-8 justify-center lg:justify-start">
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

        {/* Image Grid Section */}
        <section className="flex-1 flex flex-col gap-3 sm:gap-4 w-full max-w-2xl lg:max-w-none">
          {/* First Row */}
          <div className="flex gap-3 sm:gap-4">
            <Card
              className="h-32 sm:h-40 md:h-48 lg:h-56 w-[40%] sm:w-[35%] md:w-[35%] flex-shrink-0 bg-cover bg-center rounded-lg sm:rounded-xl"
              style={{
                backgroundImage: `url(${chatImage2})`,
              }}
            />
            <Card
              className="h-32 sm:h-40 md:h-48 lg:h-56 w-[60%] sm:w-[65%] md:w-[65%] flex-shrink-0 bg-cover bg-center rounded-lg sm:rounded-xl"
              style={{
                backgroundImage: `url(${chatImage4})`,
              }}
            />
          </div>

          {/* Second Row */}
          <div className="flex gap-3 sm:gap-4">
            <Card
              className="h-32 sm:h-40 md:h-48 lg:h-56 w-[60%] sm:w-[65%] md:w-[65%] flex-shrink-0 bg-cover bg-center rounded-lg sm:rounded-xl"
              style={{
                backgroundImage: `url(${chatImage3})`,
              }}
            />
            <Card
              className="h-32 sm:h-40 md:h-48 lg:h-56 w-[40%] sm:w-[35%] md:w-[35%] flex-shrink-0 bg-cover bg-center rounded-lg sm:rounded-xl"
              style={{
                backgroundImage: `url(${chatImage1})`,
              }}
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 lg:px-8 py-4 text-gray-400 text-sm gap-2 sm:gap-0">
        <span>superchat.com</span>
        <span>© {new Date().getFullYear()} SuperChat</span>
      </footer>
    </div>
  );
}
