"use client";

export default function TypingIndicator() {
  return (
    <div className="flex justify-start mb-4 message-enter">
      <div className="w-8 h-8 rounded-full bg-[#1e3a8a] flex items-center justify-center mr-2 mt-1 flex-shrink-0 shadow-sm">
        <span className="text-white text-xs font-bold">GB</span>
      </div>
      <div className="flex flex-col items-start">
        <span className="text-xs text-gray-500 mb-1 ml-1 font-medium">GLA Buddy</span>
        <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
          <div className="flex items-center space-x-1.5">
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
            <div className="typing-dot"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
