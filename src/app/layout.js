// import React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import { IBM_Plex_Sans, Source_Serif_4 } from "next/font/google";
import LayoutClient from "@/app/LayoutClient";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

const sourceSerifPro = Source_Serif_4({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "600"],
  variable: "--font-source-serif-pro",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Advertorial Hub",
  description: "Welcome To Adevrtorial Hub",
  icons: {
    icon: [
      { url: "/favicon.jpg", sizes: "16x16", type: "image/jpeg" },
      { url: "/favicon.jpg", sizes: "32x32", type: "image/jpeg" },
    ],
    apple: [{ url: "/favicon.jpg", sizes: "180x180", type: "image/jpeg" }],
    other: [
      {
        rel: "android-chrome",
        url: "/favicon.jpg",
        sizes: "192x192",
        type: "image/jpeg",
      },
      {
        rel: "android-chrome",
        url: "/favicon.jpg",
        sizes: "512x512",
        type: "image/jpeg",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${ibmPlexSans.variable} ${sourceSerifPro.variable}`}
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
