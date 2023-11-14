import type { Metadata } from "next";
import { Pixelify_Sans } from "next/font/google";
import "./globals.css";

const pixelify_sans = Pixelify_Sans({ subsets: ["latin"] });

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
      <body className={pixelify_sans.className.concat(' bg-black')}>{children}</body>
    </html>
  );
}
