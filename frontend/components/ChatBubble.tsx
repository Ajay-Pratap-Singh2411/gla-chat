"use client";

interface ChatBubbleProps {
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
}

export default function ChatBubble({ role, content, timestamp }: ChatBubbleProps) {
  const isUser = role === "user";

  const formatTime = (date?: Date) => {
    if (!date) return "";
    return new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Convert markdown-like formatting to JSX
  const renderContent = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, i) => {
      if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <p key={i} className="font-bold mt-1">
            {line.slice(2, -2)}
          </p>
        );
      }
      if (line.startsWith("- ")) {
        return (
          <li key={i} className="ml-4 list-disc">
            {line.slice(2)}
          </li>
        );
      }
      if (line.match(/^\d+\. /)) {
        return (
          <li key={i} className="ml-4 list-decimal">
            {line.replace(/^\d+\. /, "")}
          </li>
        );
      }
      if (line === "") return <br key={i} />;
      return <p key={i}>{line}</p>;
    });
  };

  return (
    <div
      className={`flex message-enter ${isUser ? "justify-end" : "justify-start"} mb-4`}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-[#1e3a8a] flex items-center justify-center mr-2 mt-1 flex-shrink-0 shadow-sm">
          <span className="text-white text-xs font-bold">GB</span>
        </div>
      )}

      <div className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
        {!isUser && (
          <span className="text-xs text-gray-500 mb-1 ml-1 font-medium">GLA Buddy</span>
        )}
        <div
          className={`${
            isUser
              ? "chat-bubble-user"
              : "chat-bubble-bot"
          } text-sm leading-relaxed`}
        >
          <div className={isUser ? "" : "prose prose-sm max-w-none"}>
            {renderContent(content)}
          </div>
        </div>
        {timestamp && (
          <span className="text-xs text-gray-400 mt-1 mx-1">
            {formatTime(timestamp)}
          </span>
        )}
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center ml-2 mt-1 flex-shrink-0 shadow-sm">
          <span className="text-blue-700 text-xs font-bold">You</span>
        </div>
      )}
    </div>
  );
}
