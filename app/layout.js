import {Manrope, Sora} from "next/font/google";
import "./globals.css";

const sora = Sora({subsets: ["latin"], variable: "--font-heading"});
const manrope = Manrope({subsets: ["latin"], variable: "--font-body"});

export const metadata = {
  title: "CareerWeaverz",
  description: "Clarity Before Choice",
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${manrope.variable}`}>{children}</body>
    </html>
  );
}
