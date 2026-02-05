import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Investing.com - Stock Market Quotes & Financial News",
  description:
    "Investing.com offers free real time quotes, portfolio, streaming charts, financial news and stock market data.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
