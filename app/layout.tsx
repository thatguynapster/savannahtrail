
import type { Metadata } from "next";

import Navigation from "../components/navigation";
import { poppins, volkhov } from "./fonts";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Savannah Trail",
  description: "Discover your roots, embrace your heritage, and explore Ghana through authentic, immersive cultural experiences.Your journey home begins here. We offer a range of services to make your journey with Savannah Trail seamless, enriching, and unforgettable.Whether you're exploring heritage, enjoying personal experiences, or arranging logistics, we've got you covered.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${volkhov.variable} ${poppins.variable} antialiased font-poppins`}
      >
        <Navigation />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
