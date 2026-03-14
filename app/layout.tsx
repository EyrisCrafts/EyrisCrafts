import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Waleed K. Nizamani",
  description: "My Digital garden",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-page text-text-primary">
        {children}
      </body>
    </html>
  );
}
