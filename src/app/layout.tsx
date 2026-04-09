import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Enter the Dragon | Coaching Platform",
  description: "Results-first coaching. Built on trust, driven by education.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="font-body min-h-screen">{children}</body>
    </html>
  );
}
