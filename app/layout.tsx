import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sai Pranav | Software Developer & AI Engineer",
  description:
    "Portfolio of Sai Pranav — Building AI systems: RAG, Reinforcement Learning, and ML. Software Developer & AI Engineer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
