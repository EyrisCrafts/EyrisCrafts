import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from 'next-themes'

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
    <html lang="en" suppressHydrationWarning className="dark">
      <body className="bg-grey-3 dark:bg-dark-1 transition duration-300">
      <ThemeProvider attribute="class">{children}</ThemeProvider>
      </body>
    </html>
  );
}
