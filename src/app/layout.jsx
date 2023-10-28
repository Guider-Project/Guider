import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import { Inter } from "next/font/google";

import NextAuthProvider from "@/components/providers/NextAuth";
import NextUI from "@/components/providers/NextUI";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Guider",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <NextUI>{children}</NextUI>
        </NextAuthProvider>
      </body>
    </html>
  );
}
