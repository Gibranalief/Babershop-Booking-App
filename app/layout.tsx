import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: '--font-manrope' });
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800", "900"], variable: '--font-inter' });

export const metadata: Metadata = {
  title: "The Midnight Atelier",
  description: "Premium Barbering",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${manrope.variable} ${inter.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface text-on-surface font-body selection:bg-primary/30 antialiased min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
