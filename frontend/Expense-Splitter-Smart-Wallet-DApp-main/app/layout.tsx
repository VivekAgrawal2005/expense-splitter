import type React from "react";
import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { AlgorandWalletProvider } from "@/components/algorand-wallet-provider";

const inter = Inter({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SplitChain - Decentralized Expense Splitting",
  description:
    "Split expenses, pool funds, and settle debts trustlessly on Polygon. The smart way to manage group finances.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#4F46E5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <Providers>
          <AlgorandWalletProvider>{children}</AlgorandWalletProvider>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
