import type { Metadata } from "next";
import { Jost, Merriweather, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import TopBanner from "@/components/frontpage/TopBanner";
import Footer from "@/components/shared/Footer";
import NavbarCategories from "@/components/shared/NavbarCategories";
import SessionProvider from "@/components/providers/SessionProvider";
import CartIndicator from "@/features/cart/components/CartIndicator";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";

const jost = Jost({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jost",
});
const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-merriweather",
});
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});
export const metadata: Metadata = {
  //title: "Salongpartner - Profesjonelle salongprodukter på nett",
  title: "Salongpartner - Kvalitetsprodukter og rask levering!",
  description:
    "Din partner og leverandør for en vellykket salong. Stort utvalg og rask levering! Evagarden ∙ Intensive ∙ DIBI Milano ∙ Lash Bomb ∙ Idema ∙ Fab Brows ∙ Premax ∙ Solutions",
  keywords: [
    "salongpartner",
    "salongpartner.no",
    "salong grossist",
    "salong partner",
    "grossist for salonger",
    "kvalitetsprodukter",
    "hårstyling",
    "frisørprodukter",
    "hårpleie",
    "salongutstyr",
    "profesjonell hårpleie",
    "frisørsalong",
    "hudpleiesalong",
    "Evagarden",
    "Intensive",
    "DIBI Milano",
    "Lash Bomb",
    "Idema",
    "Fab Brows",
    "Premax",
    "Solutions",
  ],
  openGraph: {
    title: "Salongpartner – Kvalitetsprodukter og rask levering!",
    description:
      "Din partner og leverandør for en vellykket salong. Stort utvalg og rask levering! Evagarden ∙ Intensive ∙ DIBI Milano ∙ Lash Bomb ∙ Idema ∙ Fab Brows ∙ Premax ∙ Solutions",
    url: "https://www.salongpartner.no",
    siteName: "Salongpartner",
    images: [
      {
        url: "https://salongpartner.beta.shoppin.no/salongpartner-forside.jpg",
        width: 1200,
        height: 630,
        alt: "Salongpartner - Kvalitetsprodukter og rask levering!",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Salongpartner - Kvalitetsprodukter og rask levering!",
    description:
      "Din partner og leverandør for en vellykket salong. Stort utvalg og rask levering! Evagarden ∙ Intensive ∙ DIBI Milano ∙ Lash Bomb ∙ Idema ∙ Fab Brows ∙ Premax ∙ Solutions",

    images: ["https://salongpartner.beta.shoppin.no/salongpartner-forside.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no">
      <body
        id="salongpartner"
        className={`${jost.variable} ${merriweather.variable} ${inter.variable}`}
      >
        <Toaster position="top-center" reverseOrder={false} />
        <TopBanner />
        <SessionProvider>
          <Navbar
            CartIndicator={
              <Suspense fallback={<>Laster...</>}>
                <CartIndicator />
              </Suspense>
            }
          />
          <NavbarCategories />
          {children}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
