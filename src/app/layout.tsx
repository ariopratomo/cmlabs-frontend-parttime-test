import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";

import { Navbar } from "@/components/layout/Navbar";
import { FavoritesProvider } from "@/context/FavoritesContext";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cmlabs-fe-parttime.local"),
  title: {
    default: "CMLABS FE Part-time Test",
    template: "%s | CMLABS FE Part-time Test",
  },
  description:
    "Aplikasi pencarian ingredient dan meal menggunakan Next.js App Router dengan UI responsive.",
  keywords: ["Next.js", "MealDB", "Ingredients", "Responsive", "SEO"],
  openGraph: {
    title: "CMLABS FE Part-time Test",
    description:
      "Aplikasi pencarian ingredient dan meal menggunakan Next.js App Router dengan UI responsive.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${manrope.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <FavoritesProvider>
          <Navbar />
          {children}
        </FavoritesProvider>
      </body>
    </html>
  );
}
