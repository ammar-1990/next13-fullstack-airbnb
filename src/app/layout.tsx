import Navbar from "@/components/Navbar/Navbar";
import "./globals.css";
import { Nunito } from "next/font/google";
import Modal from "@/components/modals/Modal";
import RegisterModal from "@/components/modals/RegisterModal";
import ToasterProvider from "@/providers/ToasterProvider";
import LoginModal from "@/components/modals/LoginModal";
import { getSession } from "@/actions/getCurrentUser";
import RentModal from "@/components/modals/RentModal";
import SearchModal from "@/components/modals/SearchModal";
import {Metadata} from 'next'

export const metadata:Metadata = {
  title: "Airbnb",
  description: "Airbnb clone",

 
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getSession();

  return (
    <html lang="en">
      <head>
   
      </head>
      <body className={font.className}>
        <RentModal />
        <RegisterModal />
        <SearchModal />
        <LoginModal />
        <Navbar currentUser={currentUser} />
        <div className="pt-52 px-4 pb-10"> {children}</div>

        <ToasterProvider />
      </body>
    </html>
  );
}
