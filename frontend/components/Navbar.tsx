"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { GraduationCap, MessageCircle, Menu, X, User, LogOut } from "lucide-react";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/chat", label: "Chatbot" },
  { href: "/register", label: "Inquire" },
];

interface UserProfile {
  id: string;
  name: string;
  email: string;
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setCurrentUser(data.user);
        }
      })
      .catch(() => {});
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setCurrentUser(null);
      router.push("/");
      router.refresh();
    } catch (e) {
      console.error("Logout error", e);
    }
  };

  return (
    <nav className="bg-[#1e3a8a] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-9 h-9 bg-amber-500 rounded-full flex items-center justify-center group-hover:bg-amber-400 transition-colors">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div className="leading-tight">
              <span className="font-bold text-lg tracking-wide">GLA University</span>
              <div className="text-amber-400 text-xs font-medium">Mathura, UP</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? "bg-blue-600 text-white"
                    : "text-blue-100 hover:bg-blue-700 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/chat"
              className="ml-2 flex items-center space-x-1.5 bg-amber-500 hover:bg-amber-400 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Ask GLA Buddy</span>
            </Link>

            {currentUser ? (
              <div className="ml-3 flex items-center space-x-3 bg-blue-900/60 border border-blue-700 px-3 py-1.5 rounded-lg">
                <div className="flex items-center space-x-1.5 text-xs">
                  <User className="w-3.5 h-3.5 text-amber-400" />
                  <span className="font-medium text-white max-w-[120px] truncate">
                    {currentUser.name}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  title="Sign Out"
                  className="text-blue-300 hover:text-white transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="ml-3 flex items-center space-x-1">
                <Link
                  href="/login"
                  className="text-blue-100 hover:text-white hover:bg-blue-700/50 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg text-sm font-medium border border-white/20 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 pt-2 border-t border-blue-700 mt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium mb-1 transition-all ${
                  pathname === link.href
                    ? "bg-blue-600 text-white"
                    : "text-blue-100 hover:bg-blue-700"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/chat"
              onClick={() => setMenuOpen(false)}
              className="flex items-center space-x-2 mt-2 bg-amber-500 text-white px-4 py-2.5 rounded-lg text-sm font-semibold"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Ask GLA Buddy</span>
            </Link>

            {currentUser ? (
              <div className="mt-3 pt-3 border-t border-blue-700/60 flex items-center justify-between px-4">
                <span className="text-xs text-blue-200">Hi, {currentUser.name}</span>
                <button
                  onClick={handleLogout}
                  className="text-xs text-amber-300 font-semibold"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="mt-3 pt-3 border-t border-blue-700/60 grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-center bg-blue-700 text-white py-2 rounded-lg text-sm"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="text-center bg-white/10 text-white py-2 rounded-lg text-sm border border-white/20"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
