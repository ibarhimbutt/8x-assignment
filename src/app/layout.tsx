import type { Metadata } from "next";
import { IBM_Plex_Mono, Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Quorum — AI notes that keep up with you",
  description:
    "Connect your calendar, capture Google Meet in the browser, and get live transcripts, summaries, action items, and shareable clips.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-bg text-paper font-sans">{children}</body>
    </html>
  );
}
