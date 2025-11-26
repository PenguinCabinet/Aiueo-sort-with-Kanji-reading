import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "漢字の読みを考慮した、あいうえお順ソートツール",
  description: "漢字の読みを考慮した、あいうえお順ソートツール",
  openGraph: {
    title: '漢字の読みを考慮した、あいうえお順ソートツール',
    description: '漢字の読みを考慮した、あいうえお順ソートツール',
    type: 'website',
    url: "/img.png",
    images: [{ url: "/img.png" }],
    siteName: "漢字の読みを考慮した、あいうえお順ソートツール",
    locale: "ja",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
