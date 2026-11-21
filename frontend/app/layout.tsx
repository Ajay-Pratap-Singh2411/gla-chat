import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GLA Buddy - AI Assistant | GLA University",
  description:
    "Get instant answers about GLA University courses, admissions, fees, and campus life with GLA Buddy, your AI-powered university assistant.",
  keywords: "GLA University, GLA Buddy, chatbot, admissions, courses, Mathura",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "Inter, system-ui, sans-serif" }}>{children}</body>
    </html>
  );
}
