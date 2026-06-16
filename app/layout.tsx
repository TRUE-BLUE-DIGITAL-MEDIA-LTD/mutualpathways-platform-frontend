import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from 'next/link';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MutualPathways",
  description:
    "Meaningful relationships and genuine connections.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >

      <body>

  {children}

  <footer className="
    border-t
    border-zinc-800
    mt-20
  ">

    <div className="
      max-w-7xl
      mx-auto
      px-6
      py-10
      text-center
      text-zinc-400
    ">

      <div className="
        flex
        justify-center
        gap-6
        mb-6
      ">

        <Link href="/terms">
          Terms of Service
        </Link>

        <Link href="/privacy">
          Privacy Policy
        </Link>

        <Link href="/about">
          About Us
        </Link>

        <Link href="/contact">
        Contact Us
        </Link>

      </div>

      <p className="mb-2">
        Users 18+ only.
      </p>

      <p>
        © 2026 MutualPathways.
        All Rights Reserved.
        Owned and operated by
        True Blue Digital Media LTD
      </p>

    </div>

  </footer>

</body>

    </html>
  );
}