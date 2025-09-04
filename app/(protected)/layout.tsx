import type { Metadata } from "next";
import { Jost, Merriweather, Inter } from "next/font/google";
import "../globals.css";
import { redirect } from "next/navigation";
import { auth } from "@/utils/auth.util";

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
  title: "Salongpartner",
  description: "Salongpartnerdesign",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const session = await auth();
    if (!session) {
       redirect("/logg-inn");
    }
    return (
      children
    );
}
