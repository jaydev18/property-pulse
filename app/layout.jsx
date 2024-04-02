import React from "react";
import "@/assets/styles/globals.css";
import Navbar from "@/components/Navbar";
export const metadata = {
  title: "PropertyPulse | Find The Perfect Rental",
  description: "Find your dream rental property",
  keywords: "rental, find rentals, find properties",
};

const mainLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <main>
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
};

export default mainLayout;
