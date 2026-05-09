import type { Metadata } from "next";
import "./globals.css";
import { WalletProvider } from "@/components/WalletProvider";

export const metadata: Metadata = {
  title: "SetuX Protocol | On-Chain Invoice Financing",
  description: "SetuX lets South Asian exporters tokenize trade invoices and receive USDC advances immediately. Built on Solana.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-background text-text selection:bg-accent selection:text-background">
        <WalletProvider>
          {children}
        </WalletProvider>
      </body>
    </html>
  );
}
