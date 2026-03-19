import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Suspense } from "react";
import CartCount from "@/components/CartCount";
import Link from "next/link";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LibrosStore",
  description: "Catálogo de libros de programación más destacados y novedades.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <header className="header">
          <Link href="/" className="header-logo">
            Libros<span className="accent">Store</span>
          </Link>
          <nav className="header-nav">
            <Link href="/nuevo" className="header-nav-link">
              + Publicar
            </Link>
            <Link href="/carrito" className="header-cart">
              <span>🛒</span>
              <span className="cart-badge">
                <Suspense fallback="0">
                  <CartCount />
                </Suspense>
              </span>
            </Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
