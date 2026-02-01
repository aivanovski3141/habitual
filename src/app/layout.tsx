import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Habitual",
  description: "Track your habits daily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} antialiased noise`}>
        {/* Animated background orbs */}
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        <div className="relative z-10 min-h-screen">
          <nav className="glass border-b border-white/5 sticky top-0 z-50">
            <div className="max-w-2xl mx-auto px-6 flex items-center justify-between h-16">
              <Link href="/" className="font-bold text-lg tracking-tight text-white">
                habitual<span className="text-violet-400">.</span>
              </Link>
              <div className="flex gap-1">
                <Link
                  href="/"
                  className="px-4 py-2 rounded-xl text-sm text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
                >
                  Dashboard
                </Link>
                <Link
                  href="/calendar"
                  className="px-4 py-2 rounded-xl text-sm text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
                >
                  Calendar
                </Link>
                <Link
                  href="/profile"
                  className="px-4 py-2 rounded-xl text-sm text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
                >
                  Profile
                </Link>
              </div>
            </div>
          </nav>
          <main className="max-w-2xl mx-auto px-6 py-10">{children}</main>
        </div>
      </body>
    </html>
  );
}
