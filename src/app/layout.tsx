import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Manicures by Ani | Polished Lounge Leicester",
  description: "Boutique home-based nail artist in Leicester, UK. Book your 1-on-1 appointment for Gel Manicures, BIAB, Gel-X extensions, and custom nail art.",
  icons: {
    icon: "/assets/logo.jpg",
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "name": "Manicures by Ani — Polished Lounge",
  "image": "https://manicuresbyani.co.uk/assets/logo.jpg",
  "description": "Boutique home-based nail salon in Leicester, UK specializing in BIAB, Gel-X extensions, and custom 3D nail art.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Leicester",
    "addressCountry": "GB"
  },
  "url": "https://manicuresbyani.co.uk",
  "sameAs": [
    "https://www.instagram.com/manicuresbyaniii"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
