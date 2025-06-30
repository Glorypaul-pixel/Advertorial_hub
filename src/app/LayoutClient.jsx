"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function LayoutClient({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      easing: "ease-in-out",
    });
    AOS.refresh();
  }, [pathname]);

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

  function isNoHeaderPage(path) {
    return noHeaderPages.includes(path) || path.startsWith("/dashboard/posts/");
  }

  function isNoFooterPage(path) {
    return noFooterPages.includes(path) || path.startsWith("/dashboard/posts/");
  }

  return (
    <>
      {!isNoHeaderPage(pathname) && <Header />}
      <main>{children}</main>
      {!isNoFooterPage(pathname) && <Footer />}
    </>
  );
}
