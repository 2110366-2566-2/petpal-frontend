import type { Metadata } from "next";
import { Inter, Prompt } from "next/font/google";
import "./globals.css";
import ResponsiveNavbar from "./_component/ResponsiveNavbar";
import { AuthProvider } from "./_contexts/AuthContext";
import { Toaster } from "react-hot-toast";
import { useContext } from "react";


const prompt = Prompt({
  subsets: ["latin", "thai"],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const navitems = [
  { name: "Listing", link: "/listing" },
  { name: "Booking", link: "/bookingLoading" },
  { name: "Profile", link: "/profile" },
  { name: "Chat", link: "/chat" },
  { name: "Report", link: "/help" }
]

export const metadata: Metadata = {
  title: "PetPal",
  description: "petpal",
};

let items = [
  { name: "Listing", link: "/listing" },
  { name: "Booking", link: "/booking" },
  { name: "Profile", link: "/profile" }
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={prompt.className}>
        <AuthProvider>
          <ResponsiveNavbar brandName={"PETPAL"} navItems={navitems} />
          {children}
          <Toaster position="top-center" />
        </AuthProvider>
      </body>
    </html>
  );
}
