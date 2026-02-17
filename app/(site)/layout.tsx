import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main id="content" className="min-h-[60vh]">
        {children}
      </main>
      <Footer />
    </>
  );
}
