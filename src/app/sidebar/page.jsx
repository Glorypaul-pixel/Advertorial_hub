"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { icons } from "../../lib/Icons";
import "../../styles/Sidebar.css";

function Sidebar({ setMenuOpen }) {
  const pathname = usePathname();

  const navPages = [
    { name: "Home", path: "/dashboard", icon: icons.home },
    { name: "Analytics", path: "/dashboard/analytics", icon: icons.analytics },
    { name: "Pricing", path: "/dashboard/pricing", icon: icons.pricing },
    { name: "Settings", path: "/dashboard/setting", icon: icons.setting },
    { name: "Post", path: "/dashboard/posts/:id", icon: icons.post },
  ];

  return (
    <div>
      {/* container */}
      <aside className="sidebar">
        {/* head section */}
        <section className="sidebar-header">
          <img
            src="/images/logo.png"
            className="sidebar-logo"
            alt="Advertorial Hub Logo"
          />
          <h4 className="sidebar-title">Advertorial Hub</h4>
        </section>

        {/* nav */}
        <nav>
          <ul className="sidebar-nav" onClick={() => setMenuOpen?.(false)}>
            {navPages.map((page, index) => (
              <li key={index}>
                {page.name === "Post" ? (
                  <span
                    className="sidebar-link inactive-link"
                    style={{ cursor: "default" }}
                  >
                    {page.icon}
                    <span>{page.name}</span>
                  </span>
                ) : (
                  <Link
                    href={page.path}
                    className={`sidebar-link ${
                      pathname === page.path ? "active-link" : "inactive-link"
                    }`}
                  >
                    {page.icon}
                    <span>{page.name}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
}

export default Sidebar;
 