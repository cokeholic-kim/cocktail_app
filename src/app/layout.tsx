import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Home from './(home)/page';
import { TopNavigation } from "./(navigation)/topNavigation";
import { FooterNavigation } from "./(navigation)/footerNavigation";

const inter = Inter({ subsets: ["latin"] });
export const viewport = {
  themeColor : "#ffd400"
};

export const metadata: Metadata = {
  title: { 
    template:"%s | Sool lae",
    default: "Sool lae"
  },
  description: "숨은 나의 주류취향 , 칵테일 주류 검색 부터 추천까지 술래에서 찾아보세요.",
  manifest:"/manifest.json",
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <TopNavigation />
        </header>
        <main className="max-w-6xl my-0 mx-auto">{children}</main>
        <footer>
          <FooterNavigation />
        </footer>
      </body>
    </html>
  );
}
