import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LumiGentic - Let's Co-Create Your Next AI-Powered System",
  description: "Let's co-create AI-powered systems that transform processes and shape the future of your business. High-impact automation that cuts waste and turns inefficiencies into productivity gains.",
  keywords: ["AI automation", "process automation", "business efficiency", "AI integration", "digital transformation", "workflow automation", "consulting"],
  authors: [{ name: "LumiGentic" }],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://lumigentic.com",
    siteName: "LumiGentic",
    title: "LumiGentic - Let's Co-Create Your Next AI-Powered System",
    description: "Let's co-create AI-powered systems that transform processes and shape the future of your business.",
    images: [
      {
        url: "https://lumigentic.com/lumigentic-logo.svg",
        width: 1200,
        height: 630,
        alt: "LumiGentic - AI-Powered Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LumiGentic - Let's Co-Create Your Next AI-Powered System",
    description: "Let's co-create AI-powered systems that transform processes and shape the future of your business.",
    images: ["https://lumigentic.com/lumigentic-logo.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://lumigentic.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
