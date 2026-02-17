import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "@/components/Providers";
import { BackgroundDecor } from "@/components/BackgroundDecor";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Atrium Studio",
  description: "Cinematic Homes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <BackgroundDecor />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
