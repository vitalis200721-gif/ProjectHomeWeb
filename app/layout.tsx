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
  title: {
    default: "Atrium Studio",
    template: "%s | Atrium Studio",
  },
  description:
    "Modern cinematic homes platform. Discover projects, galleries and premium architecture inspiration.",
  keywords: [
    "modern homes",
    "architecture",
    "real estate",
    "cinematic homes",
    "interior design",
  ],
  openGraph: {
    title: "Atrium Studio",
    description:
      "Modern cinematic homes platform. Discover projects and premium architecture inspiration.",
    url: "https://atriumstudio.com",
    siteName: "Atrium Studio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Atrium Studio",
    description:
      "Modern cinematic homes platform. Discover projects and premium architecture inspiration.",
  },
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
