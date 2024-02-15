import type { Metadata } from "next";
import { Inter, Prompt } from "next/font/google";
import "./globals.css";
import NavBar from "./_component/navbar";
import ReponsiveNavbar from "./_component/ReponsiveNavbar";


const prompt = Prompt({
  subsets: ["latin", "thai"],
  weight: ['100','200','300','400','500','600','700','800','900'],
});

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
      <body className={prompt.className}>
        <ReponsiveNavbar brandName={"PETPAL"} navItems={navitems}/>
        {children}
      </body>
    </html>
  );
}
