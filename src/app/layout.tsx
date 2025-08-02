import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fiscus",
  description: "Fiscus - Personal Expense Tracker - Dashboard Page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
