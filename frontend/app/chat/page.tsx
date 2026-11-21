"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import ChatBubble from "@/components/ChatBubble";
import TypingIndicator from "@/components/TypingIndicator";
import {
  Send,
  Plus,
  MessageSquare,
  Clock,
  Sparkles,
  User as UserIcon,
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatSessionItem {
  sessionId: string;
  preview: string;
  messageCount: number;
  updatedAt: string;
}

const SUGGESTED_QUESTIONS = [
  "What courses does GLA offer?",
  "What is the fee for B.Tech?",
  "How to apply for admission?",
  "Tell me about hostel facilities",
  "What is GLAET?",
  "What are the placement statistics?",
];

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content:
    "👋 Hello! I'm **GLA Buddy**, your AI assistant for GLA University.\n\nI can help you with:\n- Course & program information\n- Admission process & GLAET\n- Fee structure & scholarships\n- Campus facilities & hostel\n- Placement & career support\n\nWhat would you like to know today?",
  timestamp: new Date(),
};

function ChatPageContent() {
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<ChatSessionItem[]>([]);
  const [currentUser, setCurrentUser] = useState<{ id: string; name: string } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const autoSentRef = useRef(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Load current user and chat sessions from MongoDB
  const loadSessions = () => {
    fetch("/api/chat/sessions")
      .then((res) => res.json())
      .then((data) => {
        if (data.sessions) {
          setChatHistory(data.sessions);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setCurrentUser(data.user);
        }
      })
      .catch(() => {});

    loadSessions();
  }, []);

  // Handle query param from landing page
  useEffect(() => {
    const query = searchParams.get("q");
    if (query && !autoSentRef.current) {
      autoSentRef.current = true;
      setTimeout(() => {
        handleSend(query);
      }, 600);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadSessionDetails = async (id: string) => {
    setIsLoading(true);
    setSessionId(id);
    try {
      const res = await fetch(`/api/chat/sessions?sessionId=${id}`);
      const data = await res.json();
      if (data.session && Array.isArray(data.session.messages)) {
        setMessages(
          data.session.messages.map((m: { role: "user" | "assistant"; content: string; timestamp: string }) => ({
            role: m.role,
            content: m.content,
            timestamp: new Date(m.timestamp),
          }))
        );
      }
    } catch (e) {
      console.error("Failed to load session details", e);
    } finally {
      setIsLoading(false);
      setSidebarOpen(false);
    }
  };

  const handleSend = async (text?: string) => {
    const messageText = (text ?? input).trim();
    if (!messageText || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageText,
          sessionId: sessionId || undefined,
          userId: currentUser?.id,
        }),
      });

      const data = await res.json();

      if (data.sessionId && !sessionId) {
        setSessionId(data.sessionId);
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data.reply || data.error || "Sorry, I could not process your request.",
          timestamp: new Date(),
        },
      ]);

      // Refresh recent sessions stored in MongoDB
      loadSessions();
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "⚠️ Connection error. Please check your internet and try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const startNewChat = () => {
    setMessages([{ ...WELCOME_MESSAGE, timestamp: new Date() }]);
    setSessionId("");
    setInput("");
    setSidebarOpen(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-30 w-72 bg-[#1e3a8a] text-white flex flex-col transition-transform duration-300 shadow-2xl lg:shadow-none`}
          style={{ top: "64px" }}
        >
          <div className="p-4 border-b border-blue-700">
            <button
              onClick={startNewChat}
              className="w-full flex items-center justify-center space-x-2 bg-amber-500 hover:bg-amber-400 text-white px-4 py-2.5 rounded-xl font-semibold transition-all duration-200"
            >
              <Plus className="w-4 h-4" />
              <span>New Chat</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-thin p-3">
            <p className="text-blue-300 text-xs font-semibold uppercase tracking-wider px-2 mb-2">
              Saved in MongoDB
            </p>
            {chatHistory.length === 0 ? (
              <div className="text-center py-8 text-blue-400">
                <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No saved chats yet</p>
              </div>
            ) : (
              chatHistory.map((chat) => (
                <div
                  key={chat.sessionId}
                  onClick={() => loadSessionDetails(chat.sessionId)}
                  className={`flex items-start space-x-2 p-2.5 rounded-lg cursor-pointer mb-1 transition-colors ${
                    sessionId === chat.sessionId
                      ? "bg-blue-700 text-white"
                      : "hover:bg-blue-700/50 text-blue-100"
                  }`}
                >
                  <MessageSquare className="w-4 h-4 mt-0.5 text-blue-300 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{chat.preview}</p>
                    <div className="flex items-center text-blue-300 text-xs mt-0.5">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{new Date(chat.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      <span className="mx-1">•</span>
                      <span>{chat.messageCount} msgs</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-4 border-t border-blue-700">
            {currentUser ? (
              <div className="flex items-center space-x-2 text-xs text-blue-200">
                <UserIcon className="w-4 h-4 text-amber-400" />
                <span className="truncate">Saved under: <b>{currentUser.name}</b></span>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-blue-300 text-xs">Logged in as Guest</p>
                <a
                  href="/login"
                  className="inline-block mt-1 text-xs text-amber-400 hover:underline font-semibold"
                >
                  Sign in to link chats
                </a>
              </div>
            )}
          </div>
        </aside>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            style={{ top: "64px" }}
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main chat area */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Chat header */}
          <div className="bg-white border-b px-4 py-3 flex items-center space-x-3 shadow-sm">
            <button
              className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <MessageSquare className="w-5 h-5 text-gray-600" />
            </button>
            <div className="w-9 h-9 bg-[#1e3a8a] rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h1 className="font-semibold text-gray-900 text-sm">GLA Buddy</h1>
              <div className="flex items-center space-x-1.5">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-500">Online • Storing in MongoDB</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto scrollbar-thin p-4 md:p-6">
            <div className="max-w-3xl mx-auto">
              {messages.map((msg, i) => (
                <ChatBubble
                  key={i}
                  role={msg.role}
                  content={msg.content}
                  timestamp={msg.timestamp}
                />
              ))}
              {isLoading && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Suggested questions (shown only on first load) */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2 max-w-3xl mx-auto w-full">
              <p className="text-xs text-gray-400 mb-2 font-medium">
                Suggested questions:
              </p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 px-3 py-1.5 rounded-full transition-colors font-medium"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input bar */}
          <div className="bg-white border-t p-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-end space-x-3 bg-gray-50 border-2 border-gray-200 rounded-2xl px-4 py-3 focus-within:border-blue-500 transition-colors">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask anything about GLA University…"
                  rows={1}
                  className="flex-1 bg-transparent resize-none outline-none text-gray-800 placeholder-gray-400 text-sm max-h-32 leading-relaxed"
                  style={{ scrollbarWidth: "none" }}
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  className="w-9 h-9 bg-blue-700 hover:bg-blue-800 disabled:bg-gray-200 disabled:cursor-not-allowed text-white rounded-xl flex items-center justify-center transition-all duration-200 flex-shrink-0 shadow-sm"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-center text-xs text-gray-400 mt-2">
                Messages are permanently recorded in your MongoDB cluster.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="w-12 h-12 bg-[#1e3a8a] rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse">
              <Sparkles className="w-6 h-6 text-amber-400" />
            </div>
            <p className="text-gray-600 font-medium">Loading GLA Buddy…</p>
          </div>
        </div>
      }
    >
      <ChatPageContent />
    </Suspense>
  );
}
