"use client";
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import {store} from "@/store/postStore";
import { Provider } from "react-redux";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["devanagari"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Bazinga",
  description: "Rede-social Geek",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={poppins.className}>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
