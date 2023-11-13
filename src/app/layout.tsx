import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Heroes & Monsters",
  description: "Videogame zarpado",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script>
          
        </script>
      </head>
      <body className={inter.className.concat(' bg-black')}>{children}</body>
    </html>
  );
}
