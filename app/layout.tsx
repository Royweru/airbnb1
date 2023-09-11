import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Navbar from "./components/navbar/Navbar";
import Clientonly from "./components/Clientonly";
import RegisterModal from "./components/modals/RegisterModal";
import LoginModal from "./components/modals/LoginModal";
import RentModal from "./components/modals/RentModal";

import getCurrentUser from "@/session/GetCurrentUser";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb clone",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      <Clientonly>
        <RentModal />
        <LoginModal />
        <RegisterModal/>
        <Navbar 
         currentUser = {currentUser}
        />
      </Clientonly>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
