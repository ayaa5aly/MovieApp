import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Marquee — MovieApp",
  description: "Search movies, save favorites, and track what you've watched.",
};

const NAV_LINKS = [
  { href: "/", label: "Now Showing" },
  { href: "/favorites", label: "Favorites" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">
        <header className="border-b border-border">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
            <Link
              href="/"
              className="font-display text-2xl sm:text-3xl tracking-wide text-foreground shrink-0"
            >
              MARQUEE
            </Link>
            <nav className="flex items-center gap-3 sm:gap-6 font-mono text-xs sm:text-sm uppercase tracking-wide">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hidden sm:inline text-muted hover:text-accent-gold transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/login"
                className="px-3 sm:px-4 py-2 rounded-sm bg-accent text-foreground hover:bg-accent/90 transition-colors normal-case font-sans text-xs sm:text-sm shrink-0"
              >
                Sign in
              </Link>
            </nav>
          </div>
          <div className="filmstrip" />
        </header>

        <main className="flex-1">{children}</main>

        <footer className="mt-16">
          <div className="filmstrip" />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-muted uppercase tracking-wide">
            <span>Marquee — built with Next.js</span>
            <Link href="/health" className="hover:text-accent-gold transition-colors">
              System status
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
