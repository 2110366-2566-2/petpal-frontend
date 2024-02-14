import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./_component/navbar";

const inter = Inter({ subsets: ["latin"] });

const navitems = [
  {name : "Listing" , link : "/listing"},
  {name : "Booking" , link : "/booking"},
  {name : "Profile" , link : "/profile"}
]

export const metadata: Metadata = {
  title: "PetPal",
  description: "petpal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar brandName={"PETPAL"} navItems={navitems}/>
        {children}
      </body>
    </html>
  );
}
