import type { Metadata } from "next";
<<<<<<< HEAD
import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
    subsets: ['latin'], 
=======
import { Poppins } from 'next/font/google'

import "./globals.css";

const poppins = Poppins({
    subsets: ['latin'],
>>>>>>> 98e0bae (added all features like authentication and dashboard and file uploading and all the required functionalities)
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: "ByteShelf",
  description: "ByteShelf - The only storage solution you need.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-poppins antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
