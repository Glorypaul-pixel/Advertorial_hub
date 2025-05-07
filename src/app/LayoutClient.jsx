// app/LayoutClient.jsx
"use client";

import { usePathname } from "next/navigation";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function LayoutClient({ children }) {
  const pathname = usePathname();

  // List pages where the Footer should NOT be shown
  const noFooterPages = ["/dashboard", "/dashboard/analytics", "/dashboard/setting", "/dashboard/pricing"];

  return (
    <>
      <Header />
      <main>{children}</main>
      {!noFooterPages.includes(pathname) && <Footer />}
    </>
  );
}
