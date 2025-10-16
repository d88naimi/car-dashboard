import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Car Dashboard - Find Your Dream Car",
  description: "Search and save your favorite cars",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-br from-slate-50 to-slate-100`}
      >
        <div className="flex flex-col min-h-screen">
          {/* Header */}
          <header className="bg-white shadow-sm border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">🚗</div>
                  <h1 className="text-2xl font-bold text-slate-900">
                    Car Dashboard
                  </h1>
                </div>
                <nav className="flex gap-6">
                  <Link
                    href="/"
                    className="text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    Search
                  </Link>
                  <a
                    href="/favorites"
                    className="text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    Favorites
                  </a>
                </nav>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-white border-t border-slate-200 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <p className="text-center text-slate-600 text-sm">
                © 2025 Car Dashboard. Built with Next.js & Tailwind CSS
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
