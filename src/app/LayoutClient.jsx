"use client";

import { usePathname } from "next/navigation";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function LayoutClient({ children }) {
  const pathname = usePathname();

  const noFooterPages = [
    "/dashboard",
    "/dashboard/analytics",
    "/dashboard/setting",
    "/dashboard/pricing",
  ];

  const noHeaderPages = [
    "/dashboard",
    "/dashboard/analytics",
    "/dashboard/setting",
    "/dashboard/pricing",
  ];

  // Helper function to check if current path is in the noHeader/noFooter list or
  // matches the posts dynamic route (/dashboard/posts/[id])
  function isNoHeaderPage(path) {
    if (noHeaderPages.includes(path)) return true;
    // Check if path starts with "/dashboard/posts/"
    if (path.startsWith("/dashboard/posts/")) return true;
    return false;
  }

  function isNoFooterPage(path) {
    if (noFooterPages.includes(path)) return true;
    if (path.startsWith("/dashboard/posts/")) return true;
    return false;
  }

  return (
    <>
      {!isNoHeaderPage(pathname) && <Header />}
      <main>{children}</main>
      {!isNoFooterPage(pathname) && <Footer />}
    </>
  );
}
