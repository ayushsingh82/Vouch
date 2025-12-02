import type { Metadata } from "next";
import "./globals.css";
import WalletProvider from "@/providers/WalletProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Vouch - Decentralized Influencer Verification",
  description: "Community-driven fact-checking and influencer verification powered by DKG and X402 Protocol",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased"
        style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
      >
        <WalletProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </WalletProvider>
      </body>
    </html>
  );
}
