import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/providers/Provider";
import AuthLayout from "./authLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { Toaster } from "@/components/ui/sonner";

// app/page.js
// app/layout.js ya app/page.js me
export const metadata = {
  title: "ApnaSquad | BGMI Tournament Platform",
  icons: {
    icon: "/favicon.ico", // ye favicon
    shortcut: "/favicon.ico", // optional
  },
  description:
    "Join ApnaSquad BGMI tournaments at team04.site. Compete, win prizes, and be part of the ultimate gaming community.",
  keywords:
    "BGMI tournament, ApnaSquad, BGMI esports, BGMI scrims, gaming events, team04.site",
  openGraph: {
    title: "ApnaSquad - BGMI Tournament Platform",
    description:
      "Register for BGMI tournaments and esports events on ApnaSquad.",
    url: "https://team04.site",
    siteName: "ApnaSquad",
    images: [
      {
        url: "https://i.postimg.cc/02q763xt/app-logo.webp", // 👈 apna OG banner add karna
        width: 1200,
        height: 630,
        alt: "ApnaSquad BGMI Tournament",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ApnaSquad | BGMI Tournament",
    description: "Compete in BGMI tournaments with ApnaSquad. Register now!",
    images: ["https://i.postimg.cc/02q763xt/app-logo.webp"], // 👈 banner
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-900 w-full h-screen overflow-hidden`}
      >
        <ReduxProvider>
          <main>{children}</main>
          <Toaster richColors position="top-right" />
        </ReduxProvider>
      </body>
    </html>
  );
}
