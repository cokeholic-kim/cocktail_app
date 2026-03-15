import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TopNavigation } from "./(navigation)/topNavigation";
import { FooterNavigation } from "./(navigation)/footerNavigation";
import { LoginContextProvider } from "./(context)/LoginContext";

const inter = Inter({ subsets: ["latin"] });

export const viewport = {
  themeColor: "#ffd400",
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: {
    template: "%s | Sool lae",
    default: "Sool lae",
  },
  description: "술재료와 레시피로 만드는 칵테일 레시피 앱입니다.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LoginContextProvider>
          <header>
            <TopNavigation />
          </header>
          <main className="max-w-6xl my-0 mx-auto min-h-screen pb-20">
            {children}
          </main>
          <footer>
            <FooterNavigation />
          </footer>
        </LoginContextProvider>
      </body>
    </html>
  );
}
